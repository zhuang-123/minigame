<template>
  <view class="rule-page">
    <!-- 顶部标题栏 -->
    <view class="top-bar">
      <view class="title-group">
        <view class="page-title">谎言扑克</view>
        <view class="page-subtitle">游戏规则</view>
      </view>
      <view class="quick-info">
        <view class="info-tag">
          <text class="info-icon">👥</text>
          <text class="info-text">3-5人</text>
        </view>
        <view class="info-tag">
          <text class="info-icon">🃏</text>
          <text class="info-text">10张牌</text>
        </view>
        <view class="info-tag">
          <text class="info-icon">❤️</text>
          <text class="info-text">3滴血</text>
        </view>
      </view>
      <button class="start-btn" @tap="goToGame">开始游戏</button>
    </view>

    <!-- 主体内容：三列网格布局 -->
    <view class="main-grid">
      <!-- 第一列 -->
      <view class="grid-col">
        <!-- 游戏目标 -->
        <view class="section-block">
          <view class="section-header">
            <view class="section-icon">🎯</view>
            <view class="section-title">游戏目标</view>
          </view>
          <view class="goal-content">
            <view class="goal-item">
              <view class="goal-icon">🏆</view>
              <view class="goal-text">第一个清空手牌的玩家获胜</view>
            </view>
            <view class="goal-item">
              <view class="goal-icon">💥</view>
              <view class="goal-text">血量耗尽（3滴血）则淘汰</view>
            </view>
            <view class="goal-item">
              <view class="goal-icon">🎲</view>
              <view class="goal-text">运用策略和心理战术战胜对手</view>
            </view>
          </view>
        </view>

        <!-- 数值大小 -->
        <view class="section-block">
          <view class="section-header">
            <view class="section-icon">🔢</view>
            <view class="section-title">数值大小</view>
            <view class="section-sub">由小到大</view>
          </view>
          <view class="value-order">
            <view class="value-item">2</view>
            <view class="value-item">3</view>
            <view class="value-item">4</view>
            <view class="value-item">5</view>
            <view class="value-item">6</view>
            <view class="value-item">7</view>
            <view class="value-item">8</view>
            <view class="value-item">9</view>
            <view class="value-item">10</view>
            <view class="value-item">J</view>
            <view class="value-item">Q</view>
            <view class="value-item">K</view>
            <view class="value-item king">A</view>
          </view>
          <view class="tip-box">
            <text class="tip-icon">✨</text>
            <text class="tip-text">A最大，可组成 A-2-3-4-5 的顺子</text>
          </view>
        </view>
      </view>

      <!-- 第二列：牌型强度 -->
      <view class="grid-col">
        <view class="section-block full-height">
          <view class="section-header">
            <view class="section-icon">🏆</view>
            <view class="section-title">牌型强度</view>
            <view class="section-sub">由弱到强</view>
          </view>
          <view class="hand-rank-list">
            <view class="hand-item">
              <view class="rank-badge">1</view>
              <view class="hand-info">
                <view class="hand-name">单张</view>
                <view class="hand-example">任意一张牌</view>
              </view>
            </view>
            <view class="hand-item">
              <view class="rank-badge">2</view>
              <view class="hand-info">
                <view class="hand-name">对子</view>
                <view class="hand-example">两张相同点数的牌</view>
              </view>
            </view>
            <view class="hand-item">
              <view class="rank-badge">3</view>
              <view class="hand-info">
                <view class="hand-name">三条</view>
                <view class="hand-example">三张相同点数的牌</view>
              </view>
            </view>
            <view class="hand-item">
              <view class="rank-badge">4</view>
              <view class="hand-info">
                <view class="hand-name">顺子</view>
                <view class="hand-example">五张连续点数的牌</view>
              </view>
            </view>
            <view class="hand-item">
              <view class="rank-badge">5</view>
              <view class="hand-info">
                <view class="hand-name">葫芦</view>
                <view class="hand-example">三条 + 对子</view>
              </view>
            </view>
            <view class="hand-item">
              <view class="rank-badge">6</view>
              <view class="hand-info">
                <view class="hand-name">炸弹</view>
                <view class="hand-example">四张相同点数的牌</view>
              </view>
            </view>
            <view class="hand-item rank-7">
              <view class="rank-badge">7</view>
              <view class="hand-info">
                <view class="hand-name">同花顺</view>
                <view class="hand-example">五张连续且同花色</view>
              </view>
              <view class="hand-label royal">最强</view>
            </view>
          </view>
          <view class="tip-box">
            <text class="tip-icon">💡</text>
            <text class="tip-text">万能牌可替代任何点数和花色</text>
          </view>
        </view>
      </view>

      <!-- 第三列 -->
      <view class="grid-col">
        <!-- 核心规则 -->
        <view class="section-block">
          <view class="section-header">
            <view class="section-icon">📜</view>
            <view class="section-title">核心规则</view>
          </view>
          <view class="rule-content">
            <view class="rule-item">
              <view class="rule-number">1</view>
              <view class="rule-text">
                <view class="rule-title">发牌</view>
                <view class="rule-desc">每位玩家10张牌，随机指定一张万能牌</view>
              </view>
            </view>
            <view class="rule-item">
              <view class="rule-number">2</view>
              <view class="rule-text">
                <view class="rule-title">出牌</view>
                <view class="rule-desc">依次出牌，可选真实或伪装牌型并声明</view>
              </view>
            </view>
            <view class="rule-item">
              <view class="rule-number">3</view>
              <view class="rule-text">
                <view class="rule-title">质疑</view>
                <view class="rule-desc">质疑成功上家收回牌，失败则质疑者扣血</view>
              </view>
            </view>
            <view class="rule-item">
              <view class="rule-number">4</view>
              <view class="rule-text">
                <view class="rule-title">过牌</view>
                <view class="rule-desc">相信上家可过牌，由下家继续行动</view>
              </view>
            </view>
          </view>
        </view>

        <!-- 策略技巧 -->
        <view class="section-block">
          <view class="section-header">
            <view class="section-icon">💡</view>
            <view class="section-title">策略技巧</view>
          </view>
          <view class="strategy-grid">
            <view class="strategy-item">
              <view class="strategy-icon">🎭</view>
              <view class="strategy-name">虚实结合</view>
              <view class="strategy-desc">建立信任，关键时刻出其不意</view>
            </view>
            <view class="strategy-item">
              <view class="strategy-icon">🧠</view>
              <view class="strategy-name">概率计算</view>
              <view class="strategy-desc">根据已出牌推算说谎概率</view>
            </view>
            <view class="strategy-item">
              <view class="strategy-icon">❤️</view>
              <view class="strategy-name">血量管理</view>
              <view class="strategy-desc">血量低时谨慎质疑</view>
            </view>
            <view class="strategy-item">
              <view class="strategy-icon">🎯</view>
              <view class="strategy-name">诱敌深入</view>
              <view class="strategy-desc">大牌时示弱诱敌质疑</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    goToGame() {
      uni.navigateTo({ url: '/pages/lie/index' });
    }
  }
};
</script>

<style scoped>
/* ========== 全局 ========== */
.rule-page {
  min-height: 100vh;
  background: #0e1218;
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* ========== 顶部标题栏 ========== */
.top-bar {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 0 8rpx 16rpx;
  margin-bottom: 16rpx;
  border-bottom: 1rpx solid rgba(240, 192, 72, 0.15);
}

.title-group {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.page-title {
  font-size: 26rpx;
  font-weight: 800;
  color: #f0c048;
  letter-spacing: 2rpx;
}

.page-subtitle {
  font-size: 16rpx;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2rpx;
}

.quick-info {
  display: flex;
  gap: 12rpx;
  flex: 1;
  justify-content: center;
}

.info-tag {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(240, 192, 72, 0.25);
  border-radius: 30rpx;
  padding: 8rpx 20rpx;
}

.info-icon {
  font-size: 18rpx;
}

.info-text {
  font-size: 16rpx;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

.start-btn {
  flex-shrink: 0;
  height: 48rpx;
  line-height: 48rpx;
  padding: 0 28rpx;
  background: linear-gradient(135deg, #c8a020 0%, #f0c048 50%, #e07800 100%);
  color: #1a1008;
  font-size: 18rpx;
  font-weight: 800;
  border-radius: 28rpx;
  border: none;
  box-shadow: 0 6rpx 20rpx rgba(240, 192, 72, 0.35);
  letter-spacing: 2rpx;
}

.start-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 3rpx 10rpx rgba(240, 192, 72, 0.25);
}

/* ========== 三列网格 ========== */
.main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16rpx;
  min-height: 0;
}

.grid-col {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  min-height: 0;
}

/* ========== 通用区块 ========== */
.section-block {
  background: rgba(255, 255, 255, 0.04);
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  border-radius: 20rpx;
  overflow: hidden;
}

.section-block.full-height {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 12rpx 16rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.06);
}

.section-icon {
  font-size: 22rpx;
  margin-right: 8rpx;
}

.section-title {
  font-size: 18rpx;
  font-weight: 700;
  color: #f0c048;
  flex: 1;
}

.section-sub {
  font-size: 14rpx;
  color: rgba(255, 255, 255, 0.4);
}

/* ========== 游戏目标 ========== */
.goal-content {
  padding: 12rpx 16rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.goal-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.goal-icon {
  font-size: 20rpx;
  flex-shrink: 0;
}

.goal-text {
  font-size: 15rpx;
  color: rgba(255, 255, 255, 0.75);
  line-height: 22rpx;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ========== 牌型列表 ========== */
.hand-rank-list {
  padding: 4rpx 0;
  flex: 1;
}

.hand-item {
  display: flex;
  align-items: center;
  padding: 8rpx 16rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.05);
}

.hand-item:last-child {
  border-bottom: none;
}

.hand-item.rank-7 {
  background: linear-gradient(90deg, rgba(240, 192, 72, 0.12) 0%, transparent 100%);
}

.rank-badge {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.5);
  font-size: 15rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12rpx;
  flex-shrink: 0;
}

.rank-7 .rank-badge {
  background: linear-gradient(135deg, #f0c048, #e07800);
  color: #fff;
}

.hand-info {
  flex: 1;
  min-width: 0;
}

.hand-name {
  font-size: 17rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rpx;
}

.rank-7 .hand-name {
  color: #f0c048;
}

.hand-example {
  font-size: 14rpx;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hand-label {
  font-size: 13rpx;
  padding: 3rpx 10rpx;
  border-radius: 14rpx;
  font-weight: 600;
}

.hand-label.royal {
  background: linear-gradient(135deg, #f0c048, #e07800);
  color: #fff;
}

/* ========== 规则内容 ========== */
.rule-content {
  padding: 12rpx 16rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.rule-item {
  display: flex;
  gap: 12rpx;
  align-items: flex-start;
}

.rule-number {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: rgba(240, 192, 72, 0.15);
  border: 1rpx solid rgba(240, 192, 72, 0.3);
  color: #f0c048;
  font-size: 15rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.rule-text {
  flex: 1;
  min-width: 0;
}

.rule-title {
  font-size: 16rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rpx;
}

.rule-desc {
  font-size: 14rpx;
  color: rgba(255, 255, 255, 0.55);
  line-height: 20rpx;
}

/* ========== 策略技巧 ========== */
.strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8rpx;
  padding: 12rpx 14rpx;
}

.strategy-item {
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  border-radius: 12rpx;
  padding: 10rpx 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4rpx;
}

.strategy-icon {
  font-size: 26rpx;
}

.strategy-name {
  font-size: 15rpx;
  font-weight: 700;
  color: #ffffff;
}

.strategy-desc {
  font-size: 12rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 16rpx;
}

/* ========== 数值大小 ========== */
.value-order {
  display: flex;
  flex-wrap: wrap;
  gap: 5rpx;
  padding: 12rpx 14rpx;
  justify-content: center;
}

.value-item {
  width: 32rpx;
  height: 32rpx;
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
}

.value-item.king {
  background: linear-gradient(135deg, #f0c048, #e07800);
  color: #1a1008;
  border-color: #f0c048;
  transform: scale(1.1);
}

/* ========== 提示框 ========== */
.tip-box {
  display: flex;
  align-items: center;
  gap: 6rpx;
  margin: 0 14rpx 12rpx;
  background: rgba(240, 192, 72, 0.08);
  border: 1rpx solid rgba(240, 192, 72, 0.2);
  border-radius: 10rpx;
  padding: 8rpx 12rpx;
}

.tip-icon {
  font-size: 16rpx;
  flex-shrink: 0;
}

.tip-text {
  font-size: 13rpx;
  color: rgba(240, 192, 72, 0.9);
  line-height: 18rpx;
  flex: 1;
}
</style>
