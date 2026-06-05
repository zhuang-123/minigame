<template>
  <view class="game-page">
    <!-- 顶部状态栏 -->
    <view class="top-bar">
      <view class="pot-info">
        <text class="pot-label">底池</text>
        <text class="pot-amount">{{ pot }}</text>
      </view>
      <view class="game-stage">
        <text class="stage-text">{{ stageName }}</text>
      </view>
      <view class="my-chips">
        <text class="chips-label">筹码</text>
        <text class="chips-amount">{{ myChips }}</text>
      </view>
    </view>

    <!-- 公共牌区域 -->
    <view class="community-area">
      <view class="community-cards">
        <view
          v-for="(card, index) in communityCards"
          :key="index"
          class="community-card"
          :class="{ visible: card.visible }"
        >
          <view v-if="card.visible" class="card-inner" :class="card.suit">
            <text class="card-rank">{{ card.rank }}</text>
            <text class="card-suit-icon">{{ card.suitIcon }}</text>
          </view>
          <view v-else class="card-back"></view>
        </view>
      </view>
    </view>

    <!-- 对手座位区域 -->
    <view class="opponents-area">
      <view
        v-for="(player, index) in opponents"
        :key="index"
        class="player-seat"
        :class="{ active: player.isActive, folded: player.folded }"
      >
        <view class="avatar">{{ player.avatar }}</view>
        <view class="player-name">{{ player.name }}</view>
        <view class="player-chips">{{ player.chips }}</view>
        <view v-if="player.isActive" class="thinking-dot">
          <view class="dot d1"></view>
          <view class="dot d2"></view>
          <view class="dot d3"></view>
        </view>
        <view v-if="player.isDealer" class="dealer-btn">D</view>
        <view v-if="player.blind" class="blind-btn">{{ player.blind }}</view>
      </view>
    </view>

    <!-- 我的手牌 -->
    <view class="my-hand-area">
      <view class="my-cards">
        <view v-for="(card, i) in myCards" :key="i" class="my-card" :class="card.suit">
          <text class="card-rank">{{ card.rank }}</text>
          <text class="card-suit-icon">{{ card.suitIcon }}</text>
        </view>
      </view>
      <view class="my-info">
        <view class="my-bet-info">
          <text class="bet-label">当前下注</text>
          <text class="bet-amount">{{ myBet }}</text>
        </view>
      </view>
    </view>

    <!-- 下注控制区域 -->
    <view class="action-area" v-if="isMyTurn">
      <view class="bet-slider-row" v-if="showBetSlider">
        <text class="slider-label">下注额：{{ betAmount }}</text>
        <slider
          :min="minBet"
          :max="myChips"
          :value="betAmount"
          @change="onSliderChange"
          block-size="28"
          activeColor="#f0c048"
          backgroundColor="rgba(255,255,255,0.1)"
        />
      </view>
      <view class="action-btns">
        <button class="action-btn fold-btn" @tap="onFold">弃牌</button>
        <button class="action-btn check-btn" v-if="canCheck" @tap="onCheck">过牌</button>
        <button class="action-btn call-btn" v-else @tap="onCall">跟注 {{ callAmount }}</button>
        <button class="action-btn raise-btn" @tap="onRaise">加注</button>
        <button class="action-btn allin-btn" @tap="onAllIn">全下</button>
      </view>
    </view>

    <!-- 等待提示（非我的回合） -->
    <view class="waiting-tip" v-else>
      <view class="wait-dot-row">
        <view class="wait-dot wd1"></view>
        <view class="wait-dot wd2"></view>
        <view class="wait-dot wd3"></view>
      </view>
      <text class="wait-text">等待其他玩家行动...</text>
    </view>

    <!-- 游戏日志 -->
    <view class="game-log" v-if="logs.length > 0">
      <view class="log-item" v-for="(log, i) in logs" :key="i">{{ log }}</view>
    </view>

    <!-- 开始游戏遮罩 -->
    <view class="start-mask" v-if="gameState === 'waiting'">
      <view class="start-card">
        <view class="start-icon">♠️</view>
        <view class="start-title">德州扑克</view>
        <view class="start-desc">正在等待玩家加入...</view>
        <button class="start-game-btn" @tap="startGame">开始游戏</button>
        <view class="start-rule-link" @tap="goToRule">查看规则 →</view>
      </view>
    </view>

    <!-- 匹配等待遮罩 -->
    <view class="start-mask" v-if="gameState === 'matching'">
      <view class="start-card">
        <view class="start-icon">🔄</view>
        <view class="start-title">匹配中</view>
        <view class="start-desc">正在寻找对手...</view>
        <view class="player-list" v-if="matchState.players.length > 0">
          <view class="player-item" v-for="(player, index) in matchState.players" :key="index">
            <view class="player-avatar">{{ player.avatar }}</view>
            <view class="player-info">
              <view class="player-name">{{ player.name }}</view>
              <view class="player-status" :class="player.ready ? 'ready' : 'waiting'">
                {{ player.ready ? '已准备' : '等待准备' }}
              </view>
            </view>
          </view>
        </view>
        <button class="start-game-btn" v-if="matchState.players.length >= 2" @tap="readyGame">准备开始</button>
        <button class="cancel-btn" @tap="cancelMatch">取消匹配</button>
      </view>
    </view>

    <!-- 准备就绪遮罩 -->
    <view class="start-mask" v-if="gameState === 'ready'">
      <view class="start-card">
        <view class="start-icon">✅</view>
        <view class="start-title">准备就绪</view>
        <view class="start-desc">等待所有玩家准备...</view>
        <view class="player-list">
          <view class="player-item" v-for="(player, index) in matchState.players" :key="index">
            <view class="player-avatar">{{ player.avatar }}</view>
            <view class="player-info">
              <view class="player-name">{{ player.name }}</view>
              <view class="player-status" :class="player.ready ? 'ready' : 'waiting'">
                {{ player.ready ? '已准备' : '等待准备' }}
              </view>
            </view>
          </view>
        </view>
        <button class="cancel-btn" @tap="cancelReady">取消准备</button>
      </view>
    </view>
  </view>
</template>

<script>
import websocketService from '../../common/websocket';

export default {
  data() {
    return {
      // 游戏状态：waiting / matching / ready / playing / showdown
      gameState: 'waiting',
      // 匹配状态
      matchState: {
        status: 'idle', // idle / matching / matched
        players: [],
        readyPlayers: []
      },
      // 当前阶段名称
      stageName: '底牌圈',
      // 底池筹码
      pot: 0,
      // 我的筹码
      myChips: 1000,
      // 我的当前下注
      myBet: 0,
      // 是否是我的回合
      isMyTurn: false,
      // 是否可以过牌（无人下注时）
      canCheck: true,
      // 跟注需要的金额
      callAmount: 0,
      // 最小加注额
      minBet: 20,
      // 当前下注额（滑块）
      betAmount: 20,
      // 是否展示下注滑块
      showBetSlider: false,
      // 公共牌（5张）
      communityCards: [
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' }
      ],
      // 我的手牌（2张）
      myCards: [
        { rank: 'A', suit: 'spades', suitIcon: '♠' },
        { rank: 'K', suit: 'hearts', suitIcon: '♥' }
      ],
      // 对手列表
      opponents: [
        { name: '玩家2', avatar: '🎭', chips: 980, isActive: true, isDealer: true, folded: false, blind: '' },
        { name: '玩家3', avatar: '🎪', chips: 960, isActive: false, isDealer: false, folded: false, blind: 'SB' },
        { name: '玩家4', avatar: '🎨', chips: 940, isActive: false, isDealer: false, folded: true, blind: '' },
        { name: '玩家5', avatar: '🎯', chips: 1000, isActive: false, isDealer: false, folded: false, blind: 'BB' }
      ],
      // 游戏日志
      logs: []
    };
  },

  methods: {
    // 前往规则页
    goToRule() {
      uni.navigateTo({ url: '/pages/texas/rule' });
    },

    // 开始游戏（模拟/连接服务器）
    startGame() {
      // 连接 WebSocket 服务器，德州扑克端口为 8887
      const userId = uni.getStorageSync('user_id') || 'guest_' + Math.floor(Math.random() * 10000);
      const userName = uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000);
      
      websocketService.connect(userId, 'ws://120.55.84.53:8887/ws').then(() => {
        // 发送加入游戏消息
        const joinMessage = {
          type: 'join',
          player: userName
        };
        websocketService.sendMessage(JSON.stringify(joinMessage));
        
        this.gameState = 'matching';
        this.matchState.status = 'matching';
        this.matchState.players = [];
        this.matchState.readyPlayers = [];
        this.logs = ['正在连接服务器...', '正在寻找对手...'];
        uni.showToast({ title: '已连接服务器，正在寻找对手...', icon: 'none' });
      }).catch(err => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
      });
    },
    
    // 准备开始游戏
    readyGame() {
      // 发送准备消息
      const readyMessage = {
        type: 'ready',
        player: uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000)
      };
      websocketService.sendMessage(JSON.stringify(readyMessage));
      
      this.gameState = 'ready';
      this.logs.unshift('你已准备就绪');
      uni.showToast({ title: '已准备就绪，等待其他玩家...', icon: 'none' });
    },
    
    // 取消匹配
    cancelMatch() {
      // 发送取消匹配消息
      const cancelMessage = {
        type: 'cancel_match',
        player: uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000)
      };
      websocketService.sendMessage(JSON.stringify(cancelMessage));
      
      this.gameState = 'waiting';
      this.matchState.status = 'idle';
      this.matchState.players = [];
      this.matchState.readyPlayers = [];
      websocketService.disconnect();
      uni.showToast({ title: '已取消匹配', icon: 'none' });
    },
    
    // 取消准备
    cancelReady() {
      // 发送取消准备消息
      const cancelReadyMessage = {
        type: 'cancel_ready',
        player: uni.getStorageSync('user_name') || '玩家' + Math.floor(Math.random() * 10000)
      };
      websocketService.sendMessage(JSON.stringify(cancelReadyMessage));
      
      this.gameState = 'matching';
      this.logs.unshift('你已取消准备');
      uni.showToast({ title: '已取消准备', icon: 'none' });
    },

    // 生命周期处理
    onLoad() {
      uni.$on('websocketMessage', this.handleWebSocketMessage);
      uni.$on('websocketClose', this.handleWebSocketClose);
    },
    
    onUnload() {
      uni.$off('websocketMessage', this.handleWebSocketMessage);
      uni.$off('websocketClose', this.handleWebSocketClose);
      websocketService.disconnect();
    },

    // 处理 WebSocket 消息
    handleWebSocketMessage(message) {
      console.log('德州扑克收到消息:', message);
      
      if (message.type === 'game_state') {
        // 更新游戏状态
        this.updateGameState(message);
      } else if (message.type === 'match_state') {
        // 处理匹配状态更新
        this.updateMatchState(message);
      } else if (message.type === 'player_joined') {
        // 处理玩家加入
        this.handlePlayerJoined(message);
      } else if (message.type === 'player_ready') {
        // 处理玩家准备
        this.handlePlayerReady(message);
      } else if (message.type === 'game_start') {
        // 处理游戏开始
        this.handleGameStart(message);
      } else if (message.type === 'error') {
        // 处理错误消息
        uni.showToast({ title: message.message, icon: 'none' });
        this.logs.unshift('错误: ' + message.message);
      }
    },
    
    // 更新匹配状态
    updateMatchState(state) {
      this.matchState = state;
      if (state.status === 'matched') {
        this.gameState = 'matching';
      }
    },
    
    // 处理玩家加入
    handlePlayerJoined(message) {
      const player = {
        name: message.player,
        avatar: this.getAvatar(this.matchState.players.length),
        ready: false
      };
      this.matchState.players.push(player);
      this.logs.unshift(`${message.player} 加入了游戏`);
    },
    
    // 处理玩家准备
    handlePlayerReady(message) {
      const playerIndex = this.matchState.players.findIndex(p => p.name === message.player);
      if (playerIndex !== -1) {
        this.matchState.players[playerIndex].ready = true;
        this.logs.unshift(`${message.player} 已准备就绪`);
      }
    },
    
    // 处理游戏开始
    handleGameStart(message) {
      this.gameState = 'playing';
      this.logs.unshift('游戏开始！');
      uni.showToast({ title: '游戏开始！', icon: 'none' });
    },
    
    // 更新游戏状态
    updateGameState(state) {
      // 更新游戏状态
      this.gameState = state.game_state === 'StateShowdown' ? 'showdown' : 'playing';
      
      // 更新当前轮次
      this.stageName = state.current_round;
      
      // 更新底池
      this.pot = state.pot;
      
      // 更新最高下注
      this.callAmount = state.highest_bet;
      
      // 更新公共牌
      this.updateCommunityCards(state.community_cards);
      
      // 更新玩家信息
      this.updatePlayers(state.players);
      
      // 更新当前行动玩家
      this.updateCurrentPlayer(state.current_player);
      
      // 更新游戏日志
      this.updateLogs(state);
    },
    
    // 更新公共牌
    updateCommunityCards(cards) {
      this.communityCards = cards.map((card, index) => {
        if (card) {
          return {
            visible: true,
            rank: card.Rank,
            suit: this.getSuitClass(card.Suit),
            suitIcon: this.getSuitIcon(card.Suit)
          };
        } else {
          return {
            visible: false,
            rank: '',
            suit: '',
            suitIcon: ''
          };
        }
      });
    },
    
    // 更新玩家信息
    updatePlayers(players) {
      // 找到自己的信息
      const myInfo = players.find(p => p.ID === uni.getStorageSync('user_id'));
      if (myInfo) {
        // 更新我的筹码
        this.myChips = myInfo.Chips;
        // 更新我的当前下注
        this.myBet = myInfo.RoundBet;
        // 更新我的手牌
        this.myCards = myInfo.HoleCards.map(card => ({
          rank: card.Rank,
          suit: this.getSuitClass(card.Suit),
          suitIcon: this.getSuitIcon(card.Suit)
        }));
      }
      
      // 更新对手信息
      this.opponents = players.filter(p => p.ID !== uni.getStorageSync('user_id')).map((player, index) => ({
        name: player.Name,
        avatar: this.getAvatar(index),
        chips: player.Chips,
        isActive: false, // 暂时设为false，在updateCurrentPlayer中更新
        isDealer: player.IsButton,
        folded: player.State === 'folded',
        blind: player.IsSmallBlind ? 'SB' : player.IsBigBlind ? 'BB' : ''
      }));
    },
    
    // 更新当前行动玩家
    updateCurrentPlayer(currentPlayer) {
      this.isMyTurn = currentPlayer === uni.getStorageSync('user_name');
      // 检查是否可以过牌
      this.canCheck = this.myBet >= this.callAmount;
    },
    
    // 更新游戏日志
    updateLogs(state) {
      // 根据游戏状态添加日志
      if (state.game_state === 'StatePreFlop') {
        this.logs.unshift('游戏开始，底牌圈');
      } else if (state.game_state === 'StateFlop') {
        this.logs.unshift('翻牌圈');
      } else if (state.game_state === 'StateTurn') {
        this.logs.unshift('转牌圈');
      } else if (state.game_state === 'StateRiver') {
        this.logs.unshift('河牌圈');
      } else if (state.game_state === 'StateShowdown') {
        this.logs.unshift('摊牌');
      }
    },
    
    // 获取花色类名
    getSuitClass(suit) {
      switch (suit) {
        case '♥': return 'hearts';
        case '♦': return 'diamonds';
        case '♠': return 'spades';
        case '♣': return 'clubs';
        default: return 'spades';
      }
    },
    
    // 获取花色图标
    getSuitIcon(suit) {
      return suit;
    },
    
    // 获取头像
    getAvatar(index) {
      const avatars = ['🎭', '🎪', '🎨', '🎯', '🎮', '🎲', '🎰', '🎸'];
      return avatars[index % avatars.length];
    },

    // 处理 WebSocket 关闭
    handleWebSocketClose() {
      this.gameState = 'waiting';
      uni.showToast({ title: '连接已断开', icon: 'none' });
    },

    // 弃牌
    onFold() {
      // 发送弃牌动作
      const actionMessage = {
        type: 'player_action',
        action: 'fold',
        amount: 0
      };
      websocketService.sendMessage(JSON.stringify(actionMessage));
      
      this.logs.unshift('你 弃牌');
      this.isMyTurn = false;
      uni.showToast({ title: '已弃牌', icon: 'none' });
    },

    // 过牌
    onCheck() {
      // 发送过牌动作
      const actionMessage = {
        type: 'player_action',
        action: 'check',
        amount: 0
      };
      websocketService.sendMessage(JSON.stringify(actionMessage));
      
      this.logs.unshift('你 过牌');
      this.isMyTurn = false;
    },

    // 跟注
    onCall() {
      // 发送跟注动作
      const actionMessage = {
        type: 'player_action',
        action: 'call',
        amount: 0
      };
      websocketService.sendMessage(JSON.stringify(actionMessage));
      
      this.logs.unshift(`你 跟注 ${this.callAmount}`);
      this.isMyTurn = false;
    },

    // 加注（展示滑块）
    onRaise() {
      this.showBetSlider = !this.showBetSlider;
      if (!this.showBetSlider) {
        // 确认加注
        const amount = this.betAmount;
        
        // 发送加注动作
        const actionMessage = {
          type: 'player_action',
          action: 'raise',
          amount: amount
        };
        websocketService.sendMessage(JSON.stringify(actionMessage));
        
        this.logs.unshift(`你 加注至 ${amount}`);
        this.isMyTurn = false;
      }
    },

    // 全下
    onAllIn() {
      // 发送全下动作
      const actionMessage = {
        type: 'player_action',
        action: 'allin',
        amount: 0
      };
      websocketService.sendMessage(JSON.stringify(actionMessage));
      
      this.logs.unshift(`你 全下 ${this.myChips}`);
      this.isMyTurn = false;
      uni.showToast({ title: 'ALL IN！', icon: 'none' });
    },

    // 滑块变化
    onSliderChange(e) {
      this.betAmount = e.detail.value;
    }
  }
};
</script>

<style scoped>
/* ========== 基础 ========== */
.game-page {
  min-height: 100vh;
  background: radial-gradient(ellipse at center top, #1a3a1a 0%, #0a1a0a 40%, #050d05 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ========== 顶部状态栏 ========== */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
}

.pot-info, .my-chips {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pot-label, .chips-label {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.45);
}

.pot-amount, .chips-amount {
  font-size: 32rpx;
  font-weight: 700;
  color: #f0c048;
}

.game-stage {
  background: rgba(240, 192, 72, 0.15);
  border: 1rpx solid rgba(240, 192, 72, 0.35);
  border-radius: 30rpx;
  padding: 10rpx 28rpx;
}

.stage-text {
  font-size: 24rpx;
  font-weight: 600;
  color: #f0c048;
}

/* ========== 公共牌区域 ========== */
.community-area {
  padding: 40rpx 20rpx;
  display: flex;
  justify-content: center;
}

.community-cards {
  display: flex;
  gap: 14rpx;
}

.community-card {
  width: 88rpx;
  height: 120rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.card-back {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a4a1a, #0d2e0d);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.03) 0px,
    rgba(255,255,255,0.03) 2px,
    transparent 2px,
    transparent 8px
  );
}

.card-inner {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
}

.card-inner.hearts, .card-inner.diamonds {
  color: #e53e3e;
}

.card-inner.spades, .card-inner.clubs {
  color: #1a202c;
}

.card-rank {
  font-size: 26rpx;
  font-weight: 800;
}

.card-suit-icon {
  font-size: 28rpx;
}

/* ========== 对手座位 ========== */
.opponents-area {
  display: flex;
  justify-content: space-around;
  padding: 0 20rpx 30rpx;
  flex-wrap: wrap;
  gap: 20rpx;
}

.player-seat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  position: relative;
  padding: 16rpx 20rpx;
  background: rgba(255, 255, 255, 0.04);
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  border-radius: 20rpx;
  min-width: 120rpx;
  transition: all 0.3s;
}

.player-seat.active {
  background: rgba(240, 192, 72, 0.1);
  border-color: rgba(240, 192, 72, 0.4);
}

.player-seat.folded {
  opacity: 0.4;
}

.avatar {
  font-size: 44rpx;
}

.player-name {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.7);
}

.player-chips {
  font-size: 22rpx;
  font-weight: 700;
  color: #f0c048;
}

/* 思考动画 */
.thinking-dot {
  display: flex;
  gap: 6rpx;
}

.dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #f0c048;
  animation: blink 1.2s infinite;
}

.d1 { animation-delay: 0s; }
.d2 { animation-delay: 0.3s; }
.d3 { animation-delay: 0.6s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.2); }
}

/* 庄家/盲注标记 */
.dealer-btn, .blind-btn {
  position: absolute;
  top: -14rpx;
  right: -14rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  font-size: 16rpx;
  font-weight: 800;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dealer-btn {
  background: #4a90d9;
}

.blind-btn {
  background: #48bb78;
  top: -14rpx;
  left: -14rpx;
  right: auto;
  font-size: 14rpx;
}

/* ========== 我的手牌 ========== */
.my-hand-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30rpx;
  padding: 20rpx 30rpx;
}

.my-cards {
  display: flex;
  gap: 16rpx;
}

.my-card {
  width: 100rpx;
  height: 140rpx;
  background: #fff;
  border-radius: 14rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.5);
}

.my-card.hearts, .my-card.diamonds { color: #e53e3e; }
.my-card.spades, .my-card.clubs { color: #1a202c; }

.my-card .card-rank {
  font-size: 34rpx;
  font-weight: 900;
}

.my-card .card-suit-icon {
  font-size: 36rpx;
}

.my-info {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.my-bet-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bet-label {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.45);
}

.bet-amount {
  font-size: 30rpx;
  font-weight: 700;
  color: #f0c048;
}

/* ========== 行动按钮区域 ========== */
.action-area {
  padding: 20rpx 24rpx;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1rpx solid rgba(255, 255, 255, 0.06);
}

.bet-slider-row {
  margin-bottom: 20rpx;
}

.slider-label {
  font-size: 22rpx;
  color: #f0c048;
  margin-bottom: 10rpx;
  display: block;
}

.action-btns {
  display: flex;
  gap: 14rpx;
}

.action-btn {
  flex: 1;
  height: 76rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fold-btn {
  background: rgba(252, 129, 129, 0.15);
  color: #fc8181;
  border: 1rpx solid rgba(252, 129, 129, 0.3);
}

.check-btn, .call-btn {
  background: rgba(72, 187, 120, 0.15);
  color: #68d391;
  border: 1rpx solid rgba(72, 187, 120, 0.3);
}

.raise-btn {
  background: rgba(240, 192, 72, 0.15);
  color: #f0c048;
  border: 1rpx solid rgba(240, 192, 72, 0.3);
}

.allin-btn {
  background: rgba(183, 148, 244, 0.15);
  color: #b794f4;
  border: 1rpx solid rgba(183, 148, 244, 0.3);
}

/* ========== 等待提示 ========== */
.waiting-tip {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
}

.wait-dot-row {
  display: flex;
  gap: 10rpx;
}

.wait-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: blink 1.4s infinite;
}

.wd1 { animation-delay: 0s; }
.wd2 { animation-delay: 0.25s; }
.wd3 { animation-delay: 0.5s; }

.wait-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}

/* ========== 游戏日志 ========== */
.game-log {
  flex: 1;
  padding: 16rpx 28rpx;
  max-height: 150rpx;
  overflow-y: auto;
}

.log-item {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.35);
  padding: 6rpx 0;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.04);
}

/* ========== 开始游戏遮罩 ========== */
.start-mask {
  position: fixed;
  inset: 0;
  background: rgba(5, 13, 5, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.start-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(240, 192, 72, 0.3);
  border-radius: 36rpx;
  padding: 60rpx 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
  width: 560rpx;
}

.start-icon {
  font-size: 90rpx;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14rpx); }
}

.start-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #f0c048;
  letter-spacing: 6rpx;
}

.start-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
}

.start-game-btn {
  width: 100%;
  height: 90rpx;
  background: linear-gradient(135deg, #c8a020, #f0c048, #e07800);
  color: #1a1008;
  font-size: 32rpx;
  font-weight: 800;
  border-radius: 45rpx;
  border: none;
  box-shadow: 0 10rpx 30rpx rgba(240, 192, 72, 0.35);
  letter-spacing: 4rpx;
}

.start-rule-link {
  font-size: 24rpx;
  color: rgba(240, 192, 72, 0.6);
  text-decoration: underline;
}
</style>