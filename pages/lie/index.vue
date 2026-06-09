<template>
  <view class="game-page">
    <!-- 背景图片 -->
    <image src="https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/background.png" mode="scaleToFill" class="background-image"></image>
    
    <!-- 顶部导航（右上角） -->
    <view class="top-nav">
      <button class="nav-icon-btn" @tap="goToRule">
        <text class="nav-icon">?</text>
      </button>
      <button class="nav-icon-btn" @tap="goBack">
        <text class="nav-icon">×</text>
      </button>
    </view>

    <!-- 游戏模式选择 -->
    <view class="mode-section">
      <view class="mode-cards">
        <view 
          class="mode-card"
          :class="{ active: selectedMode === 3 }"
          @tap="selectMode(3)"
        >
          <image src="https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/dual_3.png" mode="aspectFit" class="mode-image"></image>
        </view>
        <view 
          class="mode-card"
          :class="{ active: selectedMode === 4 }"
          @tap="selectMode(4)"
        >
          <image src="https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/dual_4.png" mode="aspectFit" class="mode-image"></image>
        </view>
        <view 
          class="mode-card"
          :class="{ active: selectedMode === 5 }"
          @tap="selectMode(5)"
        >
          <image src="https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/dual_5.png" mode="aspectFit" class="mode-image"></image>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-section">
      <button 
        class="start-btn" 
        :disabled="!selectedMode"
        @tap="startMatch"
      >
        <image :src="selectedMode ? 'https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/match_button.png' : 'https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/match_disable_button.png'" mode="aspectFit" class="start-btn-image"></image>
      </button>
    </view>

    <!-- 匹配等待遮罩 -->
    <view class="match-mask" v-if="isMatching">
      <view class="match-card">
        <view class="match-icon">🔄</view>
        <view class="match-title">匹配中</view>
        <view class="match-desc">正在寻找 {{ selectedMode }} 人对局...<br>匹配时长: {{ matchDuration }}秒</view>
        <view class="match-animation">
          <view class="match-dot"></view>
          <view class="match-dot"></view>
          <view class="match-dot"></view>
        </view>
        <button class="cancel-btn" @tap="cancelMatch">取消匹配</button>
      </view>
    </view>
  </view>
</template>

<script>
import websocketService from '../../common/websocket';

export default {
  data() {
    return {
      // 游戏模式选项
      gameModes: [
        {
          players: 3,
          icon: '👥👥',
          desc: '经典三人局'
        },
        {
          players: 4,
          icon: '👥👥👥',
          desc: '紧张四人局'
        },
        {
          players: 5,
          icon: '👥👥👥👥',
          desc: '刺激五人局'
        }
      ],
      // 选中的模式
      selectedMode: null,
      // 是否正在匹配
      isMatching: false,
      // 匹配开始时间
      matchStartTime: null,
      // 匹配时长（秒）
      matchDuration: 0,
      // 玩家ID
      playerId: ''
    };
  },
  
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    
    // 跳转到游戏规则页面
    goToRule() {
      uni.navigateTo({ url: '/pages/lie/rule' });
    },
    
    // 选择游戏模式
    selectMode(players) {
      this.selectedMode = players;
    },
    
    // 开始匹配
    startMatch() {
      if (!this.selectedMode) {
        uni.showToast({ title: '请选择对战人数', icon: 'none' });
        return;
      }
      
      this.isMatching = true;
      
      // 连接 WebSocket 服务器，谎言扑克端口为 8881
      const userId = uni.getStorageSync('user_id') || 'guest_' + Math.floor(Math.random() * 10000);
      const userName = uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000);
      
      websocketService.connect(userId, 'ws://120.55.84.53:8881/ws').then(() => {
        // 发送加入游戏消息
        const joinMessage = {
          Type: 'join',
          Content: {
            id: userId,
            name: userName,
            gameSize: this.selectedMode
          }
        };
        websocketService.sendMessage(JSON.stringify(joinMessage));
        
        uni.showToast({ title: '已开始匹配，等待其他玩家...', icon: 'none' });
        
        // 记录匹配开始时间并开始计算匹配时长
        this.matchStartTime = new Date();
        this.matchDuration = 0;
        this.startMatchTimer();
      }).catch(err => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
        this.isMatching = false;
      });
    },
    
    // 开始计算匹配时长
    startMatchTimer() {
      const timer = setInterval(() => {
        if (this.matchStartTime) {
          this.matchDuration = Math.floor((new Date() - this.matchStartTime) / 1000);
        }
      }, 1000);
    },
    
    // 取消匹配
    cancelMatch() {
      // 发送取消匹配消息
      const cancelMessage = {
        type: 'cancel_match',
        player: uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000)
      };
      websocketService.sendMessage(JSON.stringify(cancelMessage));
      
      this.isMatching = false;
      websocketService.disconnect();
      uni.showToast({ title: '已取消匹配', icon: 'none' });
    },
    
    // 生命周期处理
    onLoad() {
      uni.$on('websocketMessage', this.handleWebSocketMessage);
      uni.$on('websocketClose', this.handleWebSocketClose);
    },
    
    onShow() {
      // 检查是否需要自动开始匹配（来自game.vue的restartGame或exitWatch）
      const autoStart = uni.getStorageSync('autoStartMatch');
      if (autoStart) {
        console.log('检测到自动匹配标记，开始匹配');
        // 清除标记
        uni.removeStorageSync('autoStartMatch');
        // 如果没有选择模式，默认选择3人模式
        if (!this.selectedMode) {
          this.selectedMode = 3;
          console.log('未选择模式，默认选择3人模式');
        }
        // 开始匹配
        this.startMatch();
      }
    },
    
    onUnload() {
      uni.$off('websocketMessage', this.handleWebSocketMessage);
      uni.$off('websocketClose', this.handleWebSocketClose);
      websocketService.disconnect();
    },
    
    // 处理 WebSocket 消息
    handleWebSocketMessage(message) {
      console.log('谎言扑克收到消息:', message);
      
      if (message.type === 'join_success') {
        // 加入游戏成功
        this.isMatching = true;
        this.playerId = message.content.player_id;
        console.log('保存playerId:', this.playerId);
        uni.showToast({ title: '加入游戏成功，等待其他玩家...', icon: 'none' });
      } else if (message.type === 'rejoin_success') {
        // 重新连接到正在进行的游戏
        console.log('重新连接到正在进行的游戏:', message);
        this.isMatching = false;
        this.playerId = message.content.player_id;
        uni.showToast({ title: '重新连接成功！', icon: 'none' });
        
        // 跳转到游戏对局页面
        let myCardsParam = ''
        let wildParam = ''
        let playersParam = ''
        try {
          const players = (message && message.content && Array.isArray(message.content.players)) ? message.content.players : []
          const myId = String(this.playerId || '')
          const me = players.find(p => String(p.id) === myId) || null
          const myCards = (me && Array.isArray(me.cards)) ? me.cards : []
          const normalizedCards = myCards.map(c => ({
            suit: c && c.suit !== undefined ? c.suit : 'SuitSpade',
            rank: String(c && c.rank ? c.rank : 'RankA')
          }))
          myCardsParam = encodeURIComponent(JSON.stringify(normalizedCards))

          const wild = message && message.content && message.content.wildCard ? message.content.wildCard : null
          if (wild) {
            wildParam = encodeURIComponent(JSON.stringify({
              suit: wild.suit,
              rank: String(wild.rank || '')
            }))
          }

          const slimPlayers = players.map(p => ({
            id: p.id,
            name: p.name,
            hp: p.hp,
            cardCount: p.cardCount || (p.cards ? p.cards.length : 0)
          }))
          playersParam = encodeURIComponent(JSON.stringify(slimPlayers))
        } catch (e) {
          console.warn('构造手牌参数失败:', e)
        }

        const url = `/pages/lie/game?playerId=${encodeURIComponent(this.playerId || '')}&myCards=${myCardsParam}&wildCard=${wildParam}&players=${playersParam}&rejoin=1` +
          `&roomId=${encodeURIComponent(message.content.room_id || '')}` +
          `&currentPlayerName=${encodeURIComponent(message.content.currentPlayerName || '')}` +
          `&currentPlayerId=${encodeURIComponent(message.content.currentPlayerId || '')}` +
          `&lastPlayPlayerName=${encodeURIComponent(message.content.lastPlayPlayerName || '')}` +
          `&lastPlayPlayerId=${encodeURIComponent(message.content.lastPlayPlayerId || '')}` +
          `&declaredType=${encodeURIComponent(message.content.declaredType || '')}` +
          `&declaredRank=${encodeURIComponent(message.content.declaredRank || '')}` +
          `&tableCardsCount=${message.content.tableCards ? message.content.tableCards.length : 0}`
        try { uni.$off('websocketMessage', this.handleWebSocketMessage) } catch (_) {}
        try { uni.$off('websocketClose', this.handleWebSocketClose) } catch (_) {}
        uni.navigateTo({ url })
      } else if (message.type === 'waiting_players') {
        // 等待其他玩家
        uni.showToast({ title: message.content.message, icon: 'none' });
      } else if (message.type === 'ready_to_start') {
        // 玩家已达到指定数量，可以开始游戏
        console.log('玩家已达到指定数量，可以开始游戏:', message);
        uni.showToast({ title: message.content.message, icon: 'none' });
      } else if (message.type === 'game_start') {
        // 游戏开始
        console.log('游戏开始:', message);
        // 无论isMatching的值是什么，都跳转到game.vue页面
        this.isMatching = false;
        uni.showToast({ title: '匹配成功，游戏开始！', icon: 'none' });
        // 跳转到游戏对局页面（通过地址参数传递自己的手牌 + 玩家列表信息）
        let myCardsParam = ''
        let wildParam = ''
        let playersParam = ''
        try {
          const players = (message && message.content && Array.isArray(message.content.players)) ? message.content.players : []
          const myId = String(this.playerId || '')
          const me = players.find(p => String(p.id) === myId) || null
          const myCards = (me && Array.isArray(me.cards)) ? me.cards : []
          const normalizedCards = myCards.map(c => ({
            suit: c && c.suit !== undefined ? c.suit : 'SuitSpade',
            rank: String(c && c.rank ? c.rank : 'RankA')
          }))
          myCardsParam = encodeURIComponent(JSON.stringify(normalizedCards))

          const wild = message && message.content && message.content.wildCard ? message.content.wildCard : null
          if (wild) {
            wildParam = encodeURIComponent(JSON.stringify({
              suit: wild.suit,
              rank: String(wild.rank || '')
            }))
          }

          // 只传渲染所需的最小玩家信息，避免 URL 过长
          const slimPlayers = players.map(p => ({
            id: p.id,
            name: p.name,
            hp: p.hp,
            cardCount: p.cardCount || (p.cards ? p.cards.length : 0)
          }))
          playersParam = encodeURIComponent(JSON.stringify(slimPlayers))
        } catch (e) {
          console.warn('构造手牌参数失败:', e)
        }

        const url = `/pages/lie/game?playerId=${encodeURIComponent(this.playerId || '')}&myCards=${myCardsParam}&wildCard=${wildParam}&players=${playersParam}`
        // 立刻解除本页监听，避免 game_start 后紧跟 your_turn 被本页“抢到”
        try { uni.$off('websocketMessage', this.handleWebSocketMessage) } catch (_) {}
        try { uni.$off('websocketClose', this.handleWebSocketClose) } catch (_) {}
        uni.navigateTo({ url })
      } else if (message.type === 'error') {
        // 处理错误消息
        uni.showToast({ title: message.content.message, icon: 'none' });
        this.isMatching = false;
      }
    },
    
    // 处理 WebSocket 关闭
    handleWebSocketClose() {
      this.isMatching = false;
      uni.showToast({ title: '连接已断开', icon: 'none' });
    }
  }
};
</script>

<style scoped>
/* ========== 基础样式 ========== */
.game-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* 禁止页面滚动 */
page {
  overflow: hidden;
  height: 100%;
}

/* 背景图片 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  object-fit: cover;
}

/* 背景光效 */
.game-page::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(120, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  pointer-events: none;
  z-index: 0;
}

/* ========== 顶部导航（右上角） ========== */
.top-nav {
  position: absolute;
  top: 40rpx;
  right: 40rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
  z-index: 10;
}

.nav-icon-btn {
  width: 60rpx;
  height: 60rpx;
  padding: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  outline: none;
}

.nav-icon-btn::after {
  border: none;
}

.nav-icon-btn:active {
  background: rgba(120, 0, 255, 0.4);
  transform: scale(0.95);
}

.nav-icon {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: bold;
  line-height: 1;
}

/* ========== 游戏模式选择区域 ========== */
.mode-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50rpx;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  margin-top: 80rpx;
}

.mode-cards {
  display: flex;
  gap: 40rpx;
  perspective: 1000rpx;
  max-width: 100%;
  flex-wrap: nowrap;
  padding-top: 30rpx;
  overflow: visible;
}

.mode-card {
  flex: 1;
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);
  min-width: 100rpx;
  max-width: 150rpx;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  outline: none;
}

.mode-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.mode-card.active {
  transform: translateY(-20rpx) scale(1.05);
}

.mode-card.active::before {
  opacity: 0;
}

.mode-card.active::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.mode-image {
  width: 100%;
  height: 150rpx;
  object-fit: cover;
}



/* ========== 底部按钮区域 ========== */
.bottom-section {
  padding: 20rpx 50rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  margin-top: -60rpx;
}

.button-group {
  display: flex;
  gap: 40rpx;
  justify-content: center;
}

.mode-btn {
  padding: 20rpx 60rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 50rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.mode-btn.active {
  background: rgba(120, 0, 255, 0.3);
  border-color: rgba(255, 0, 255, 0.5);
  color: #ffffff;
  box-shadow: 0 0 30rpx rgba(255, 0, 255, 0.4);
}

.start-btn {
  align-self: center;
  width: 200rpx;
  height: 60rpx;
  padding: 0;
  background: transparent !important;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: normal;
}

.start-btn::after {
  border: none;
}

.start-btn[disabled] {
  background: transparent !important;
  color: inherit;
}

.start-btn:disabled {
  opacity: 0.6;
  background: transparent !important;
  cursor: not-allowed;
}

.start-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.start-btn-image {
  width: 100%;
  height: 100%;
}

/* ========== 匹配等待遮罩 ========== */
.match-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.match-card {
  background: rgba(255, 255, 255, 0.08);
  border: 2rpx solid rgba(255, 0, 255, 0.3);
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  width: 260rpx;
  box-shadow: 0 0 30rpx rgba(255, 0, 255, 0.3);
}

.match-icon {
  font-size: 40rpx;
  animation: spin 2s linear infinite;
  color: #ff00ff;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.match-title {
  font-size: 20rpx;
  font-weight: 800;
  color: #ff00ff;
  text-shadow: 0 0 10rpx rgba(255, 0, 255, 0.6);
}

.match-desc {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.match-animation {
  display: flex;
  gap: 6rpx;
}

.match-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #ff00ff;
  animation: pulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 5rpx rgba(255, 0, 255, 0.8);
}

.match-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.match-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.2); }
}

.cancel-btn {
  width: 100%;
  height: 40rpx;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14rpx;
  font-weight: 600;
  border-radius: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  margin-top: 10rpx;
  transition: all 0.3s ease;
}

.cancel-btn:active {
  background: rgba(255, 255, 255, 0.2);
}
</style>