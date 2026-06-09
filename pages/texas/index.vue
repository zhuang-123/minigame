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
        <view v-if="myCards.length === 0" class="my-card placeholder">
          <text class="placeholder-text">等待发牌</text>
        </view>
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
        <view class="my-bet-info" v-if="myStateLabel">
          <text class="bet-label">状态</text>
          <text class="bet-amount">{{ myStateLabel }}</text>
        </view>
      </view>
    </view>

    <!-- 下注控制区域 -->
    <view class="action-area" v-if="isMyTurn && gameState === 'playing'">
      <view class="bet-slider-row" v-if="showBetSlider">
        <text class="slider-label">{{ raiseLabel }}：{{ betAmount }}</text>
        <slider
          :min="raiseMin"
          :max="raiseMax"
          :value="betAmount"
          @change="onSliderChange"
          block-size="28"
          activeColor="#f0c048"
          backgroundColor="rgba(255,255,255,0.1)"
        />
        <view class="bet-confirm-row">
          <button class="action-btn raise-btn" @tap="confirmRaise">确认 {{ raiseLabel }}</button>
          <button class="action-btn fold-btn" @tap="cancelRaise">取消</button>
        </view>
      </view>
      <view class="action-btns" v-else>
        <button class="action-btn fold-btn" @tap="onFold">弃牌</button>
        <button class="action-btn check-btn" v-if="canCheck" @tap="onCheck">过牌</button>
        <button class="action-btn call-btn" v-else @tap="onCall">跟注 {{ callAmount }}</button>
        <button class="action-btn raise-btn" @tap="openRaise">{{ raiseLabel }}</button>
        <button class="action-btn allin-btn" @tap="onAllIn">全下</button>
      </view>
    </view>

    <!-- 等待提示（非我的回合） -->
    <view class="waiting-tip" v-else-if="gameState === 'playing' || gameState === 'showdown'">
      <view class="wait-dot-row">
        <view class="wait-dot wd1"></view>
        <view class="wait-dot wd2"></view>
        <view class="wait-dot wd3"></view>
      </view>
      <text class="wait-text">{{ gameState === 'showdown' ? '摊牌中...' : '等待 ' + (currentPlayerName || '其他玩家') + ' 行动...' }}</text>
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

    <!-- 摊牌结算遮罩（旧版，由game_state的showdown阶段触发） -->
    <!-- <view class="start-mask" v-if="gameState === 'showdown' && showdownInfo.show">
      <view class="start-card">
        <view class="start-icon">🏆</view>
        <view class="start-title">本手结算</view>
        <view class="start-desc">{{ showdownInfo.text }}</view>
        <button class="start-game-btn" @tap="continueGame">继续</button>
      </view>
    </view> -->

    <!-- 比赛结果弹窗（type=game_result） -->
    <view class="result-mask" v-if="resultVisible">
      <view class="result-container">
        <!-- 标题 -->
        <view class="result-header">
          <text style="font-size: 50rpx;">🏆</text>
          <text class="result-header-title">本手结算</text>
        </view>

        <!-- 可滚动内容区 -->
        <scroll-view scroll-y class="result-body">
          <!-- 公共牌 -->
          <view class="result-block" v-if="resultCommunityCards.length > 0">
            <text class="result-block-title">公共牌</text>
            <view class="result-cards-row">
              <view
                v-for="(card, ci) in resultCommunityCards"
                :key="'cc'+ci"
                class="result-poker"
                :style="{ color: (card.suit === '♥' || card.suit === '♦') ? '#e53e3e' : '#1a202c' }"
              >
                <text class="result-poker-rank">{{ displayRank(card.rank) }}</text>
                <text class="result-poker-suit">{{ card.suit }}</text>
              </view>
            </view>
          </view>

          <!-- 总池 -->
          <view class="result-pot-bar">
            <text class="result-pot-label">总底池</text>
            <text class="result-pot-value">{{ resultTotalPot }}</text>
          </view>

          <!-- 底池分配 -->
          <view class="result-block" v-if="resultPots.length > 0">
            <text class="result-block-title">底池分配</text>
            <view v-for="(pot, pi) in resultPots" :key="'pot'+pi" class="result-pot-item">
              <view class="result-pot-row">
                <text class="result-pot-name">{{ pot.index === 0 ? '主池' : '边池' + pot.index }}</text>
                <text class="result-pot-amount">{{ pot.amount }}</text>
              </view>
              <view class="result-pot-winners">
                <text v-for="(wid, wi) in pot.winners" :key="'pw'+wi" class="result-winner-tag">
                  {{ playerNameById(wid) }} +{{ pot.winnerCut }}
                </text>
              </view>
            </view>
          </view>

          <!-- 玩家详情 -->
          <view class="result-block" v-if="resultPlayers.length > 0">
            <text class="result-block-title">玩家详情</text>
            <view
              v-for="(p, pi) in resultPlayers"
              :key="'p'+pi"
              class="result-player"
              :class="{ 'player-win': p.isWinner, 'player-me': p.name === myName }"
            >
              <!-- 名字行 -->
              <view class="result-player-top">
                <view class="result-player-name-row">
                  <text v-if="p.isWinner" class="result-star">★</text>
                  <text class="result-player-name">{{ p.name }}</text>
                  <text class="result-player-state">{{ p.state }}</text>
                </view>
                <view class="result-player-chips-box">
                  <text class="result-player-chips-label">筹码</text>
                  <text class="result-player-chips-value">{{ p.chipsAfter }}</text>
                </view>
              </view>

              <!-- 底牌 + 牌型 -->
              <view class="result-player-cards" v-if="p.holeCards.length > 0">
                <view
                  v-for="(c, ci) in p.holeCards"
                  :key="'hc'+ci"
                  class="result-poker result-poker-sm"
                  :style="{ color: (c.suit === '♥' || c.suit === '♦') ? '#e53e3e' : '#1a202c' }"
                >
                  <text class="result-poker-rank">{{ displayRank(c.rank) }}</text>
                  <text class="result-poker-suit">{{ c.suit }}</text>
                </view>
                <text v-if="p.handRank" class="result-hand-rank">{{ p.handRank }}</text>
              </view>

              <!-- 最佳牌型 -->
              <view class="result-best-hand" v-if="p.handCards.length > 0">
                <text class="result-best-hand-label">最佳牌型</text>
                <view class="result-cards-row">
                  <view
                    v-for="(c, ci) in p.handCards"
                    :key="'bc'+ci"
                    class="result-poker result-poker-xs"
                    :style="{ color: (c.suit === '♥' || c.suit === '♦') ? '#e53e3e' : '#1a202c' }"
                  >
                    <text class="result-poker-rank">{{ displayRank(c.rank) }}</text>
                    <text class="result-poker-suit">{{ c.suit }}</text>
                  </view>
                </view>
              </view>

              <!-- 投入/赢得/净变化 -->
              <view class="result-stats">
                <view class="result-stat">
                  <text class="result-stat-label">投入</text>
                  <text class="result-stat-val">{{ p.totalBet }}</text>
                </view>
                <view class="result-stat">
                  <text class="result-stat-label">赢得</text>
                  <text class="result-stat-val stat-win">{{ p.won }}</text>
                </view>
                <view class="result-stat">
                  <text class="result-stat-label">净变化</text>
                  <text class="result-stat-val" :class="p.netChange >= 0 ? 'stat-win' : 'stat-lose'">
                    {{ p.netChange >= 0 ? '+' : '' }}{{ p.netChange }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- 固定底部按钮 -->
        <view class="result-footer">
          <button class="start-game-btn" @tap="closeResult">继续</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import websocketService from '../../common/websocket';

// 游戏状态字符串（来自服务端 GetGameStateString）→ 前端阶段分类
const STATE_TO_STAGE = {
  '初始化': 'init',
  '发底牌': 'preflop',
  '底牌圈下注': 'preflop',
  '翻牌圈': 'flop',
  '翻牌圈下注': 'flop',
  '转牌圈': 'turn',
  '转牌圈下注': 'turn',
  '河牌圈': 'river',
  '河牌圈下注': 'river',
  '摊牌': 'showdown',
  '结算': 'showdown',
  '下一局': 'preflop'
};

const SUIT_MAP = {
  '♠': { cls: 'spades', icon: '♠' },
  '♥': { cls: 'hearts', icon: '♥' },
  '♦': { cls: 'diamonds', icon: '♦' },
  '♣': { cls: 'clubs', icon: '♣' }
};

// 服务端 rank "T" 显示为 "10"
const RANK_DISPLAY = { 'T': '10' };

const SMALL_BLIND = 10;
const BIG_BLIND = 20;
const INITIAL_CHIPS = 1000;

export default {
  data() {
    return {
      // 游戏状态：waiting / matching / ready / playing / showdown
      gameState: 'waiting',
      // 匹配状态
      matchState: {
        status: 'idle',
        players: [],
        readyPlayers: []
      },
      // 当前阶段名称
      stageName: '底牌圈',
      // 底池筹码
      pot: 0,
      // 我的筹码
      myChips: INITIAL_CHIPS,
      // 我的当前轮下注
      myBet: 0,
      // 我的状态文本
      myStateLabel: '',
      // 是否是我的回合
      isMyTurn: false,
      // 是否可以过牌（无人下注时）
      canCheck: true,
      // 跟注需要的金额
      callAmount: 0,
      // 当前下注圈最高下注
      highestBet: 0,
      // 是否处于"无人下注"局面（决定按钮显示 加注/下注）
      noBetYet: true,
      // 当前下注额（滑块）
      betAmount: BIG_BLIND,
      // 滑块最小值
      raiseMin: BIG_BLIND,
      // 滑块最大值
      raiseMax: INITIAL_CHIPS,
      // 是否展示下注滑块
      showBetSlider: false,
      // 公共牌（5张占位）
      communityCards: [
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' },
        { visible: false, rank: '', suit: '', suitIcon: '' }
      ],
      // 我的手牌（2张）
      myCards: [],
      // 对手列表
      opponents: [],
      // 当前行动玩家名
      currentPlayerName: '',
      // 我的玩家名（来自存储或随机）
      myName: '',
      // 上一手观察到的玩家筹码（用于检测结算变化）
      prevChipsByName: {},
      // 摊牌结算信息
      showdownInfo: {
        show: false,
        text: ''
      },
      // 是否已经收到过 game_start
      gameStarted: false,
      // 游戏日志
      logs: [],
      // game_result 结算弹窗
      resultVisible: false,
      resultCommunityCards: [],
      resultPots: [],
      resultPlayers: [],
      resultWinners: [],
      resultTotalPot: 0
    };
  },

  computed: {
    // "加注" or "下注"（无人下注时）
    raiseLabel() {
      return this.noBetYet ? '下注' : '加注';
    }
  },

  // 页面生命周期
  onLoad() {
    this.myName = uni.getStorageSync('user_name') || ('玩家' + Math.floor(Math.random() * 10000));
    uni.setStorageSync('user_name', this.myName);
    uni.$on('websocketMessage', this.handleWebSocketMessage);
    uni.$on('websocketClose', this.handleWebSocketClose);
  },

  onUnload() {
    uni.$off('websocketMessage', this.handleWebSocketMessage);
    uni.$off('websocketClose', this.handleWebSocketClose);
    websocketService.disconnect();
  },

  methods: {
    // 前往规则页
    goToRule() {
      uni.navigateTo({ url: '/pages/texas/rule' });
    },

    // 开始游戏（连接服务器并加入匹配队列）
    startGame() {
      const userId = uni.getStorageSync('user_id') || ('guest_' + Math.floor(Math.random() * 100000));
      uni.setStorageSync('user_id', userId);

      websocketService.connect(userId, 'ws://localhost:8887/ws').then(() => {
        const joinMessage = { type: 'join', player: this.myName };
        websocketService.sendMessage(JSON.stringify(joinMessage));

        this.gameState = 'matching';
        this.matchState = {
          status: 'matching',
          players: [{ name: this.myName, avatar: this.getAvatar(0), ready: false }],
          readyPlayers: []
        };
        this.logs = ['正在连接服务器...', '已加入匹配队列'];
        uni.showToast({ title: '已连接服务器，正在寻找对手...', icon: 'none' });
      }).catch(() => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
      });
    },

    // 准备开始
    readyGame() {
      const readyMessage = { type: 'ready', player: this.myName };
      websocketService.sendMessage(JSON.stringify(readyMessage));
      this.gameState = 'ready';
      // 本地标记自己已准备
      const me = this.matchState.players.find(p => p.name === this.myName);
      if (me) me.ready = true;
      this.logs.unshift('你已准备就绪');
      uni.showToast({ title: '已准备就绪，等待其他玩家...', icon: 'none' });
    },

    // 取消匹配
    cancelMatch() {
      const cancelMessage = { type: 'cancel_match', player: this.myName };
      websocketService.sendMessage(JSON.stringify(cancelMessage));
      this.gameState = 'waiting';
      this.matchState = { status: 'idle', players: [], readyPlayers: [] };
      websocketService.disconnect();
      uni.showToast({ title: '已取消匹配', icon: 'none' });
    },

    // 取消准备
    cancelReady() {
      const cancelReadyMessage = { type: 'cancel_ready', player: this.myName };
      websocketService.sendMessage(JSON.stringify(cancelReadyMessage));
      this.gameState = 'matching';
      const me = this.matchState.players.find(p => p.name === this.myName);
      if (me) me.ready = false;
      this.logs.unshift('你已取消准备');
      uni.showToast({ title: '已取消准备', icon: 'none' });
    },

    // 处理 WebSocket 消息
    handleWebSocketMessage(message) {
      if (!message || !message.type) return;
      switch (message.type) {
        case 'match_state':
          this.updateMatchState(message);
          break;
        case 'player_ready':
          this.handlePlayerReady(message);
          break;
        case 'player_cancel_ready':
          this.handlePlayerCancelReady(message);
          break;
        case 'game_start':
          this.handleGameStart(message);
          break;
        case 'game_state':
          this.updateGameState(message);
          break;
        case 'game_result':
          this.handleGameResult(message);
          break;
        case 'error':
          uni.showToast({ title: message.message || '操作失败', icon: 'none' });
          this.logs.unshift('错误: ' + (message.message || ''));
          break;
        default:
          break;
      }
    },

    // 匹配状态
    updateMatchState(state) {
      // status 为 "matching" 或 "matched"
      if (state.status === 'matched') {
        // 匹配成功：等待 game_start
        this.matchState.status = 'matched';
        this.logs.unshift('匹配成功，准备开始...');
      } else if (state.status === 'matching') {
        this.matchState.status = 'matching';
        // 服务端在初次 join 时会回一个只含自己的列表，这里只在还没有玩家时填充
        if (Array.isArray(state.players) && state.players.length > 0) {
          state.players.forEach(sp => {
            const exist = this.matchState.players.find(p => p.name === sp.name);
            if (!exist) {
              this.matchState.players.push({
                name: sp.name,
                avatar: this.getAvatar(this.matchState.players.length),
                ready: !!sp.ready
              });
            } else {
              exist.ready = !!sp.ready;
            }
          });
        }
      }
    },

    // 玩家准备
    handlePlayerReady(message) {
      const exist = this.matchState.players.find(p => p.name === message.player);
      if (exist) {
        exist.ready = true;
      } else {
        this.matchState.players.push({
          name: message.player,
          avatar: this.getAvatar(this.matchState.players.length),
          ready: true
        });
      }
      if (message.player !== this.myName) {
        this.logs.unshift(`${message.player} 已准备`);
      }
    },

    handlePlayerCancelReady(message) {
      const exist = this.matchState.players.find(p => p.name === message.player);
      if (exist) exist.ready = false;
      if (message.player !== this.myName) {
        this.logs.unshift(`${message.player} 取消准备`);
      }
    },

    // 游戏开始
    handleGameStart() {
      this.gameStarted = true;
      this.gameState = 'playing';
      this.showdownInfo = { show: false, text: '' };
      this.logs.unshift('🎲 游戏开始！');
      uni.showToast({ title: '游戏开始！', icon: 'none' });
    },

    // 更新游戏状态（核心）
    updateGameState(state) {
      // 阶段
      const stage = STATE_TO_STAGE[state.game_state] || 'preflop';
      const wasShowdown = this.gameState === 'showdown';
      if (stage === 'showdown') {
        this.gameState = 'showdown';
      } else if (this.gameStarted) {
        this.gameState = 'playing';
      }

      this.stageName = state.current_round || this.stageName;

      // 底池
      this.pot = state.pot || 0;
      // 当前下注圈最高下注
      this.highestBet = state.highest_bet || 0;
      this.noBetYet = this.highestBet === 0;

      // 公共牌
      this.updateCommunityCards(state.community_cards || []);

      // 玩家信息
      this.updatePlayers(state.players || []);

      // 当前行动玩家
      this.currentPlayerName = state.current_player || '';
      this.isMyTurn = !!this.currentPlayerName && this.currentPlayerName === this.myName
                      && this.gameState === 'playing';

      // 跟注金额 / 是否能过牌
      this.callAmount = Math.max(0, this.highestBet - this.myBet);
      this.canCheck = this.callAmount === 0;

      // 滑块边界
      this.computeRaiseRange();

      // 阶段日志
      this.appendStageLog(state);

      // 摊牌检测：当进入 showdown 阶段时显示结算信息
      if (stage === 'showdown' && !wasShowdown) {
        this.showShowdown(state);
      }

      // 关闭加注面板（避免轮到下一回合时滑块还开着）
      if (!this.isMyTurn) {
        this.showBetSlider = false;
      }
    },

    // 更新公共牌（始终保持 5 张占位）
    updateCommunityCards(cards) {
      const result = [];
      for (let i = 0; i < 5; i++) {
        const card = cards[i];
        if (card && card.suit) {
          const meta = SUIT_MAP[card.suit] || { cls: 'spades', icon: card.suit };
          result.push({
            visible: true,
            rank: RANK_DISPLAY[card.rank] || card.rank,
            suit: meta.cls,
            suitIcon: meta.icon
          });
        } else {
          result.push({ visible: false, rank: '', suit: '', suitIcon: '' });
        }
      }
      this.communityCards = result;
    },

    // 更新玩家信息（按 name 匹配自己）
    updatePlayers(players) {
      const me = players.find(p => p.name === this.myName);
      if (me) {
        // 检测自己筹码变化（结算时筹码会突变）
        if (this.prevChipsByName[this.myName] !== undefined &&
            this.prevChipsByName[this.myName] !== me.chips) {
          const diff = me.chips - this.prevChipsByName[this.myName];
          if (diff > 0) this.logs.unshift(`你赢得 ${diff} 筹码`);
        }
        this.myChips = me.chips;
        this.myBet = me.round_bet;
        this.myStateLabel = this.translateState(me.state);
        if (Array.isArray(me.hole_cards) && me.hole_cards.length > 0) {
          this.myCards = me.hole_cards.map(c => {
            const meta = SUIT_MAP[c.suit] || { cls: 'spades', icon: c.suit };
            return {
              rank: RANK_DISPLAY[c.rank] || c.rank,
              suit: meta.cls,
              suitIcon: meta.icon
            };
          });
        }
      }

      // 对手列表（按 name 过滤掉自己）
      let oppIndex = 0;
      this.opponents = players
        .filter(p => p.name !== this.myName)
        .map(p => ({
          name: p.name,
          avatar: this.getAvatar(oppIndex++),
          chips: p.chips,
          roundBet: p.round_bet,
          isActive: false, // 在下面更新
          isDealer: !!p.is_button,
          folded: this.isFoldedState(p.state),
          allIn: this.isAllInState(p.state),
          blind: p.is_small_blind ? 'SB' : (p.is_big_blind ? 'BB' : '')
        }));

      // 标记当前行动玩家
      this.opponents.forEach(o => {
        o.isActive = o.name === this.currentPlayerName;
      });

      // 记录筹码快照
      players.forEach(p => { this.prevChipsByName[p.name] = p.chips; });
    },

    // 服务端状态字符串 → 是否弃牌
    isFoldedState(s) { return s === '已弃牌'; },
    isAllInState(s) { return s === 'All-In'; },

    translateState(s) {
      switch (s) {
        case '在局中': return '';
        case '已弃牌': return '已弃牌';
        case 'All-In': return 'ALL IN';
        case '等待中': return '等待';
        default: return '';
      }
    },

    // 阶段切换日志
    appendStageLog(state) {
      const round = state.current_round;
      if (round && round !== this._lastLoggedRound) {
        this._lastLoggedRound = round;
        if (round === '底牌圈') this.logs.unshift('🃏 底牌圈');
        else if (round === '翻牌圈') this.logs.unshift('🌊 翻牌圈');
        else if (round === '转牌圈') this.logs.unshift('🔄 转牌圈');
        else if (round === '河牌圈') this.logs.unshift('🌊 河牌圈');
        else if (round === '摊牌') this.logs.unshift('🃏 摊牌');
      }
    },

    // 计算加注/下注的滑块范围
    computeRaiseRange() {
      // 最大值：等于自己的筹码 + 已投入（实际能加注到的总额上限就是自己当前所有可投入的总和）
      // 但服务端校验是：addAmount = raiseTo - p.RoundBet 不能超过 p.Chips
      // 所以 raiseTo 上限 = p.RoundBet + p.Chips
      const maxTo = this.myBet + this.myChips;

      if (this.noBetYet) {
        // bet：amount 是绝对下注额（不是 raiseTo）；最低 = 大盲
        this.raiseMin = Math.min(BIG_BLIND, this.myChips);
        this.raiseMax = this.myChips;
      } else {
        // raise：raiseTo 至少 = highestBet + bigBlind
        this.raiseMin = Math.min(this.highestBet + BIG_BLIND, maxTo);
        this.raiseMax = maxTo;
      }
      // 校正 betAmount
      if (this.betAmount < this.raiseMin) this.betAmount = this.raiseMin;
      if (this.betAmount > this.raiseMax) this.betAmount = this.raiseMax;
    },

    // 显示摊牌结算信息
    showShowdown(state) {
      const winners = (state.players || []).filter(p => !this.isFoldedState(p.state));
      const text = winners.length === 1
        ? `${winners[0].name} 赢得本手`
        : '本手结束，正在结算...';
      this.showdownInfo = { show: true, text };
    },

    // 摊牌后继续 → 服务端会自动进入下一手，前端只关掉遮罩等待新的 game_state
    continueGame() {
      this.showdownInfo = { show: false, text: '' };
    },

    // 处理 game_result 消息
    handleGameResult(message) {
      console.log('收到 game_result 原始消息:', JSON.stringify(message));

      // 直接设置独立属性，避免嵌套对象的 Vue 2 响应式问题
      this.resultCommunityCards = (message.community_cards || []).map(c => ({
        suit: c.suit || '',
        rank: c.rank || ''
      }));

      this.resultPots = (message.pots || []).map(pot => ({
        index: pot.index || 0,
        amount: pot.amount || 0,
        eligible: pot.eligible || [],
        winners: pot.winners || [],
        winnerCut: pot.winner_cut || 0
      }));

      this.resultPlayers = (message.players || []).map(p => ({
        id: p.id || '',
        name: p.name || '',
        state: p.state || '',
        holeCards: p.hole_cards || [],
        handRank: p.hand_rank || '',
        handCards: p.hand_cards || [],
        totalBet: typeof p.total_bet === 'number' ? p.total_bet : 0,
        won: typeof p.won === 'number' ? p.won : 0,
        netChange: typeof p.net_change === 'number' ? p.net_change : 0,
        chipsAfter: typeof p.chips_after === 'number' ? p.chips_after : 0,
        isWinner: !!p.is_winner
      }));

      this.resultWinners = message.winners || [];
      this.resultTotalPot = typeof message.total_pot === 'number' ? message.total_pot : 0;
      this.resultVisible = true;

      console.log('设置完成 - 社区牌:', this.resultCommunityCards.length,
        '底池:', this.resultPots.length,
        '玩家:', this.resultPlayers.length,
        '总额:', this.resultTotalPot);

      this.logs.unshift('🏆 本手结算');
    },

    // 关闭结算弹窗
    closeResult() {
      this.resultVisible = false;
      this.resultCommunityCards = [];
      this.resultPots = [];
      this.resultPlayers = [];
      this.resultWinners = [];
      this.resultTotalPot = 0;
    },

    // 通过玩家ID获取玩家名称
    playerNameById(id) {
      const p = this.resultPlayers.find(p => p.id === id);
      return p ? p.name : id;
    },

    // 获取牌的花色CSS类
    cardSuitClass(suit) {
      if (!suit) return 'spades';
      const map = { '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' };
      return map[suit] || 'spades';
    },

    // 显示牌面值（T转换为10）
    displayRank(rank) {
      return rank === 'T' ? '10' : rank;
    },

    // 玩家状态的CSS类
    stateClass(state) {
      if (!state) return '';
      if (state === '已弃牌') return 'folded';
      if (state === 'All-In') return 'allin';
      return '';
    },

    // 头像
    getAvatar(index) {
      const avatars = ['🎭', '🎪', '🎨', '🎯', '🎮', '🎲', '🎰', '🎸'];
      return avatars[index % avatars.length];
    },

    // WebSocket 关闭
    handleWebSocketClose() {
      // 仅在游戏未结束时提示
      if (this.gameState !== 'waiting') {
        uni.showToast({ title: '连接已断开', icon: 'none' });
      }
      this.gameState = 'waiting';
      this.gameStarted = false;
      this.matchState = { status: 'idle', players: [], readyPlayers: [] };
    },

    // ===== 玩家行动 =====
    sendAction(action, amount) {
      const msg = { type: 'player_action', action, amount: amount || 0 };
      websocketService.sendMessage(JSON.stringify(msg));
    },

    onFold() {
      if (!this.isMyTurn) return;
      this.sendAction('fold', 0);
      this.logs.unshift('你 弃牌');
      this.isMyTurn = false;
      this.showBetSlider = false;
    },

    onCheck() {
      if (!this.isMyTurn || !this.canCheck) return;
      this.sendAction('check', 0);
      this.logs.unshift('你 过牌');
      this.isMyTurn = false;
    },

    onCall() {
      if (!this.isMyTurn || this.canCheck) return;
      this.sendAction('call', 0);
      this.logs.unshift(`你 跟注 ${this.callAmount}`);
      this.isMyTurn = false;
    },

    // 打开下注/加注面板
    openRaise() {
      if (!this.isMyTurn) return;
      // 没有筹码可加注 → 直接全下
      if (this.myChips <= 0) {
        this.onAllIn();
        return;
      }
      this.computeRaiseRange();
      this.showBetSlider = true;
    },

    cancelRaise() {
      this.showBetSlider = false;
    },

    confirmRaise() {
      if (!this.isMyTurn) return;
      const amount = this.betAmount;
      if (this.noBetYet) {
        // bet 动作：amount 是绝对下注额
        // 若 amount 等于全部筹码且小于大盲，会被服务端当作 allin 接受（min < chips 才报错）
        this.sendAction('bet', amount);
        this.logs.unshift(`你 下注 ${amount}`);
      } else {
        // raise 动作：amount 是 raiseTo（本轮台面总额）
        this.sendAction('raise', amount);
        this.logs.unshift(`你 加注至 ${amount}`);
      }
      this.showBetSlider = false;
      this.isMyTurn = false;
    },

    onAllIn() {
      if (!this.isMyTurn) return;
      this.sendAction('allin', 0);
      this.logs.unshift(`你 全下 ${this.myChips}`);
      this.isMyTurn = false;
      this.showBetSlider = false;
      uni.showToast({ title: 'ALL IN！', icon: 'none' });
    },

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

.bet-confirm-row {
  display: flex;
  gap: 14rpx;
  margin-top: 14rpx;
}

.my-card.placeholder {
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx dashed rgba(255, 255, 255, 0.2);
  box-shadow: none;
}

.placeholder-text {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.4);
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

/* ========== 比赛结果弹窗 ========== */
.result-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.result-container {
  position: relative;
  width: 600rpx;
  height: 70vh;
  background: #1a2e1a;
  border: 2rpx solid #f0c048;
  border-radius: 24rpx;
  overflow: hidden;
  box-sizing: border-box;
}

/* 标题：绝对定位在顶部 */
.result-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rpx;
  padding: 16rpx 24rpx 12rpx;
  background: #243824;
  border-bottom: 1rpx solid #3a5a3a;
  z-index: 1;
  box-sizing: border-box;
}

.result-header-title {
  font-size: 28rpx;
  font-weight: 800;
  color: #f0c048;
  letter-spacing: 4rpx;
}

/* 滚动区：绝对定位，上下留出标题和按钮的空间 */
.result-body {
  position: absolute;
  top: 90rpx;
  bottom: 90rpx;
  left: 0;
  right: 0;
  padding: 8rpx 16rpx;
  box-sizing: border-box;
}

.result-block {
  margin-bottom: 10rpx;
  width: 100%;
  box-sizing: border-box;
}

.result-block-title {
  display: block;
  font-size: 20rpx;
  font-weight: 700;
  color: #8aaa8a;
  margin-bottom: 6rpx;
  padding-bottom: 4rpx;
  border-bottom: 1rpx solid #3a5a3a;
}

/* 扑克牌 */
.result-cards-row {
  display: flex;
  gap: 4rpx;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.result-poker {
  background: #fff;
  border-radius: 4rpx;
  padding: 4rpx 6rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  flex-shrink: 0;
}

.result-poker-sm {
  padding: 3rpx 5rpx;
}

.result-poker-xs {
  padding: 2rpx 4rpx;
}

.result-poker-rank {
  font-size: 20rpx;
  font-weight: 800;
  line-height: 1.1;
}

.result-poker-sm .result-poker-rank {
  font-size: 16rpx;
}

.result-poker-xs .result-poker-rank {
  font-size: 12rpx;
}

.result-poker-suit {
  font-size: 16rpx;
  line-height: 1.1;
}

.result-poker-sm .result-poker-suit {
  font-size: 12rpx;
}

.result-poker-xs .result-poker-suit {
  font-size: 10rpx;
}

/* 总池 */
.result-pot-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a4a2a;
  border: 1rpx solid #3a6a3a;
  border-radius: 10rpx;
  padding: 10rpx 14rpx;
  margin-bottom: 10rpx;
  width: 100%;
  box-sizing: border-box;
}

.result-pot-label {
  font-size: 20rpx;
  color: #8aaa8a;
  font-weight: 600;
}

.result-pot-value {
  font-size: 28rpx;
  font-weight: 800;
  color: #f0c048;
}

/* 底池分配 */
.result-pot-item {
  background: #243824;
  border: 1rpx solid #3a5a3a;
  border-radius: 8rpx;
  padding: 8rpx 10rpx;
  margin-bottom: 6rpx;
  width: 100%;
  box-sizing: border-box;
}

.result-pot-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rpx;
}

.result-pot-name {
  font-size: 18rpx;
  color: #8aaa8a;
}

.result-pot-amount {
  font-size: 22rpx;
  font-weight: 700;
  color: #f0c048;
}

.result-pot-winners {
  display: flex;
  flex-wrap: wrap;
  gap: 4rpx;
}

.result-winner-tag {
  background: #2a4a2a;
  color: #68d391;
  font-size: 14rpx;
  padding: 2rpx 6rpx;
  border-radius: 6rpx;
  border: 1rpx solid #3a6a3a;
}

/* 玩家卡片 */
.result-player {
  background: #243824;
  border: 1rpx solid #3a5a3a;
  border-radius: 8rpx;
  padding: 10rpx;
  margin-bottom: 8rpx;
  width: 100%;
  box-sizing: border-box;
}

.result-player.player-win {
  background: #3a3a1a;
  border-color: #8a7a2a;
}

.result-player.player-me {
  border-color: #4a8a4a;
  border-width: 2rpx;
}

.result-player-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6rpx;
}

.result-player-name-row {
  display: flex;
  align-items: center;
  gap: 4rpx;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.result-star {
  color: #f0c048;
  font-size: 18rpx;
  flex-shrink: 0;
}

.result-player-name {
  font-size: 20rpx;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
}

.result-player-state {
  font-size: 12rpx;
  padding: 1rpx 4rpx;
  border-radius: 4rpx;
  background: #3a5a3a;
  color: #8aaa8a;
  flex-shrink: 0;
}

.result-player-chips-box {
  text-align: right;
  flex-shrink: 0;
  margin-left: 6rpx;
}

.result-player-chips-label {
  font-size: 10rpx;
  color: #6a8a6a;
  display: block;
}

.result-player-chips-value {
  font-size: 20rpx;
  font-weight: 700;
  color: #f0c048;
}

.result-player-cards {
  display: flex;
  align-items: center;
  gap: 4rpx;
  margin-bottom: 4rpx;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

.result-hand-rank {
  font-size: 16rpx;
  color: #68d391;
  font-weight: 600;
  flex-shrink: 0;
}

.result-best-hand {
  margin-bottom: 4rpx;
  width: 100%;
  box-sizing: border-box;
}

.result-best-hand-label {
  font-size: 12rpx;
  color: #6a8a6a;
  display: block;
  margin-bottom: 2rpx;
}

.result-stats {
  display: flex;
  gap: 8rpx;
  padding-top: 6rpx;
  border-top: 1rpx solid #3a5a3a;
  width: 100%;
  box-sizing: border-box;
}

.result-stat {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.result-stat-label {
  font-size: 12rpx;
  color: #6a8a6a;
  display: block;
}

.result-stat-val {
  font-size: 18rpx;
  font-weight: 700;
  color: #ccc;
}

.stat-win {
  color: #68d391;
}

.stat-lose {
  color: #fc8181;
}

/* 固定底部按钮：绝对定位在底部 */
.result-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8rpx 16rpx 14rpx;
  background: #243824;
  border-top: 1rpx solid #3a5a3a;
  z-index: 1;
  box-sizing: border-box;
}
</style>