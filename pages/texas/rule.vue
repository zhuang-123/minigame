<template>
  <view class="rule-page">
    <!-- 顶部英雄区域 -->
    <view class="hero-section">
      <view class="hero-bg"></view>
      <view class="hero-content">
        <view class="game-icon">🃏</view>
        <view class="game-title">德州扑克</view>
        <view class="game-subtitle">Texas Hold'em Poker</view>
        <view class="game-desc">
          经典的多人策略扑克游戏，结合运气与心理博弈，赢取最终大奖！
        </view>
      </view>
    </view>

    <!-- 快速概览标签 -->
    <view class="quick-info">
      <view class="info-tag">
        <text class="info-icon">👥</text>
        <text class="info-text">2-10人</text>
      </view>
      <view class="info-tag">
        <text class="info-icon">🃏</text>
        <text class="info-text">52张牌</text>
      </view>
      <view class="info-tag">
        <text class="info-icon">💰</text>
        <text class="info-text">4轮下注</text>
      </view>
    </view>

    <!-- 牌型大小区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🏆</view>
        <view class="section-title">牌型大小</view>
        <view class="section-sub">从大到小排列</view>
      </view>
      <view class="hand-rank-list">
        <view class="hand-item rank-1">
          <view class="rank-badge">1</view>
          <view class="hand-info">
            <view class="hand-name">皇家同花顺</view>
            <view class="hand-example">A K Q J 10 同花 ♠</view>
          </view>
          <view class="hand-label royal">至尊</view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">2</view>
          <view class="hand-info">
            <view class="hand-name">同花顺</view>
            <view class="hand-example">6 7 8 9 10 同花色</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">3</view>
          <view class="hand-info">
            <view class="hand-name">四条</view>
            <view class="hand-example">8♠ 8♥ 8♦ 8♣ + 任意</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">4</view>
          <view class="hand-info">
            <view class="hand-name">葫芦</view>
            <view class="hand-example">三张相同 + 一对</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">5</view>
          <view class="hand-info">
            <view class="hand-name">同花</view>
            <view class="hand-example">五张同色，不连号</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">6</view>
          <view class="hand-info">
            <view class="hand-name">顺子</view>
            <view class="hand-example">五张连号，不同花</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">7</view>
          <view class="hand-info">
            <view class="hand-name">三条</view>
            <view class="hand-example">三张相同点数</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">8</view>
          <view class="hand-info">
            <view class="hand-name">两对</view>
            <view class="hand-example">两对 + 一张单牌</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">9</view>
          <view class="hand-info">
            <view class="hand-name">一对</view>
            <view class="hand-example">一对 + 三张单牌</view>
          </view>
        </view>
        <view class="hand-item">
          <view class="rank-badge">10</view>
          <view class="hand-info">
            <view class="hand-name">高牌</view>
            <view class="hand-example">无以上牌型，比最大单牌</view>
          </view>
        </view>
      </view>
      <view class="tip-box">
        <text class="tip-icon">💡</text>
        <text class="tip-text">比牌时花色无大小，只看牌面点数等级。双方相同则平分底池。</text>
      </view>
    </view>

    <!-- 游戏流程区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🔄</view>
        <view class="section-title">游戏流程</view>
        <view class="section-sub">四轮下注</view>
      </view>
      <view class="flow-list">
        <view class="flow-item">
          <view class="flow-dot pre-flop"></view>
          <view class="flow-content">
            <view class="flow-head">
              <view class="flow-name">底牌圈 · Pre-Flop</view>
              <view class="flow-badge">第1轮</view>
            </view>
            <view class="flow-desc">每人发2张私密底牌，从大盲注左侧开始行动：跟注、加注或弃牌</view>
          </view>
        </view>
        <view class="flow-item">
          <view class="flow-dot flop"></view>
          <view class="flow-content">
            <view class="flow-head">
              <view class="flow-name">翻牌圈 · Flop</view>
              <view class="flow-badge">第2轮</view>
            </view>
            <view class="flow-desc">翻出3张公共牌，从庄家左边第一个玩家开始，可过牌、下注、跟注、加注或弃牌</view>
          </view>
        </view>
        <view class="flow-item">
          <view class="flow-dot turn"></view>
          <view class="flow-content">
            <view class="flow-head">
              <view class="flow-name">转牌圈 · Turn</view>
              <view class="flow-badge">第3轮</view>
            </view>
            <view class="flow-desc">再发1张公共牌（第4张），进行新一轮下注</view>
          </view>
        </view>
        <view class="flow-item">
          <view class="flow-dot river"></view>
          <view class="flow-content">
            <view class="flow-head">
              <view class="flow-name">河牌圈 · River</view>
              <view class="flow-badge">第4轮</view>
            </view>
            <view class="flow-desc">发出第5张公共牌，进行最后一轮下注</view>
          </view>
        </view>
        <view class="flow-item">
          <view class="flow-dot showdown"></view>
          <view class="flow-content">
            <view class="flow-head">
              <view class="flow-name">摊牌 · Showdown</view>
              <view class="flow-badge">结算</view>
            </view>
            <view class="flow-desc">剩余至少两人亮牌比大小，牌型最优者赢走全部底池筹码</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 庄家与盲注区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🎯</view>
        <view class="section-title">庄家与盲注</view>
        <view class="section-sub">强制下注机制</view>
      </view>
      <view class="blind-cards">
        <view class="blind-card dealer-card">
          <view class="blind-icon">D</view>
          <view class="blind-name">庄家 Dealer</view>
          <view class="blind-desc">每局顺时针移动，代表有利位置</view>
        </view>
        <view class="blind-card small-card">
          <view class="blind-icon">SB</view>
          <view class="blind-name">小盲注</view>
          <view class="blind-desc">庄家左侧第一位，强制下注½最低注</view>
        </view>
        <view class="blind-card big-card">
          <view class="blind-icon">BB</view>
          <view class="blind-name">大盲注</view>
          <view class="blind-desc">小盲左侧，强制下注等于最低注额</view>
        </view>
      </view>
    </view>

    <!-- 玩家行动选项 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">✋</view>
        <view class="section-title">玩家行动</view>
        <view class="section-sub">轮到你时可选择</view>
      </view>
      <view class="action-grid">
        <view class="action-item check">
          <view class="action-icon">🤚</view>
          <view class="action-name">过牌</view>
          <view class="action-desc">无人下注时免费保留资格</view>
        </view>
        <view class="action-item bet">
          <view class="action-icon">💰</view>
          <view class="action-name">下注/加注</view>
          <view class="action-desc">主动投入筹码，提高注额</view>
        </view>
        <view class="action-item call">
          <view class="action-icon">👆</view>
          <view class="action-name">跟注</view>
          <view class="action-desc">与上家相同筹码继续游戏</view>
        </view>
        <view class="action-item fold">
          <view class="action-icon">🚫</view>
          <view class="action-name">弃牌</view>
          <view class="action-desc">放弃本局，已投筹码不退</view>
        </view>
        <view class="action-item allin">
          <view class="action-icon">💥</view>
          <view class="action-name">全下</view>
          <view class="action-desc">押上全部筹码，孤注一掷</view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-section">
      <button class="start-btn" @tap="goToGame">开始游戏</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    // 进入游戏页面
    goToGame() {
      uni.navigateTo({ url: '/pages/texas/index' });
    }
  }
};
</script>

<style scoped>
/* ========== 全局 ========== */
.rule-page {
  min-height: 100vh;
  background: #0e1218;
  padding-bottom: 80rpx;
}

/* ========== 英雄区域 ========== */
.hero-section {
  position: relative;
  padding: 80rpx 40rpx 50rpx;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 30%, rgba(200, 160, 40, 0.35) 0%, rgba(20, 10, 5, 0) 60%),
              linear-gradient(160deg, #1a1008 0%, #0e1218 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.game-icon {
  font-size: 100rpx;
  margin-bottom: 24rpx;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0rpx); }
  50% { transform: translateY(-14rpx); }
}

.game-title {
  font-size: 52rpx;
  font-weight: 800;
  color: #f0c048;
  letter-spacing: 6rpx;
  margin-bottom: 8rpx;
  text-shadow: 0 4rpx 20rpx rgba(240, 192, 72, 0.5);
}

.game-subtitle {
  font-size: 22rpx;
  color: rgba(240, 192, 72, 0.6);
  letter-spacing: 4rpx;
  margin-bottom: 28rpx;
  text-transform: uppercase;
}

.game-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.65);
  line-height: 44rpx;
  max-width: 560rpx;
}

/* ========== 快速概览标签 ========== */
.quick-info {
  display: flex;
  justify-content: center;
  gap: 24rpx;
  padding: 0 40rpx 50rpx;
}

.info-tag {
  display: flex;
  align-items: center;
  gap: 10rpx;
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(240, 192, 72, 0.25);
  border-radius: 40rpx;
  padding: 14rpx 26rpx;
}

.info-icon {
  font-size: 28rpx;
}

.info-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

/* ========== 通用区块 ========== */
.section-block {
  margin: 0 28rpx 40rpx;
  background: rgba(255, 255, 255, 0.04);
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  border-radius: 28rpx;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 32rpx 34rpx 24rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
}

.section-icon {
  font-size: 36rpx;
  margin-right: 16rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #f0c048;
  flex: 1;
}

.section-sub {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.4);
}

/* ========== 牌型列表 ========== */
.hand-rank-list {
  padding: 10rpx 0;
}

.hand-item {
  display: flex;
  align-items: center;
  padding: 22rpx 34rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s;
}

.hand-item:last-child {
  border-bottom: none;
}

.hand-item.rank-1 {
  background: linear-gradient(90deg, rgba(240, 192, 72, 0.12) 0%, transparent 100%);
}

.rank-badge {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  font-size: 22rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.rank-1 .rank-badge {
  background: linear-gradient(135deg, #f0c048, #e07800);
  color: #fff;
}

.hand-info {
  flex: 1;
}

.hand-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 6rpx;
}

.rank-1 .hand-name {
  color: #f0c048;
}

.hand-example {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.45);
}

.hand-label {
  font-size: 20rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-weight: 600;
}

.hand-label.royal {
  background: linear-gradient(135deg, #f0c048, #e07800);
  color: #fff;
}

.tip-box {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
  margin: 0 24rpx 28rpx;
  background: rgba(240, 192, 72, 0.08);
  border: 1rpx solid rgba(240, 192, 72, 0.2);
  border-radius: 16rpx;
  padding: 20rpx 24rpx;
}

.tip-icon {
  font-size: 28rpx;
  flex-shrink: 0;
}

.tip-text {
  font-size: 22rpx;
  color: rgba(240, 192, 72, 0.85);
  line-height: 36rpx;
}

/* ========== 游戏流程 ========== */
.flow-list {
  padding: 10rpx 34rpx 24rpx;
}

.flow-item {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
  position: relative;
}

.flow-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 15rpx;
  top: 40rpx;
  width: 2rpx;
  height: calc(100% + 12rpx);
  background: rgba(255, 255, 255, 0.08);
}

.flow-dot {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 8rpx;
  position: relative;
  z-index: 1;
}

.flow-dot.pre-flop { background: #4a90d9; box-shadow: 0 0 16rpx rgba(74, 144, 217, 0.6); }
.flow-dot.flop     { background: #48bb78; box-shadow: 0 0 16rpx rgba(72, 187, 120, 0.6); }
.flow-dot.turn     { background: #f0c048; box-shadow: 0 0 16rpx rgba(240, 192, 72, 0.6); }
.flow-dot.river    { background: #fc8181; box-shadow: 0 0 16rpx rgba(252, 129, 129, 0.6); }
.flow-dot.showdown { background: #b794f4; box-shadow: 0 0 16rpx rgba(183, 148, 244, 0.6); }

.flow-content {
  flex: 1;
}

.flow-head {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin-bottom: 8rpx;
}

.flow-name {
  font-size: 26rpx;
  font-weight: 600;
  color: #ffffff;
}

.flow-badge {
  font-size: 18rpx;
  padding: 4rpx 14rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.flow-desc {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 36rpx;
}

/* ========== 盲注区域 ========== */
.blind-cards {
  display: flex;
  gap: 16rpx;
  padding: 24rpx 28rpx 28rpx;
}

.blind-card {
  flex: 1;
  border-radius: 20rpx;
  padding: 28rpx 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12rpx;
}

.blind-card.dealer-card {
  background: linear-gradient(160deg, rgba(74, 144, 217, 0.2), rgba(74, 144, 217, 0.05));
  border: 1rpx solid rgba(74, 144, 217, 0.3);
}

.blind-card.small-card {
  background: linear-gradient(160deg, rgba(72, 187, 120, 0.2), rgba(72, 187, 120, 0.05));
  border: 1rpx solid rgba(72, 187, 120, 0.3);
}

.blind-card.big-card {
  background: linear-gradient(160deg, rgba(240, 192, 72, 0.2), rgba(240, 192, 72, 0.05));
  border: 1rpx solid rgba(240, 192, 72, 0.3);
}

.blind-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 800;
  color: #fff;
}

.dealer-card .blind-icon { background: #4a90d9; }
.small-card  .blind-icon { background: #48bb78; }
.big-card    .blind-icon { background: #f0c048; color: #1a1008; }

.blind-name {
  font-size: 22rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.blind-desc {
  font-size: 19rpx;
  color: rgba(255, 255, 255, 0.45);
  line-height: 30rpx;
}

/* ========== 行动选项 ========== */
.action-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  padding: 20rpx 28rpx 28rpx;
}

.action-item {
  width: calc(50% - 8rpx);
  border-radius: 20rpx;
  padding: 28rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.08);
}

.action-item:last-child:nth-child(odd) {
  width: 100%;
}

.action-item.check  { background: rgba(74, 144, 217, 0.1); border-color: rgba(74, 144, 217, 0.25); }
.action-item.bet    { background: rgba(240, 192, 72, 0.1); border-color: rgba(240, 192, 72, 0.25); }
.action-item.call   { background: rgba(72, 187, 120, 0.1); border-color: rgba(72, 187, 120, 0.25); }
.action-item.fold   { background: rgba(252, 129, 129, 0.1); border-color: rgba(252, 129, 129, 0.25); }
.action-item.allin  { background: rgba(183, 148, 244, 0.1); border-color: rgba(183, 148, 244, 0.25); }

.action-icon {
  font-size: 44rpx;
}

.action-name {
  font-size: 26rpx;
  font-weight: 700;
  color: #ffffff;
}

.action-desc {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.45);
  line-height: 30rpx;
}

/* ========== 底部按钮 ========== */
.bottom-section {
  padding: 0 40rpx 20rpx;
}

.start-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(135deg, #c8a020 0%, #f0c048 50%, #e07800 100%);
  color: #1a1008;
  font-size: 34rpx;
  font-weight: 800;
  border-radius: 48rpx;
  border: none;
  box-shadow: 0 12rpx 40rpx rgba(240, 192, 72, 0.4);
  letter-spacing: 4rpx;
  transition: all 0.25s ease;
}

.start-btn:active {
  transform: translateY(4rpx);
  box-shadow: 0 6rpx 20rpx rgba(240, 192, 72, 0.25);
}
</style>
