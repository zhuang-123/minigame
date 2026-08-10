<template>
  <view class="room-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="nav-title">房间对战</view>
      <view class="nav-right"></view>
    </view>

    <!-- 切换标签 -->
    <view class="tab-bar">
      <view class="tab-item" :class="{ active: tab === 'create' }" @tap="tab = 'create'">开房间</view>
      <view class="tab-item" :class="{ active: tab === 'join' }" @tap="tab = 'join'">加入房间</view>
    </view>

    <!-- 开房间面板 -->
    <view class="panel" v-if="tab === 'create'">
      <view class="section-title">选择对战人数</view>
      <view class="mode-cards">
        <view
          class="mode-card"
          v-for="n in modeOptions"
          :key="n"
          :class="{ active: createTarget === n }"
          @tap="createTarget = n"
        >
          <view class="mode-num">{{ n }}人局</view>
        </view>
      </view>

      <view class="section-title">房间密码（选填，留空自动生成）</view>
      <input
        class="password-input"
        type="number"
        maxlength="6"
        placeholder="留空则自动生成4位密码"
        v-model="createPassword"
      />

      <button class="primary-btn" :disabled="!createTarget" @tap="createRoom">创建房间</button>
    </view>

    <!-- 加入房间面板 -->
    <view class="panel" v-else>
      <view class="section-title">房间号</view>
      <input class="password-input" type="number" maxlength="6" placeholder="请输入6位房间号" v-model="joinRoomId" />

      <view class="section-title">房间密码</view>
      <input class="password-input" type="number" maxlength="6" placeholder="请输入房间密码" v-model="joinPassword" />

      <button class="primary-btn" :disabled="!joinRoomId || !joinPassword" @tap="joinRoom">加入房间</button>
    </view>

    <!-- 匹配/等待遮罩 -->
    <view class="match-mask" v-if="isWaiting">
      <view class="match-card">
        <view class="match-icon">🔄</view>
        <view class="match-title">{{ roomId ? '等待玩家加入' : '处理中' }}</view>
        <view class="match-desc" v-if="roomId">
          房间号: {{ roomId }}<br>
          密码: {{ roomPassword }}<br>
          已加入 {{ matchedCount }}/{{ targetCount }} 人<br>
          等待时长: {{ matchDurationText }}
        </view>
        <view class="match-animation">
          <view class="match-dot"></view>
          <view class="match-dot"></view>
          <view class="match-dot"></view>
        </view>
        <button class="cancel-btn" @tap="cancelWaiting">取消</button>
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
      tab: 'create',
      modeOptions: [2, 3, 4, 5],
      createTarget: null,
      createPassword: '',
      joinRoomId: '',
      joinPassword: '',

      isWaiting: false,
      roomId: '',
      roomPassword: '',
      targetCount: 0,
      matchedCount: 0,
      matchStartTime: null,
      matchDuration: 0,
      matchTimer: null,
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
    if (this.isWaiting) {
      websocketService.disconnect();
    }
  },

  methods: {
    goBack() {
      uni.navigateBack({ delta: 1 });
    },

    ensureLogin() {
      if (this.userId) return true;
      uni.showModal({
        title: '提示',
        content: '请先登录后再进行游戏',
        confirmText: '去登录',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({ url: '/pages/mine/index' });
          }
        }
      });
      return false;
    },

    createRoom() {
      if (!this.createTarget) {
        uni.showToast({ title: '请选择对战人数', icon: 'none' });
        return;
      }
      if (!this.ensureLogin()) return;

      this.isWaiting = true;
      this.roomId = '';
      this.roomPassword = '';
      this.targetCount = this.createTarget;
      this.matchedCount = 1;

      websocketService.connect(this.userId, 'ws://127.0.0.1:8888/ws').then(() => {
        const pwd = this.createPassword ? String(this.createPassword) : '';
        websocketService.sendMessage(`ROOM_CREATE:${this.createTarget}:${pwd}`);
        this.matchStartTime = new Date();
        this.matchDuration = 0;
        this.startMatchTimer();
      }).catch(() => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
        this.isWaiting = false;
      });
    },

    joinRoom() {
      if (!this.joinRoomId || !this.joinPassword) {
        uni.showToast({ title: '请输入房间号和密码', icon: 'none' });
        return;
      }
      if (!this.ensureLogin()) return;

      this.isWaiting = true;
      this.roomId = this.joinRoomId;
      this.roomPassword = this.joinPassword;
      this.matchedCount = 0;
      this.targetCount = 0;

      websocketService.connect(this.userId, 'ws://127.0.0.1:8888/ws').then(() => {
        websocketService.sendMessage(`ROOM_JOIN:${this.joinRoomId}:${this.joinPassword}`);
        this.matchStartTime = new Date();
        this.matchDuration = 0;
        this.startMatchTimer();
      }).catch(() => {
        uni.showToast({ title: '连接服务器失败', icon: 'none' });
        this.isWaiting = false;
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

    cancelWaiting() {
      this.isWaiting = false;
      this.clearMatchTimer();
      websocketService.disconnect();
      uni.showToast({ title: '已取消', icon: 'none' });
    },

    handleWebSocketMessage(message) {
      if (!message || !message.type) return;

      if (message.type === 'room_created') {
        this.roomId = message.room_id || '';
        this.roomPassword = message.password || '';
        this.targetCount = message.target || this.createTarget;
        this.matchedCount = message.matched || 1;
        uni.showToast({ title: '房间创建成功', icon: 'none' });
      } else if (message.type === 'matching_update') {
        this.matchedCount = message.matched || 0;
        if (message.target) {
          this.targetCount = message.target;
        }
      } else if (message.type === 'room_join_failed') {
        this.isWaiting = false;
        this.clearMatchTimer();
        websocketService.disconnect();
        uni.showToast({ title: message.message || '加入房间失败', icon: 'none' });
      } else if (message.type === 'intent_invalid') {
        this.isWaiting = false;
        this.clearMatchTimer();
        uni.showToast({ title: message.message || '参数错误', icon: 'none' });
      } else if (message.type === 'match_success') {
        this.isWaiting = false;
        this.clearMatchTimer();
        try { uni.$off('websocketMessage', this.handleWebSocketMessage); } catch (_) {}
        try { uni.$off('websocketClose', this.handleWebSocketClose); } catch (_) {}
        uni.redirectTo({ url: '/pages/dice/index' });
      }
    },

    handleWebSocketClose() {
      if (this.isWaiting) {
        this.isWaiting = false;
        this.clearMatchTimer();
        uni.showToast({ title: '连接已断开', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped>
.room-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #eaf2ff 0%, #ffffff 50%, #f7fbff 100%);
  display: flex;
  flex-direction: column;
}

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
}

/* 标签栏 */
.tab-bar {
  display: flex;
  margin: 30rpx 30rpx 0;
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 28rpx;
  font-weight: 600;
  color: #6B7280;
}

.tab-item.active {
  color: #ffffff;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
}

/* 面板 */
.panel {
  padding: 40rpx 30rpx;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #1F2937;
  margin: 20rpx 0 16rpx;
}

.mode-cards {
  display: flex;
  gap: 20rpx;
}

.mode-card {
  flex: 1;
  height: 90rpx;
  background-color: #ffffff;
  border-radius: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3rpx solid transparent;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.mode-card.active {
  border-color: #0B63F6;
  box-shadow: 0 6rpx 16rpx rgba(11, 99, 246, 0.25);
}

.mode-num {
  font-size: 26rpx;
  font-weight: 600;
  color: #1F2937;
}

.password-input {
  height: 80rpx;
  background-color: #ffffff;
  border-radius: 14rpx;
  padding: 0 24rpx;
  font-size: 26rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.primary-btn {
  margin-top: 50rpx;
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

.primary-btn:disabled {
  background: linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 100%);
  box-shadow: none;
}

/* 等待遮罩 */
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
  width: 560rpx;
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
