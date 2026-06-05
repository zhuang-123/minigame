// 域名与接口集中维护
export const BASE_URL = 'https://wespark.kuqitt.cn'

export const ENDPOINTS = {
	// wxMinLogin: '/newapi/index.php?app=newLogin&act=wxMinLogin'
	wxMinLogin: '/api/login'
}

export function buildUrl(path) {
	return BASE_URL + path
}

// 规范化图片路径，确保在真机上也能显示
export function normalizeImageUrl(url) {
	if (!url) {
		console.warn('normalizeImageUrl: empty url')
		return ''
	}
	let s = String(url).trim()
	// 如果已经是完整URL，需要确保是 https（真机要求）
	if (/^https?:\/\//i.test(s)) {
		// 将 http 转换为 https（小程序真机要求使用 HTTPS）
		if (s.startsWith('http://')) {
			s = s.replace(/^http:\/\//i, 'https://')
			console.log('normalizeImageUrl: converted http to https', s)
		} else {
			console.log('normalizeImageUrl: already full url (https)', s)
		}
		return s
	}
	// 如果以 / 开头，拼接域名（使用 https）
	if (s.startsWith('/')) {
		const fullUrl = 'https://' + BASE_URL.replace(/^https?:\/\//, '') + s
		console.log('normalizeImageUrl: prepend base url', fullUrl)
		return fullUrl
	}
	// 其他情况也尝试拼接域名（可能是相对路径，使用 https）
	const base = BASE_URL.replace(/^https?:\/\//, '')
	const fullUrl = 'https://' + base + '/' + s.replace(/^\/+/, '')
	console.log('normalizeImageUrl: prepend base url (relative)', fullUrl)
	return fullUrl
}

export function wxMinLoginByCode(code) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: buildUrl(ENDPOINTS.wxMinLogin),
			method: 'POST',
			header: {
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: { code },
			success: (res) => resolve(res),
			fail: (err) => reject(err)
		})
	})
}

export function decryptPhoneByCode(code) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=member&act=decrypt_code'),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: { code },
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function decryptPhoneBySession(sessionKeyOrParams, encryptedData, iv, userId) {
    let payload = {}

    if (typeof sessionKeyOrParams === 'object' && sessionKeyOrParams !== null) {
        const { sessionKey, encryptedData: encData, iv: ivValue, user_id: uid, userId: uidCamel } = sessionKeyOrParams
        if (sessionKey) payload.sessionKey = sessionKey
        if (encData) payload.encryptedData = encData
        if (ivValue) payload.iv = ivValue
        if (uid !== undefined && uid !== null && uid !== '') payload.user_id = uid
        else if (uidCamel !== undefined && uidCamel !== null && uidCamel !== '') payload.user_id = uidCamel
    } else {
        if (sessionKeyOrParams) payload.sessionKey = sessionKeyOrParams
        if (encryptedData) payload.encryptedData = encryptedData
        if (iv) payload.iv = iv
        if (userId !== undefined && userId !== null && userId !== '') payload.user_id = userId
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=member&act=decrypt_code'),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: payload,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function saveFaultPhenomenon(data) {
    // data: { user_id, real_name, description }
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=faultPhenomenon&act=saveFaultPhenomenon'),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function saveCustomizedBattery(data) {
    // data: { user_id, real_name, description }
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=customizedBattery&act=saveCustomizedBattery'),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function wxBindPhoneByCode(params) {
    // params: { code, encryptedData, iv }
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=member&act=decrypt_code'),
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: params,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function getGoodsList() {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=goods&act=getGoodsList'),
            method: 'GET',
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function getGoodsInfo(goods_id) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/newapi/index.php?app=goods&act=getGoodsInfo'),
            method: 'GET',
            data: { goods_id },
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function getGameList() {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/api/game/list'),
            method: 'GET',
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function getQuestionsByGameId(gameId) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/api/game/questions'),
            method: 'GET',
            data: { game_id: gameId },
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}

export function submitTestResult(data) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: buildUrl('/api/game/submitResult'),
            method: 'POST',
            header: { 'content-type': 'application/json' },
            data: data,
            success: (res) => resolve(res),
            fail: (err) => reject(err)
        })
    })
}