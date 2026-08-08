<template>
  <view class="select-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">快速匹配</view>
      <view class="nav-right" @tap="goToRoom">
        <text class="room-icon">房间</text>
      </view>
    </view>

    <!-- 人数选择卡片 -->
    <view class="mode-section">
      <view class="mode-tip">选择对战人数</view>
      <view class="mode-cards">
        <view
          class="mode-card"
          v-for="n in modeOptions"
          :key="n"
          :class="{ active: selectedMode === n }"
          @tap="selectMode(n)"
        >
          <view class="mode-icon">{{ '🎲'.repeat(n) }}</view>
          <view class="mode-num">{{ n }}人局</view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottom-section">
      <button class="start-btn" :disabled="!selectedMode" @tap="startMatch">开始匹配</button>
      <view class="room-link" @tap="goToRoom">没有合适的人数？去开房间</view>
    </view>

    <!-- 匹配等待遮罩 -->
    <view class="match-mask" v-if="isMatching">
      <view class="match-card">
        <view class="match-icon">🔄</view>
        <view class="match-title">匹配中</view>
        <view class="match-desc">
          已匹配 {{ matchedCount }}/{{ selectedMode }} 人<br>
          匹配时长: {{ matchDurationText }}
        </view>
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
import { formatDuration } from '../../common/format';

export default {
  data() {
    return {
      modeOptions: [2, 3, 4, 5],
      selectedMode: null,
      isMatching: false,
      matchStartTime: null,
      matchDuration: 0,
      matchTimer: null,
      matchedCount: 0,
      userId: ''
    };
  },

  computed: {
    matchDurationText() {
      return formatDuration(this.matchDuration);
    }
  },

  onLoad() {
    this.userId = uni.getStorageSync('user_id') || '';
    uni.$on('websocketMessage', this.handleWebSocketMessage);
    uni.$on('websocketClose', this.handleWebSocketClose);
  },

  onUnload() {
    uni.$off('websocketMessage', this.handleWebSocketMessage);
    uni.$off('websocketClose', this.handleWebSocketClose);
    this.clearMatchTimer();
    // 若尚未匹配成功就离开本页，断开连接，服务端会自动把玩家从队列移除
    if (this.isMatching) {
      websocketService.disconnect();
    }
  },

  methods: {
    goBack() {
      uni.navigateBack({ delta: 1 });
    },

    goToRoom() {
      uni.navigateTo({ url: '/pages/dice/room' });
    },

    selectMode(n) {
      if (this.isMatching) return;
      this.selectedMode = n;
    },

    startMatch() {
      if (!this.selectedMode) {
        uni.showToast({ title: '请选择对战人数', icon: 'none' });
        return;
      }
      if (!this.userId) {
        uni.showModal({
          title: '提示',
          content: '请先登录后再进行匹配',
          confirmText: '去登录',
          cancelText: '取消',
          success: (res) => {
            if (res.confirm) {
              uni.switchTab({ url: '/pages/mine/index' });
            }
          }
        });
        return;
      }

      this.isMatching = true;
      this.matchedCount = 0;

      websocketService.connect(this.userId, 'ws://120.55.84.53:8888/ws').then(() => {
        websocketService.sendMessage(`MATCH:${this.selectedMode}`);
        this.matchStartTime = new Date();
        this.matchDuration = 0;
        this.startMatchTimer();
      }).catch(() => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
        this.isMatching = false;
      });
    },

    startMatchTimer() {
      this.clearMatchTimer();
      this.matchTimer = setInterval(() => {
        if (this.matchStartTime) {
          this.matchDuration = Math.floor((new Date() - this.matchStartTime) / 1000);
        }
      }, 1000);
    },

    clearMatchTimer() {
      if (this.matchTimer) {
        clearInterval(this.matchTimer);
        this.matchTimer = null;
      }
    },

    cancelMatch() {
      this.isMatching = false;
      this.clearMatchTimer();
      websocketService.disconnect();
      uni.showToast({ title: '已取消匹配', icon: 'none' });
    },

    handleWebSocketMessage(message) {
      if (!message || !message.type) return;

      if (message.type === 'matching_update') {
        this.matchedCount = message.matched || 0;
        if (message.target) {
          this.selectedMode = message.target;
        }
      } else if (message.type === 'intent_invalid') {
        this.isMatching = false;
        this.clearMatchTimer();
        uni.showToast({ title: message.message || '匹配参数错误', icon: 'none' });
      } else if (message.type === 'match_success') {
        this.isMatching = false;
        this.clearMatchTimer();
        try { uni.$off('websocketMessage', this.handleWebSocketMessage); } catch (_) {}
        try { uni.$off('websocketClose', this.handleWebSocketClose); } catch (_) {}
        uni.redirectTo({ url: '/pages/dice/index' });
      }
    },

    handleWebSocketClose() {
      if (this.isMatching) {
        this.isMatching = false;
        this.clearMatchTimer();
        uni.showToast({ title: '连接已断开', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped>
.select-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #eaf2ff 0%, #ffffff 50%, #f7fbff 100%);
  display: flex;
  flex-direction: column;
}

/* 导航栏 */
.nav-bar {
  height: 100rpx;
  background-color: #0B63F6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  color: #ffffff;
}

.nav-back, .nav-right {
  min-width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  font-weight: bold;
}

.room-icon {
  font-size: 26rpx;
  font-weight: 600;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 600;
}

/* 模式选择区域 */
.mode-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40rpx;
}

.mode-tip {
  font-size: 28rpx;
  color: #6B7280;
  margin-bottom: 40rpx;
}

.mode-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30rpx;
  justify-content: center;
}

.mode-card {
  width: 260rpx;
  height: 200rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  box-shadow: 0 6rpx 16rpx rgba(11, 99, 246, 0.12);
  border: 3rpx solid transparent;
  transition: all 0.3s ease;
}

.mode-card.active {
  border-color: #0B63F6;
  transform: translateY(-8rpx);
  box-shadow: 0 10rpx 24rpx rgba(11, 99, 246, 0.3);
}

.mode-icon {
  font-size: 30rpx;
  letter-spacing: 4rpx;
}

.mode-num {
  font-size: 28rpx;
  font-weight: 600;
  color: #1F2937;
}

/* 底部按钮 */
.bottom-section {
  padding: 20rpx 50rpx 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.start-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 600;
  border-radius: 45rpx;
  border: none;
  box-shadow: 0 6rpx 16rpx rgba(11, 99, 246, 0.3);
}

.start-btn:disabled {
  background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
  box-shadow: none;
}

.room-link {
  font-size: 24rpx;
  color: #0B63F6;
  text-decoration: underline;
}

/* 匹配等待遮罩 */
.match-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.match-card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 50rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  width: 500rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.2);
}

.match-icon {
  font-size: 60rpx;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.match-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #0B63F6;
}

.match-desc {
  font-size: 26rpx;
  color: #4B5563;
  text-align: center;
  line-height: 40rpx;
}

.match-animation {
  display: flex;
  gap: 12rpx;
}

.match-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #0B63F6;
  animation: pulse 1.5s ease-in-out infinite;
}

.match-dot:nth-child(2) { animation-delay: 0.2s; }
.match-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.2); }
}

.cancel-btn {
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 26rpx;
  font-weight: 600;
  border-radius: 35rpx;
  border: none;
  margin-top: 10rpx;
}
</style>
