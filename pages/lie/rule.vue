<template>
  <view class="rule-page">
    <!-- 快速概览标签 -->
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

    <!-- 游戏目标区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🎯</view>
        <view class="section-title">游戏目标</view>
        <view class="section-sub">胜利条件</view>
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

    <!-- 牌型强度区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🏆</view>
        <view class="section-title">牌型强度</view>
        <view class="section-sub">由弱到强排列</view>
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
            <view class="hand-example">五张连续且同花色的牌</view>
          </view>
          <view class="hand-label royal">最强</view>
        </view>
      </view>
      <view class="tip-box">
        <text class="tip-icon">💡</text>
        <text class="tip-text">万能牌可以替代任何点数和花色，是你说谎的得力助手！</text>
      </view>
    </view>

    <!-- 核心规则区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">📜</view>
        <view class="section-title">核心规则</view>
        <view class="section-sub">游戏流程</view>
      </view>
      <view class="rule-content">
        <view class="rule-item">
          <view class="rule-number">1</view>
          <view class="rule-text">
            <view class="rule-title">发牌</view>
            <view class="rule-desc">每位玩家获得10张牌，系统随机指定一张万能牌</view>
          </view>
        </view>
        <view class="rule-item">
          <view class="rule-number">2</view>
          <view class="rule-text">
            <view class="rule-title">出牌</view>
            <view class="rule-desc">玩家依次出牌，可选择真实牌型或伪装牌型，同时声明牌型和点数</view>
          </view>
        </view>
        <view class="rule-item">
          <view class="rule-number">3</view>
          <view class="rule-text">
            <view class="rule-title">质疑</view>
            <view class="rule-desc">下家可以选择质疑上家的牌型，如果质疑成功，上家收回牌并失去出牌权；如果质疑失败，质疑者扣1滴血</view>
          </view>
        </view>
        <view class="rule-item">
          <view class="rule-number">4</view>
          <view class="rule-text">
            <view class="rule-title">过牌</view>
            <view class="rule-desc">如果选择相信上家的牌型，可以选择过牌，由下一位玩家继续行动</view>
          </view>
        </view>
        <view class="rule-item">
          <view class="rule-number">5</view>
          <view class="rule-text">
            <view class="rule-title">胜利条件</view>
            <view class="rule-desc">第一个清空手牌的玩家获胜，血量耗尽则淘汰</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 策略技巧区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">💡</view>
        <view class="section-title">策略技巧</view>
        <view class="section-sub">获胜秘诀</view>
      </view>
      <view class="strategy-grid">
        <view class="strategy-item">
          <view class="strategy-icon">🎭</view>
          <view class="strategy-name">虚实结合</view>
          <view class="strategy-desc">偶尔说实话建立信任，关键时刻出其不意</view>
        </view>
        <view class="strategy-item">
          <view class="strategy-icon">🧠</view>
          <view class="strategy-name">概率计算</view>
          <view class="strategy-desc">根据手牌和已出的牌，计算对方说谎的概率</view>
        </view>
        <view class="strategy-item">
          <view class="strategy-icon">❤️</view>
          <view class="strategy-name">血量管理</view>
          <view class="strategy-desc">血量低时谨慎质疑，保留生存机会</view>
        </view>
        <view class="strategy-item">
          <view class="strategy-icon">🎯</view>
          <view class="strategy-name">诱敌深入</view>
          <view class="strategy-desc">持有大牌时故意示弱，引诱对手质疑</view>
        </view>
      </view>
    </view>

    <!-- 数值大小区域 -->
    <view class="section-block">
      <view class="section-header">
        <view class="section-icon">🔢</view>
        <view class="section-title">数值大小</view>
        <view class="section-sub">点数排序</view>
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
        <text class="tip-text">A是最大的点数，可以组成A-2-3-4-5的顺子</text>
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
  padding-bottom: 80rpx;
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

/* ========== 游戏目标区域 ========== */
.goal-content {
  padding: 24rpx 34rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.goal-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.goal-icon {
  font-size: 32rpx;
  flex-shrink: 0;
  margin-top: 4rpx;
}

.goal-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 40rpx;
  flex: 1;
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

.hand-item.rank-7 {
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

.rank-7 .rank-badge {
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

.rank-7 .hand-name {
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

/* ========== 规则内容 ========== */
.rule-content {
  padding: 24rpx 34rpx;
  display: flex;
  flex-direction: column;
  gap: 28rpx;
}

.rule-item {
  display: flex;
  gap: 24rpx;
}

.rule-number {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: rgba(240, 192, 72, 0.15);
  border: 1rpx solid rgba(240, 192, 72, 0.3);
  color: #f0c048;
  font-size: 24rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rule-text {
  flex: 1;
}

.rule-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8rpx;
}

.rule-desc {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 36rpx;
}

/* ========== 策略技巧 ========== */
.strategy-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 24rpx 28rpx;
}

.strategy-item {
  background: rgba(255, 255, 255, 0.06);
  border: 1rpx solid rgba(255, 255, 255, 0.08);
  border-radius: 20rpx;
  padding: 28rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12rpx;
  transition: all 0.2s ease;
}

.strategy-item:hover {
  background: rgba(240, 192, 72, 0.08);
  border-color: rgba(240, 192, 72, 0.2);
}

.strategy-icon {
  font-size: 48rpx;
}

.strategy-name {
  font-size: 24rpx;
  font-weight: 700;
  color: #ffffff;
}

.strategy-desc {
  font-size: 19rpx;
  color: rgba(255, 255, 255, 0.45);
  line-height: 30rpx;
}

/* ========== 数值大小 ========== */
.value-order {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  padding: 24rpx 28rpx;
  justify-content: center;
}

.value-item {
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.08);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
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
  flex: 1;
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