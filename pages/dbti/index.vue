<template>
  <view class="container">
    <!-- 头部标题 -->
    <view class="header">
      <text class="title">DBTI 日常人格测试</text>
      <text class="subtitle">了解真实的自己</text>
    </view>
    
    <!-- 测试介绍 -->
    <view class="intro">
      <view class="intro-item">
        <image src="https://bk-minigame.oss-cn-shenzhen.aliyuncs.com/images/index-bg.png" mode="aspectFit" class="intro-image"></image>
      </view>
      <view class="intro-text">
        <text class="intro-title">什么是 DBTI？</text>
        <text class="intro-content">DBTI是一套</text>
        <text class="intro-content">专为当代年轻人设计的「日常发疯人格测试」。</text>
        <text class="intro-content">它不会告诉你该成为谁，</text>
        <text class="intro-content">只会精准揭露——</text>
        <text class="intro-content">你是怎么在生活里一点点破大防的。</text>
        <text class="intro-content">本测试纯属娱乐，</text>
        <text class="intro-content">适用于年轻人自嘲、吐槽、发疯和社交玩梗。</text>
      </view>
    </view>
    
    <!-- 开始测试按钮 -->
    <view class="start-section">
      <text class="start-desc">完成测试后，你将获得详细的人格分析报告</text>
      <button class="start-btn" @click="startTest">开始测试</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 测试相关数据
    };
  },
  methods: {
    startTest() {
      // 导航到测试页面
      uni.navigateTo({
        url: '/pages/dbti/test'
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
  padding-top: 40rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.subtitle {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.intro {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.intro-item {
  text-align: center;
  margin-bottom: 30rpx;
}

.intro-image {
  height: 200rpx;
  border-radius: 50%;
}

.intro-text {
  text-align: left;
}

.intro-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.intro-content {
  font-size: 24rpx;
  color: #666;
  line-height: 36rpx;
  margin-bottom: 30rpx;
  display: block;
}

.dimension-list {
  margin-top: 20rpx;
}

.dimension-item {
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 4rpx solid #0B63F6;
}

.dimension-label {
  font-size: 24rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 5rpx;
}

.dimension-desc {
  font-size: 20rpx;
  color: #999;
  display: block;
}

.start-section {
  text-align: center;
  margin-top: 40rpx;
}

.start-desc {
  font-size: 22rpx;
  color: #666;
  margin-bottom: 30rpx;
  display: block;
}

.start-btn {
  background-color: #0B63F6;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  padding: 20rpx 0;
  border-radius: 50rpx;
  width: 80%;
  margin: 0 auto;
}

.start-btn::after {
  border: none;
}
</style>