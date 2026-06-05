// WebSocket服务
class WebSocketService {
    constructor() {
        this.socketTask = null;
        this.isConnected = false;
        this.messageQueue = [];
        // 缓冲最近收到的消息，避免页面切换瞬间丢消息（如 game_start 后紧跟 your_turn）
        this.messageBuffer = [];
        this.maxMessageBufferSize = 50;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.isDisconnecting = false;
        this.userId = '';
        this.serverUrl = '';
        this.messageTimeout = 5000; // 消息发送超时时间
        this.messageRetries = 3; // 消息重发次数
    }

    // 连接WebSocket服务器
    connect(userId, serverUrl) {
        this.userId = userId;
        this.serverUrl = serverUrl;

        return new Promise((resolve, reject) => {
            try {
                // 关闭已存在的连接
                if (this.socketTask) {
                    this.disconnect();
                }

                // 使用微信小程序的WebSocket API
                this.socketTask = wx.connectSocket({
                    url: serverUrl,
                    success: () => {
                        console.log('WebSocket连接成功');
                    },
                    fail: (error) => {
                        console.error('WebSocket连接失败:', error);
                        reject(error);
                    }
                });

                // 监听连接打开
                this.socketTask.onOpen(() => {
                    console.log('WebSocket连接已打开');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    this.isDisconnecting = false; // 重置断开连接标志

                    // 发送队列中的消息
                    this.flushMessageQueue();
                    resolve();
                });

                // 监听消息
                this.socketTask.onMessage((res) => {
                    console.log('收到WebSocket消息:', res.data);
                    this.handleMessage(res.data);
                });

                // 监听错误
                this.socketTask.onError((error) => {
                    console.error('WebSocket错误:', error);
                    this.isConnected = false;
                    this.attemptReconnect();
                });

                // 监听关闭
                this.socketTask.onClose(() => {
                    console.log('WebSocket连接关闭');
                    this.isConnected = false;
                    // 触发连接关闭事件，通知组件清除倒计时
                    uni.$emit('websocketClose');
                    this.attemptReconnect();
                });
            } catch (error) {
                console.error('WebSocket连接失败:', error);
                reject(error);
            }
        });
    }

    // 发送消息（带重试机制）
    sendMessageWithRetry(message, retryCount = 0) {
        if (this.isConnected && this.socketTask) {
            console.log(`发送消息${retryCount > 0 ? `(重试${retryCount})` : ''}:`, message);

            this.socketTask.send({
                data: message,
                success: () => {
                    console.log('消息发送成功:', message);
                },
                fail: (error) => {
                    console.error('消息发送失败:', error);
                    // 如果重试次数未达到上限，延迟后重试
                    if (retryCount < this.messageRetries) {
                        console.log(`消息发送失败，${this.reconnectDelay * (retryCount + 1)}ms后重试...`);
                        setTimeout(() => {
                            this.sendMessageWithRetry(message, retryCount + 1);
                        }, this.reconnectDelay * (retryCount + 1));
                    } else {
                        // 加入消息队列
                        console.log('消息发送失败，加入队列:', message);
                        this.messageQueue.push(message);
                    }
                }
            });
        } else {
            // 加入消息队列
            console.log('连接未建立，消息加入队列:', message);
            this.messageQueue.push(message);
        }
    }

    // 发送消息
    sendMessage(message) {
        this.sendMessageWithRetry(message);
    }

    // 发送队列中的消息
    flushMessageQueue() {
        console.log('发送队列中的消息，队列长度:', this.messageQueue.length);
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.sendMessageWithRetry(message);
        }
    }

    // 处理收到的消息
    handleMessage(data) {
        try {
            const message = JSON.parse(data);
            this.pushToBuffer(message);
            // 触发消息事件
            uni.$emit('websocketMessage', message);
        } catch (error) {
            // 非JSON格式消息
            console.error('消息解析失败:', error, '原始数据:', data);
            const msg = { message: data, isEnd: false };
            this.pushToBuffer(msg);
            uni.$emit('websocketMessage', msg);
        }
    }

    // 写入消息缓冲（有上限，先进先出）
    pushToBuffer(message) {
        try {
            this.messageBuffer.push(message);
            if (this.messageBuffer.length > this.maxMessageBufferSize) {
                this.messageBuffer.splice(0, this.messageBuffer.length - this.maxMessageBufferSize);
            }
        } catch (_) {
            // ignore
        }
    }

    // 取出并清空缓冲（用于新页面回放）
    drainMessageBuffer() {
        const buffered = this.messageBuffer.slice();
        this.messageBuffer.length = 0;
        return buffered;
    }

    // 尝试重连
    attemptReconnect() {
        // 如果是主动断开连接，不进行重连
        if (this.isDisconnecting) {
            console.log('主动断开连接，不进行重连');
            this.isDisconnecting = false;
            return;
        }

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

            setTimeout(() => {
                this.connect(this.userId, this.serverUrl);
            }, this.reconnectDelay * this.reconnectAttempts);
        } else {
            console.error('重连失败，已达到最大尝试次数');
        }
    }

    // 断开连接
    disconnect() {
        if (this.socketTask) {
            this.socketTask.close({
                success: () => {
                    console.log('WebSocket连接已关闭');
                },
                fail: (error) => {
                    console.error('关闭WebSocket连接失败:', error);
                }
            });
            this.socketTask = null;
            this.isConnected = false;
            // 重置重连计数器
            this.reconnectAttempts = 0;
            // 设置一个标志，防止重连
            this.isDisconnecting = true;
        }
    }

    // 检查连接状态
    getStatus() {
        return this.isConnected;
    }
}

// 导出单例
export default new WebSocketService();