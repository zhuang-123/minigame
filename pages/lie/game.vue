<template>
  <view class="game-page">
    <!-- 背景图片 -->
    <image src="/static/liepoker/desk.png" mode="scaleToFill" class="background-image"></image>

    <!-- 玩家信息区域 -->
    <!-- 自己（左下角） -->
    <view class="self-player-area">
      <view class="player-info-card">
        <view class="player-avatar-container">
          <view class="player-avatar" :class="{ 'turn-glow': isSelfTurn }">
            <text class="avatar-icon">🎮</text>
          </view>
        </view>
        <view class="player-stats">
          <view class="player-name">{{ myName }}</view>
          <view class="player-hp">
            <text 
              v-for="(heart, index) in hpHearts" 
              :key="index"
              class="hp-heart"
              :class="{ active: heart.active }"
            >❤</text>
          </view>
          <view class="player-cards">
            <text class="cards-count">{{ myCards.length }}张</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 其他玩家（根据人数动态布局） -->
    <view class="opponents-area" :class="'opponents-' + updatedOpponents.length">
      <view 
        v-for="(opponent, index) in updatedOpponents" 
        :key="index"
        class="opponent-slot"
        :class="'opponent-' + index"
      >
        <view class="opponent-avatar-container">
          <view class="player-avatar" :class="{ 'turn-glow': opponent.name === currentTurnPlayerName }">
            <text class="avatar-icon">🎮</text>
          </view>
          <!-- 其他玩家的叫数显示 -->
          <view 
            v-if="callDisplay.opponents[opponent.name] && callDisplay.opponents[opponent.name].show" 
            class="opponent-call"
          >
            {{ callDisplay.opponents[opponent.name].text }}
          </view>
          <!-- 其他玩家的倒计时显示（轮到其他玩家时显示在头像旁边） -->
          <view 
            v-if="countdown.isRunning && opponent.name === currentTurnPlayerName && !isSelfTurn" 
            class="opponent-countdown"
            :class="{ 'countdown-warning': countdown.remainingTime <= 5 }"
          >
            <text class="countdown-icon">⏱️</text>
            <text class="countdown-number">{{ countdown.remainingTime }}s</text>
          </view>
        </view>
        <view class="player-name">{{ opponent.name }}</view>
        <view class="player-hp">
          <text class="hp-heart" :class="{ active: 1 <= opponent.hp }">❤</text>
          <text class="hp-heart" :class="{ active: 2 <= opponent.hp }">❤</text>
          <text class="hp-heart" :class="{ active: 3 <= opponent.hp }">❤</text>
        </view>
        <view class="player-cards">
          <text class="cards-count">{{ opponent.cards }}张</text>
        </view>
      </view>
    </view>

    <!-- 牌桌区域 -->
    <view class="table-area">
      <!-- 初始52张牌（发牌动画） -->
      <view class="initial-cards" v-if="isDealing">
        <image
          v-for="(card, index) in initialCards"
          :key="index"
          :src="getCardImage('rear')"
          class="initial-card animate"
          :style="{
            animationDelay: (index * 0.05) + 's',
            '--x': card.x,
            '--y': card.y,
            zIndex: 52 - index
          }"
        />
      </view>
      
      <!-- 万能牌 -->
      <view class="wild-card-display" v-if="wildCard && !isDealing">
        <view class="wild-card-label">本局万能牌</view>
        <image 
          :src="getCardImage({ suit: wildCard.suit, rank: wildCard.rank, isWild: true })" 
          class="wild-card-image"
        />
      </view>
      
      <!-- 牌堆 -->
      <view class="card-deck" v-if="!isDealing">
        <image src="/static/liepoker/rear.png" class="deck-image" />
        <view class="deck-count">{{ remainingCards }}</view>
      </view>
      
      <!-- 上家出牌 -->
      <view class="last-play-cards" v-if="lastPlay.type && !isDealing">
        <view class="played-card-container">
          <image 
            :src="getCardImage('rear')" 
            class="played-card"
          />
          <view v-if="lastPlay.cards.length > 1" class="card-count-overlay">
            {{ lastPlay.cards.length }}
          </view>
        </view>
      </view>
    </view>

    <!-- 手牌发放动画区域 - 已移除，只显示屏幕底部自己的手牌 -->
    <!-- <view class="dealing-cards-area" v-if="isDealing">
      <view
        v-for="(card, index) in dealtCards"
        :key="index"
        class="dealing-card"
        :style="{ animationDelay: (index * 0.3) + 's' }"
      >
        <image :src="getCardImage(card)" class="dealing-card-image" />
      </view>
    </view> -->

    <!-- 我的手牌区域 -->
    <view class="my-hand-area">
      <view class="hand-card-container">
        <!-- 自己的叫数显示 -->
        <view 
          v-if="callDisplay.self.show" 
          class="self-call"
        >
          {{ callDisplay.self.text }}
        </view>
        
        <!-- 自己的倒计时显示（轮到自己时显示在手牌上方） -->
        <view 
          v-if="countdown.isRunning && currentTurnPlayerName === myName" 
          class="self-countdown"
          :class="{ 'countdown-warning': countdown.remainingTime <= 5 }"
        >
          <text class="countdown-icon">⏱️</text>
          <text class="countdown-number">{{ countdown.remainingTime }}s</text>
        </view>
        
        <view class="my-cards">
          <view 
            v-for="(card, index) in myCards" 
            :key="index"
            class="my-card"
            :class="{ selected: selectedCards.includes(index) }"
            @tap="selectCard(index)"
          >
            <image :src="getCardImage(card)" class="card-image" />
          </view>
        </view>
      </view>
    </view>

    <!-- 操作区域 -->
    <view class="action-area" v-if="isMyTurn">
      <!-- 出牌操作（我的回合） -->
      <view class="play-section">
        <view class="action-header">
          <text class="action-title">出牌</text>
        </view>
        <view class="card-type-selector" v-if="selectedCards.length === 5">
          <view 
            v-for="type in fiveCardTypes" 
            :key="type.value"
            class="type-option"
            :class="{ active: selectedType === type.value }"
            @tap="selectType(type.value)"
          >
            <text class="type-name">{{ type.name }}</text>
          </view>
        </view>
        <view class="card-value-selector" v-if="selectedType && (selectedType !== 'straight' && selectedType !== 'straight_flush')">
          <view 
            v-for="value in cardValues" 
            :key="value"
            class="value-option"
            :class="{ active: selectedValue === value }"
            @tap="selectValue(value)"
          >
            <text class="value-text">{{ value }}</text>
          </view>
        </view>
        <!-- 顺子选择器 -->
        <view class="straight-selector" v-if="selectedCards.length === 5">
          <view v-if="(selectedType === 'straight' || selectedType === 'straight_flush')">
            <view v-if="possibleStraights.length === 0" class="no-straight">
              <text>没有可能的顺子组合</text>
            </view>
            <view 
              v-for="(straight, index) in possibleStraights" 
              :key="index"
              class="straight-option"
              :class="{ active: selectedValue === straight }"
              @tap="selectValue(straight)"
            >
              <text class="straight-text">{{ straight }}</text>
            </view>
          </view>
        </view>
        <!-- 花色选择器（仅同花顺） -->
        <view class="suit-selector" v-if="selectedType === 'straight_flush'">
          <view class="suit-title">选择花色</view>
          <view class="suit-options">
            <view 
              v-for="suit in cardSuits" 
              :key="suit.value"
              class="suit-option"
              :class="{ active: selectedSuit === suit.value }"
              @tap="selectSuit(suit.value)"
            >
              <text class="suit-text">{{ suit.name }}</text>
            </view>
          </view>
        </view>
        <button 
          class="play-btn" 
          :disabled="!canPlay"
          @tap="playCards"
        >
          出牌
        </button>
      </view>
    </view>
    
    <!-- 选择操作区域（轮到我做出选择） -->
    <view class="action-area" v-if="currentTurnPlayerName === myName && !isMyTurn">
      <view class="choice-section">
        <view class="action-header">
          <text class="action-title">请选择操作</text>
        </view>
        <view class="choice-buttons">
          <button v-if="!isChallengeFailed" class="choice-btn challenge-btn" @tap="challenge">
            质疑
          </button>
          <button class="choice-btn pass-btn" @tap="pass">
            过牌
          </button>
          <button class="choice-btn play-btn" @tap="showPlayOptions">
            接牌
          </button>
        </view>
      </view>
    </view>

    <!-- 退出观看按钮（观看模式时显示） -->
    <view class="watch-exit-area" v-if="isWatching">
      <button class="watch-exit-btn" @tap="exitWatch">退出观看</button>
    </view>

    <!-- 对局情况 / 日志展示不需要：已移除 -->

    <!-- 质疑时亮出的牌 -->
    <view class="challenge-cards-area" v-if="showChallengeCards">
      <view class="challenge-cards-title">亮出的牌</view>
      <view class="challenge-cards-container">
        <image 
          v-for="(card, index) in challengeCards" 
          :key="index"
          :src="getCardImage(card)" 
          class="challenge-card"
        />
      </view>
    </view>

    <!-- 质疑结果提示框 -->
    <view class="challenge-result-toast" v-if="showChallengeResult">
      <view class="toast-content">
        <view class="toast-title">{{ challengeResult.success ? '质疑成功！' : '质疑失败！' }}</view>
        <view class="toast-message">{{ challengeResult.message }}</view>
      </view>
    </view>

    <!-- 玩家出局弹窗 -->
    <view class="eliminated-mask" v-if="playerEliminated">
      <view class="eliminated-card">
        <view class="eliminated-icon">💥</view>
        <view class="eliminated-title">游戏失败</view>
        <view class="eliminated-desc">你的血量已耗尽，遗憾出局！</view>
        <button class="eliminated-btn watch-btn" @tap="stayAndWatch">留下观看</button>
        <button class="eliminated-btn restart-btn" @tap="restartGame">再来一局</button>
      </view>
    </view>
    
    <!-- 游戏结束弹窗 -->
    <view class="end-mask" v-if="gameEnd">
      <view class="end-card">
        <view class="end-icon" :class="{ win: isWinner }">{{ isWinner ? '🏆' : '🎮' }}</view>
        <view class="end-title">{{ isWinner ? '游戏胜利！' : '游戏结束' }}</view>
        
        <!-- 排名列表 -->
        <view class="ranking-list">
          <view class="ranking-title">最终排名</view>
          <view 
            v-for="(item, index) in rankingList" 
            :key="index"
            class="ranking-item"
            :class="{ 'my-rank': item.name === myName }"
          >
            <view class="rank-number">
              <text v-if="index === 0">🥇</text>
              <text v-else-if="index === 1">🥈</text>
              <text v-else-if="index === 2">🥉</text>
              <text v-else>{{ index + 1 }}</text>
            </view>
            <view class="rank-name">{{ item.name }}</view>
            <view class="rank-position">第{{ item.rank }}名</view>
          </view>
        </view>
        
        <button class="end-btn" @tap="restartGame">再来一局</button>
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
      gameStatus: '游戏中',
      // 我的血量
      myHP: 3,
      // 我的名称（展示用）
      myName: '我',
      // 当前回合玩家名称（用于头像发光）
      currentTurnPlayerName: '',
      // 万能牌
      wildCard: { suit: 'SuitSpade', rank: '8' },
      // 对手信息
      opponents: [
        { name: '玩家2', avatar: '🎭', hp: 3, cards: 10 },
        { name: '玩家3', avatar: '🎪', hp: 3, cards: 10 }
      ],
      // 我的手牌
      myCards: ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'],
      // 选中的卡牌
      selectedCards: [],
      // 剩余牌数
      remainingCards: 22,
      // 上家出牌信息
      lastPlay: {
        player: '',
        type: '',
        cards: [],
        declaration: ''
      },
      // 是否是我的回合
      isMyTurn: false,
      // 选中的牌型
      selectedType: '',
      // 选中的牌值
      selectedValue: '',
      // 花色选择（仅同花顺）
      selectedSuit: '',
      // 花色选项
      cardSuits: [
        { value: 'SuitSpade', name: '♠️' },
        { value: 'SuitHeart', name: '♥️' },
        { value: 'SuitDiamond', name: '♦️' },
        { value: 'SuitClub', name: '♣️' }
      ],
      // 游戏日志
      gameLogs: [],
      // 游戏是否结束
      gameEnd: false,
      // 是否获胜
      isWinner: false,
      // 排名列表
      rankingList: [],
      // 结束消息
      endMessage: '',
      // 是否正在观看模式
      isWatching: false,
      // 房间ID
      roomId: '',
      // 玩家ID
      playerId: '',
      // 是否已应用上页传入的 game_start（避免重复覆盖）
      gameStartApplied: false,
      // 质疑时显示的牌
      challengeCards: [],
      // 是否显示质疑时的牌
      showChallengeCards: false,
      // 质疑结果
      challengeResult: {
        success: false,
        message: ''
      },
      // 是否显示质疑结果弹窗
      showChallengeResult: false,
      // 血条更新触发器
      hpUpdateTrigger: 0,
      // 是否是质疑失败后的重新选择
      isChallengeFailed: false,
      // 玩家是否出局
      playerEliminated: false,

      // 牌型选项
      cardTypes: [
        { name: '单张', value: 'single' },
        { name: '对子', value: 'pair' },
        { name: '三条', value: 'triple' },
        { name: '顺子', value: 'straight' },
        { name: '葫芦', value: 'full_house' },
        { name: '炸弹', value: 'bomb' },
        { name: '同花顺', value: 'straight_flush' }
      ],
      // 牌值选项
      cardValues: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      // 发牌动画状态
      isDealing: true,
      // 初始52张牌
      initialCards: Array(52).fill('back').map((_, index) => {
        // 为每张卡牌分配固定的玩家目标位置，确保每张牌准确发放到对应玩家
        let x, y;
        const playerIndex = index % 3; // 假设3个玩家
        
        switch (playerIndex) {
          case 0: // 自己（下方）
            x = 0; // 直接发放到自己的手牌区域
            y = 400; // 固定的下方位置
            break;
          case 1: // 左边玩家
            x = -350; // 固定的左侧位置
            y = 0; // 中间高度
            break;
          case 2: // 右边玩家
            x = 350; // 固定的右侧位置
            y = 0; // 中间高度
            break;
          default:
            x = 0;
            y = 0;
        }
        
        return {
          id: index,
          x: x,
          y: y,
          playerIndex: playerIndex
        };
      }),
      // 正在发放的自己的手牌
      dealtCards: [],
      // 玩家操作消息
      playerActions: [],
      // 叫数显示状态
      callDisplay: {
        self: {
          show: false,
          text: ''
        },
        opponents: {}
      },
      
      // 倒计时相关
      countdown: {
        remainingTime: 0,      // 剩余时间（秒）
        isRunning: false,      // 是否正在倒计时
        timeout: 20,           // 超时时间（秒）
        mustPlay: false        // 是否是必须出牌的状态（your_turn）
      },
      // 当前回合玩家ID（用于匹配头像）
      currentTurnPlayerId: ''
    };
  },
  
  mounted() {
    // 页面加载时初始化手牌
    console.log('页面加载，初始化手牌:', this.myCards);
    console.log('万能牌:', this.wildCard);
    
    // 移除模拟游戏开始消息，使用真实的服务端消息
    console.log('等待服务端发送game_start消息...');
  },
  
  onLoad(options) {
    // 从URL参数中获取playerId
    if (options.playerId !== undefined && options.playerId !== '') {
      this.playerId = options.playerId;
      console.log('从URL参数获取playerId:', this.playerId);
    }
    
    // 从URL参数中获取roomId（特别是重新连接时）
    if (options.roomId !== undefined && options.roomId !== '') {
      this.roomId = options.roomId;
      console.log('从URL参数获取roomId:', this.roomId);
    }

    // 注册 WebSocket 事件监听器
    console.log('在onLoad中注册事件监听器');
    uni.$on('websocketMessage', this.handleWebSocketMessage);
    uni.$on('websocketClose', this.handleWebSocketClose);
    console.log('WebSocket事件监听器注册完成');

    // 回放页面切换期间缓存的消息（避免 game_start 后紧跟 your_turn 时丢失）
    try {
      if (websocketService && typeof websocketService.drainMessageBuffer === 'function') {
        const buffered = websocketService.drainMessageBuffer()
        if (Array.isArray(buffered) && buffered.length > 0) {
          console.log('回放WebSocket缓存消息条数:', buffered.length)
          buffered.forEach((m) => {
            try { this.handleWebSocketMessage(m) } catch (_) {}
          })
        }
      }
    } catch (e) {
      console.warn('回放WebSocket缓存失败:', e)
    }

    // 通过地址参数接收上页传递的手牌，并直接赋值给 myCards
    try {
      // 玩家列表（用于顶部真实玩家名称展示）
      if (options && options.players) {
        const playersDecoded = decodeURIComponent(options.players)
        const players = JSON.parse(playersDecoded)
        if (Array.isArray(players) && players.length > 0) {
          const myId = String(this.playerId || '')
          const me = myId ? (players.find(p => String(p.id) === myId) || null) : null
          if (me) {
            this.myName = me.name || this.myName
            if (me.hp !== undefined && me.hp !== null) this.myHP = me.hp
          } else {
            // 找不到自己的情况下，尝试用缓存昵称兜底
            const storedName = uni.getStorageSync('user_name') || uni.getStorageSync('nickname') || ''
            if (storedName) this.myName = storedName
          }
          this.opponents = players
            .filter(p => !myId || String(p.id) !== myId)
            .map(p => ({
              name: p.name,
              avatar: '🎭',
              hp: p.hp,
              cards: p.cardCount || 0
            }))
        }
      }

      if (!this.gameStartApplied && options && options.myCards) {
        const decoded = decodeURIComponent(options.myCards)
        const cards = JSON.parse(decoded)
        if (Array.isArray(cards) && cards.length > 0) {
          this.myCards = cards.map(c => ({
            suit: c && c.suit !== undefined ? c.suit : 'SuitSpade',
            rank: String(c && c.rank ? c.rank : 'RankA').replace('Rank', '')
          }))
          this.gameStartApplied = true
          console.log('已从地址参数赋值myCards:', this.myCards)

          // 发牌动画
          this.isDealing = true
          this.dealtCards = []
          this.myCards.forEach((c, idx) => {
            setTimeout(() => this.dealtCards.push(c), 500 + idx * 300)
          })
          setTimeout(() => { this.isDealing = false }, 500 + this.myCards.length * 300 + 1000)
        }
      }
      if (options && options.wildCard) {
        const wildDecoded = decodeURIComponent(options.wildCard)
        const wild = JSON.parse(wildDecoded)
        if (wild && wild.suit && wild.rank !== undefined) {
          this.wildCard = {
            suit: wild.suit,
            rank: String(wild.rank).replace('Rank', '')
          }
        }
      }
    } catch (e) {
      console.warn('解析地址参数失败:', e)
    }
    
    // 如果是重新连接，设置游戏状态
      if (options && options.rejoin === '1') {
        console.log('检测到重新连接，设置游戏状态');
        
        // 设置当前回合玩家
        if (options.currentPlayerName) {
          this.currentTurnPlayerName = decodeURIComponent(options.currentPlayerName);
          console.log('当前回合玩家:', this.currentTurnPlayerName);
        }
        
        // 获取上一次出牌玩家信息
        const lastPlayPlayerName = options.lastPlayPlayerName ? decodeURIComponent(options.lastPlayPlayerName) : '';
        
        // 设置上一次出牌信息（如果有）
        const declaredType = options.declaredType ? decodeURIComponent(options.declaredType) : '';
        const declaredRank = options.declaredRank ? decodeURIComponent(options.declaredRank) : '';
        const tableCardsCount = parseInt(options.tableCardsCount) || 0;
        
        if (declaredType && declaredRank) {
          // 使用上一次出牌玩家作为lastPlay的player
          const playPlayerName = lastPlayPlayerName || this.currentTurnPlayerName;
          this.lastPlay = {
            player: playPlayerName,
            type: declaredType,
            cards: Array(tableCardsCount).fill('?'),
            declaration: this.getDeclarationText(declaredType, declaredRank)
          };
          
          console.log('上一次出牌信息:', this.lastPlay);
          
          // 如果上一次出牌的玩家是其他玩家，显示红色叫牌提示框
          if (playPlayerName && playPlayerName !== this.myName) {
            const declaration = this.getDeclarationText(declaredType, declaredRank);
            if (!this.callDisplay.opponents[playPlayerName]) {
              this.callDisplay.opponents[playPlayerName] = {};
            }
            this.callDisplay.opponents[playPlayerName] = {
              show: true,
              text: declaration
            };
            console.log('显示其他玩家叫牌提示:', playPlayerName, declaration);
          }
          
          // 如果当前轮到自己，且已经有出牌，应该显示选择操作（质疑/过牌/接牌）
          if (this.currentTurnPlayerName === this.myName) {
            this.isMyTurn = false; // 不是出牌阶段，而是选择操作阶段
            console.log('当前轮到自己选择操作（质疑/过牌/接牌）');
          }
        } else {
          // 没有出牌信息，说明是新回合，轮到自己时应该出牌
          if (this.currentTurnPlayerName === this.myName) {
            this.isMyTurn = true;
            console.log('当前轮到自己出牌');
          }
        }
      }
    
    // 游戏页面不需要重新连接WebSocket，直接使用现有的连接
    this.gameLogs.unshift('正在进入游戏...');
  },
  
  computed: {
    // 是否可以出牌
    canPlay() {
      const cardCount = this.selectedCards.length;
      const isStraightType = this.selectedType === 'straight' || this.selectedType === 'straight_flush';
      const isStraightFlush = this.selectedType === 'straight_flush';
      return cardCount > 0 && cardCount <= 5 && this.selectedType && this.selectedValue && (!isStraightFlush || this.selectedSuit);
    },
    // 生成所有可能的顺子组合
    possibleStraights() {
      if (this.selectedCards.length !== 5) {
        return [];
      }
      
      const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      
      // 生成所有可能的5张连续点数组合
      const possibleStraights = [];
      for (let i = 0; i <= valueOrder.length - 5; i++) {
        const straight = valueOrder.slice(i, i + 5);
        possibleStraights.push(straight.join(' '));
      }
      
      return possibleStraights;
    },
    // 5张牌的牌型选项
    fiveCardTypes() {
      return this.cardTypes.filter(t => ['straight', 'full_house', 'straight_flush'].includes(t.value));
    },
    isSelfTurn() {
      return !!this.currentTurnPlayerName && this.currentTurnPlayerName === this.myName;
    },
    // 生成血条HTML
    hpHearts() {
      console.log('生成血条，当前血量:', this.myHP);
      return Array(3).fill(0).map((_, index) => {
        const heartIndex = index + 1;
        return {
          index: heartIndex,
          active: heartIndex <= this.myHP
        };
      });
    },
    // 获取更新后的对手列表
    updatedOpponents() {
      console.log('计算updatedOpponents，opponents:', JSON.parse(JSON.stringify(this.opponents)));
      return this.opponents;
    }
  },
  
  methods: {
    // 启动倒计时
    startCountdown(timeout = 20, mustPlay = false) {
      // 先停止之前的倒计时
      this.stopCountdown();
      
      this.countdown.timeout = timeout;
      this.countdown.remainingTime = timeout;
      this.countdown.isRunning = true;
      this.countdown.mustPlay = mustPlay;
      
      this.countdownTimer = setInterval(() => {
        this.countdown.remainingTime--;
        if (this.countdown.remainingTime <= 0) {
          // 在停止倒计时之前先检查是否需要自动出牌
          const needAutoPlay = this.countdown.mustPlay && this.isSelfTurn && this.myCards.length > 0;
          this.stopCountdown();
          // 如果是必须出牌的状态，超时自动出第一张牌
          if (needAutoPlay) {
            this.autoPlayFirstCard();
          }
        }
      }, 1000);
    },
    
    // 停止倒计时
    stopCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
      this.countdown.isRunning = false;
      this.countdown.remainingTime = 0;
      this.countdown.mustPlay = false;
    },
    
    // 自动出第一张牌（超时自动出牌）
    autoPlayFirstCard() {
      if (this.myCards.length === 0) {
        return;
      }
      
      console.log('超时自动出牌，出第一张牌');
      
      // 选择第一张牌
      const firstCard = this.myCards[0];
      const cardIndex = 0;
      const declaredRank = 'Rank' + firstCard.rank;
      const declaredType = 'single';
      
      // 发送出牌消息
      const playMessage = {
        Type: 'play',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId,
          cardIndices: [cardIndex],
          declaredType: declaredType,
          declaredRank: declaredRank,
          declaredSuit: firstCard.suit,
          declaredStraight: ''
        }
      };
      
      if (websocketService && typeof websocketService.sendMessage === 'function') {
        websocketService.sendMessage(JSON.stringify(playMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
        return;
      }
      
      // 显示自己的叫数
      const declaration = `单张 ${firstCard.rank}`;
      this.callDisplay.self = {
        show: true,
        text: declaration
      };
      
      // 隐藏亮牌
      this.showChallengeCards = false;
      this.challengeCards = [];
      
      // 更新本地状态
      const message = `你超时未操作，系统自动出了: ${declaration}`;
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
      
      this.selectedCards = [];
      this.selectedType = '';
      this.selectedValue = '';
      this.isMyTurn = false;
      
      uni.showToast({ title: '超时未操作，系统自动出牌', icon: 'none' });
    },
    
    // 将服务端 game_start 消息应用到对局状态（根据自己的 playerId 展示真实手牌）
    applyGameStartMessage(message) {
      try {
        if (this.gameStartApplied) return;
        if (!message || !message.content) return;

        const content = message.content;
        const players = Array.isArray(content.players) ? content.players : [];

        // 用 URL 传入的 playerId 精确定位自己
        const myId = String(this.playerId || '');
        let myInfo = null;
        if (myId) {
          myInfo = players.find(p => String(p.id) === myId) || null;
        }

        // 若仍找不到，尝试用 storage 里的 user_name/name 做匹配（防止 playerId 丢失）
        if (!myInfo) {
          const storedName = uni.getStorageSync('user_name') || uni.getStorageSync('nickname') || '';
          if (storedName) {
            myInfo = players.find(p => String(p.name) === String(storedName)) || null;
          }
        }

        // 更新房间与万能牌
        if (content.room_id) this.roomId = content.room_id;
        if (content.wildCard) {
          this.wildCard = {
            suit: content.wildCard.suit,
            rank: String(content.wildCard.rank || '').replace('Rank', '')
          };
        }

        // 更新对手信息（排除自己）
        this.opponents = players
          .filter(p => !myId || String(p.id) !== myId)
          .map(p => ({
            name: p.name,
            avatar: '🎭',
            hp: p.hp,
            cards: p.cardCount || (p.cards ? p.cards.length : 0)
          }));

        // 应用自己的真实手牌
        if (myInfo && Array.isArray(myInfo.cards) && myInfo.cards.length > 0) {
          this.myCards = myInfo.cards.map(card => ({
            suit: card && card.suit !== undefined ? card.suit : 'SuitSpade',
            rank: String(card && card.rank ? card.rank : 'RankA').replace('Rank', '')
          }));
          this.myHP = myInfo.hp;
          console.log('已根据playerId应用真实手牌:', this.playerId, this.myCards);
          this.gameStartApplied = true;
        } else {
          console.warn('未找到自己的真实手牌（playerId匹配失败或cards为空）:', this.playerId);
        }

        // 牌数：默认按 52 - N*10（若服务端没给 remaining）
        const n = players.length || 3;
        this.remainingCards = 52 - n * 10;

        // 开始发牌动画（使用 myInfo.cards / myCards）
        this.isDealing = true;
        this.dealtCards = [];
        const cardsForDeal = (myInfo && Array.isArray(myInfo.cards) && myInfo.cards.length > 0)
          ? myInfo.cards.map(card => ({
              suit: card && card.suit !== undefined ? card.suit : 'SuitSpade',
              rank: String(card && card.rank ? card.rank : 'RankA').replace('Rank', '')
            }))
          : (Array.isArray(this.myCards) ? this.myCards : []);

        if (cardsForDeal.length > 0) {
          cardsForDeal.forEach((c, idx) => {
            setTimeout(() => this.dealtCards.push(c), 500 + idx * 300);
          });
          setTimeout(() => { this.isDealing = false; }, 500 + cardsForDeal.length * 300 + 1000);
        } else {
          // 没有手牌数据就直接结束动画
          setTimeout(() => { this.isDealing = false; }, 800);
        }

        this.gameLogs.unshift('游戏开始！');
        if (this.wildCard && this.wildCard.rank) this.gameLogs.unshift(`万能牌：${this.wildCard.rank}`);
      } catch (e) {
        console.error('applyGameStartMessage失败:', e);
      }
    },

    // 开始发牌动画
    startDealAnimation() {
      this.isDealing = true;

      // 动画结束后设置为非发牌状态
      const delayTime = 3000; // 3秒动画时间
      setTimeout(() => {
        this.isDealing = false;
      }, delayTime);
    },
    // 选择卡牌
    selectCard(index) {
      const cardIndex = this.selectedCards.indexOf(index);
      if (cardIndex > -1) {
        this.selectedCards.splice(cardIndex, 1);
      } else {
        this.selectedCards.push(index);
      }
      
      // 根据选择的牌数自动设置牌型
      const cardCount = this.selectedCards.length;
      if (cardCount === 1) {
        this.selectedType = 'single';
      } else if (cardCount === 2) {
        this.selectedType = 'pair';
      } else if (cardCount === 3) {
        this.selectedType = 'triple';
      } else if (cardCount === 4) {
        this.selectedType = 'bomb';
      } else if (cardCount === 5) {
        // 5张牌默认选择顺子
        this.selectedType = 'straight';
      } else {
        // 其他牌数清空牌型
        this.selectedType = '';
      }
    },
    
    // 选择牌型
    selectType(type) {
      this.selectedType = type;
    },
    
    // 选择牌值
    selectValue(value) {
      this.selectedValue = value;
    },
    // 选择花色
    selectSuit(suit) {
      this.selectedSuit = suit;
    },
    
    // 出牌
    playCards() {
      // 验证牌型
      if (!this.validatePlay()) {
        uni.showToast({ title: '牌型不符合要求', icon: 'none' });
        return;
      }
      
      // 构建出牌信息
      const cardIndices = this.selectedCards;
      
      // 对于顺子和同花顺，处理selectedValue
      let declaredRank = 'Rank' + this.selectedValue;
      let declaredStraight = '';
      if (this.selectedType === 'straight' || this.selectedType === 'straight_flush') {
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let maxRank;
        
        // 如果selectedValue是顺子字符串（如"2 3 4 5 6"）
        if (this.selectedValue.includes(' ')) {
          const straightRanks = this.selectedValue.split(' ');
          maxRank = straightRanks[straightRanks.length - 1];
          declaredStraight = this.selectedValue;
        } else {
          // 否则使用默认值
          maxRank = 'A';
          declaredStraight = 'A';
        }
        
        declaredRank = 'Rank' + maxRank;
        // 不要修改this.selectedValue，这样getDeclaration方法就可以显示完整的顺子组合
      }
      
      // 对于同花顺，处理selectedSuit
      let declaredSuit = '';
      if (this.selectedType === 'straight_flush' && this.selectedSuit) {
        declaredSuit = this.selectedSuit;
      }
      
      // 发送出牌消息
      const playMessage = {
        Type: 'play',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId,
          cardIndices: cardIndices,
          declaredType: this.selectedType,
          declaredRank: declaredRank,
          declaredSuit: declaredSuit,
          declaredStraight: declaredStraight
        }
      };
      if (websocketService && typeof websocketService.sendMessage === 'function') {
        websocketService.sendMessage(JSON.stringify(playMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }
      
      // 停止倒计时
      this.stopCountdown();
      
      // 显示自己的叫数
      const declaration = this.getDeclaration();
      this.callDisplay.self = {
        show: true,
        text: declaration
      };
      
      // 隐藏亮牌
      this.showChallengeCards = false;
      this.challengeCards = [];
      
      // 更新本地状态
      const message = `你出了: ${declaration}`;
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
      // 从手牌中移除出的牌
      this.myCards = this.myCards.filter((_, index) => !this.selectedCards.includes(index));
      this.selectedCards = [];
      this.selectedType = '';
      this.selectedValue = '';
      this.isMyTurn = false;
    },
    
    // 验证牌型
    validatePlay() {
      const cardCount = this.selectedCards.length;
      
      // 验证牌型是否正确
      let isValidType = false;
      switch (this.selectedType) {
        case 'single':
          isValidType = cardCount === 1;
          break;
        case 'pair':
          isValidType = cardCount === 2;
          break;
        case 'triple':
          isValidType = cardCount === 3;
          break;
        case 'straight':
          isValidType = cardCount === 5;
          break;
        case 'full_house':
          isValidType = cardCount === 5;
          break;
        case 'bomb':
          isValidType = cardCount === 4;
          break;
        case 'straight_flush':
          isValidType = cardCount === 5;
          break;
        default:
          isValidType = false;
      }
      
      if (!isValidType) {
        return false;
      }
      
      // 验证顺子和同花顺的点数是否连续
      if (this.selectedType === 'straight' || this.selectedType === 'straight_flush') {
        if (!this.validateStraight()) {
          return false;
        }
        // 验证是否选择了顺子组合
        if (!this.selectedValue) {
          uni.showToast({ title: '请选择顺子组合', icon: 'none' });
          return false;
        }
        // 验证同花顺是否选择了花色
        if (this.selectedType === 'straight_flush' && !this.selectedSuit) {
          uni.showToast({ title: '请选择花色', icon: 'none' });
          return false;
        }
      } else {
        // 验证其他牌型是否选择了牌值
        if (!this.selectedValue) {
          uni.showToast({ title: '请选择牌值', icon: 'none' });
          return false;
        }
      }
      
      // 如果是接牌，需要验证牌型比上一次大
      if (this.lastPlay.type) {
        // 牌型强度顺序（由弱到强）
        const typeStrength = {
          'single': 1,
          'pair': 2,
          'triple': 3,
          'straight': 4,
          'full_house': 5,
          'bomb': 6,
          'straight_flush': 7
        };
        
        // 牌值大小顺序
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        // 获取上一次的牌型和牌值
        const lastType = this.lastPlay.type;
        const lastValue = this.lastPlay.declaration.split(' ')[1];
        
        // 获取当前的牌型和牌值
        const currentType = this.selectedType;
        const currentValue = this.selectedValue;
        
        // 比较牌型强度
        if (typeStrength[currentType] < typeStrength[lastType]) {
          uni.showToast({ title: '牌型必须比上一次大', icon: 'none' });
          return false;
        }
        
        // 如果牌型相同，比较牌值大小
        if (typeStrength[currentType] === typeStrength[lastType]) {
          const lastValueIndex = valueOrder.indexOf(lastValue);
          const currentValueIndex = valueOrder.indexOf(currentValue);
          
          if (currentValueIndex <= lastValueIndex) {
            uni.showToast({ title: '牌值必须比上一次大', icon: 'none' });
            return false;
          }
        }
      }
      
      return true;
    },
    
    // 验证顺子和同花顺（心理游戏，不需要验证实际的牌）
    validateStraight() {
      // 这是一个心理游戏，玩家可以谎报自己的牌型
      // 不需要验证实际的牌是否真的能组成顺子或同花顺
      return true;
    },
    
    // 获取牌型声明文本
    getDeclaration() {
      const typeNames = {
        'single': '单张',
        'pair': '对子',
        'triple': '三条',
        'straight': '顺子',
        'full_house': '葫芦',
        'bomb': '炸弹',
        'straight_flush': '同花顺'
      };
      
      // 花色图案映射
      const suitSymbols = {
        'SuitSpade': '♠',
        'SuitHeart': '♥',
        'SuitDiamond': '♦',
        'SuitClub': '♣'
      };
      
      if (this.selectedType === 'straight_flush' && this.selectedSuit) {
        const suitSymbol = suitSymbols[this.selectedSuit] || '';
        return `${typeNames[this.selectedType]} ${suitSymbol} ${this.selectedValue}`;
      }
      
      return `${typeNames[this.selectedType]} ${this.selectedValue}`;
    },
    
    // 质疑
    challenge() {
      // 发送质疑消息
      const challengeMessage = {
        Type: 'challenge',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId
        }
      };
      if (websocketService && typeof websocketService.sendMessage === 'function') {
        websocketService.sendMessage(JSON.stringify(challengeMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }
      
      // 停止倒计时
      this.stopCountdown();
      
      // 显示质疑文字
      this.callDisplay.self = {
        show: true,
        text: '质疑'
      };
      
      const message = '你选择了质疑';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
      
      // 隐藏操作框
      this.currentTurnPlayerName = '';
    },
    
    // 过牌
    pass() {
      // 发送过牌消息
      const passMessage = {
        Type: 'pass',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId
        }
      };
      if (websocketService && typeof websocketService.sendMessage === 'function') {
        websocketService.sendMessage(JSON.stringify(passMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }
      
      // 停止倒计时
      this.stopCountdown();
      
      // 显示过牌文字
      this.callDisplay.self = {
        show: true,
        text: '过牌'
      };
      
      // 重置质疑失败标记
      this.isChallengeFailed = false;
      
      const message = '你选择了过牌';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
      
      // 隐藏操作框
      this.currentTurnPlayerName = '';
    },
    
    // 显示出牌选项（接牌）
    showPlayOptions() {
      // 切换到出牌模式
      this.isMyTurn = true;
      // 重置质疑失败标记
      this.isChallengeFailed = false;
      const message = '你选择了接牌，请出牌';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
    },
    
    // 重新开始游戏
    restartGame() {
      // 重置游戏状态
      this.myHP = 3;
      this.myCards = [];
      this.selectedCards = [];
      this.lastPlay = {
        player: '',
        type: '',
        cards: [],
        declaration: ''
      };
      this.isMyTurn = false;
      this.selectedType = '';
      this.selectedValue = '';
      this.gameLogs = [];
      this.gameEnd = false;
      this.isWinner = false;
      this.gameStatus = '游戏中';
      this.roomId = '';
      this.playerId = '';
      this.isChallengeFailed = false;
      
      // 使用本地存储标记需要自动开始匹配
      uni.setStorageSync('autoStartMatch', true);
      
      // 返回主页面
      uni.navigateBack({ delta: 1 });
    },
    
    // 退出游戏
    exitGame() {
      // 退出游戏时不需要断开WebSocket，由index.vue页面负责断开
      uni.navigateBack({ delta: 1 });
    },
    
    // 留下观看
    stayAndWatch() {
      // 隐藏出局弹窗，继续观看游戏
      this.playerEliminated = false;
      // 设置观看模式状态
      this.isWatching = true;
      console.log('留下观看游戏');
    },

    // 退出观看
    exitWatch() {
      // 退出观看模式，返回匹配页面并自动开始匹配
      this.isWatching = false;
      // 使用本地存储标记需要自动开始匹配
      uni.setStorageSync('autoStartMatch', true);
      // 返回匹配页面
      uni.navigateBack({ delta: 1 });
    },
    
    onUnload() {
      // 移除对WebSocket消息的监听
      uni.$off('websocketMessage', this.handleWebSocketMessage);
      uni.$off('websocketClose', this.handleWebSocketClose);
      // 游戏页面不需要断开WebSocket，由index.vue页面负责断开
    },
    
    // 处理 WebSocket 消息
    handleWebSocketMessage(message) {
      console.log('收到WebSocket消息:', message);
      console.log('消息类型:', message.type);
      console.log('消息内容:', message.content);
      // 记录所有消息类型，以便调试
      if (message.type !== 'heartbeat') {
        console.log('消息类型记录:', message.type);
        // 特别记录质疑相关的消息
        if (message.type.includes('challenge') || message.type.includes('challeng') || message.type.includes('pass')) {
          console.log('质疑或过牌相关消息:', message);
        }
      }
      
      // 添加操作消息到左边消息框
      const addActionMessage = (message) => {
        this.playerActions.unshift(message);
        // 限制消息数量，只显示最近的10条
        if (this.playerActions.length > 10) {
          this.playerActions = this.playerActions.slice(0, 10);
        }
      };
      
      if (message.type === 'join_success') {
        // 加入游戏成功
        this.roomId = message.content.room_id;
        // 只有在playerId未设置时才从join_success消息中获取，避免覆盖从URL参数中获取的playerId
        if (this.playerId === '') {
          this.playerId = message.content.player_id;
          console.log('从join_success消息获取playerId:', this.playerId);
        }
        this.gameLogs.unshift('加入游戏成功！');
        this.gameLogs.unshift(`当前房间: ${this.roomId}`);
        addActionMessage('加入游戏成功！');
      } else if (message.type === 'waiting_players') {
        // 等待其他玩家
        this.gameLogs.unshift(message.content.message);
        addActionMessage(message.content.message);
      } else if (message.type === 'ready_to_start') {
        // 可以开始游戏
        this.gameLogs.unshift(message.content.message);
        addActionMessage(message.content.message);
      } else if (message.type === 'player_joined') {
        // 其他玩家加入
        this.gameLogs.unshift(`${message.content.player.Name} 加入了游戏`);
        addActionMessage(`${message.content.player.Name} 加入了游戏`);
      } else if (message.type === 'game_start') {
        console.log('收到game_start消息:', message);
        console.log('message.content:', message.content);
        console.log('message.content.players:', message.content.players);
        // 游戏开始，先触发发牌动画
        this.isDealing = true;
        
        // 延迟设置游戏数据，让发牌动画先播放
        setTimeout(() => {
          console.log('处理game_start数据:', message.content, this.playerId);
          // 尝试通过playerId查找对应的玩家信息
          let myInfo = null;
          if (message.content.players) {
            console.log('遍历所有玩家信息:');
            message.content.players.forEach((player, index) => {
              console.log(`玩家${index}: id=${player.id}, name=${player.name}, cards=${player.cards ? player.cards.length : 0}`);
            });
            myInfo = message.content.players.find(p => p.id === this.playerId);
            if (myInfo) {
              console.log('通过playerId找到玩家:', myInfo);
              // 提取手牌并转换格式，确保包含花色和点数
              if (myInfo.cards && myInfo.cards.length > 0) {
                this.myCards = myInfo.cards.map(card => {
                  // 确保正确处理卡牌格式
                  const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                  // 正确处理花色，确保 0（黑桃）也能被正确识别
                  const suit = card.suit !== undefined ? card.suit : 'SuitSpade'; // 默认花色为黑桃
                  return { suit, rank };
                });
                this.myHP = myInfo.hp;
                console.log('通过playerId查找的手牌:', this.myCards);
              } else {
                console.log('玩家手牌不存在或为空:', myInfo.id);
                // 服务端未返回手牌，使用模拟手牌作为fallback
                // 注意：这只是在服务端没有返回手牌时的临时方案
                this.myCards = [
                  { suit: 'SuitSpade', rank: 'A' },
                  { suit: 'SuitHeart', rank: 'K' },
                  { suit: 'SuitDiamond', rank: 'Q' },
                  { suit: 'SuitClub', rank: 'J' },
                  { suit: 'SuitSpade', rank: '10' },
                  { suit: 'SuitHeart', rank: '9' },
                  { suit: 'SuitDiamond', rank: '8' },
                  { suit: 'SuitClub', rank: '7' },
                  { suit: 'SuitSpade', rank: '6' },
                  { suit: 'SuitHeart', rank: '5' }
                ];
                console.log('使用模拟手牌作为fallback:', this.myCards);
              }
            } else {
              console.log('未找到匹配的playerId:', this.playerId);
              // 尝试使用第一个玩家的手牌作为fallback
              if (message.content.players.length > 0 && message.content.players[0].cards) {
                console.log('使用players[0]的手牌作为fallback:', message.content.players[0].cards);
                this.myCards = message.content.players[0].cards.map(card => {
                  // 确保正确处理卡牌格式
                  const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                  // 正确处理花色，确保 0（黑桃）也能被正确识别
                  const suit = card.suit !== undefined ? card.suit : 'SuitSpade'; // 默认花色为黑桃
                  return { suit, rank };
                });
                console.log('从players[0]获取的手牌:', this.myCards);
              } else {
                // 服务端未返回手牌，使用模拟手牌作为fallback
                // 注意：这只是在服务端没有返回手牌时的临时方案
                this.myCards = [
                  { suit: 'SuitSpade', rank: 'A' },
                  { suit: 'SuitHeart', rank: 'K' },
                  { suit: 'SuitDiamond', rank: 'Q' },
                  { suit: 'SuitClub', rank: 'J' },
                  { suit: 'SuitSpade', rank: '10' },
                  { suit: 'SuitHeart', rank: '9' },
                  { suit: 'SuitDiamond', rank: '8' },
                  { suit: 'SuitClub', rank: '7' },
                  { suit: 'SuitSpade', rank: '6' },
                  { suit: 'SuitHeart', rank: '5' }
                ];
                console.log('使用模拟手牌作为fallback:', this.myCards);
              }
            }
          } else {
            console.log('message.content.players不存在');
            // 服务端未返回手牌，使用模拟手牌作为fallback
            // 注意：这只是在服务端没有返回手牌时的临时方案
            this.myCards = [
              { suit: 'SuitSpade', rank: 'A' },
              { suit: 'SuitHeart', rank: 'K' },
              { suit: 'SuitDiamond', rank: 'Q' },
              { suit: 'SuitClub', rank: 'J' },
              { suit: 'SuitSpade', rank: '10' },
              { suit: 'SuitHeart', rank: '9' },
              { suit: 'SuitDiamond', rank: '8' },
              { suit: 'SuitClub', rank: '7' },
              { suit: 'SuitSpade', rank: '6' },
              { suit: 'SuitHeart', rank: '5' }
            ];
            console.log('使用模拟手牌作为fallback:', this.myCards);
          }
          // 存储万能牌的花色和点数
          this.wildCard = {
            suit: message.content.wildCard.suit,
            rank: message.content.wildCard.rank.replace('Rank', '')
          };
          this.opponents = message.content.players
            .filter(p => p.id !== this.playerId)
            .map(p => ({
              name: p.name,
              avatar: '🎭',
              hp: p.hp,
              cards: p.cardCount || p.cards.length
            }));
          
          // 设置剩余牌数
          // 一副牌有52张，3个玩家每人发10张，剩余52 - 3*10 = 22张
          this.remainingCards = 22;
          this.gameLogs.unshift('游戏开始！');
          this.gameLogs.unshift(`万能牌：${this.wildCard.rank}`);
          addActionMessage('游戏开始！');
          addActionMessage(`万能牌：${this.wildCard.rank}`);
          
          // 依次发放自己的手牌
          this.dealtCards = [];
          // 尝试获取当前玩家的卡牌信息
          let currentPlayerCards = null;
          if (myInfo && myInfo.cards) {
            currentPlayerCards = myInfo.cards;
          } else if (message.content.players && message.content.players.length > 0 && message.content.players[0].cards) {
            currentPlayerCards = message.content.players[0].cards;
          }
          
          if (currentPlayerCards) {
            console.log('使用真实手牌进行发牌动画:', currentPlayerCards);
            currentPlayerCards.forEach((card, index) => {
              setTimeout(() => {
                const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                const suit = card.suit || 'SuitSpade'; // 默认花色为黑桃
                this.dealtCards.push({ suit, rank });
              }, 500 + index * 300);
            });
          } else if (this.myCards.length > 0) {
            // 使用模拟手牌进行发放动画
            console.log('使用模拟手牌进行发牌动画:', this.myCards);
            this.myCards.forEach((card, index) => {
              setTimeout(() => {
                this.dealtCards.push(card);
              }, 500 + index * 300);
            });
          }
          
          // 动画结束后隐藏初始牌
          const cardCount = currentPlayerCards ? currentPlayerCards.length : this.myCards.length;
          const delayTime = 500 + cardCount * 300 + 1000;
          setTimeout(() => {
            this.isDealing = false;
          }, delayTime);
        }, 500);
      } else if (message.type === 'your_turn') {
        // 轮到我出牌（必须出牌）
        this.isMyTurn = true;
        // 使用消息中的currentPlayer字段，确保即使myName未初始化也能正确显示倒计时
        this.currentTurnPlayerName = message.content.currentPlayer || this.myName;
        this.currentTurnPlayerId = message.content.currentPlayerId || this.playerId;
        // 隐藏亮牌并清空出牌区（全部玩家过牌后进入新回合）
        this.showChallengeCards = false;
        this.challengeCards = [];
        this.lastPlay = {
          player: '',
          type: '',
          cards: [],
          declaration: ''
        };
        // 清除之前的叫数显示
        for (let opponentName in this.callDisplay.opponents) {
          this.callDisplay.opponents[opponentName].show = false;
        }
        // 清除自己的叫数显示
        this.callDisplay.self.show = false;
        this.gameLogs.unshift('轮到你出牌了！');
        console.log('当轮出牌玩家的id:', this.playerId);
        addActionMessage('轮到你出牌了！');
        
        // 启动倒计时（必须出牌状态）
        const timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(timeout, true);
      } else if (message.type === 'player_turn') {
        // 轮到其他玩家出牌
        this.isMyTurn = false;
        if (message && message.content && message.content.currentPlayer) {
          this.currentTurnPlayerName = message.content.currentPlayer;
        }
        // 设置当前回合玩家ID
        this.currentTurnPlayerId = message.content.currentPlayerId || '';
        this.gameLogs.unshift(`轮到 ${message.content.currentPlayer} 出牌`);
        addActionMessage(`轮到 ${message.content.currentPlayer} 出牌`);
        
        // 启动倒计时（非必须出牌状态）
        const timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(timeout, false);
      } else if (message.type === 'player_played') {
        // 处理玩家出牌
        // 停止倒计时
        this.stopCountdown();
        // 重置自己的回合状态
        this.isMyTurn = false;
        
        console.log('玩家出牌消息内容:', message.content);
        // 测试代码：打印完整的消息内容
        console.log('完整的player_played消息:', message);
        const declaration = this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit);
        
        // 隐藏亮牌
        this.showChallengeCards = false;
        this.challengeCards = [];
        // 设置新的出牌信息
        this.lastPlay = {
          player: message.content.playerName,
          type: message.content.declaredType,
          cards: Array(message.content.tableCardsCount).fill('?'),
          declaration: declaration
        };
        
        // 清除之前的叫数显示
        for (let opponentName in this.callDisplay.opponents) {
          this.callDisplay.opponents[opponentName].show = false;
        }
        
        // 显示当前玩家的叫数
        if (message.content.playerName === this.myName) {
          // 自己出牌，显示自己的叫数
          this.callDisplay.self = {
            show: true,
            text: declaration
          };
        } else {
          // 对手出牌，显示对手的叫数
          if (!this.callDisplay.opponents[message.content.playerName]) {
            this.callDisplay.opponents[message.content.playerName] = {};
          }
          this.callDisplay.opponents[message.content.playerName] = {
            show: true,
            text: declaration
          };
        }
        
        // 更新出牌玩家的剩余牌数
        console.log('更新玩家', message.content.playerName, '的剩余牌数，出牌数量:', message.content.tableCardsCount);
        
        // 如果是自己出牌且是超时自动出牌，更新自己的手牌
        // 正常出牌时，playCards方法已经处理了手牌移除
        if (message.content.playerName === this.myName && message.content.timeout) {
          // 移除出的牌（默认出第一张）
          this.myCards = this.myCards.slice(1);
          console.log('自己超时自动出牌，剩余手牌:', this.myCards);
        } else {
          // 创建一个新的opponents数组
          const newOpponents = JSON.parse(JSON.stringify(this.opponents));
          for (let i = 0; i < newOpponents.length; i++) {
            if (newOpponents[i].name === message.content.playerName) {
              // 减去出牌数量，得到剩余牌数
              newOpponents[i].cards = Math.max(0, newOpponents[i].cards - 1); // 自动出牌默认出1张
              console.log('玩家', message.content.playerName, '的剩余牌数更新为:', newOpponents[i].cards);
              break;
            }
          }
          // 替换原数组
          this.opponents = newOpponents;
        }
        // 增加血条更新触发器的值，强制血条重新渲染
        this.hpUpdateTrigger++;
        // 强制更新UI
        this.$forceUpdate();
        
        this.gameLogs.unshift(`${message.content.playerName} 出了: ${declaration}`);
        addActionMessage(`${message.content.playerName} 出了: ${declaration}`);
      } else if (message.type === 'your_choice') {
        // 轮到我做出选择
        this.isMyTurn = false;
        this.currentTurnPlayerName = this.myName;
        this.currentTurnPlayerId = this.playerId;
        this.lastPlay = {
          player: '',
          type: message.content.declaredType,
          cards: Array(message.content.tableCardsCount).fill('?'),
          declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit)
        };
        // 隐藏自己上次的出牌选择消息框
        this.callDisplay.self.show = false;
        addActionMessage('轮到你做出选择（质疑/过牌）');
        
        // 启动倒计时
        const timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(timeout);
      } else if (message.type === 'player_choice') {
        // 轮到其他玩家做出选择
        this.isMyTurn = false;
        if (message && message.content && message.content.currentPlayer) {
          this.currentTurnPlayerName = message.content.currentPlayer;
        }
        // 设置当前回合玩家ID
        this.currentTurnPlayerId = message.content.currentPlayerId || '';
        // 轮到下家时重置质疑失败标记，恢复质疑选项
        this.isChallengeFailed = false;
        this.gameLogs.unshift(`轮到 ${message.content.currentPlayer} 做出选择`);
        console.log('当轮出牌玩家的id:', message.content.currentPlayerId);
        addActionMessage(`轮到 ${message.content.currentPlayer} 做出选择`);
        
        // 启动倒计时
        const timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(timeout);
      } else if (message.type === 'player_passed') {
        // 玩家选择了过牌
        console.log('收到player_passed消息:', message);
        this.lastChoice = {
          player: message.content.playerName,
          action: '选择了过牌'
        };
        
        // 如果是自己过牌，显示自己的过牌文字
        if (message.content.playerName === this.myName) {
          this.callDisplay.self = {
            show: true,
            text: '过牌'
          };
        } else {
          // 显示其他玩家的过牌文字
          if (!this.callDisplay.opponents[message.content.playerName]) {
            this.callDisplay.opponents[message.content.playerName] = {};
          }
          this.callDisplay.opponents[message.content.playerName] = {
            show: true,
            text: '过牌'
          };
          console.log('设置其他玩家的过牌文字:', message.content.playerName, '过牌');
        }
        this.gameLogs.unshift(`${message.content.playerName} 选择了过牌`);
        addActionMessage(`${message.content.playerName} 选择了过牌`);
      } else if (message.type === 'challenge' || message.type === 'player_challenged' || message.type === 'player_chose_challenge') {
        // 处理质疑相关消息
        console.log('收到质疑相关消息:', message);
        console.log('质疑消息类型:', message.type);
        
        // 尝试从不同字段获取质疑者名称
        let challengerName = message.content.challenger || message.content.playerName || message.content.player;
        
        if (challengerName) {
          this.lastChoice = {
            player: challengerName,
            action: '选择了质疑'
          };
          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[challengerName]) {
            this.callDisplay.opponents[challengerName] = {};
          }
          this.callDisplay.opponents[challengerName] = {
            show: true,
            text: '质疑'
          };
          console.log('设置其他玩家的质疑文字:', challengerName, '质疑');
          this.gameLogs.unshift(`${challengerName} 选择了质疑`);
          addActionMessage(`${challengerName} 选择了质疑`);
        } else {
          console.log('未找到质疑者名称:', message.content);
        }
      } else if (message.type === 'challenge_failed') {
        // 质疑失败
        const challengerName = message.content.challenger;
        if (challengerName) {
          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[challengerName]) {
            this.callDisplay.opponents[challengerName] = {};
          }
          this.callDisplay.opponents[challengerName] = {
            show: true,
            text: '质疑'
          };
          console.log('设置其他玩家的质疑文字:', challengerName, '质疑');
        }
        // 显示上一个玩家出的真实牌和质疑结果
        if (message.content.cards) {
          this.lastPlay = {
            player: message.content.challenged,
            type: message.content.declaredType,
            cards: message.content.cards,
            declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank)
          };
          console.log('显示上一个玩家出的真实牌:', message.content.cards);
          // 显示质疑结果弹窗
          this.showChallengeResultModal(false, message.content.message, message.content.cards);
        }
        // 实时更新血条状态
        console.log('更新前血条状态:', this.myHP);
        console.log('服务端返回的血条状态:', message.content.challengerHP);
        console.log('质疑者:', message.content.challenger);
        console.log('当前玩家:', this.myName);
        
        // 只有当当前玩家是质疑者时，才更新自己的myHP
        if (message.content.challenger === this.myName) {
          // 直接更新myHP
          this.myHP = message.content.challengerHP;
          console.log('更新后血条状态:', this.myHP);
          // 强制更新UI
          this.$forceUpdate();

          // 增加血条更新触发器的值，强制血条重新渲染
          this.hpUpdateTrigger++;

          // 强制更新UI
          console.log('强制更新UI后');
          // 再次强制更新
          setTimeout(() => {
            this.$forceUpdate();
            console.log('再次强制更新UI后');
          }, 100);
          
          // 再次强制更新，确保所有UI元素都能更新
          setTimeout(() => {
            this.$forceUpdate();
            console.log('再次强制更新UI后');
          }, 100);
          // 直接修改DOM来更新血条
          setTimeout(() => {
            this.updateHPDisplay();
          }, 100);
          // 设置质疑失败标记，重新选择时不显示质疑按钮
          this.isChallengeFailed = true;
          this.gameLogs.unshift(`质疑失败！你扣1滴血，剩余 ${this.myHP} 滴血`);
          if (this.myHP <= 0) {
            // 玩家出局，但游戏可能还没结束，显示出局弹窗
            this.playerEliminated = true;
          }
          addActionMessage(`质疑失败！你扣1滴血，剩余 ${this.myHP} 滴血`);
        }
        
        // 创建一个新的opponents数组，确保Vue能够检测到变化
        const newOpponents = JSON.parse(JSON.stringify(this.opponents));
        for (let i = 0; i < newOpponents.length; i++) {
          if (newOpponents[i].name === message.content.challenger) {
            newOpponents[i].hp = message.content.challengerHP;
            console.log('更新新opponents数组中第', i, '个元素的血量为:', message.content.challengerHP);
            break;
          }
        }
        // 直接替换整个opponents数组
        this.opponents = newOpponents;
        console.log('更新后opponents数组:', JSON.parse(JSON.stringify(this.opponents)));
      } else if (message.type === 'challenge_succeeded') {
        // 质疑成功
        const challengerName = message.content.challenger;
        const challengedName = message.content.challenged;
        console.log('质疑成功 - 质疑者:', challengerName, '被质疑者:', challengedName);
        if (challengerName) {
          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[challengerName]) {
            this.callDisplay.opponents[challengerName] = {};
          }
          this.callDisplay.opponents[challengerName] = {
            show: true,
            text: '质疑'
          };
          console.log('设置其他玩家的质疑文字:', challengerName, '质疑');
        }
        // 显示上一个玩家出的真实牌和质疑结果
        if (message.content.cards) {
          this.lastPlay = {
            player: message.content.challenged,
            type: message.content.declaredType,
            cards: message.content.cards,
            declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit)
          };
          console.log('显示上一个玩家出的真实牌:', message.content.cards);
          // 显示质疑结果弹窗
          this.showChallengeResultModal(true, message.content.message, message.content.cards);
        }
        // 清空出牌区
        setTimeout(() => {
          this.showChallengeCards = false;
          this.challengeCards = [];
          this.lastPlay = {
            player: '',
            type: '',
            cards: [],
            declaration: ''
          };
        }, 3000);
        // 更新被质疑玩家的手牌数量（收回牌）
        const tableCardsCount = message.content.cards ? message.content.cards.length : 0;
        console.log('更新玩家', challengedName, '的手牌数量，收回牌数量:', tableCardsCount);
        console.log('当前玩家:', this.myName);
        
        // 检查被质疑玩家是否是当前玩家自己
        if (challengedName === this.myName) {
          // 如果被质疑玩家是自己，更新自己的手牌数量
          this.myCards = this.myCards.concat(message.content.cards);
          console.log('自己收回牌，手牌数量更新为:', this.myCards.length);
        } else {
          // 如果被质疑玩家是其他玩家，更新opponents数组中的手牌数量
          console.log('当前opponents数组:', this.opponents);
          // 创建一个新的opponents数组
          const newOpponents = JSON.parse(JSON.stringify(this.opponents));
          let found = false;
          for (let i = 0; i < newOpponents.length; i++) {
            console.log('检查玩家:', newOpponents[i].name);
            if (newOpponents[i].name === challengedName) {
              // 加上收回的牌数量，得到新的手牌数量
              newOpponents[i].cards = newOpponents[i].cards + tableCardsCount;
              console.log('玩家', challengedName, '的手牌数量更新为:', newOpponents[i].cards);
              found = true;
              break;
            }
          }
          if (!found) {
            console.log('未找到被质疑玩家:', challengedName);
          }
          // 替换原数组
          this.opponents = newOpponents;
          console.log('更新后opponents数组:', this.opponents);
        }
        // 增加血条更新触发器的值，强制UI重新渲染
        this.hpUpdateTrigger++;
        // 强制更新UI
        this.$forceUpdate();
        // 确保出牌权交给质疑者
        console.log('当前玩家:', this.myName, '是否是质疑者:', this.myName === challengerName);
        if (this.myName === challengerName) {
          this.isMyTurn = true;
          this.currentTurnPlayerName = this.myName;
          console.log('出牌权交给质疑者:', this.myName);
        }
        this.gameLogs.unshift(`质疑成功！${message.content.challenged} 收回牌，${challengerName} 获得出牌权`);
        addActionMessage(`质疑成功！${message.content.challenged} 收回牌，${challengerName} 获得出牌权`);
      } else if (message.type === 'player_eliminated') {
        // 玩家出局
        this.gameLogs.unshift(`${message.content.playerName} 已出局`);
        // 更新对手信息
        this.opponents = this.opponents.map(opponent => {
          if (opponent.name === message.content.playerName) {
            return { ...opponent, hp: 0 };
          }
          return opponent;
        });
        addActionMessage(`${message.content.playerName} 已出局`);
        
        // 如果是自己出局，显示出局弹窗
        if (message.content.playerName === this.myName) {
          this.playerEliminated = true;
        }
      } else if (message.type === 'player_won') {
        // 玩家获胜
        this.gameLogs.unshift(`${message.content.playerName} 手牌出完，获得第 ${message.content.rank} 名！`);
        addActionMessage(`${message.content.playerName} 手牌出完，获得第 ${message.content.rank} 名！`);
      } else if (message.type === 'game_over') {
        // 游戏结束
        this.gameEnd = true;
        this.currentTurnPlayerName = '';
        const ranking = message.content.ranking;
        // 保存排名列表
        this.rankingList = ranking;
        const myRank = ranking.find(item => item.name === uni.getStorageSync('user_name'));
        if (myRank && myRank.rank === 1) {
          this.isWinner = true;
          this.endMessage = '恭喜你获得游戏胜利！';
        } else {
          this.isWinner = false;
          this.endMessage = `游戏结束！你的排名：第 ${myRank ? myRank.rank : '?' } 名`;
        }
        addActionMessage(this.endMessage);
      } else if (message.type === 'error') {
        // 处理错误消息
        uni.showToast({ title: message.content.message, icon: 'none' });
        this.gameLogs.unshift('错误: ' + message.content.message);
        addActionMessage('错误: ' + message.content.message);
      }
    },
    
    // 获取牌型声明文本
    getDeclarationText(type, rank, straight, suit) {
      const typeNames = {
        'single': '单张',
        'pair': '对子',
        'triple': '三条',
        'straight': '顺子',
        'full_house': '葫芦',
        'bomb': '炸弹',
        'straight_flush': '同花顺'
      };
      
      // 花色图案映射
      const suitSymbols = {
        'SuitSpade': '♠',
        'SuitHeart': '♥',
        'SuitDiamond': '♦',
        'SuitClub': '♣',
        // 添加可能的服务器返回格式
        'spade': '♠',
        'heart': '♥',
        'diamond': '♦',
        'club': '♣'
      };
      
      // 测试代码：打印所有参数
      console.log('getDeclarationText参数:', {
        type: type,
        rank: rank,
        straight: straight,
        suit: suit
      });
      
      if (type === 'straight_flush') {
        // 确保suit参数存在且不为空
        const suitSymbol = suit ? (suitSymbols[suit] || '') : '♦'; // 默认使用方块花色
        console.log('同花顺花色:', suit, '花色符号:', suitSymbol);
        if (straight) {
          const result = `${typeNames[type] || type} ${suitSymbol} ${straight}`;
          console.log('返回结果:', result);
          return result;
        } else {
          // 根据rank生成完整的顺子组合
          const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
          const rankValue = rank.replace('Rank', '');
          const rankIndex = valueOrder.indexOf(rankValue);
          if (rankIndex >= 4) { // 确保有足够的前面的牌来组成顺子
            const straightRanks = [];
            for (let i = rankIndex - 4; i <= rankIndex; i++) {
              straightRanks.push(valueOrder[i]);
            }
            const result = `${typeNames[type] || type} ${suitSymbol} ${straightRanks.join(' ')}`;
            console.log('返回结果:', result);
            return result;
          } else {
            // 如果无法生成顺子组合，直接返回牌型和点数
            const result = `${typeNames[type] || type} ${suitSymbol} ${rankValue}`;
            console.log('返回结果:', result);
            return result;
          }
        }
      } else if (type === 'straight') {
        if (straight) {
          const result = `${typeNames[type] || type} ${straight}`;
          console.log('返回结果:', result);
          return result;
        } else {
          // 根据rank生成完整的顺子组合
          const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
          const rankValue = rank.replace('Rank', '');
          const rankIndex = valueOrder.indexOf(rankValue);
          if (rankIndex >= 4) { // 确保有足够的前面的牌来组成顺子
            const straightRanks = [];
            for (let i = rankIndex - 4; i <= rankIndex; i++) {
              straightRanks.push(valueOrder[i]);
            }
            const result = `${typeNames[type] || type} ${straightRanks.join(' ')}`;
            console.log('返回结果:', result);
            return result;
          } else {
            // 如果无法生成顺子组合，直接返回牌型和点数
            const result = `${typeNames[type] || type} ${rankValue}`;
            console.log('返回结果:', result);
            return result;
          }
        }
      }
      const result = `${typeNames[type] || type} ${rank.replace('Rank', '')}`;
      console.log('返回结果:', result);
      return result;
    },
    
    // 处理// 处理WebSocket连接关闭
    handleWebSocketClose() {
      console.log('WebSocket连接已关闭');
      uni.showToast({ title: '连接已断开', icon: 'none' });
    },
    
    // 处理从index.vue传递过来的game_start消息
    handleGameStartMessage(message) {
      console.log('从index.vue收到game_start消息:', message);
      console.log('当前playerId:', this.playerId);
      console.log('game_start消息内容:', JSON.stringify(message, null, 2));
      
      // 只有在playerId未设置时才设置
      if (this.playerId === '' && message.content.players && message.content.players.length > 0) {
        // 假设第一个玩家是当前玩家
        this.playerId = message.content.players[0].id;
        console.log('设置playerId:', this.playerId);
      }
      
      // 直接处理game_start消息
      console.log('收到game_start消息:', message);
      console.log('message.content:', message.content);
      console.log('message.content.players:', message.content.players);
      // 游戏开始，先触发发牌动画
      this.isDealing = true;
      
      // 延迟设置游戏数据，让发牌动画先播放
      setTimeout(() => {
        console.log('处理game_start数据:', message.content, this.playerId);
        // 尝试通过playerId查找对应的玩家信息
        let myInfo = null;
        if (message.content.players) {
          myInfo = message.content.players.find(p => p.id === this.playerId);
          if (myInfo) {
            console.log('通过playerId找到玩家:', myInfo);
            // 提取手牌并转换格式，确保包含花色和点数
            if (myInfo.cards && myInfo.cards.length > 0) {
              this.myCards = myInfo.cards.map(card => {
                // 确保正确处理卡牌格式
                const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                // 正确处理花色，确保 0（黑桃）也能被正确识别
                const suit = card.suit !== undefined ? card.suit : 'S'; // 默认花色为黑桃
                return { suit, rank };
              });
              this.myHP = myInfo.hp;
              console.log('通过playerId查找的手牌:', this.myCards);
            } else {
              console.log('玩家手牌不存在或为空:', myInfo.id);
              // 服务端未返回手牌，使用模拟手牌作为fallback
              // 注意：这只是在服务端没有返回手牌时的临时方案
              this.myCards = [
                { suit: 'S', rank: 'A' },
                { suit: 'H', rank: 'K' },
                { suit: 'D', rank: 'Q' },
                { suit: 'C', rank: 'J' },
                { suit: 'S', rank: '10' },
                { suit: 'H', rank: '9' },
                { suit: 'D', rank: '8' },
                { suit: 'C', rank: '7' },
                { suit: 'S', rank: '6' },
                { suit: 'H', rank: '5' }
              ];
              console.log('使用模拟手牌作为fallback:', this.myCards);
            }
          } else {
            console.log('未找到匹配的playerId:', this.playerId);
            // 尝试使用第一个玩家的手牌作为fallback
            if (message.content.players.length > 0 && message.content.players[0].cards) {
              console.log('使用players[0]的手牌作为fallback:', message.content.players[0].cards);
              this.myCards = message.content.players[0].cards.map(card => {
                // 确保正确处理卡牌格式
                const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                // 正确处理花色，确保 0（黑桃）也能被正确识别
                const suit = card.suit !== undefined ? card.suit : 'S'; // 默认花色为黑桃
                return { suit, rank };
              });
              console.log('从players[0]获取的手牌:', this.myCards);
            } else {
              // 服务端未返回手牌，使用模拟手牌作为fallback
              // 注意：这只是在服务端没有返回手牌时的临时方案
              this.myCards = [
                { suit: 'S', rank: 'A' },
                { suit: 'H', rank: 'K' },
                { suit: 'D', rank: 'Q' },
                { suit: 'C', rank: 'J' },
                { suit: 'S', rank: '10' },
                { suit: 'H', rank: '9' },
                { suit: 'D', rank: '8' },
                { suit: 'C', rank: '7' },
                { suit: 'S', rank: '6' },
                { suit: 'H', rank: '5' }
              ];
              console.log('使用模拟手牌作为fallback:', this.myCards);
            }
          }
        } else {
          console.log('message.content.players不存在');
          // 服务端未返回手牌，使用模拟手牌作为fallback
          // 注意：这只是在服务端没有返回手牌时的临时方案
          this.myCards = [
            { suit: 'S', rank: 'A' },
            { suit: 'H', rank: 'K' },
            { suit: 'D', rank: 'Q' },
            { suit: 'C', rank: 'J' },
            { suit: 'S', rank: '10' },
            { suit: 'H', rank: '9' },
            { suit: 'D', rank: '8' },
            { suit: 'C', rank: '7' },
            { suit: 'S', rank: '6' },
            { suit: 'H', rank: '5' }
          ];
          console.log('使用模拟手牌作为fallback:', this.myCards);
        }
        // 存储万能牌的花色和点数
        this.wildCard = {
          suit: message.content.wildCard.suit,
          rank: message.content.wildCard.rank.replace('Rank', '')
        };
        this.opponents = message.content.players
          .filter(p => p.id !== this.playerId)
          .map(p => ({
            name: p.name,
            avatar: '🎭',
            hp: p.hp,
            cards: p.cardCount || p.cards.length
          }));
        
        // 设置剩余牌数
        // 一副牌有52张，3个玩家每人发10张，剩余52 - 3*10 = 22张
        this.remainingCards = 22;
        this.gameLogs.unshift('游戏开始！');
        this.gameLogs.unshift(`万能牌：${this.wildCard.rank}`);
        
        // 依次发放自己的手牌
        this.dealtCards = [];
        // 尝试获取当前玩家的卡牌信息
        let currentPlayerCards = null;
        if (myInfo && myInfo.cards) {
          currentPlayerCards = myInfo.cards;
        } else if (message.content.players && message.content.players.length > 0 && message.content.players[0].cards) {
          currentPlayerCards = message.content.players[0].cards;
        }
        
        if (currentPlayerCards) {
          console.log('使用真实手牌进行发牌动画:', currentPlayerCards);
          currentPlayerCards.forEach((card, index) => {
            setTimeout(() => {
              const rank = card.rank ? card.rank.replace('Rank', '') : 'A';
              const suit = card.suit || 'S'; // 默认花色为黑桃
              this.dealtCards.push({ suit, rank });
            }, index * 300); // 每张牌间隔300ms
          });
          
          // 动画结束后设置为非发牌状态
          setTimeout(() => {
            this.isDealing = false;
          }, currentPlayerCards.length * 300 + 1000);
        } else {
          // 没有真实手牌，使用模拟手牌进行发牌动画
          console.log('使用模拟手牌进行发牌动画');
          const mockCards = [
            { suit: 'S', rank: 'A' },
            { suit: 'H', rank: 'K' },
            { suit: 'D', rank: 'Q' },
            { suit: 'C', rank: 'J' },
            { suit: 'S', rank: '10' },
            { suit: 'H', rank: '9' },
            { suit: 'D', rank: '8' },
            { suit: 'C', rank: '7' },
            { suit: 'S', rank: '6' },
            { suit: 'H', rank: '5' }
          ];
          mockCards.forEach((card, index) => {
            setTimeout(() => {
              this.dealtCards.push(card);
            }, index * 300); // 每张牌间隔300ms
          });
          
          // 动画结束后设置为非发牌状态
          setTimeout(() => {
            this.isDealing = false;
          }, mockCards.length * 300 + 1000);
        }
      }, 100);
    },
    
    // 获取卡牌图片路径
    getCardImage(card) {
      if (card === 'back' || card === 'rear') {
        return '/static/liepoker/rear.png';
      } else if (typeof card === 'string' && card.startsWith('W')) {
        // 万能牌，使用金色背景
        const value = card.substring(1);
        const mappedValue = value === '10' ? '10' : value === 'J' ? '11' : value === 'Q' ? '12' : value === 'K' ? '13' : value === 'A' ? '14' : value;
        return `/static/liepoker/5-${mappedValue}.png`;
      } else if (typeof card === 'object' && card.suit && card.rank) {
        // 处理包含花色和点数的卡牌对象
        const valueMap = {
          '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
          'J': '11', 'Q': '12', 'K': '13', 'A': '14'
        };
        
        // 花色映射：根据服务端返回的花色字符串
        // SuitSpade=黑桃, SuitHeart=红桃, SuitDiamond=方块, SuitClub=梅花
        const suitMap = {
          'SuitSpade': '0',   // 黑桃
          'SuitHeart': '1',   // 红桃
          'SuitDiamond': '2', // 方块
          'SuitClub': '3'     // 梅花
        };
        
        // 处理rank字段，移除Rank前缀
        let rank = card.rank;
        if (rank.startsWith('Rank')) {
          rank = rank.substring(4); // 移除Rank前缀
        }
        
        const suit = suitMap[card.suit] || '0'; // 默认黑桃
        const value = valueMap[rank] || rank;
        return `/static/liepoker/${suit}-${value}.png`;
      } else if (typeof card === 'string') {
        // 处理普通字符串类型的卡牌（兼容旧格式）
        const valueMap = {
          '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
          'J': '11', 'Q': '12', 'K': '13', 'A': '14'
        };
        
        // 默认使用黑桃（0）
        const suit = '0';
        const value = valueMap[card] || card;
        return `/static/liepoker/${suit}-${value}.png`;
      } else {
        // 处理其他类型的卡牌
        console.warn('未知卡牌类型:', card);
        return '/static/liepoker/rear.png';
      }
    },

    // 关闭质疑结果提示框
    closeChallengeResult() {
      this.showChallengeResult = false;
      // 不移除亮牌，等待玩家出牌或过牌后再处理
    },

    // 显示质疑结果
    showChallengeResultModal(success, message, cards) {
      this.challengeCards = cards;
      this.showChallengeCards = true;
      this.challengeResult = {
        success: success,
        message: message
      };
      this.showChallengeResult = true;
      // 3秒后自动关闭提示框
      setTimeout(() => {
        this.closeChallengeResult();
      }, 3000);
    },

    // 直接更新血条显示
    updateHPDisplay() {
      console.log('直接更新血条显示，当前血量:', this.myHP);
      // 移除DOM操作，改为使用小程序的方式
      // 强制更新UI
      this.$forceUpdate();
      console.log('强制更新UI后血条状态:', this.myHP);
    }
  }
};
</script>

<style scoped>
/* ========== 基础样式 ========== */
.game-page {
  width: 100vw;
  height: 100vh;
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
  background: transparent;
  pointer-events: none;
  z-index: 0;
}

/* ========== 顶部导航 ========== */
.top-nav {
  position: absolute;
  top: 50rpx;
  left: 0;
  right: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 110;
  padding: 0 40rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid #6a11cb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20rpx rgba(106, 17, 203, 0.5);
  animation: buttonGlow 2s ease-in-out infinite;
}

.back-icon {
  font-size: 20rpx;
  color: #ffffff;
  font-weight: bold;
}

.top-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid #6a11cb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20rpx rgba(106, 17, 203, 0.5);
  animation: buttonGlow 2s ease-in-out infinite;
}

.action-icon {
  font-size: 20rpx;
  color: #ffffff;
}

/* ========== 玩家信息区域 ========== */
/* 其他玩家（根据人数动态布局） */
.opponents-area {
  position: absolute;
  z-index: 110;
}

/* 3人游戏 - 其他两位玩家在左右两侧 */
.opponents-area.opponents-2 {
  top: 30%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
}

/* 4人游戏 - 其他三位玩家在左上右位置 */
.opponents-area.opponents-3 {
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20rpx;
}

.opponents-area.opponents-3 .opponent-0 {
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
}

.opponents-area.opponents-3 .opponent-1 {
  position: absolute;
  top: 50%;
  left: 20rpx;
  transform: translateY(-50%);
}

.opponents-area.opponents-3 .opponent-2 {
  position: absolute;
  top: 50%;
  right: 20rpx;
  transform: translateY(-50%);
}

/* 5人游戏 - 其他四位玩家在左右两侧呈5边形展示 */
.opponents-area.opponents-4 {
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx;
}

.opponents-area.opponents-4 .opponent-0 {
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
}

.opponents-area.opponents-4 .opponent-1 {
  position: absolute;
  top: 30%;
  left: 10%;
  transform: translateY(-50%);
}

.opponents-area.opponents-4 .opponent-2 {
  position: absolute;
  top: 30%;
  right: 10%;
  transform: translateY(-50%);
}

.opponents-area.opponents-4 .opponent-3 {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
}

.opponent-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

/* 自己（左下角） */
.self-player-area {
  position: absolute !important;
  bottom: 10rpx !important;
  left: 10rpx !important;
  z-index: 110 !important;
  transform: translateZ(0) !important;
  display: block !important;
}

/* 玩家信息卡片 */
.player-info-card {
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  border: 1rpx solid #6a11cb;
  border-radius: 8rpx;
  padding: 10rpx;
  box-shadow: 0 0 10rpx rgba(106, 17, 203, 0.5);
  position: relative;
  overflow: hidden;
  width: 120rpx;
  height: 50rpx;
}

.player-info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(106, 17, 203, 0.3), transparent);
  animation: borderGlow 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes borderGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.player-avatar-container {
  margin-right: 10rpx;
  position: relative;
}

.player-avatar {
  width: 50rpx;
  height: 50rpx;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 6rpx rgba(240, 147, 251, 0.3);
  border: 1rpx solid #ffffff;
}

.player-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rpx;
}

.player-name {
  font-size: 12rpx;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.player-hp {
  display: flex;
  gap: 4rpx;
}

.hp-heart {
  font-size: 14rpx;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.hp-heart.active {
  color: #ff4757;
  text-shadow: 0 0 5rpx #ff4757;
  animation: pulse 1s ease-in-out infinite;
}

.player-cards {
  display: flex;
  align-items: center;
  gap: 5rpx;
  margin-top: 2.5rpx;
}

.cards-icon {
  font-size: 12rpx;
}

.cards-count {
  font-size: 10rpx;
  font-weight: 600;
  color: #f0c048;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.player-slot, .opponent-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.player-name {
  font-size: 9rpx;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.player-avatar {
  width: 40rpx;
  height: 40rpx;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 6rpx rgba(240, 147, 251, 0.3);
}

/* 当前回合玩家头像发光效果 */
.turn-glow {
  box-shadow:
    0 0 16rpx rgba(240, 192, 72, 0.75),
    0 0 34rpx rgba(120, 0, 255, 0.55),
    0 2rpx 10rpx rgba(0, 0, 0, 0.35) !important;
  border: 2rpx solid rgba(240, 192, 72, 0.75);
  animation: turnGlowPulse 1.2s ease-in-out infinite;
}

@keyframes turnGlowPulse {
  0%, 100% {
    filter: brightness(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.15);
    transform: scale(1.06);
  }
}

.avatar-icon {
  font-size: 20rpx;
}

.player-hp {
  display: flex;
  gap: 4rpx;
}

.hp-heart {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.hp-heart.active {
  color: #ff4757;
  text-shadow: 0 0 5rpx #ff4757;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.hp-label {
  font-size: 8rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2.5rpx;
}

/* ========== 倒计时样式 ========== */
/* 自己的倒计时（在手牌上方） */
.self-countdown {
  position: absolute;
  top: -42rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: rgba(120, 0, 255, 0.85);
  padding: 8rpx 18rpx;
  border-radius: 18rpx;
  border: 1rpx solid rgba(240, 192, 72, 0.75);
  box-shadow: 0 2rpx 8rpx rgba(120, 0, 255, 0.5);
  z-index: 10;
  line-height: 1;
}

.self-countdown.countdown-warning {
  background: rgba(255, 71, 87, 0.9);
  border-color: #ff4757;
  animation: countdownPulse 0.5s ease-in-out infinite;
}

@keyframes countdownPulse {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
}

/* 其他玩家的倒计时（在头像旁边） */
.opponent-countdown {
  position: absolute;
  top: -20rpx;
  right: -20rpx;
  display: flex;
  align-items: center;
  gap: 6rpx;
  background: rgba(120, 0, 255, 0.8);
  padding: 6rpx 12rpx;
  border-radius: 20rpx;
  border: 2rpx solid rgba(240, 192, 72, 0.75);
  box-shadow: 0 0 15rpx rgba(120, 0, 255, 0.6);
  z-index: 20;
}

.opponent-countdown.countdown-warning {
  background: rgba(255, 71, 87, 0.9);
  border-color: #ff4757;
  animation: countdownPulse 0.5s ease-in-out infinite;
}

.countdown-icon {
  font-size: 18rpx;
}

.countdown-number {
  font-size: 16rpx;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.countdown-warning .countdown-number {
  color: #ffffff;
}

/* ========== 牌桌区域 ========== */
.table-area {
  position: absolute;
  top: 50rpx;
  left: 20rpx;
  width: calc(100% - 40rpx);
  height: calc(100% - 50rpx);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 100;
  background: transparent;
  box-sizing: border-box;
  overflow: visible;
}

.desk-image {
  display: none;
}

.table-area::before {
  display: none;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10rpx rgba(255, 215, 0, 0.8); }
  50% { box-shadow: 0 0 15rpx rgba(255, 215, 0, 1); }
}

/* 初始52张牌 */
.initial-cards {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 60rpx;
  height: 80rpx;
}

.initial-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 60rpx;
  height: 80rpx;
  border-radius: 6rpx;
  opacity: 1;
  transform: translate(0, 0) scale(1);
  box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
}

.initial-card.animate {
  animation: dealCard 1s ease-out forwards;
}

@keyframes dealCard {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(calc(var(--x) * 1px), calc(var(--y) * 1px)) scale(1);
  }
}

/* 牌堆 */
.card-deck {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx 0;
}

/* 万能牌显示 */
.wild-card-display {
  position: absolute;
  left: 50%;
  top: 46%;
  transform: translate(-120rpx, -50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.wild-card-label {
  color: #f0c048;
  font-size: 16rpx;
  font-weight: bold;
  text-shadow: 0 0 10rpx rgba(240, 192, 72, 0.8);
}

.wild-card-image {
  width: 70rpx;
  height: 100rpx;
  border-radius: 6rpx;
  box-shadow: 0 0 10rpx rgba(255, 215, 0, 0.8);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10rpx rgba(255, 215, 0, 0.8); }
  50% { box-shadow: 0 0 15rpx rgba(255, 215, 0, 1); }
}

/* 手牌发放动画区域 */
.dealing-cards-area {
  position: absolute;
  bottom: 200rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  z-index: 200;
  padding: 0 40rpx;
}

.dealing-card {
  width: 60rpx;
  height: 80rpx;
  border-radius: 6rpx;
  animation: dealToHand 1s ease-out forwards;
  opacity: 0;
  transform: translateY(-50rpx) scale(0.5);
}

.dealing-card-image {
  width: 100%;
  height: 100%;
  border-radius: 6rpx;
}

@keyframes dealToHand {
  0% {
    opacity: 0;
    transform: translateY(-50rpx) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.deck-image {
  width: 70rpx;
  height: 100rpx;
  border-radius: 6rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
}

.deck-count {
  position: absolute;
  background: rgba(240, 192, 72, 0.9);
  color: #333;
  font-size: 16rpx;
  font-weight: bold;
  padding: 3rpx 6rpx;
  border-radius: 15rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  min-width: 30rpx;
  text-align: center;
}

/* 上家出牌 */
.last-play-cards {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(60rpx, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  z-index: 3;
}

.played-card-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx 0;
}

.played-card {
  width: 70rpx;
  height: 100rpx;
  border-radius: 6rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
}

.card-count-overlay {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  font-size: 16rpx;
  font-weight: bold;
  padding: 2rpx 6rpx;
  border-radius: 50%;
  min-width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

/* 玩家选择显示 */
.player-choice-display {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(140rpx, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  /* 确保容器能够容纳消息框的宽度 */
  width: auto;
  max-width: 300rpx;
  overflow: visible;
  flex-shrink: 0;
}

.choice-text {
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-size: 12rpx;
  animation: fadeIn 0.3s ease-in-out;
  pointer-events: none;
  white-space: nowrap;
  text-align: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  /* 确保消息框根据内容自动调整宽度 */
  display: inline-block;
  width: auto;
  max-width: 250rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: content-box;
}

/* 对手叫数显示 */
.opponent-call {
  position: absolute;
  top: -40rpx;
  left: 120%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #f0c048;
  padding: 4rpx 8rpx;
  border-radius: 12rpx;
  font-size: 9rpx;
  white-space: nowrap;
  z-index: 10;
  /* 确保消息框根据内容自动调整宽度 */
  display: inline-block;
  width: auto;
  min-width: 120rpx;
  max-width: 200rpx;
  overflow: visible;
  /* 确保消息框不会溢出容器 */
  text-align: center;
  box-sizing: content-box;
}

.declaration-text {
  font-size: 16rpx;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
  margin-top: 10rpx;
  white-space: nowrap;
  /* 移除最大宽度限制，让消息框根据内容自动调整宽度 */
}

/* ========== 我的手牌区域 ========== */
.my-hand-area {
  position: absolute;
  bottom: 80rpx;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  height: 150rpx;
}

.hand-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.my-cards {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  padding: 20rpx 20rpx;
  position: relative;
}

.my-card {
  width: 70rpx;
  height: 100rpx;
  border-radius: 8rpx;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
  transform: rotate(0deg) translateY(0);
  margin-left: -40rpx;
  z-index: 1;
}

.my-card:first-child {
  margin-left: 0;
  z-index: 1;
}

.my-card:nth-child(2) {
  z-index: 2;
}

.my-card:nth-child(3) {
  z-index: 3;
}

.my-card:nth-child(4) {
  z-index: 4;
}

.my-card:nth-child(5) {
  z-index: 5;
}

.my-card:nth-child(6) {
  z-index: 6;
}

.my-card:nth-child(7) {
  z-index: 7;
}

.my-card:nth-child(8) {
  z-index: 8;
}

.my-card:nth-child(9) {
  z-index: 9;
}

.my-card:nth-child(10) {
  z-index: 10;
}

/* 注意：小程序端 :hover 可能“粘住”，导致取消选中后仍半抬起；改用 :active 更符合触控交互 */
.my-card:active {
  transform: translateY(-10rpx);
  box-shadow: 0 8rpx 16rpx rgba(240, 192, 72, 0.5);
}

.my-card.selected {
  transform: translateY(-20rpx);
  box-shadow: 0 12rpx 24rpx rgba(240, 192, 72, 0.8);
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

/* 调试信息 */
.debug-info {
  position: absolute;
  top: -60rpx;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 20rpx;
  background: rgba(0, 0, 0, 0.5);
  padding: 10rpx;
  border-radius: 10rpx;
  z-index: 10;
}

.card-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.8);
  z-index: 5;
  pointer-events: none;
}

/* ========== 操作区域 ========== */
.action-area {
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
  width: 100rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12rpx;
  padding: 12rpx;
  /* 需高于底部手牌区域（z-index: 200）避免被遮挡 */
  z-index: 300;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

/* 退出观看区域 */
.watch-exit-area {
  position: absolute;
  bottom: 20rpx;
  right: 20rpx;
  z-index: 300;
}

.watch-exit-btn {
  width: 100rpx;
  height: 40rpx;
  background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  border: none;
  border-radius: 8rpx;
  font-size: 14rpx;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.4);
}

.watch-exit-btn:active {
  transform: scale(0.95);
  opacity: 0.9;
}

.action-header {
  margin-bottom: 10rpx;
}

.action-title {
  font-size: 12rpx;
  font-weight: 700;
  color: #f0c048;
  text-align: center;
}

/* 牌型选择器 */
.card-type-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 4rpx;
  margin-bottom: 8rpx;
}

.type-option {
  padding: 4rpx 6rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 10rpx;
  font-size: 10rpx;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-option.active {
  background: rgba(240, 192, 72, 0.2);
  border-color: #f0c048;
  color: #f0c048;
}

/* 牌值选择器 */
.card-value-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rpx;
  margin-bottom: 10rpx;
}

.value-option {
  padding: 4rpx 2rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 6rpx;
  font-size: 10rpx;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.value-option.active {
  background: rgba(240, 192, 72, 0.2);
  border-color: #f0c048;
  color: #f0c048;
}

/* 顺子选择器 */
.straight-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rpx;
  margin-bottom: 10rpx;
}

.straight-option {
  padding: 4rpx 2rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 6rpx;
  font-size: 8rpx;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.straight-option.active {
  background: rgba(240, 192, 72, 0.2);
  border-color: #f0c048;
  color: #f0c048;
}

.no-straight {
  padding: 4rpx 2rpx;
  font-size: 10rpx;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  grid-column: 1 / -1;
}

/* 花色选择器 */
.suit-selector {
  margin-bottom: 10rpx;
}

.suit-title {
  font-size: 10rpx;
  font-weight: 700;
  color: #f0c048;
  text-align: center;
  margin-bottom: 4rpx;
}

.suit-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rpx;
}

.suit-option {
  padding: 4rpx 2rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 6rpx;
  font-size: 10rpx;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suit-option.active {
  background: rgba(240, 192, 72, 0.2);
  border-color: #f0c048;
  color: #f0c048;
}

/* 出牌按钮 */
.play-btn {
  width: 100%;
  height: 30rpx;
  background: linear-gradient(135deg, #ffd700, #ffed4e, #ffd700);
  color: #1a1008;
  font-size: 12rpx;
  font-weight: 700;
  border-radius: 16rpx;
  border: none;
  box-shadow: 0 4rpx 12rpx rgba(255, 215, 0, 0.5);
  animation: buttonGlow 2s ease-in-out infinite;
}

@keyframes buttonGlow {
  0%, 100% { box-shadow: 0 4rpx 12rpx rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 6rpx 16rpx rgba(255, 215, 0, 0.8); }
}

.play-btn:disabled {
  background: rgba(240, 192, 72, 0.3);
  color: rgba(26, 16, 8, 0.5);
  box-shadow: none;
  animation: none;
}

/* 选择操作区域样式 */
.choice-section {
  padding: 12rpx;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.5);
}

.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-top: 10rpx;
}

.choice-btn {
  width: 100%;
  height: 30rpx;
  border: none;
  border-radius: 16rpx;
  font-size: 12rpx;
  font-weight: 700;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

/* 回应按钮 */
.respond-btns {
  display: flex;
  gap: 12rpx;
}

.respond-btn {
  flex: 1;
  height: 60rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  font-weight: 700;
  border: none;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.challenge-btn {
  background: linear-gradient(135deg, #fc8181, #e53e3e);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(252, 129, 129, 0.5);
}

.pass-btn {
  background: linear-gradient(135deg, #68d391, #48bb78);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(104, 211, 145, 0.5);
}

/* 智能助手按钮 */
.ai-assistant {
  margin-top: 20rpx;
  display: flex;
  justify-content: flex-end;
}

.ai-btn {
  display: flex;
  align-items: center;
}

/* 对局情况面板已移除，对应样式也删除 */

.ai-icon {
  font-size: 24rpx;
}

.ai-text {
  font-size: 20rpx;
  font-weight: 600;
  color: #ffffff;
}



/* ========== 游戏结束遮罩 ========== */
.end-mask {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 46, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.end-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(240, 192, 72, 0.3);
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  width: 260rpx;
  box-shadow: 0 0 25rpx rgba(240, 192, 72, 0.2);
}

.end-icon {
  font-size: 40rpx;
}

.end-icon.win {
  animation: celebrate 2s ease-in-out infinite;
}

@keyframes celebrate {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.end-title {
  font-size: 20rpx;
  font-weight: 800;
  color: #f0c048;
  text-shadow: 0 1rpx 2rpx rgba(240, 192, 72, 0.5);
}

.end-desc {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 18rpx;
}

.end-btn {
  width: 100%;
  height: 40rpx;
  background: linear-gradient(135deg, #c8a020, #f0c048, #e07800);
  color: #1a1008;
  font-size: 14rpx;
  font-weight: 700;
  border-radius: 20rpx;
  border: none;
  margin-top: 5rpx;
  box-shadow: 0 4rpx 12rpx rgba(240, 192, 72, 0.3);
}

.end-btn.exit-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: none;
}

/* 排名列表 */
.ranking-list {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8rpx;
  padding: 10rpx;
  margin-top: 5rpx;
}

.ranking-title {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 8rpx;
  font-weight: 600;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 6rpx 8rpx;
  border-radius: 6rpx;
  margin-bottom: 4rpx;
  background: rgba(255, 255, 255, 0.05);
}

.ranking-item.my-rank {
  background: rgba(240, 192, 72, 0.15);
  border: 1rpx solid rgba(240, 192, 72, 0.3);
}

.rank-number {
  font-size: 16rpx;
  width: 24rpx;
  text-align: center;
}

.rank-name {
  flex: 1;
  font-size: 13rpx;
  color: #fff;
  margin-left: 6rpx;
}

.rank-position {
  font-size: 11rpx;
  color: rgba(255, 255, 255, 0.6);
}

/* 自己的叫数显示 */
.self-call {
  position: absolute;
  top: -30rpx;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-size: 18rpx;
  z-index: 2000;
  animation: fadeIn 0.3s ease-in-out;
  pointer-events: none;
  white-space: nowrap;
  text-align: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

/* 其他玩家的叫数显示 */
.opponent-avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.opponent-call {
  position: absolute;
  top: -20rpx;
  right: -10rpx;
  background: rgba(255, 0, 0, 0.8);
  color: #fff;
  padding: 2rpx 6rpx;
  border-radius: 8rpx;
  font-size: 14rpx;
  z-index: 100;
  animation: fadeIn 0.3s ease-in-out;
}

/* 叫数显示动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate(-50%, 5rpx);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 调整其他玩家叫数的动画 */
.opponent-call {
  animation: opponentFadeIn 0.3s ease-in-out;
}

@keyframes opponentFadeIn {
  0% {
    opacity: 0;
    transform: translate(0, 5rpx);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

/* 确保我的手牌区域相对定位，以便叫数显示正确定位 */
.my-hand-area {
  position: relative;
}

/* ========== 质疑时的牌显示 ========== */
.challenge-cards-area {
  position: absolute;
  top: 20rpx;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.challenge-cards-title {
  font-size: 20rpx;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.5);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  border: 1rpx solid #6a11cb;
}

.challenge-cards-container {
  display: flex;
  gap: 10rpx;
  padding: 10rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10rpx;
  border: 1rpx solid #6a11cb;
}

.challenge-card {
  width: 60rpx;
  height: 80rpx;
  border-radius: 6rpx;
  box-shadow: 0 2rpx 10rpx rgba(106, 17, 203, 0.5);
}

/* ========== 质疑结果提示框 ========== */
.challenge-result-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-content {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10rpx;
  padding: 20rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.5);
  border: 1rpx solid #6a11cb;
  min-width: 200rpx;
}

.toast-title {
  font-size: 24rpx;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

.toast-message {
  font-size: 18rpx;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}

/* ========== 玩家出局弹窗样式 ========== */
.eliminated-mask {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 46, 0.98);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeInMask 0.3s ease-in-out;
}

@keyframes fadeInMask {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.eliminated-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(255, 67, 87, 0.5);
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  width: 260rpx;
  box-shadow: 0 0 30rpx rgba(255, 67, 87, 0.3);
  animation: slideInCard 0.4s ease-out;
}

@keyframes slideInCard {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(10rpx);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.eliminated-icon {
  font-size: 40rpx;
  animation: shakeIcon 0.5s ease-in-out;
}

@keyframes shakeIcon {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.eliminated-title {
  font-size: 20rpx;
  font-weight: 800;
  color: #ff4757;
  text-shadow: 0 1rpx 2rpx rgba(255, 67, 87, 0.5);
}

.eliminated-desc {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 18rpx;
}

.eliminated-btn {
  width: 100%;
  height: 40rpx;
  border-radius: 20rpx;
  font-size: 14rpx;
  font-weight: 700;
  border: none;
  margin-top: 5rpx;
  transition: all 0.3s ease;
}

.eliminated-btn.watch-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(102, 126, 234, 0.4);
}

.eliminated-btn.restart-btn {
  background: linear-gradient(135deg, #c8a020, #f0c048, #e07800);
  color: #1a1008;
  box-shadow: 0 4rpx 12rpx rgba(240, 192, 72, 0.3);
}

.eliminated-btn.exit-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: none;
}

.eliminated-btn:active {
  transform: scale(0.98);
}
</style>