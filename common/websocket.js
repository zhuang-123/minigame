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
        // 正在进行的连接 Promise，用于幂等：重复 connect() 复用同一个，避免建多条连接
        this.connectPromise = null;
    }

    // 关闭并「解绑」当前 socket：先把 this.socketTask 置空，
    // 这样旧 socket 后续触发的 onClose/onError 回调会因身份校验失败而被忽略，
    // 不会再触发重连，从根本上杜绝重连风暴。
    teardownSocket() {
        const old = this.socketTask;
        this.socketTask = null;
        this.isConnected = false;
        if (old) {
            try {
                old.close({});
            } catch (_) {
                // ignore
            }
        }
    }

    // 连接WebSocket服务器
    connect(userId, serverUrl) {
        this.userId = userId;
        this.serverUrl = serverUrl;

        // 幂等 1：已经连上了，直接复用
        if (this.isConnected && this.socketTask) {
            console.log('WebSocket 已连接，复用现有连接');
            return Promise.resolve();
        }
        // 幂等 2：正在连接中（例如连点两次开始游戏），复用同一个 Promise，不再建新连接
        if (this.connectPromise) {
            console.log('WebSocket 正在连接中，复用进行中的连接请求');
            return this.connectPromise;
        }

        this.connectPromise = new Promise((resolve, reject) => {
            try {
                // 关闭并解绑可能残留的旧连接
                this.teardownSocket();

                // 使用微信小程序的WebSocket API
                const socketTask = wx.connectSocket({
                    url: serverUrl,
                    success: () => {
                        console.log('WebSocket连接成功');
                    },
                    fail: (error) => {
                        // 仅当这条 socket 仍是当前 socket 时才处理
                        if (this.socketTask !== socketTask) return;
                        console.error('WebSocket连接失败:', error);
                        this.connectPromise = null;
                        reject(error);
                    }
                });
                this.socketTask = socketTask;

                // 监听连接打开
                socketTask.onOpen(() => {
                    // 已被更新的连接取代：忽略这条过期 socket 的事件
                    if (this.socketTask !== socketTask) return;
                    console.log('WebSocket连接已打开');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    this.isDisconnecting = false; // 重置断开连接标志

                    // 连接打开后必须先把 userID 发给服务端，
                    // 服务端在收到 userID 之前会一直阻塞在 ReadMessage，
                    // 不会把这个连接放进匹配队列。
                    if (this.userId) {
                        console.log('连接已打开，发送 userID:', this.userId);
                        socketTask.send({
                            data: this.userId,
                            success: () => {
                                console.log('userID 发送成功');
                            },
                            fail: (error) => {
                                console.error('userID 发送失败:', error);
                            }
                        });
                    } else {
                        console.warn('连接已打开，但 userId 为空，未发送身份');
                    }

                    // 发送队列中的消息
                    this.flushMessageQueue();
                    this.connectPromise = null;
                    resolve();
                });

                // 监听消息
                socketTask.onMessage((res) => {
                    if (this.socketTask !== socketTask) return;
                    console.log('收到WebSocket消息:', res.data);
                    this.handleMessage(res.data);
                });

                // 监听错误
                socketTask.onError((error) => {
                    if (this.socketTask !== socketTask) return; // 旧连接的错误，忽略
                    console.error('WebSocket错误:', error);
                    this.isConnected = false;
                    this.connectPromise = null;
                    this.attemptReconnect();
                });

                // 监听关闭
                socketTask.onClose(() => {
                    if (this.socketTask !== socketTask) return; // 旧连接关闭，忽略，不重连
                    console.log('WebSocket连接关闭');
                    this.isConnected = false;
                    this.socketTask = null;
                    this.connectPromise = null;
                    // 触发连接关闭事件，通知组件清除倒计时
                    uni.$emit('websocketClose');
                    this.attemptReconnect();
                });
            } catch (error) {
                console.error('WebSocket连接失败:', error);
                this.connectPromise = null;
                reject(error);
            }
        });
        return this.connectPromise;
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
        // 设置标志，防止重连
        this.isDisconnecting = true;
        // 重置重连计数器与进行中的连接 Promise
        this.reconnectAttempts = 0;
        this.connectPromise = null;
        // 清空消息缓冲，避免上一局的残留消息（如 game_end）被下一局页面回放，
        // 造成新对局一开局就被判为已结束。
        this.messageBuffer.length = 0;
        // 关闭并解绑当前 socket（解绑后其 onClose 不会再触发重连）
        this.teardownSocket();
    }

    // 检查连接状态
    getStatus() {
        return this.isConnected;
    }
}

// 导出单例
export default new WebSocketService();