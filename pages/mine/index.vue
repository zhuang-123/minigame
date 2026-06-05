<template>
	<view class="page">
		<view class="profile-card">
			<image class="avatar" :src="avatarUrl" mode="aspectFill"></image>
			<view class="info">
				<view class="nickname">{{ nickname }}</view>
				<view class="sub">用户ID：{{ user_id || 0 }}<text v-if="user_phone"></text></view>
			</view>
		</view>

		<view class="actions">
			<button v-if="!user_id" class="btn primary" hover-class="btn-pressed" @tap="loginWithWeChat">微信一键登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: '/static/me.png',
			nickname: '未登录',
			user_id: 0,
		}
	},
	onLoad() {
		this.loadProfileFromStorage()
	},
onShow() {
		// 切回页面或登录成功后，确保最新数据展示
		this.loadProfileFromStorage()
},
	methods: {
		async loginWithWeChat() {
			try {
				let code = ''
				// #ifdef MP-WEIXIN
				const wxRes = await new Promise((resolve, reject) => wx.login({ timeout: 10000, success: resolve, fail: reject }))
				code = wxRes && wxRes.code
				// #endif
				// #ifdef APP-PLUS
				const appRes = await uni.login({ provider: 'weixin' })
				code = appRes && appRes.code
				// #endif

				if (!code) {
					uni.showModal({
						title: '登录失败',
						content: '未获取到 code。请确认在微信小程序环境、已配置有效 AppID，并非 H5 预览。',
						showCancel: false
					})
					return
				}
				const { wxMinLoginByCode } = await import('@/common/api.js')
				const res = await wxMinLoginByCode(code)
				if(res.data.code == 200) {
					uni.setStorage({ key: 'user_id', data: res.data.data.user_id })
					uni.setStorage({ key: 'nickname', data: res.data.data.username })
					// 立即刷新当前页数据
					this.loadProfileFromStorage()
					uni.showToast({ title: '登录成功', icon: 'success' })
				} else {
					uni.showToast({ title: '登录失败', icon: 'none' })
				}
			} catch (e) {
				uni.showToast({ title: '登录失败', icon: 'none' })
			}
		},
		loadProfileFromStorage() {
			try {
				const uid = uni.getStorageSync('user_id')
				const uname = uni.getStorageSync('nickname')
				this.user_id = uid ? uid : 0
				this.nickname = uname ? uname : '未登录'
			} catch (e) {
				this.user_id = 0
				this.nickname = '未登录'
			}
		}
	}
}
</script>

<style>
.page {
	padding: 24rpx;
	min-height: 100vh;
	box-sizing: border-box;
	background: linear-gradient(180deg, #f6f9ff 0%, #ffffff 60%);
}
.profile-card {
	display: flex;
	align-items: center;
	background: #fff;
	border-radius: 20rpx;
	padding: 24rpx;
	box-shadow: 0 10rpx 28rpx rgba(11,99,246,0.10), 0 2rpx 10rpx rgba(0,0,0,0.04);
	border: 2rpx solid #e6eefb;
}
.avatar {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background: #eef2ff;
	margin-right: 24rpx;
}
.info { display: flex; flex-direction: column; }
.nickname { font-size: 36rpx; font-weight: 700; color: #1f2937; }
.sub { font-size: 24rpx; color: #94a3b8; margin-top: 6rpx; }

.actions { margin: 24rpx 0; }
.btn { padding: 22rpx 26rpx; border-radius: 999rpx; font-size: 28rpx; }
.btn.primary { background: linear-gradient(135deg, #0B63F6 0%, #3B82F6 100%); color: #fff; box-shadow: 0 8rpx 20rpx rgba(11,99,246,0.25); }
.btn.outline { background: #ffffff; color: #0B63F6; border: 2rpx solid #0B63F6; }
.btn-pressed { opacity: 0.9; transform: translateY(2rpx); }

.menu { background: #fff; border-radius: 20rpx; overflow: hidden; border: 2rpx solid #e6eefb; }
.cell { display: flex; align-items: center; justify-content: space-between; padding: 28rpx 24rpx; border-bottom: 1rpx solid #eef2f7; }
.cell:last-child { border-bottom: none; }
.cell-text { font-size: 30rpx; color: #1f2937; }
.cell-arrow { font-size: 36rpx; color: #cbd5e1; }

.contact-btn { width: 100%; text-align: left; background: transparent; padding: 0; color: #0B63F6; font-size: 30rpx; }
</style>

