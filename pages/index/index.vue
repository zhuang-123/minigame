<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>

    <!-- 手机号授权模态框（放在根级，独立于其他弹窗） -->
    <view v-if="showPhoneAuthModal" class="overlay phone-overlay" catchtouchmove="true">
      <view class="overlay-mask" @tap="showPhoneAuthModal = false"></view>
      <view class="dialog" @tap.stop>
        <view class="dialog-close" @tap="showPhoneAuthModal = false">×</view>
        <view class="dialog-title">手机号授权</view>
        <view class="dialog-body">
          <view class="field">
            <text class="label">授权手机号用于提交和服务通知</text>
          </view>
        </view>
        <view class="dialog-actions">
          <button @tap="showPhoneAuthModal = false">取消</button>
          <!-- 只有小程序环境下 open-type=getPhoneNumber 有效 -->
          <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">去授权</button>
        </view>
      </view>
    </view>

    <!-- 游戏列表区域 -->
    <view class="game-list">
      <view class="game-item" v-for="(game, index) in gameList" :key="index" @tap="enterGame(game)">
        <view class="game-icon">
          <text class="icon-text">{{game.icon}}</text>
        </view>
        <view class="game-name">{{game.name}}</view>
        <view class="game-desc">{{game.desc}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '游戏中心',
      showFault: false,
      showCustom: false,
      // 控制在当前页面弹出手机号授权对话框
      showPhoneAuthModal: false,
      faultForm: { name: '', desc: '' },
      customForm: { name: '', req: '' },
      // 游戏列表数据
      gameList: []
    }
  },
  onLoad() {
    this.getGameList();
  },
  methods: {
    // 获取游戏列表
    async getGameList() {
      try {
        const { getGameList } = await import('@/common/api.js');
        const res = await getGameList();
        if (res && res.data && res.data.code === 200 && res.data.data) {
          // 处理游戏列表数据
          const games = res.data.data.rows || [];
          // 转换为前端需要的格式
          this.gameList = games.map(game => ({
            id: game.id,
            name: game.game_name,
            desc: game.game_info,
            icon: game.game_image,
            path: game.path
          }));
        }
      } catch (error) {
        console.error('获取游戏列表失败:', error);
      }
    },
    noop() {},
    async ensureLogin() {
      let uid = uni.getStorageSync('user_id')
      if (uid) return uid
      try {
        // 小程序登录获取code
        const wxRes = await new Promise((resolve, reject) => wx.login({ timeout: 10000, success: resolve, fail: reject }))
        const code = wxRes && wxRes.code
        if (!code) throw new Error('no code')
        const { wxMinLoginByCode } = await import('@/common/api.js')
        const res = await wxMinLoginByCode(code)
        if (res && res.data && res.data.code == 200 && res.data.data) {
          uid = res.data.data.user_id
          uni.setStorage({ key: 'user_id', data: uid })
          uni.setStorage({ key: 'nickname', data: res.data.data.username || '' })
          return uid
        }
        throw new Error('login failed')
      } catch (e) {
        uni.showToast({ title: '请先登录后再提交', icon: 'none' })
        return 0
      }
    },
    ensurePhoneAuthorized() {
      let phone = ''
      try {
        const storedPhone = uni.getStorageSync('user_phone')
        phone = storedPhone ? String(storedPhone).trim() : ''
      } catch (_) {
        phone = ''
      }
      if (phone) return true

      // 微信小程序环境：在当前页弹出授权对话框（使用 open-type="getPhoneNumber"）
      // 其它环境（H5/APP）回退到原本的跳转引导
      // #ifdef MP-WEIXIN
      this.showPhoneAuthModal = true
      // uni.showToast({ title: '需要授权手机号以继续', icon: 'none' })
      return false
      // #endif

      // #ifndef MP-WEIXIN
      uni.showModal({
        title: '提示',
        content: '提交前需授权手机号，是否前往“我的”页面进行授权？',
        confirmText: '去授权',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({ url: '/pages/mine/index' })
          }
        }
      })
      return false
      // #endif
    },

    // 处理 getPhoneNumber 回调（与 pages/mine/index.vue 中逻辑一致）
    async onGetPhoneNumber(e) {
      try {
        if (!e || !e.detail || e.detail.errMsg !== 'getPhoneNumber:ok') {
          console.log(e)
          uni.showToast({ title: '未授权手机号', icon: 'none' })
          this.showPhoneAuthModal = false
          return
        }
        const { encryptedData, iv } = e.detail
        let sessionKey = ''
        try { sessionKey = uni.getStorageSync('session_key') || '' } catch (_) { sessionKey = '' }

        const ensureSessionKey = async () => {
          if (sessionKey) {
            let storedUserId = uni.getStorageSync('user_id') || 0
            return { sessionKey, userId: storedUserId }
          }
          return new Promise((resolve, reject) => {
            wx.login({
              timeout: 10000,
              success: async (loginRes) => {
                const code = loginRes && loginRes.code
                if (!code) {
                  uni.showToast({ title: '获取code失败', icon: 'none' })
                  return reject(new Error('missing code'))
                }
                try {
                  const { wxMinLoginByCode } = await import('@/common/api.js')
                  const loginResult = await wxMinLoginByCode(code)
                  const data = loginResult && loginResult.data && loginResult.data.data ? loginResult.data.data : {}
                  const key = data.session_key || data.sessionKey || ''
                  if (!key) { uni.showToast({ title: '获取session失败', icon: 'none' }); return reject(new Error('missing sessionKey')) }
                  sessionKey = key
                  uni.setStorage({ key: 'session_key', data: key })
                  const userId = data.user_id || data.userId || 0
                  if (userId) uni.setStorage({ key: 'user_id', data: userId })
                  resolve({ sessionKey: key, userId })
                } catch (err) {
                  uni.showToast({ title: '获取session失败', icon: 'none' })
                  reject(err)
                }
              },
              fail: (err) => { uni.showToast({ title: '获取code失败', icon: 'none' }); reject(err) }
            })
          })
        }

        try {
          const keyInfo = await ensureSessionKey()
          if (!keyInfo || !keyInfo.sessionKey) {
            uni.showToast({ title: '授权失败，请重试', icon: 'none' })
            this.showPhoneAuthModal = false
            return
          }
          const { sessionKey: key, userId } = keyInfo
          const { decryptPhoneBySession } = await import('@/common/api.js')
          const res = await decryptPhoneBySession({ sessionKey: key, encryptedData, iv, user_id: userId || 0 })
          if (res && res.data && res.data.code == 200 && res.data.data) {
            const rawPhone = res.data.data.phoneNumber || res.data.data.phone || ''
            const phone = rawPhone ? String(rawPhone).trim() : ''
            if (phone) {
              uni.setStorage({ key: 'user_phone', data: phone })
            }
            this.showPhoneAuthModal = false
            uni.showToast({ title: phone ? '手机号已授权' : '未获取到手机号', icon: phone ? 'success' : 'none' })
          } else {
            this.showPhoneAuthModal = false
            uni.showToast({ title: '授权失败', icon: 'none' })
          }
        } catch (err) {
          console.error(err)
          if (!err || err.message !== 'missing code') {
            uni.showToast({ title: '网络错误', icon: 'none' })
          }
          this.showPhoneAuthModal = false
        }
      } catch (err) {
        uni.showToast({ title: '授权失败', icon: 'none' })
        this.showPhoneAuthModal = false
      }
    },
    // 进入游戏处理
    async enterGame(game) {
      if (game.path === 'fault') {
        // 故障报修
        this.openFaultDialog()
      } else if (game.path === 'custom') {
        // 定制服务
        this.openCustomDialog()
      } else if (game.path === 'contact') {
        // 在线咨询
        // 调用微信小程序客服功能
        wx.openCustomerServiceChat({
          extInfo: { url: 'https://repair.energy-tank.com' },
          success: function () {
            console.log('进入客服聊天');
          },
          fail: function () {
            uni.showToast({ title: '进入客服聊天失败', icon: 'none' });
          }
        });
      } else if (game.path === '/pages/dice/index') {
        // 叫骰游戏，需要先登录
        let uid = await this.ensureLogin()
        if (uid) {
          uni.navigateTo({ url: game.path })
        }
      } else if (game.path === '/pages/texas/index') {
        // 德州扑克，需要先登录后跳转规则页
        let uid = await this.ensureLogin()
        if (uid) {
          uni.navigateTo({ url: game.path })
        }
      } else if (game.path === '/pages/lie/index') {
        // 谎言扑克，需要先登录
        let uid = await this.ensureLogin()
        if (uid) {
          uni.navigateTo({ url: game.path })
        }
      } else {
        // 其他页面直接跳转
        uni.navigateTo({ url: game.path })
      }
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #eaf2ff 0%, #ffffff 50%, #f7fbff 100%);
}

.logo {
  height: 240rpx;
  width: 240rpx;
  margin-top: 60rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
}

.title {
  font-size: 36rpx;
  color: #2a2a2a;
  font-weight: 600;
}

/* 游戏列表样式 */
.game-list {
  width: 100%;
  max-width: 700rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30rpx;
}

.game-item {
  width: calc(43% - 15rpx); /* 两列布局，减去间距 */
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240rpx;
  /* 突出的阴影效果 */
  box-shadow: 0 10rpx 30rpx rgba(11, 99, 246, 0.15),
  0 4rpx 12rpx rgba(0, 0, 0, 0.08),
  inset 0 1rpx 0 rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.game-item:active {
  transform: translateY(4rpx);
  box-shadow: 0 6rpx 20rpx rgba(11, 99, 246, 0.1),
  0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.game-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
  height: 100rpx;
  width: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eaf2ff 0%, #dbeafe 100%);
  border-radius: 20rpx;
}

.game-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 10rpx;
  text-align: center;
}

.game-desc {
  font-size: 22rpx;
  color: #6b7280;
  text-align: center;
  line-height: 32rpx;
}

/* 遮罩层与蒙层 */
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.overlay-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.55);
}

/* 专用于手机号授权模态，层级高于其他 overlay */
.phone-overlay {
  z-index: 2000;
}
.phone-overlay .dialog {
  z-index: 2001;
}

.dialog {
  width: 680rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-sizing: border-box;
  box-shadow: 0 12rpx 28rpx rgba(0,0,0,0.08);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 80vh;
  overflow: hidden;
}
.dialog-close {
  position: absolute;
  right: 20rpx;
  top: 16rpx;
  width: 48rpx;
  height: 48rpx;
  text-align: center;
  line-height: 48rpx;
  font-size: 36rpx;
  color: #97a6ba;
}

.dialog-body {
  margin-top: 12rpx;
  max-height: calc(80vh - 180rpx);
  overflow-y: auto;
  padding-right: 6rpx;
}

.field { margin-bottom: 20rpx; }
.label { font-size: 26rpx; color: #4a5568; display: block; margin-bottom: 10rpx; }

.dialog-title {
  font-size: 32rpx;
  font-weight: 700;
  margin: -30rpx -30rpx 20rpx;
  padding: 24rpx 30rpx;
  color: #ffffff;
  background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%);
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
  margin-top: 10rpx;
}
.dialog-actions button {
  min-width: 160rpx;
  padding: 18rpx 22rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
}
.dialog-actions button:first-child {
  background: #f1f5f9;
  color: #333;
}
.dialog-actions button:last-child {
  background: #0B63F6;
  color: #fff;
}
</style>