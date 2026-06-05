<template>
  <view class="container">
    <!-- 结果标题 -->
    <view class="header">
      <text class="title">你的人格类型</text>
    </view>
    
    <!-- 人格类型卡片 -->
    <view class="result-card">
      <text class="personality-type">{{ personalityInfo.type }}</text>
      <text class="personality-name">{{ personalityInfo.name }}</text>
      <image :src="personalityInfo.image" mode="aspectFit" class="personality-image"></image>
    </view>
    
    <!-- 核心定位 -->
    <view class="analysis-card">
      <text class="analysis-title">核心定位</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.description"></rich-text>
    </view>
    
    <!-- 行为机制 -->
    <view class="analysis-card">
      <text class="analysis-title">行为机制</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.behavioral"></rich-text>
    </view>
    
    <!-- 社交与职场表现 -->
    <view class="analysis-card">
      <text class="analysis-title">社交与职场表现</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.social"></rich-text>
    </view>
    
    <!-- 优势结构 -->
    <view class="analysis-card">
      <text class="analysis-title">优势结构</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.dominant"></rich-text>
    </view>
    
    <!-- 风险结构 -->
    <view class="analysis-card">
      <text class="analysis-title">风险结构</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.risk"></rich-text>
    </view>
    
    <!-- 调整建议 -->
    <view class="analysis-card">
      <text class="analysis-title">调整建议</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.suggest"></rich-text>
    </view>
    
    <!-- 总结 -->
    <view class="analysis-card">
      <text class="analysis-title">总结</text>
      <rich-text class="analysis-content" :nodes="personalityInfo.summary"></rich-text>
      
      <!-- 特质列表 -->
      <view class="traits-list">
        <view class="trait-item" v-for="(trait, index) in personalityInfo.traits" :key="index">
          <text class="trait-label">{{ trait.label }}</text>
          <text class="trait-desc">{{ trait.description }}</text>
        </view>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-buttons">
<!--      <button class="action-btn share-btn" @click="shareResult">分享结果</button>-->
      <button class="action-btn restart-btn" @click="restartTest">重新测试</button>
      <button class="action-btn home-btn" @click="goHome">返回首页</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      personalityType: '',
      personalityChinese: '',
      personalityDesc: '',
      personalityInfo: {
        type: '',
        name: '',
        description: '',
        behavioral: '',
        social: '',
        dominant: '',
        risk: '',
        suggest: '',
        summary: '',
        traits: [],
        advice: '',
        image: ''
      }
    };
  },
  onLoad(options) {
    console.log('Received options:', options);
    
    // 获取人格类型（支持多种参数名）
    const type = options.type || options.personality_type || 'ISTJ';
    // 获取人格中文名称（支持多种参数名，并进行URL解码）
    const name = options.name ? decodeURIComponent(options.name) : (options.personality_chinese ? decodeURIComponent(options.personality_chinese) : '');
    // 获取人格描述（支持多种参数名，并进行URL解码）
    const desc = options.desc ? decodeURIComponent(options.desc) : (options.personality_desc ? decodeURIComponent(options.personality_desc) : '');
    // 获取图片URL（由submitResult接口返回）
    const image = options.image ? decodeURIComponent(options.image).replace(/[`\s]/g, '').trim() : '';
    
    // 直接设置人格信息（从URL参数获取，不再调用API）
    this.personalityInfo = {
      type: type,
      name: name || type,
      description: desc || '暂无描述',
      behavioral: options.behavioral ? decodeURIComponent(options.behavioral) : '',
      social: options.social ? decodeURIComponent(options.social) : '',
      dominant: options.dominant ? decodeURIComponent(options.dominant) : '',
      risk: options.risk ? decodeURIComponent(options.risk) : '',
      suggest: options.suggest ? decodeURIComponent(options.suggest) : '',
      summary: options.summary ? decodeURIComponent(options.summary) : '',
      traits: [],
      advice: '',
      image: image || `https://a0ai.marscode.cn/api/ide/v1/text_to_image?prompt=${encodeURIComponent((name || type) + ' personality type illustration, modern flat design')}&image_size=square_hd`
    };
    
    console.log('Loaded personality info:', this.personalityInfo);
  },
  methods: {
    shareResult() {
      // 分享结果功能
      uni.showToast({
        title: '分享功能开发中',
        icon: 'none'
      });
    },
    restartTest() {
      // 重新测试
      uni.navigateTo({
        url: '/pages/dbti/test'
      });
    },
    goHome() {
      // 返回游戏列表页（首页）
      // 使用 reLaunch 直接跳转到首页，确保无论从哪里进入都能正确返回
      uni.reLaunch({
        url: '/pages/index/index'
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
  display: block;
}

.result-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.personality-type {
  font-size: 48rpx;
  font-weight: bold;
  color: #0B63F6;
  margin-bottom: 10rpx;
  display: block;
}

.personality-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 30rpx;
  display: block;
}

.personality-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  margin: 0 auto;
}

.analysis-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.analysis-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.analysis-content {
  font-size: 24rpx;
  color: #666;
  line-height: 36rpx;
  margin-bottom: 30rpx;
  display: block;
}

.traits-list {
  margin-top: 20rpx;
}

.trait-item {
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 4rpx solid #0B63F6;
}

.trait-label {
  font-size: 24rpx;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 5rpx;
}

.trait-desc {
  font-size: 20rpx;
  color: #999;
  display: block;
}

.advice-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.advice-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.advice-content {
  font-size: 24rpx;
  color: #666;
  line-height: 36rpx;
  display: block;
}

.action-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 40rpx;
}

.action-btn {
  flex: 1;
  padding: 24rpx 0;
  border-radius: 12rpx;
  font-size: 26rpx;
  font-weight: 600;
}

.share-btn {
  background-color: #fff;
  color: #0B63F6;
  border: 2rpx solid #0B63F6;
}

.restart-btn {
  background-color: #fff;
  color: #666;
  border: 2rpx solid #e0e0e0;
}

.home-btn {
  background-color: #0B63F6;
  color: #fff;
}

.action-btn::after {
  border: none;
}
</style>