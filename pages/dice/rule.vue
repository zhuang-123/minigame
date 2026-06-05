<template>
  <view class="rule-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">叫骰游戏规则</view>
      <view class="nav-right"></view>
    </view>

    <!-- 游戏介绍区域 -->
    <view class="intro-section">
      <view class="intro-card">
        <view class="game-icon">🎲</view>
        <view class="game-title">叫骰游戏</view>
        <view class="game-desc">
          一款经典的多人在线骰子游戏，考验你的判断力和心理博弈能力！
        </view>
      </view>
    </view>

    <!-- 规则说明区域 -->
    <view class="rules-section">
      <view class="section-title">游戏规则</view>

      <view class="rule-card">
        <view class="rule-item">
          <view class="rule-number">1</view>
          <view class="rule-content">
            <view class="rule-title">基本玩法</view>
            <view class="rule-desc">
              游戏开始时，每位玩家会获得5颗骰子，摇出后只能看到自己的骰子点数。
            </view>
          </view>
        </view>

        <view class="rule-item">
          <view class="rule-number">2</view>
          <view class="rule-content">
            <view class="rule-title">叫骰规则</view>
            <view class="rule-desc">
              玩家轮流叫骰，需要指定骰子的数量和点数（例如：3个6）。
            </view>
            <view class="rule-desc">
              后叫的玩家必须比前一位叫的骰子数量更多，或者数量相同但点数更高。
            </view>
          </view>
        </view>

        <view class="rule-item">
          <view class="rule-number">3</view>
          <view class="rule-content">
            <view class="rule-title">开骰判定</view>
            <view class="rule-desc">
              当玩家认为前一位玩家的叫骰不合理时，可以选择"开"。
            </view>
            <view class="rule-desc">
              此时所有玩家揭开骰子，计算所有骰子中对应点数的总数：
            </view>
            <view class="rule-desc">
              - 如果总数大于等于叫骰数量，则开骰者输；
            </view>
            <view class="rule-desc">
              - 如果总数小于叫骰数量，则叫骰者输。
            </view>
          </view>
        </view>

        <view class="rule-item">
          <view class="rule-number">4</view>
          <view class="rule-content">
            <view class="rule-title">特殊规则</view>
            <view class="rule-desc">
              1点在没有被特别指定时，可以作为任何点数使用（称为"万能点"）。
            </view>
            <view class="rule-desc">
              当玩家叫"斋"时，1点只能作为1点，不再是万能点。
            </view>
          </view>
        </view>

        <view class="rule-item">
          <view class="rule-number">5</view>
          <view class="rule-content">
            <view class="rule-title">胜负判定</view>
            <view class="rule-desc">
              输的玩家需要扣除相应的积分或接受惩罚，游戏可以设定局数或积分上限。
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 操作指南区域 -->
    <view class="guide-section">
      <view class="section-title">操作指南</view>

      <view class="guide-card">
        <view class="guide-item">
          <view class="guide-icon">🎯</view>
          <view class="guide-content">
            <view class="guide-title">开始游戏</view>
            <view class="guide-desc">点击"开始游戏"按钮，等待其他玩家加入</view>
          </view>
        </view>

        <view class="guide-item">
          <view class="guide-icon">🎲</view>
          <view class="guide-content">
            <view class="guide-title">摇骰子</view>
            <view class="guide-desc">游戏开始后，点击"摇骰"按钮获得随机点数</view>
          </view>
        </view>

        <view class="guide-item">
          <view class="guide-icon">📢</view>
          <view class="guide-content">
            <view class="guide-title">叫骰</view>
            <view class="guide-desc">根据自己的骰子情况，输入数量和点数进行叫骰</view>
          </view>
        </view>

        <view class="guide-item">
          <view class="guide-icon">🔍</view>
          <view class="guide-content">
            <view class="guide-title">开骰</view>
            <view class="guide-desc">当怀疑对方叫骰不合理时，点击"开"按钮</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作按钮 -->
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
      uni.navigateBack({
        delta: 1
      });
    },
    // 进入游戏页面
    goToGame() {
      uni.navigateTo({
        url: '/pages/dice/index'
      });
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.rule-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #eaf2ff 0%, #ffffff 50%, #f7fbff 100%);
  padding-bottom: 60rpx;
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
  position: relative;
}

.nav-back {
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

.nav-title {
  font-size: 32rpx;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-right {
  width: 60rpx;
}

/* 游戏介绍区域 */
.intro-section {
  padding: 40rpx 30rpx;
}

.intro-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 50rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.15),
  0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.game-icon {
  font-size: 120rpx;
  margin-bottom: 20rpx;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10rpx); }
}

.game-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15rpx;
}

.game-desc {
  font-size: 26rpx;
  color: #6b7280;
  text-align: center;
  line-height: 40rpx;
}

/* 规则说明区域 */
.rules-section {
  padding: 0 30rpx 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 25rpx;
  padding-left: 10rpx;
  border-left: 6rpx solid #0B63F6;
}

.rule-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.15),
  0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.rule-item {
  display: flex;
  margin-bottom: 35rpx;
  padding-bottom: 35rpx;
  border-bottom: 2rpx solid #f1f5f9;
}

.rule-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.rule-number {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  font-weight: 700;
  color: #ffffff;
  margin-right: 25rpx;
  flex-shrink: 0;
}

.rule-content {
  flex: 1;
}

.rule-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12rpx;
}

.rule-desc {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 38rpx;
  margin-bottom: 8rpx;
}

.rule-desc:last-child {
  margin-bottom: 0;
}

/* 操作指南区域 */
.guide-section {
  padding: 0 30rpx 40rpx;
}

.guide-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.15),
  0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.guide-item {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #f1f5f9;
}

.guide-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.guide-icon {
  font-size: 50rpx;
  margin-right: 25rpx;
  flex-shrink: 0;
}

.guide-content {
  flex: 1;
}

.guide-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8rpx;
}

.guide-desc {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 36rpx;
}

/* 底部操作区域 */
.bottom-section {
  padding: 0 30rpx;
}

.start-btn {
  width: 100%;
  height: 90rpx;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 45rpx;
  border: none;
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.3);
  transition: all 0.3s ease;
}

.start-btn:active {
  transform: translateY(4rpx);
  box-shadow: 0 6rpx 20rpx rgba(11, 99, 246, 0.2);
}

/* 响应式设计 */
@media (max-width: 375px) {
  .rule-card, .guide-card {
    padding: 20rpx;
  }

  .game-title {
    font-size: 32rpx;
  }

  .game-desc {
    font-size: 24rpx;
  }
}
</style>