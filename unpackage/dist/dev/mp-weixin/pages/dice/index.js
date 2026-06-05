(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/dice/index"],{

/***/ 39:
/*!**************************************************************************!*\
  !*** F:/go-project/src/minigame/main.js?{"page":"pages%2Fdice%2Findex"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/dice/index.vue */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 40:
/*!*******************************************************!*\
  !*** F:/go-project/src/minigame/pages/dice/index.vue ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=066854a3&scoped=true& */ 41);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 43);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=066854a3&scoped=true&lang=css& */ 46);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "066854a3",
  null,
  false,
  _index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/dice/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 41:
/*!**************************************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/dice/index.vue?vue&type=template&id=066854a3&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=066854a3&scoped=true& */ 42);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_066854a3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 42:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/dice/index.vue?vue&type=template&id=066854a3&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 43:
/*!********************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/dice/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 44);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 44:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/dice/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;














































































































































var _websocket = _interopRequireDefault(__webpack_require__(/*! ../../common/websocket */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { data: function data() {return { // 游戏状态
      gameStatus: '等待玩家加入...', isMatching: true, // 是否正在匹配中
      // 玩家信息
      players: [{ id: 1, name: '我', avatar: '../../static/me.png', status: '准备中', dice: [], showDice: false, isCurrent: true, isWinner: false, isLoser: false, userId: '' }], // 我的骰子
      myDice: [1, 2, 3, 4, 5], showMyDice: false, // 叫骰相关
      showCallDice: false, selectedNumber: 3, selectedPoint: 1, selectedZhai: false, diceNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], dicePoints: [1, 2, 3, 4, 5, 6], // 游戏控制
      canShake: false, // 匹配成功后自动摇骰，不需要手动摇
      canCall: false, canOpen: false, canPee: false, // 劈按钮状态
      canCounterPee: false, // 反劈按钮状态
      hasCalled: false, // 是否已叫骰过
      gameEnded: false, // 游戏是否结束
      isPeeTarget: false, // 是否被劈中，需要回复
      // 倒计时相关
      countdown: 15, // 倒计时时间（秒）
      countdownTimer: null, // 倒计时计时器
      lastCall: { // 上一个叫骰信息
        quantity: 0, point: 0, isZhai: false }, // 游戏历史
      gameHistory: [], // WebSocket相关
      userId: '', isConnected: false };}, onLoad: function onLoad() {// 获取微信授权登录后的用户ID
    this.userId = uni.getStorageSync('user_id') || ''; // 如果没有用户ID，提示用户登录
    if (!this.userId) {uni.showModal({ title: '提示', content: '请先登录后再进入游戏', confirmText: '去登录', cancelText: '取消', success: function success(res) {if (res.confirm) {uni.switchTab({ url: '/pages/mine/index' });}} });} else {// 连接WebSocket服务器
      this.connectWebSocket();} // 监听WebSocket消息
    uni.$on('websocketMessage', this.handleWebSocketMessage); // 监听WebSocket关闭事件，清除倒计时
    uni.$on('websocketClose', this.clearCountdown);}, onUnload: function onUnload() {// 断开WebSocket连接
    _websocket.default.disconnect(); // 移除事件监听
    uni.$off('websocketMessage', this.handleWebSocketMessage);uni.$off('websocketClose', this.clearCountdown);}, methods: { // 连接WebSocket服务器
    connectWebSocket: function connectWebSocket() {var _this = this;_websocket.default.connect(this.userId, 'ws://120.55.84.53:8888/ws').then(function () {_this.isConnected = true;_this.gameStatus = '正在匹配玩家...';_this.gameHistory.unshift('已连接到服务器，正在匹配玩家...');}).catch(function (error) {console.error('WebSocket连接失败:', error);_this.gameStatus = '连接服务器失败，请重试';_this.gameHistory.unshift('连接服务器失败，请重试');});}, // 处理WebSocket消息
    handleWebSocketMessage: function handleWebSocketMessage(message) {var _this2 = this;console.log('处理WebSocket消息:', message); // 检查是否包含叫骰信息，如果有则更新上一个叫骰信息
      if ((message.quantity || message.Quantity) && (message.point || message.Point)) {// 更新上一个叫骰信息
        this.lastCall = { quantity: message.quantity || message.Quantity, point: message.point || message.Point, isZhai: message.zhai === 1 || message.Zhai === 1 };console.log('更新上一个叫骰信息:', this.lastCall);} // 处理消息中的玩家名称，替换为新格式
      var processedMessage = message.message;if (processedMessage) {// 遍历玩家列表，替换消息中的玩家名称
        this.players.forEach(function (player) {if (player.userId && player.name && player.name !== '我') {// 查找并替换旧格式的玩家名称（如"玩家1"）
            var oldNamePattern = /玩家\d+/g;processedMessage = processedMessage.replace(oldNamePattern, player.name);}});} // 更新游戏状态
      this.gameStatus = processedMessage; // 添加到历史记录
      this.gameHistory.unshift(processedMessage); // 检查是否是玩家退出消息
      if (message.type === 'player_leave' || message.type === 'player_exit') {// 玩家退出，本局无效
        this.handlePlayerLeave();return;} // 检查是否是结算消息
      if (message.isEnd || message.is_end) {this.handleGameEnd(message);this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'match_success') {// 匹配成功，显示骰子
        this.showMyDice = true;this.canCall = true;this.canOpen = false; // 第1回合不能开，必须先叫骰
        this.canPee = false; // 第1回合不能劈
        this.canCounterPee = false; // 第1回合不能反劈
        this.isMatching = false; // 匹配成功，设置为false
        // 直接使用后端返回的点数数组
        if (message.points && Array.isArray(message.points)) {this.myDice = message.points;console.log('收到点数:', this.myDice);} // 匹配成功后，重置玩家列表，只保留自己
        this.players = [{ id: 1, name: '我', avatar: '../../static/me.png', status: '√已准备', dice: [], showDice: false, isCurrent: true, isWinner: false, isLoser: false, userId: this.userId }];

        // 开始倒计时
        this.startCountdown();
      } else if (message.type === 'call_wait') {
        // 第一回合等待其他玩家叫骰时自己的按钮状态全部不可用
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        // 不清除倒计时，因为其他玩家可能正在倒计时
      } else if (message.type === 'your_turn') {
        // 轮到自己叫数
        console.log('收到your_turn消息，轮到自己叫数');
        this.canCall = true;
        this.canOpen = true; // 自己回合可以开
        this.canPee = true; // 自己叫数时可以劈
        this.canCounterPee = false; // 自己叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }

        // 强制开始新的倒计时
        this.startCountdown();
      } else if (message.type === 'wait_other') {
        // 等待其他玩家
        console.log('收到wait_other消息，等待其他玩家');
        this.canCall = false;
        this.canOpen = false; // 不是自己回合不能开
        this.canPee = false; // 其他玩家叫骰后可以劈
        this.canCounterPee = false; // 对手叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'can_pee') {
        // 可以劈
        this.canCall = false;
        this.canOpen = false; // 不是自己回合不能开
        this.canPee = true; // 其他玩家叫骰后可以劈
        this.canCounterPee = false; // 对手叫数时不能反劈
        // 更新玩家状态，标记当前回合玩家
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'pee_wait') {
        // 我发起了劈，等待对方回复
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false; // 已经发起劈，不能再劈
        this.canCounterPee = false;
        // 更新玩家状态，标记当前回合玩家（被劈的玩家）
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 开始倒计时，显示被劈玩家的倒计时
        this.startCountdown();
        console.log('发起劈，开始显示被劈玩家的倒计时');
      } else if (message.type === 'pee_target') {
        // 我被劈了，需要回复
        this.canCall = false;
        this.canOpen = true; // 接劈开骰
        this.canPee = false; // 被劈时不能劈别人
        this.canCounterPee = true; // 被劈时可以反劈
        this.isPeeTarget = true; // 设置被劈状态
        // 更新玩家状态，标记当前回合玩家（被劈的玩家）
        if (message.players && Array.isArray(message.players)) {
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 开始倒计时，被劈时需要在规定时间内回复
        this.startCountdown();
        console.log('被劈了，开始倒计时');
      } else if (message.type === 'pee_other') {
        // 其他玩家正在劈，我不能劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false; // 其他玩家正在劈，不能再劈
        this.canCounterPee = false;
        this.isPeeTarget = false; // 重置被劈状态
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'counter_pee') {
        // 有人反劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'no_pee') {
        // 当前没有可以接受的劈命令
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.isPeeTarget = false; // 重置被劈状态
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'no_call') {
        // 当前没有可以劈的叫数
        this.canCall = true;
        this.canOpen = false;
        this.canPee = false;
        this.canCounterPee = false;
        // 开始倒计时，因为可以叫骰
        this.startCountdown();
      } else if (message.type === 'no_counter_pee') {
        // 当前没有可以反劈的劈命令
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'not_target') {
        // 不是被劈的玩家，无法反劈
        this.canCall = false;
        this.canOpen = false;
        this.canPee = true;
        this.canCounterPee = false;
        this.clearCountdown(); // 清除倒计时
      } else if (message.type === 'player_list') {
        // 收到玩家列表信息
        if (message.players && Array.isArray(message.players)) {
          // 重置玩家列表
          this.players = [];
          message.players.forEach(function (serverPlayer, index) {
            if (serverPlayer.user_id === _this2.userId) {
              // 自己
              _this2.players.push({
                id: index + 1,
                name: '我',
                avatar: '../../static/me.png',
                status: '√已准备',
                dice: [],
                showDice: false,
                isCurrent: serverPlayer.is_current || false,
                isWinner: false,
                isLoser: false,
                userId: serverPlayer.user_id });

            } else {
              // 其他玩家，使用“玩家+用户ID后6位”格式
              var userIdLast6 = serverPlayer.user_id.substring(serverPlayer.user_id.length - 6);
              _this2.players.push({
                id: index + 1,
                name: '玩家' + userIdLast6,
                avatar: '../../static/logo.png',
                status: '√已准备',
                dice: [],
                showDice: false,
                isCurrent: serverPlayer.is_current || false,
                isWinner: false,
                isLoser: false,
                userId: serverPlayer.user_id });

            }
          });
        }
      } else if (message.type === 'current_turn') {
        // 收到当前回合信息
        console.log('收到current_turn消息，更新当前回合');
        if (message.players && Array.isArray(message.players)) {
          // 更新玩家的当前状态
          message.players.forEach(function (serverPlayer) {
            var existingPlayer = _this2.players.find(function (p) {return p.userId === serverPlayer.user_id;});
            if (existingPlayer) {
              existingPlayer.isCurrent = serverPlayer.is_current || false;
            }
          });
        }
        // 强制开始新的倒计时，确保所有玩家看到相同的倒计时
        this.startCountdown();
      } else if (message.type === 'call_error') {
        // 叫数错误，保持按钮状态不变
        // 只显示错误消息，不修改按钮状态
        this.canCall = true;
        // 重新开始倒计时
        this.startCountdown();
      }
    },

    // 处理玩家退出
    handlePlayerLeave: function handlePlayerLeave() {
      // 断开WebSocket连接
      _websocket.default.disconnect();

      // 清除倒计时
      this.clearCountdown();

      // 更新游戏状态
      this.gameStatus = '本局无效，玩家已退出';
      this.gameHistory.unshift('本局无效，玩家已退出');

      // 设置游戏结束状态
      this.gameEnded = true;
      this.canCall = false;
      this.canOpen = false;
      this.canPee = false;
      this.canCounterPee = false;

      // 显示再来一局按钮
      uni.showToast({
        title: '本局无效，玩家已退出',
        icon: 'none' });

    },

    // 开始倒计时
    startCountdown: function startCountdown() {var _this3 = this;
      // 匹配中不开始倒计时
      if (this.isMatching) return;

      // 游戏已结束不开始倒计时
      if (this.gameEnded) return;

      console.log('开始倒计时，重置为15秒');

      // 强制清除之前的倒计时，确保完全重置
      this.clearCountdown();

      // 强制重置倒计时时间为15秒
      this.countdown = 15;
      console.log('倒计时已重置为:', this.countdown);

      // 开始新的倒计时
      this.countdownTimer = setInterval(function () {
        // 检查游戏是否已结束，如果已结束则清除倒计时
        if (_this3.gameEnded) {
          console.log('游戏已结束，清除倒计时');
          _this3.clearCountdown();
          return;
        }

        _this3.countdown--;
        console.log('当前倒计时:', _this3.countdown);

        if (_this3.countdown <= 0) {
          // 检查游戏是否已结束
          if (_this3.gameEnded) {
            _this3.clearCountdown();
            return;
          }

          // 检查是否是被劈状态
          if (_this3.isPeeTarget) {
            console.log('被劈超时，自动开骰');
            _this3.openDice();
          } else {
            // 检查是否是其他玩家的回合
            var currentPlayer = _this3.players.find(function (p) {return p.isCurrent;});
            if (currentPlayer && currentPlayer.userId !== _this3.userId) {
              // 其他玩家倒计时结束，增加延时检测时间到5秒，确保有足够时间收到叫骰消息
              setTimeout(function () {
                // 再次检查游戏是否已结束
                if (_this3.gameEnded) return;

                // 再次检查当前玩家状态
                var updatedCurrentPlayer = _this3.players.find(function (p) {return p.isCurrent;});
                // 只有当当前玩家仍然是同一个其他玩家时，才判断为断开
                if (updatedCurrentPlayer && updatedCurrentPlayer.userId !== _this3.userId &&
                updatedCurrentPlayer.userId === currentPlayer.userId) {
                  // 确认其他玩家确实没有叫骰，显示已断开
                  updatedCurrentPlayer.status = '已断开';
                  _this3.gameHistory.unshift("\u73A9\u5BB6".concat(updatedCurrentPlayer.name, "\u5DF2\u65AD\u5F00"));
                  _this3.gameStatus = "\u73A9\u5BB6".concat(updatedCurrentPlayer.name, "\u5DF2\u65AD\u5F00");

                  // 先设置游戏结束状态
                  _this3.gameEnded = true;
                  _this3.canCall = false;
                  _this3.canOpen = false;
                  _this3.canPee = false;
                  _this3.canCounterPee = false;

                  // 立即清除倒计时，确保倒计时停止
                  _this3.clearCountdown();

                  // 最后断开WebSocket连接
                  _websocket.default.disconnect();
                }
              }, 3000); // 延时3秒检测，增加时间确保网络延迟和消息传递
            } else {
              // 自己的回合，正常情况自动叫骰
              if (!_this3.gameEnded) {
                _this3.autoCallDice();
              }
            }
          }
          _this3.clearCountdown();
        }
      }, 1000);
    },

    // 清除倒计时
    clearCountdown: function clearCountdown() {
      if (this.countdownTimer) {
        console.log('清除倒计时');
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.countdown = 15;
        console.log('倒计时已清除，重置为:', this.countdown);
      }
    },

    // 自动叫骰
    autoCallDice: function autoCallDice() {var _this4 = this;
      // 检查游戏是否已结束或WebSocket是否已断开
      if (!this.canCall || this.gameEnded || !_websocket.default.isConnected) return;

      // 检查是否有玩家已断开连接
      var hasDisconnectedPlayer = this.players.some(function (p) {return p.status === '已断开';});
      if (hasDisconnectedPlayer) {
        console.log('有玩家已断开，跳过自动叫骰');
        return;
      }

      // 计算自动叫骰的数量（上一个玩家的数量+1）
      var autoQuantity = this.lastCall.quantity + 1;
      // 确保数量至少为2
      if (autoQuantity < 2) autoQuantity = 2;

      // 使用上一个玩家的点数和是否斋
      var autoPoint = this.lastCall.point || 1;
      var autoZhai = this.lastCall.isZhai || false;

      // 发送自动叫骰消息
      var zhaiValue = autoZhai ? 1 : 0;
      var callMessage = "".concat(autoQuantity, " ").concat(autoPoint, " ").concat(zhaiValue);

      // 发送消息并记录
      console.log('发送自动叫骰消息:', callMessage);
      _websocket.default.sendMessage(callMessage);

      var zhaiText = autoZhai ? '斋' : '不斋';
      var callText = "".concat(autoQuantity, "\u4E2A").concat(autoPoint).concat(zhaiText);

      // 添加历史记录
      this.gameHistory.unshift('超时自动叫骰: ' + callText);

      this.canCall = false;
      this.hasCalled = true; // 标记已叫骰过

      // 只有在游戏未结束时才显示提示
      if (!this.gameEnded) {
        uni.showToast({
          title: '超时自动叫骰',
          icon: 'success' });


        // 确保消息发送成功，增加双重保险
        setTimeout(function () {
          // 再次检查游戏是否已结束
          if (!_this4.gameEnded) {
            // 再次发送消息，确保所有玩家都能收到
            console.log('再次发送自动叫骰消息（双重保险）:', callMessage);
            _websocket.default.sendMessage(callMessage);
          }
        }, 500);
      }
    },

    // 处理游戏结束
    handleGameEnd: function handleGameEnd(message) {var _this5 = this;
      // 显示所有玩家的骰子
      console.log("this.players", this.players);
      console.log("message.players", message.players);

      // 确保所有玩家都在列表中
      if (message.players && Array.isArray(message.players)) {
        message.players.forEach(function (serverPlayer, index) {
          // 查找是否已存在该玩家
          var existingPlayer = _this5.players.find(function (p) {return p.userId === serverPlayer.user_id;});
          if (!existingPlayer) {
            // 如果不存在，添加新玩家，使用“玩家+用户ID后6位”格式
            var userIdLast6 = serverPlayer.user_id.substring(serverPlayer.user_id.length - 6);
            _this5.players.push({
              id: index + 1,
              name: '玩家' + userIdLast6,
              avatar: '../../static/logo.png',
              status: '√已准备',
              dice: serverPlayer.points,
              showDice: true,
              isCurrent: false,
              isWinner: serverPlayer.is_winner || false,
              isLoser: serverPlayer.is_loser || false,
              userId: serverPlayer.user_id });

          } else {
            // 如果存在，更新信息
            existingPlayer.showDice = true;
            existingPlayer.dice = serverPlayer.points;
            existingPlayer.isWinner = serverPlayer.is_winner || false;
            existingPlayer.isLoser = serverPlayer.is_loser || false;
          }
        });
      }

      this.canCall = false;
      this.canOpen = false;
      this.gameEnded = true; // 设置游戏结束状态
    },

    // 再来一局
    playAgain: function playAgain() {
      // 重置游戏状态
      this.gameEnded = false;
      this.canCall = false;
      this.canOpen = false;
      this.canPee = false;
      this.canCounterPee = false;
      this.hasCalled = false;
      this.isMatching = true; // 重新开始匹配

      // 重置玩家列表，只保留自己
      this.players = [
      {
        id: 1,
        name: '我',
        avatar: '../../static/me.png',
        status: '准备中',
        dice: [],
        showDice: false,
        isCurrent: true,
        isWinner: false,
        isLoser: false,
        userId: this.userId }];



      // 添加历史记录
      this.gameHistory.unshift('准备开始新一局游戏...');

      // 断开当前WebSocket连接
      _websocket.default.disconnect();

      // 重新连接WebSocket
      this.connectWebSocket();

      uni.showToast({
        title: '准备开始新一局',
        icon: 'success' });

    },

    // 返回上一页
    goBack: function goBack() {
      uni.navigateBack({
        delta: 1 });

    },

    // 进入规则页面
    goToRule: function goToRule() {
      uni.navigateTo({
        url: '/pages/dice/rule' });

    },



    // 打开叫骰界面
    openCallDice: function openCallDice() {
      if (!this.canCall) return;
      this.showCallDice = true;
    },

    // 选择数量
    selectNumber: function selectNumber(num) {
      this.selectedNumber = num;
    },

    // 选择点数
    selectPoint: function selectPoint(point) {
      this.selectedPoint = point;
    },

    // 切换斋
    toggleZhai: function toggleZhai() {
      this.selectedZhai = !this.selectedZhai;
    },

    // 取消叫骰
    cancelCallDice: function cancelCallDice() {
      this.showCallDice = false;
    },

    // 确认叫骰
    confirmCallDice: function confirmCallDice() {
      var zhaiValue = this.selectedZhai ? 1 : 0;
      // 发送叫数消息
      var callMessage = "".concat(this.selectedNumber, " ").concat(this.selectedPoint, " ").concat(zhaiValue);
      _websocket.default.sendMessage(callMessage);

      var zhaiText = this.selectedZhai ? '斋' : '不斋';
      var callText = "".concat(this.selectedNumber, "\u4E2A").concat(this.selectedPoint).concat(zhaiText);

      // 更新上一个叫骰信息
      this.lastCall = {
        quantity: this.selectedNumber,
        point: this.selectedPoint,
        isZhai: this.selectedZhai };


      // 添加历史记录
      this.gameHistory.unshift('我叫骰: ' + callText);

      this.showCallDice = false;
      this.canCall = false;
      this.hasCalled = true; // 标记已叫骰过
      this.clearCountdown(); // 清除倒计时

      // 暂时不切换玩家状态，等待服务端的消息

      uni.showToast({
        title: '叫骰成功',
        icon: 'success' });

    },

    // 开骰
    openDice: function openDice() {
      if (!this.canOpen) return;

      // 根据是否被劈决定发送什么命令
      if (this.isPeeTarget) {
        // 被劈时，点击开就是接劈开骰
        _websocket.default.sendMessage('82');
        this.gameHistory.unshift('我接受了劈命令');
        this.isPeeTarget = false; // 重置被劈状态
      } else {
        // 正常开骰
        _websocket.default.sendMessage('99');
        this.gameHistory.unshift('我开骰');
      }

      this.canCall = false;
      this.canOpen = false;

      uni.showToast({
        title: '开骰成功',
        icon: 'success' });

    },

    // 处理劈命令
    handlePee: function handlePee() {
      _websocket.default.sendMessage('80');
      this.gameHistory.unshift('我发起了劈命令');
    },

    // 处理反劈命令
    handleCounterPee: function handleCounterPee() {
      _websocket.default.sendMessage('81');
      this.gameHistory.unshift('我发起了反劈命令');
    },

    // 处理接劈开骰命令
    handleAcceptPee: function handleAcceptPee() {
      _websocket.default.sendMessage('82');
      this.gameHistory.unshift('我接受了劈命令');
    },

    // 处理接反劈开骰命令
    handleAcceptCounterPee: function handleAcceptCounterPee() {
      _websocket.default.sendMessage('83');
      this.gameHistory.unshift('我接受了反劈命令');
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 46:
/*!****************************************************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/dice/index.vue?vue&type=style&index=0&id=066854a3&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=066854a3&scoped=true&lang=css& */ 47);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_066854a3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 47:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/dice/index.vue?vue&type=style&index=0&id=066854a3&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[39,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/dice/index.js.map