<template>
  <view class="game-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">叫骰游戏</view>
      <view class="nav-right" @tap="goToRule">
        <text class="rule-icon">规则</text>
      </view>
    </view>

    <!-- 玩家信息区域 -->
    <view class="players-section">
      <view class="player-item" v-for="(player, index) in players" :key="index" :class="{ 'current-player': player.isCurrent, 'winner': player.isWinner, 'loser': player.isLoser }">
        <view class="player-avatar">
          <image :src="player.avatar" mode="aspectFill"></image>
          <view v-if="player.isCurrent" class="current-indicator">
            <text>当前</text>
          </view>
        </view>
        <view class="player-info">
          <view class="player-name">{{player.name}}</view>
          <view class="player-status">{{player.status}}</view>
          <!-- 倒计时显示，只在当前玩家显示且匹配成功后 -->
          <view v-if="player.isCurrent && !gameEnded && !isMatching" class="player-countdown">
            <text class="countdown-text">剩余时间: {{countdown}}秒</text>
          </view>
        </view>
        <view class="player-dice" v-if="player.showDice">
          <view class="dice-item" v-for="(dice, diceIndex) in player.dice" :key="diceIndex">
            <text class="dice-number">{{dice}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 游戏主区域 -->
    <view class="game-section">
      <view class="game-card">
        <view class="game-status">
          <view class="status-text">{{gameStatus}}</view>
        </view>

        <!-- 骰子区域 -->
        <view class="dice-area">
          <view class="dice-container">
            <view class="dice-item" v-for="(dice, index) in myDice" :key="index" :class="{ 'hidden': !showMyDice }">
              <text class="dice-number">{{dice}}</text>
            </view>
          </view>
        </view>

        <!-- 叫骰操作区域 -->
        <view class="call-dice-section" v-if="showCallDice">
          <view class="call-dice-header">
            <text class="call-dice-title">叫骰</text>
          </view>

          <!-- 数量选择 -->
          <view class="call-dice-row">
            <text class="call-dice-label">数量：</text>
            <view class="number-buttons">
              <button
                  v-for="num in diceNumbers"
                  :key="num"
                  class="number-btn"
                  :class="{ 'active': selectedNumber === num }"
                  @tap="selectNumber(num)"
              >
                {{num}}
              </button>
            </view>
          </view>

          <!-- 点数选择 -->
          <view class="call-dice-row">
            <text class="call-dice-label">点数：</text>
            <view class="point-buttons">
              <button
                  v-for="point in dicePoints"
                  :key="point"
                  class="point-btn"
                  :class="{ 'active': selectedPoint === point }"
                  @tap="selectPoint(point)"
              >
                {{point}}
              </button>
            </view>
          </view>

          <!-- 斋选择 -->
          <view class="call-dice-row">
            <text class="call-dice-label">斋：</text>
            <view class="zhai-buttons">
              <button
                  class="zhai-btn"
                  :class="{ 'active': selectedZhai }"
                  @tap="toggleZhai"
              >
                {{selectedZhai ? '是' : '否'}}
              </button>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="call-dice-actions">
            <button class="action-btn cancel-btn" @tap="cancelCallDice">取消</button>
            <button class="action-btn confirm-btn" @tap="confirmCallDice">确认叫骰</button>
          </view>
        </view>

        <!-- 主操作区域 -->
        <view class="action-area" v-else-if="!gameEnded">
          <button class="action-btn pee-btn" @tap="handlePee" :disabled="!canPee">劈</button>
          <button class="action-btn" @tap="openCallDice" :disabled="!canCall">叫骰</button>
          <button class="action-btn counter-pee-btn" @tap="handleCounterPee" :disabled="!canCounterPee">反劈</button>
          <button class="action-btn" @tap="openDice" :disabled="!canOpen">开</button>
        </view>

        <!-- 游戏结束操作区域 -->
        <view class="action-area" v-else>
          <button class="action-btn play-again-btn" @tap="playAgain">再来一局</button>
        </view>
      </view>
    </view>

    <!-- 游戏历史记录 -->
    <view class="history-section">
      <view class="history-header">
        <text class="history-title">游戏记录</text>
      </view>
      <view class="history-list">
        <view class="history-item" v-for="(record, index) in gameHistory" :key="index">
          <text class="history-text">{{record}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import websocketService from '../../common/websocket';

export default {
  data() {
    return {
      // 游戏状态
      gameStatus: '等待玩家加入...',
      isMatching: true, // 是否正在匹配中

      // 玩家信息
      players: [
        {
          id: 1,
          name: '我',
          avatar: '../../static/me.png',
          status: '准备中',
          dice: [],
          showDice: false,
          isCurrent: true,
          isWinner: false,
          isLoser: false,
          userId: ''
        }
      ],

      // 我的骰子
      myDice: [1, 2, 3, 4, 5],
      showMyDice: false,

      // 叫骰相关
      showCallDice: false,
      selectedNumber: 3,
      selectedPoint: 1,
      selectedZhai: false,
      diceNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dicePoints: [1, 2, 3, 4, 5, 6],

      // 游戏控制
      canShake: false, // 匹配成功后自动摇骰，不需要手动摇
      canCall: false,
      canOpen: false,
      canPee: false, // 劈按钮状态
      canCounterPee: false, // 反劈按钮状态
      hasCalled: false, // 是否已叫骰过
      gameEnded: false, // 游戏是否结束
      isPeeTarget: false, // 是否被劈中，需要回复
      
      // 倒计时相关
      countdown: 15, // 倒计时时间（秒）
      countdownTimer: null, // 倒计时计时器
      lastCall: { // 上一个叫骰信息
        quantity: 0,
        point: 0,
        isZhai: false
      },

      // 游戏历史
      gameHistory: [],

      // WebSocket相关
      userId: '',
      isConnected: false
    };
  },
  onLoad() {
    // 获取微信授权登录后的用户ID
    this.userId = uni.getStorageSync('user_id') || '';

    // 如果没有用户ID，提示用户登录
    if (!this.userId) {
      uni.showModal({
        title: '提示',
        content: '请先登录后再进入游戏',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({ url: '/pages/mine/index' });
          }
        }
      });
    } else {
      // 连接WebSocket服务器
      this.connectWebSocket();
    }

    // 监听WebSocket消息
    uni.$on('websocketMessage', this.handleWebSocketMessage);
    // 监听WebSocket关闭事件，清除倒计时
    uni.$on('websocketClose', this.clearCountdown);
  },
  onUnload() {
    // 断开WebSocket连接
    websocketService.disconnect();

    // 移除事件监听
    uni.$off('websocketMessage', this.handleWebSocketMessage);
    uni.$off('websocketClose', this.clearCountdown);
  },
  methods: {
    // 连接WebSocket服务器
    connectWebSocket() {
      websocketService.connect(this.userId, 'ws://120.55.84.53:8888/ws').then(() => {
        this.isConnected = true;
        this.gameStatus = '正在匹配玩家...';
        this.gameHistory.unshift('已连接到服务器，正在匹配玩家...');
      }).catch(error => {
        console.error('WebSocket连接失败:', error);
        this.gameStatus = '连接服务器失败，请重试';
        this.gameHistory.unshift('连接服务器失败，请重试');
      });
    },

    // 处理WebSocket消息
    handleWebSocketMessage(message) {
      console.log('处理WebSocket消息:', message);

      // 检查是否包含叫骰信息，如果有则更新上一个叫骰信息
      if ((message.quantity || message.Quantity) && (message.point || message.Point)) {
        // 更新上一个叫骰信息
        this.lastCall = {
          quantity: message.quantity || message.Quantity,
          point: message.point || message.Point,
          isZhai: (message.zhai === 1 || message.Zhai === 1)
        };
        console.log('更新上一个叫骰信息:', this.lastCall);
      }

      // 处理消息中的玩家名称，替换为新格式
      let processedMessage = message.message;
      if (processedMessage) {
        // 遍历玩家列表，替换消息中的玩家名称
        this.players.forEach(player => {
          if (player.userId && player.name && player.name !== '我') {
            // 查找并替换旧格式的玩家名称（如"玩家1"）
            const oldNamePattern = /玩家\d+/g;
            processedMessage = processedMessage.replace(oldNamePattern, player.name);
          }
        });
      }

      // 更新游戏状态
      this.gameStatus = processedMessage;

      // 添加到历史记录
      this.gameHistory.unshift(processedMessage);

      // 检查是否是玩家退出消息
      if (message.type === 'player_leave' || message.type === 'player_exit') {
        // 玩家退出，本局无效
        this.handlePlayerLeave();
        return;
      }

      // 检查是否是结算消息
      if (message.isEnd || message.is_end) {
        this.handleGameEnd(message);
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'match_success') {
        // 匹配成功，显示骰子
        this.showMyDice = true;
        this.canCall = true;
        this.canOpen = false; // 第1回合不能开，必须先叫骰
        this.canPee = false; // 第1回合不能劈
        this.canCounterPee = false; // 第1回合不能反劈
        this.isMatching = false; // 匹配成功，设置为false

        // 直接使用后端返回的点数数组
        if (message.points && Array.isArray(message.points)) {
          this.myDice = message.points;
          console.log('收到点数:', this.myDice);
        }

        // 匹配成功后，重置玩家列表，只保留自己
        this.players = [
          {
            id: 1,
            name: '我',
            avatar: '../../static/me.png',
            status: '√已准备',
            dice: [],
            showDice: false,
            isCurrent: true,
            isWinner: false,
            isLoser: false,
            userId: this.userId
          }
        ];

        // 开始倒计时
        this.startCountdown();
      } else if (message.type === 'call_wait') {
        // 第一回合等待其他玩家叫骰时自己的按钮状态全部不可用
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        // 不清除倒计时，因为其他玩家可能正在倒计时
      } else if (message.type === 'your_turn') {
        // 轮到自己叫数
        console.log('收到your_turn消息，轮到自己叫数');
        this.canCall = true;
        this.canOpen = true; // 自己回合可以开
        this.canPee = true; // 自己叫数时可以劈
        this.canCounterPee = false; // 自己叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }

        // 强制开始新的倒计时
        this.startCountdown();
      } else if (message.type === 'wait_other') {
        // 等待其他玩家
        console.log('收到wait_other消息，等待其他玩家');
        this.canCall = false;
        this.canOpen = false; // 不是自己回合不能开
        this.canPee = false; // 其他玩家叫骰后可以劈
        this.canCounterPee = false; // 对手叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'can_pee') {
        // 可以劈
        this.canCall = false;
        this.canOpen = false; // 不是自己回合不能开
        this.canPee = true; // 其他玩家叫骰后可以劈
        this.canCounterPee = false; // 对手叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'pee_wait') {
        // 我发起了劈，等待对方回复
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false; // 已经发起劈，不能再劈
        this.canCounterPee = false;
        // 更新玩家状态，标记当前回合玩家（被劈的玩家）
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 开始倒计时，显示被劈玩家的倒计时
        this.startCountdown();
        console.log('发起劈，开始显示被劈玩家的倒计时');
      } else if (message.type === 'pee_target') {
        // 我被劈了，需要回复
        this.canCall = false;
        this.canOpen = true; // 接劈开骰
        this.canPee = false; // 被劈时不能劈别人
        this.canCounterPee = true; // 被劈时可以反劈
        this.isPeeTarget = true; // 设置被劈状态
        // 更新玩家状态，标记当前回合玩家（被劈的玩家）
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 开始倒计时，被劈时需要在规定时间内回复
        this.startCountdown();
        console.log('被劈了，开始倒计时');
      } else if (message.type === 'pee_other') {
        // 其他玩家正在劈，我不能劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false; // 其他玩家正在劈，不能再劈
        this.canCounterPee = false;
        this.isPeeTarget = false; // 重置被劈状态
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'counter_pee') {
        // 有人反劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'no_pee') {
        // 当前没有可以接受的劈命令
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.isPeeTarget = false; // 重置被劈状态
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'no_call') {
        // 当前没有可以劈的叫数
        this.canCall = true;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        // 开始倒计时，因为可以叫骰
        this.startCountdown();
      } else if (message.type === 'no_counter_pee') {
        // 当前没有可以反劈的劈命令
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'not_target') {
        // 不是被劈的玩家，无法反劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'player_list') {
        // 收到玩家列表信息
        if (message.players && Array.isArray(message.players)) {
          // 重置玩家列表
          this.players = [];
          message.players.forEach((serverPlayer, index) => {
            if (serverPlayer.user_id === this.userId) {
              // 自己
              this.players.push({
                id: index + 1,
                name: '我',
                avatar: '../../static/me.png',
                status: '√已准备',
                dice: [],
                showDice: false,
                isCurrent: serverPlayer.is_current || false,
                isWinner: false,
                isLoser: false,
                userId: serverPlayer.user_id
              });
            } else {
              // 其他玩家，使用“玩家+用户ID后6位”格式
              const userIdLast6 = serverPlayer.user_id.substring(serverPlayer.user_id.length - 6);
              this.players.push({
                id: index + 1,
                name: '玩家' + userIdLast6,
                avatar: '../../static/logo.png',
                status: '√已准备',
                dice: [],
                showDice: false,
                isCurrent: serverPlayer.is_current || false,
                isWinner: false,
                isLoser: false,
                userId: serverPlayer.user_id
              });
            }
          });
        }
      } else if (message.type === 'current_turn') {
        // 收到当前回合信息
        console.log('收到current_turn消息，更新当前回合');
        if (message.players && Array.isArray(message.players)) {
          // 更新玩家的当前状态
          message.players.forEach((serverPlayer) => {
            let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'call_error') {
        // 叫数错误，保持按钮状态不变
        // 只显示错误消息，不修改按钮状态
        this.canCall = true;
        // 重新开始倒计时
        this.startCountdown();
      }
    },

    // 处理玩家退出
    handlePlayerLeave() {
      // 断开WebSocket连接
      websocketService.disconnect();
      
      // 清除倒计时
      this.clearCountdown();
      
      // 更新游戏状态
      this.gameStatus = '本局无效，玩家已退出';
      this.gameHistory.unshift('本局无效，玩家已退出');
      
      // 设置游戏结束状态
      this.gameEnded = true;
      this.canCall = false;
      this.canOpen = false;
      this.canPee = false;
      this.canCounterPee = false;
      
      // 显示再来一局按钮
      uni.showToast({
        title: '本局无效，玩家已退出',
        icon: 'none'
      });
    },

    // 开始倒计时
    startCountdown() {
      // 匹配中不开始倒计时
      if (this.isMatching) return;
      
      // 游戏已结束不开始倒计时
      if (this.gameEnded) return;
      
      console.log('开始倒计时，重置为15秒');
      
      // 强制清除之前的倒计时，确保完全重置
      this.clearCountdown();
      
      // 强制重置倒计时时间为15秒
      this.countdown = 15;
      console.log('倒计时已重置为:', this.countdown);
      
      // 开始新的倒计时
      this.countdownTimer = setInterval(() => {
        // 检查游戏是否已结束，如果已结束则清除倒计时
        if (this.gameEnded) {
          console.log('游戏已结束，清除倒计时');
          this.clearCountdown();
          return;
        }
        
        this.countdown--;
        console.log('当前倒计时:', this.countdown);
        
        if (this.countdown <= 0) {
          // 检查游戏是否已结束
          if (this.gameEnded) {
            this.clearCountdown();
            return;
          }
          
          // 检查是否是被劈状态
          if (this.isPeeTarget) {
            console.log('被劈超时，自动开骰');
            this.openDice();
          } else {
            // 检查是否是其他玩家的回合
            const currentPlayer = this.players.find(p => p.isCurrent);
            if (currentPlayer && currentPlayer.userId !== this.userId) {
              // 其他玩家倒计时结束，增加延时检测时间到5秒，确保有足够时间收到叫骰消息
              setTimeout(() => {
                // 再次检查游戏是否已结束
                if (this.gameEnded) return;
                
                // 再次检查当前玩家状态
                const updatedCurrentPlayer = this.players.find(p => p.isCurrent);
                // 只有当当前玩家仍然是同一个其他玩家时，才判断为断开
                if (updatedCurrentPlayer && updatedCurrentPlayer.userId !== this.userId && 
                    updatedCurrentPlayer.userId === currentPlayer.userId) {
                  // 确认其他玩家确实没有叫骰，显示已断开
                  updatedCurrentPlayer.status = '已断开';
                  this.gameHistory.unshift(`玩家${updatedCurrentPlayer.name}已断开`);
                  this.gameStatus = `玩家${updatedCurrentPlayer.name}已断开`;
                  
                  // 先设置游戏结束状态
                  this.gameEnded = true;
                  this.canCall = false;
                  this.canOpen = false;
                  this.canPee = false;
                  this.canCounterPee = false;
                  
                  // 立即清除倒计时，确保倒计时停止
                  this.clearCountdown();
                  
                  // 最后断开WebSocket连接
                  websocketService.disconnect();
                }
              }, 3000); // 延时3秒检测，增加时间确保网络延迟和消息传递
            } else {
              // 自己的回合，正常情况自动叫骰
              if (!this.gameEnded) {
                this.autoCallDice();
              }
            }
          }
          this.clearCountdown();
        }
      }, 1000);
    },

    // 清除倒计时
    clearCountdown() {
      if (this.countdownTimer) {
        console.log('清除倒计时');
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.countdown = 15;
        console.log('倒计时已清除，重置为:', this.countdown);
      }
    },

    // 自动叫骰
    autoCallDice() {
      // 检查游戏是否已结束或WebSocket是否已断开
      if (!this.canCall || this.gameEnded || !websocketService.isConnected) return;
      
      // 检查是否有玩家已断开连接
      const hasDisconnectedPlayer = this.players.some(p => p.status === '已断开');
      if (hasDisconnectedPlayer) {
        console.log('有玩家已断开，跳过自动叫骰');
        return;
      }
      
      // 计算自动叫骰的数量（上一个玩家的数量+1）
      let autoQuantity = this.lastCall.quantity + 1;
      // 确保数量至少为2
      if (autoQuantity < 2) autoQuantity = 2;
      
      // 使用上一个玩家的点数和是否斋
      let autoPoint = this.lastCall.point || 1;
      let autoZhai = this.lastCall.isZhai || false;
      
      // 发送自动叫骰消息
      const zhaiValue = autoZhai ? 1 : 0;
      const callMessage = `${autoQuantity} ${autoPoint} ${zhaiValue}`;
      
      // 发送消息并记录
      console.log('发送自动叫骰消息:', callMessage);
      websocketService.sendMessage(callMessage);
      
      const zhaiText = autoZhai ? '斋' : '不斋';
      const callText = `${autoQuantity}个${autoPoint}${zhaiText}`;
      
      // 添加历史记录
      this.gameHistory.unshift('超时自动叫骰: ' + callText);
      
      this.canCall = false;
      this.hasCalled = true; // 标记已叫骰过
      
      // 只有在游戏未结束时才显示提示
      if (!this.gameEnded) {
        uni.showToast({
          title: '超时自动叫骰',
          icon: 'success'
        });
        
        // 确保消息发送成功，增加双重保险
        setTimeout(() => {
          // 再次检查游戏是否已结束
          if (!this.gameEnded) {
            // 再次发送消息，确保所有玩家都能收到
            console.log('再次发送自动叫骰消息（双重保险）:', callMessage);
            websocketService.sendMessage(callMessage);
          }
        }, 500);
      }
    },

    // 处理游戏结束
    handleGameEnd(message) {
      // 显示所有玩家的骰子
      console.log("this.players", this.players);
      console.log("message.players", message.players);
      
      // 确保所有玩家都在列表中
      if (message.players && Array.isArray(message.players)) {
        message.players.forEach((serverPlayer, index) => {
          // 查找是否已存在该玩家
          let existingPlayer = this.players.find(p => p.userId === serverPlayer.user_id);
          if (!existingPlayer) {
            // 如果不存在，添加新玩家，使用“玩家+用户ID后6位”格式
            const userIdLast6 = serverPlayer.user_id.substring(serverPlayer.user_id.length - 6);
            this.players.push({
              id: index + 1,
              name: '玩家' + userIdLast6,
              avatar: '../../static/logo.png',
              status: '√已准备',
              dice: serverPlayer.points,
              showDice: true,
              isCurrent: false,
              isWinner: serverPlayer.is_winner || false,
              isLoser: serverPlayer.is_loser || false,
              userId: serverPlayer.user_id
            });
          } else {
            // 如果存在，更新信息
            existingPlayer.showDice = true;
            existingPlayer.dice = serverPlayer.points;
            existingPlayer.isWinner = serverPlayer.is_winner || false;
            existingPlayer.isLoser = serverPlayer.is_loser || false;
          }
        });
      }

      this.canCall = false;
      this.canOpen = false;
      this.gameEnded = true; // 设置游戏结束状态
    },

    // 再来一局
    playAgain() {
      // 重置游戏状态
      this.gameEnded = false;
      this.canCall = false;
      this.canOpen = false;
      this.canPee = false;
      this.canCounterPee = false;
      this.hasCalled = false;
      this.isMatching = true; // 重新开始匹配

      // 重置玩家列表，只保留自己
      this.players = [
        {
          id: 1,
          name: '我',
          avatar: '../../static/me.png',
          status: '准备中',
          dice: [],
          showDice: false,
          isCurrent: true,
          isWinner: false,
          isLoser: false,
          userId: this.userId
        }
      ];

      // 添加历史记录
      this.gameHistory.unshift('准备开始新一局游戏...');

      // 断开当前WebSocket连接
      websocketService.disconnect();

      // 重新连接WebSocket
      this.connectWebSocket();

      uni.showToast({
        title: '准备开始新一局',
        icon: 'success'
      });
    },

    // 返回上一页
    goBack() {
      uni.navigateBack({
        delta: 1
      });
    },

    // 进入规则页面
    goToRule() {
      uni.navigateTo({
        url: '/pages/dice/rule'
      });
    },



    // 打开叫骰界面
    openCallDice() {
      if (!this.canCall) return;
      this.showCallDice = true;
    },

    // 选择数量
    selectNumber(num) {
      this.selectedNumber = num;
    },

    // 选择点数
    selectPoint(point) {
      this.selectedPoint = point;
    },

    // 切换斋
    toggleZhai() {
      this.selectedZhai = !this.selectedZhai;
    },

    // 取消叫骰
    cancelCallDice() {
      this.showCallDice = false;
    },

    // 确认叫骰
    confirmCallDice() {
      const zhaiValue = this.selectedZhai ? 1 : 0;
      // 发送叫数消息
      const callMessage = `${this.selectedNumber} ${this.selectedPoint} ${zhaiValue}`;
      websocketService.sendMessage(callMessage);

      const zhaiText = this.selectedZhai ? '斋' : '不斋';
      const callText = `${this.selectedNumber}个${this.selectedPoint}${zhaiText}`;

      // 更新上一个叫骰信息
      this.lastCall = {
        quantity: this.selectedNumber,
        point: this.selectedPoint,
        isZhai: this.selectedZhai
      };

      // 添加历史记录
      this.gameHistory.unshift('我叫骰: ' + callText);

      this.showCallDice = false;
      this.canCall = false;
      this.hasCalled = true; // 标记已叫骰过
      this.clearCountdown(); // 清除倒计时

      // 暂时不切换玩家状态，等待服务端的消息

      uni.showToast({
        title: '叫骰成功',
        icon: 'success'
      });
    },

    // 开骰
    openDice() {
      if (!this.canOpen) return;

      // 根据是否被劈决定发送什么命令
      if (this.isPeeTarget) {
        // 被劈时，点击开就是接劈开骰
        websocketService.sendMessage('82');
        this.gameHistory.unshift('我接受了劈命令');
        this.isPeeTarget = false; // 重置被劈状态
      } else {
        // 正常开骰
        websocketService.sendMessage('99');
        this.gameHistory.unshift('我开骰');
      }

      this.canCall = false;
      this.canOpen = false;

      uni.showToast({
        title: '开骰成功',
        icon: 'success'
      });
    },

    // 处理劈命令
    handlePee() {
      websocketService.sendMessage('80');
      this.gameHistory.unshift('我发起了劈命令');
    },

    // 处理反劈命令
    handleCounterPee() {
      websocketService.sendMessage('81');
      this.gameHistory.unshift('我发起了反劈命令');
    },

    // 处理接劈开骰命令
    handleAcceptPee() {
      websocketService.sendMessage('82');
      this.gameHistory.unshift('我接受了劈命令');
    },

    // 处理接反劈开骰命令
    handleAcceptCounterPee() {
      websocketService.sendMessage('83');
      this.gameHistory.unshift('我接受了反劈命令');
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.game-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #eaf2ff 0%, #ffffff 50%, #f7fbff 100%);
}

/* 导航栏样式 */
.nav-bar {
  height: 100rpx;
  background-color: #0B63F6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  color: #ffffff;
}

.nav-back, .nav-right {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  font-weight: bold;
}

.rule-icon {
  font-size: 28rpx;
  font-weight: 600;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 600;
}

/* 玩家信息区域 */
.players-section {
  padding: 30rpx;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20rpx;
}

.player-item {
  width: 150rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.player-item.current-player {
  border: 3rpx solid #0B63F6;
  box-shadow: 0 0 20rpx rgba(11, 99, 246, 0.3);
}

.player-item.winner {
  border: 3rpx solid #10B981;
  box-shadow: 0 0 20rpx rgba(16, 185, 129, 0.3);
  background-color: #ECFDF5;
}

.player-item.loser {
  border: 3rpx solid #EF4444;
  box-shadow: 0 0 20rpx rgba(239, 68, 68, 0.3);
  background-color: #FEF2F2;
}

.player-avatar {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10rpx;
  border: 2rpx solid #E5E7EB;
}

.player-avatar image {
  width: 100%;
  height: 100%;
}

.current-indicator {
  position: absolute;
  bottom: -5rpx;
  right: -5rpx;
  background-color: #0B63F6;
  color: #ffffff;
  font-size: 16rpx;
  padding: 5rpx 10rpx;
  border-radius: 10rpx;
  font-weight: 600;
}

.player-name {
  font-size: 24rpx;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 5rpx;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-status {
  font-size: 20rpx;
  color: #6B7280;
  margin-bottom: 5rpx;
  text-align: center;
  width: 100%;
}

.player-countdown {
  margin-top: 5rpx;
}

.player-countdown .countdown-text {
  font-size: 18rpx;
  color: #ff6b6b;
  font-weight: 600;
  animation: pulse 1s infinite;
}

.player-dice {
  display: flex;
  gap: 5rpx;
  margin-top: 10rpx;
}

.player-dice .dice-item {
  width: 30rpx;
  height: 30rpx;
  font-size: 16rpx;
  animation: none;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

/* 游戏主区域 */
.game-section {
  padding: 0 30rpx 30rpx;
}

.game-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.15),
  0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.game-status {
  text-align: center;
  margin-bottom: 40rpx;
}

.status-text {
  font-size: 28rpx;
  color: #6b7280;
  padding: 15rpx 30rpx;
  background-color: #f1f5f9;
  border-radius: 20rpx;
  display: inline-block;
}

.countdown {
  margin-top: 20rpx;
}

.countdown-text {
  font-size: 28rpx;
  color: #ff6b6b;
  font-weight: 600;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* 骰子区域 */
.dice-area {
  display: flex;
  justify-content: center;
  margin-bottom: 50rpx;
}

.dice-container {
  display: flex;
  gap: 20rpx;
}

.dice-item {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
  border-radius: 15rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  font-weight: 700;
  color: #1f2937;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
  animation: diceFloat 2s infinite;
  transition: all 0.3s ease;
}

.dice-item.hidden {
  background: linear-gradient(135deg, #374151 0%, #111827 100%);
  color: transparent;
  position: relative;
}

.dice-item.hidden::after {
  content: '?';
  position: absolute;
  color: #ffffff;
  font-size: 48rpx;
  font-weight: 700;
}

.dice-item:nth-child(2) {
  animation-delay: 0.2s;
}

.dice-item:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes diceFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}

/* 叫骰操作区域 */
.call-dice-section {
  margin-top: 20rpx;
}

.call-dice-header {
  text-align: center;
  margin-bottom: 30rpx;
}

.call-dice-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1F2937;
}

.call-dice-row {
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
}

.call-dice-label {
  font-size: 28rpx;
  font-weight: 500;
  color: #4B5563;
  width: 120rpx;
}

.number-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  flex: 1;
}

.number-btn {
  width: 70rpx;
  height: 60rpx;
  background-color: #F3F4F6;
  color: #4B5563;
  font-size: 24rpx;
  font-weight: 500;
  border-radius: 10rpx;
  border: none;
  transition: all 0.3s ease;
}

.number-btn.active {
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(11, 99, 246, 0.3);
}

.point-buttons {
  display: flex;
  gap: 15rpx;
  flex: 1;
}

.point-btn {
  flex: 1;
  height: 60rpx;
  background-color: #F3F4F6;
  color: #4B5563;
  font-size: 24rpx;
  font-weight: 500;
  border-radius: 10rpx;
  border: none;
  transition: all 0.3s ease;
}

.point-btn.active {
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(11, 99, 246, 0.3);
}

.zhai-buttons {
  flex: 1;
}

.zhai-btn {
  width: 100%;
  height: 60rpx;
  background-color: #F3F4F6;
  color: #4B5563;
  font-size: 24rpx;
  font-weight: 500;
  border-radius: 10rpx;
  border: none;
  transition: all 0.3s ease;
}

.zhai-btn.active {
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(11, 99, 246, 0.3);
}

.call-dice-actions {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

/* 主操作区域 */
.action-area {
  display: flex;
  justify-content: space-between;
  gap: 15rpx;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  height: 80rpx;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  border-radius: 15rpx;
  border: none;
  box-shadow: 0 6rpx 16rpx rgba(11, 99, 246, 0.2);
  transition: all 0.3s ease;
}

/* 再来一局按钮样式 */
.play-again-btn {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  box-shadow: 0 6rpx 16rpx rgba(16, 185, 129, 0.2);
  width: 100%;
}

/* 劈和反劈按钮样式 */
.pee-btn,
.counter-pee-btn {
  background: linear-gradient(135deg, #EF4444 0%, #F87171 100%);
  box-shadow: 0 6rpx 16rpx rgba(239, 68, 68, 0.2);
}

.action-btn:active {
  transform: translateY(4rpx);
  box-shadow: 0 4rpx 12rpx rgba(11, 99, 246, 0.15);
}

.action-btn:disabled {
  background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
  box-shadow: none;
  cursor: not-allowed;
}

.cancel-btn {
  background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
}

.confirm-btn {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
}

/* 游戏历史记录 */
.history-section {
  padding: 30rpx;
  background-color: #ffffff;
  margin: 20rpx 30rpx;
  border-radius: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.history-header {
  margin-bottom: 15rpx;
}

.history-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #4B5563;
}

.history-list {
  max-height: 200rpx;
  overflow-y: auto;
}

.history-item {
  padding: 10rpx 0;
  border-bottom: 1rpx solid #E5E7EB;
}

.history-item:last-child {
  border-bottom: none;
}

.history-text {
  font-size: 20rpx;
  color: #6B7280;
  line-height: 32rpx;
}
</style>