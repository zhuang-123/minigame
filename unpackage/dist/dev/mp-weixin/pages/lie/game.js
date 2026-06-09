(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/lie/game"],{

/***/ 80:
/*!************************************************************************!*\
  !*** F:/go-project/src/minigame/main.js?{"page":"pages%2Flie%2Fgame"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _game = _interopRequireDefault(__webpack_require__(/*! ./pages/lie/game.vue */ 81));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_game.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 81:
/*!*****************************************************!*\
  !*** F:/go-project/src/minigame/pages/lie/game.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.vue?vue&type=template&id=09d98812&scoped=true& */ 82);
/* harmony import */ var _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.vue?vue&type=script&lang=js& */ 84);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.vue?vue&type=style&index=0&id=09d98812&scoped=true&lang=css& */ 86);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "09d98812",
  null,
  false,
  _game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/lie/game.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 82:
/*!************************************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/lie/game.vue?vue&type=template&id=09d98812&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=template&id=09d98812&scoped=true& */ 83);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_template_id_09d98812_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 83:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/lie/game.vue?vue&type=template&id=09d98812&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var m0 = _vm.getCardImage("rear")
  var m1 = _vm.getCardImage({
    suit: _vm.wildCard.suit,
    rank: _vm.wildCard.rank,
    isWild: true
  })
  var m2 = _vm.getCardImage("rear")

  var l0 = _vm.__map(_vm.myCards, function(card, index) {
    var g0 = _vm.selectedCards.includes(index)
    var m3 = _vm.getCardImage(card)
    return {
      $orig: _vm.__get_orig(card),
      g0: g0,
      m3: m3
    }
  })

  var l1 = _vm.__map(_vm.challengeCards, function(card, index) {
    var m4 = _vm.getCardImage(card)
    return {
      $orig: _vm.__get_orig(card),
      m4: m4
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        l0: l0,
        l1: l1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 84:
/*!******************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/lie/game.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=script&lang=js& */ 85);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 85:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/lie/game.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;








































































































































































































































































































































var _websocket = _interopRequireDefault(__webpack_require__(/*! ../../common/websocket */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  data: function data() {
    return {
      // 游戏状态
      gameStatus: '游戏中',
      // 我的血量
      myHP: 3,
      // 我的名称（展示用）
      myName: '我',
      // 当前回合玩家名称（用于头像发光）
      currentTurnPlayerName: '',
      // 万能牌
      wildCard: { suit: 'SuitSpade', rank: '8' },
      // 对手信息
      opponents: [
      { name: '玩家2', avatar: '🎭', hp: 3, cards: 10 },
      { name: '玩家3', avatar: '🎪', hp: 3, cards: 10 }],

      // 我的手牌
      myCards: ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5'],
      // 选中的卡牌
      selectedCards: [],
      // 剩余牌数
      remainingCards: 22,
      // 上家出牌信息
      lastPlay: {
        player: '',
        type: '',
        cards: [],
        declaration: '' },

      // 是否是我的回合
      isMyTurn: false,
      // 选中的牌型
      selectedType: '',
      // 选中的牌值
      selectedValue: '',
      // 花色选择（仅同花顺）
      selectedSuit: '',
      // 花色选项
      cardSuits: [
      { value: 'SuitSpade', name: '♠️' },
      { value: 'SuitHeart', name: '♥️' },
      { value: 'SuitDiamond', name: '♦️' },
      { value: 'SuitClub', name: '♣️' }],

      // 游戏日志
      gameLogs: [],
      // 游戏是否结束
      gameEnd: false,
      // 是否获胜
      isWinner: false,
      // 排名列表
      rankingList: [],
      // 结束消息
      endMessage: '',
      // 是否正在观看模式
      isWatching: false,
      // 房间ID
      roomId: '',
      // 玩家ID
      playerId: '',
      // 是否已应用上页传入的 game_start（避免重复覆盖）
      gameStartApplied: false,
      // 质疑时显示的牌
      challengeCards: [],
      // 是否显示质疑时的牌
      showChallengeCards: false,
      // 质疑结果
      challengeResult: {
        success: false,
        message: '' },

      // 是否显示质疑结果弹窗
      showChallengeResult: false,
      // 血条更新触发器
      hpUpdateTrigger: 0,
      // 是否是质疑失败后的重新选择
      isChallengeFailed: false,
      // 玩家是否出局
      playerEliminated: false,

      // 牌型选项（按张数索引，1~5；4 张固定炸弹，5 张可选 straight/full_house/straight_flush）
      cardTypes: [
      { name: '单张', value: 'single' },
      { name: '对子', value: 'pair' },
      { name: '三条', value: 'triple' },
      { name: '炸弹', value: 'bomb' },
      { name: '顺子', value: 'straight' },
      { name: '葫芦', value: 'full_house' },
      { name: '同花顺', value: 'straight_flush' }],

      // 张数 → 自动牌型 映射（1=single, 2=pair, 3=triple, 4=bomb, 5=默认 straight 可改）
      typeByCount: {
        1: 'single',
        2: 'pair',
        3: 'triple',
        4: 'bomb',
        5: 'straight' },

      // 5 张牌可选的牌型（顺子/葫芦/同花顺）
      fiveCardTypeValues: ['straight', 'full_house', 'straight_flush'],
      // 牌值选项
      cardValues: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
      // 发牌动画状态
      isDealing: true,
      // 初始52张牌
      initialCards: Array(52).fill('back').map(function (_, index) {
        // 为每张卡牌分配固定的玩家目标位置，确保每张牌准确发放到对应玩家
        var x, y;
        var playerIndex = index % 3; // 假设3个玩家

        switch (playerIndex) {
          case 0: // 自己（下方）
            x = 0; // 直接发放到自己的手牌区域
            y = 400; // 固定的下方位置
            break;
          case 1: // 左边玩家
            x = -350; // 固定的左侧位置
            y = 0; // 中间高度
            break;
          case 2: // 右边玩家
            x = 350; // 固定的右侧位置
            y = 0; // 中间高度
            break;
          default:
            x = 0;
            y = 0;}


        return {
          id: index,
          x: x,
          y: y,
          playerIndex: playerIndex };

      }),
      // 正在发放的自己的手牌
      dealtCards: [],
      // 玩家操作消息
      playerActions: [],
      // 叫数显示状态
      callDisplay: {
        self: {
          show: false,
          text: '' },

        opponents: {} },


      // 倒计时相关
      countdown: {
        remainingTime: 0, // 剩余时间（秒）
        isRunning: false, // 是否正在倒计时
        timeout: 20, // 超时时间（秒）
        mustPlay: false // 是否是必须出牌的状态（your_turn）
      },
      // 当前回合玩家ID（用于匹配头像）
      currentTurnPlayerId: '' };

  },

  mounted: function mounted() {
    // 页面加载时初始化手牌
    console.log('页面加载，初始化手牌:', this.myCards);
    console.log('万能牌:', this.wildCard);

    // 移除模拟游戏开始消息，使用真实的服务端消息
    console.log('等待服务端发送game_start消息...');
  },

  onLoad: function onLoad(options) {var _this = this;
    // 从URL参数中获取playerId
    if (options.playerId !== undefined && options.playerId !== '') {
      this.playerId = options.playerId;
      console.log('从URL参数获取playerId:', this.playerId);
    }

    // 从URL参数中获取roomId（特别是重新连接时）
    if (options.roomId !== undefined && options.roomId !== '') {
      this.roomId = options.roomId;
      console.log('从URL参数获取roomId:', this.roomId);
    }

    // 注册 WebSocket 事件监听器
    console.log('在onLoad中注册事件监听器');
    uni.$on('websocketMessage', this.handleWebSocketMessage);
    uni.$on('websocketClose', this.handleWebSocketClose);
    console.log('WebSocket事件监听器注册完成');

    // 回放页面切换期间缓存的消息（避免 game_start 后紧跟 your_turn 时丢失）
    try {
      if (_websocket.default && typeof _websocket.default.drainMessageBuffer === 'function') {
        var buffered = _websocket.default.drainMessageBuffer();
        if (Array.isArray(buffered) && buffered.length > 0) {
          console.log('回放WebSocket缓存消息条数:', buffered.length);
          buffered.forEach(function (m) {
            try {_this.handleWebSocketMessage(m);} catch (_) {}
          });
        }
      }
    } catch (e) {
      console.warn('回放WebSocket缓存失败:', e);
    }

    // 通过地址参数接收上页传递的手牌，并直接赋值给 myCards
    try {
      // 玩家列表（用于顶部真实玩家名称展示）
      if (options && options.players) {
        var playersDecoded = decodeURIComponent(options.players);
        var players = JSON.parse(playersDecoded);
        if (Array.isArray(players) && players.length > 0) {
          var myId = String(this.playerId || '');
          var me = myId ? players.find(function (p) {return String(p.id) === myId;}) || null : null;
          if (me) {
            this.myName = me.name || this.myName;
            if (me.hp !== undefined && me.hp !== null) this.myHP = me.hp;
          } else {
            // 找不到自己的情况下，尝试用缓存昵称兜底
            var storedName = uni.getStorageSync('user_name') || uni.getStorageSync('nickname') || '';
            if (storedName) this.myName = storedName;
          }
          this.opponents = players.
          filter(function (p) {return !myId || String(p.id) !== myId;}).
          map(function (p) {return {
              name: p.name,
              avatar: '🎭',
              hp: p.hp,
              cards: p.cardCount || 0 };});

        }
      }

      if (!this.gameStartApplied && options && options.myCards) {
        var decoded = decodeURIComponent(options.myCards);
        var cards = JSON.parse(decoded);
        if (Array.isArray(cards) && cards.length > 0) {
          this.myCards = cards.map(function (c) {return {
              suit: c && c.suit !== undefined ? c.suit : 'SuitSpade',
              rank: String(c && c.rank ? c.rank : 'RankA').replace('Rank', '') };});

          this.gameStartApplied = true;
          console.log('已从地址参数赋值myCards:', this.myCards);

          // 发牌动画
          this.isDealing = true;
          this.dealtCards = [];
          this.myCards.forEach(function (c, idx) {
            setTimeout(function () {return _this.dealtCards.push(c);}, 500 + idx * 300);
          });
          setTimeout(function () {_this.isDealing = false;}, 500 + this.myCards.length * 300 + 1000);
        }
      }
      if (options && options.wildCard) {
        var wildDecoded = decodeURIComponent(options.wildCard);
        var wild = JSON.parse(wildDecoded);
        if (wild && wild.suit && wild.rank !== undefined) {
          this.wildCard = {
            suit: wild.suit,
            rank: String(wild.rank).replace('Rank', '') };

        }
      }
    } catch (e) {
      console.warn('解析地址参数失败:', e);
    }

    // 如果是重新连接，设置游戏状态
    if (options && options.rejoin === '1') {
      console.log('检测到重新连接，设置游戏状态');

      // 设置当前回合玩家
      if (options.currentPlayerName) {
        this.currentTurnPlayerName = decodeURIComponent(options.currentPlayerName);
        console.log('当前回合玩家:', this.currentTurnPlayerName);
      }

      // 获取上一次出牌玩家信息
      var lastPlayPlayerName = options.lastPlayPlayerName ? decodeURIComponent(options.lastPlayPlayerName) : '';

      // 设置上一次出牌信息（如果有）
      var declaredType = options.declaredType ? decodeURIComponent(options.declaredType) : '';
      var declaredRank = options.declaredRank ? decodeURIComponent(options.declaredRank) : '';
      var tableCardsCount = parseInt(options.tableCardsCount) || 0;

      if (declaredType && declaredRank) {
        // 使用上一次出牌玩家作为lastPlay的player
        var playPlayerName = lastPlayPlayerName || this.currentTurnPlayerName;
        this.lastPlay = {
          player: playPlayerName,
          type: declaredType,
          cards: Array(tableCardsCount).fill('?'),
          declaration: this.getDeclarationText(declaredType, declaredRank) };


        console.log('上一次出牌信息:', this.lastPlay);

        // 如果上一次出牌的玩家是其他玩家，显示红色叫牌提示框
        if (playPlayerName && playPlayerName !== this.myName) {
          var declaration = this.getDeclarationText(declaredType, declaredRank);
          if (!this.callDisplay.opponents[playPlayerName]) {
            this.callDisplay.opponents[playPlayerName] = {};
          }
          this.callDisplay.opponents[playPlayerName] = {
            show: true,
            text: declaration };

          console.log('显示其他玩家叫牌提示:', playPlayerName, declaration);
        }

        // 如果当前轮到自己，且已经有出牌，应该显示选择操作（质疑/过牌/接牌）
        if (this.currentTurnPlayerName === this.myName) {
          this.isMyTurn = false; // 不是出牌阶段，而是选择操作阶段
          console.log('当前轮到自己选择操作（质疑/过牌/接牌）');
        }
      } else {
        // 没有出牌信息，说明是新回合，轮到自己时应该出牌
        if (this.currentTurnPlayerName === this.myName) {
          this.isMyTurn = true;
          console.log('当前轮到自己出牌');
        }
      }
    }

    // 游戏页面不需要重新连接WebSocket，直接使用现有的连接
    this.gameLogs.unshift('正在进入游戏...');
  },

  computed: {
    // 是否可以出牌
    canPlay: function canPlay() {
      var cardCount = this.selectedCards.length;
      var isStraightType = this.selectedType === 'straight' || this.selectedType === 'straight_flush';
      var isStraightFlush = this.selectedType === 'straight_flush';
      return cardCount > 0 && cardCount <= 5 && this.selectedType && this.selectedValue && (!isStraightFlush || this.selectedSuit);
    },
    // 生成所有可能的顺子组合
    possibleStraights: function possibleStraights() {
      if (this.selectedCards.length !== 5) {
        return [];
      }

      var valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

      // 生成所有可能的5张连续点数组合
      var possibleStraights = [];
      for (var i = 0; i <= valueOrder.length - 5; i++) {
        var straight = valueOrder.slice(i, i + 5);
        possibleStraights.push(straight.join(' '));
      }

      return possibleStraights;
    },
    // 5张牌的牌型选项（顺子 / 葫芦 / 同花顺；炸弹是 4 张，不在此列）
    fiveCardTypes: function fiveCardTypes() {var _this2 = this;
      return this.cardTypes.filter(function (t) {return _this2.fiveCardTypeValues.includes(t.value);});
    },
    isSelfTurn: function isSelfTurn() {
      return !!this.currentTurnPlayerName && this.currentTurnPlayerName === this.myName;
    },
    // 生成血条HTML
    hpHearts: function hpHearts() {var _this3 = this;
      console.log('生成血条，当前血量:', this.myHP);
      return Array(3).fill(0).map(function (_, index) {
        var heartIndex = index + 1;
        return {
          index: heartIndex,
          active: heartIndex <= _this3.myHP };

      });
    },
    // 获取更新后的对手列表
    updatedOpponents: function updatedOpponents() {
      console.log('计算updatedOpponents，opponents:', JSON.parse(JSON.stringify(this.opponents)));
      return this.opponents;
    } },


  methods: {
    // 启动倒计时
    startCountdown: function startCountdown() {var _this4 = this;var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;var mustPlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 先停止之前的倒计时
      this.stopCountdown();

      this.countdown.timeout = timeout;
      this.countdown.remainingTime = timeout;
      this.countdown.isRunning = true;
      this.countdown.mustPlay = mustPlay;

      this.countdownTimer = setInterval(function () {
        _this4.countdown.remainingTime--;
        if (_this4.countdown.remainingTime <= 0) {
          // 在停止倒计时之前先检查是否需要自动出牌
          var needAutoPlay = _this4.countdown.mustPlay && _this4.isSelfTurn && _this4.myCards.length > 0;
          _this4.stopCountdown();
          // 如果是必须出牌的状态，超时自动出第一张牌
          if (needAutoPlay) {
            _this4.autoPlayFirstCard();
          }
        }
      }, 1000);
    },

    // 停止倒计时
    stopCountdown: function stopCountdown() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
      this.countdown.isRunning = false;
      this.countdown.remainingTime = 0;
      this.countdown.mustPlay = false;
    },

    // 自动出第一张牌（超时自动出牌）
    autoPlayFirstCard: function autoPlayFirstCard() {
      if (this.myCards.length === 0) {
        return;
      }

      console.log('超时自动出牌，出第一张牌');

      // 选择第一张牌
      var firstCard = this.myCards[0];
      var cardIndex = 0;
      var declaredRank = 'Rank' + firstCard.rank;
      var declaredType = 'single';

      // 发送出牌消息
      var playMessage = {
        Type: 'play',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId,
          cardIndices: [cardIndex],
          declaredType: declaredType,
          declaredRank: declaredRank,
          declaredSuit: firstCard.suit,
          declaredStraight: '' } };



      if (_websocket.default && typeof _websocket.default.sendMessage === 'function') {
        _websocket.default.sendMessage(JSON.stringify(playMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
        return;
      }

      // 显示自己的叫数
      var declaration = "\u5355\u5F20 ".concat(firstCard.rank);
      this.callDisplay.self = {
        show: true,
        text: declaration };


      // 隐藏亮牌
      this.showChallengeCards = false;
      this.challengeCards = [];

      // 更新本地状态
      var message = "\u4F60\u8D85\u65F6\u672A\u64CD\u4F5C\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u51FA\u4E86: ".concat(declaration);
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }

      this.selectedCards = [];
      this.selectedType = '';
      this.selectedValue = '';
      this.isMyTurn = false;

      uni.showToast({ title: '超时未操作，系统自动出牌', icon: 'none' });
    },

    // 将服务端 game_start 消息应用到对局状态（根据自己的 playerId 展示真实手牌）
    applyGameStartMessage: function applyGameStartMessage(message) {var _this5 = this;
      try {
        if (this.gameStartApplied) return;
        if (!message || !message.content) return;

        var content = message.content;
        var players = Array.isArray(content.players) ? content.players : [];

        // 用 URL 传入的 playerId 精确定位自己
        var myId = String(this.playerId || '');
        var myInfo = null;
        if (myId) {
          myInfo = players.find(function (p) {return String(p.id) === myId;}) || null;
        }

        // 若仍找不到，尝试用 storage 里的 user_name/name 做匹配（防止 playerId 丢失）
        if (!myInfo) {
          var storedName = uni.getStorageSync('user_name') || uni.getStorageSync('nickname') || '';
          if (storedName) {
            myInfo = players.find(function (p) {return String(p.name) === String(storedName);}) || null;
          }
        }

        // 更新房间与万能牌
        if (content.room_id) this.roomId = content.room_id;
        if (content.wildCard) {
          this.wildCard = {
            suit: content.wildCard.suit,
            rank: String(content.wildCard.rank || '').replace('Rank', '') };

        }

        // 更新对手信息（排除自己）
        this.opponents = players.
        filter(function (p) {return !myId || String(p.id) !== myId;}).
        map(function (p) {return {
            name: p.name,
            avatar: '🎭',
            hp: p.hp,
            cards: p.cardCount || (p.cards ? p.cards.length : 0) };});


        // 应用自己的真实手牌
        if (myInfo && Array.isArray(myInfo.cards) && myInfo.cards.length > 0) {
          this.myCards = myInfo.cards.map(function (card) {return {
              suit: card && card.suit !== undefined ? card.suit : 'SuitSpade',
              rank: String(card && card.rank ? card.rank : 'RankA').replace('Rank', '') };});

          this.myHP = myInfo.hp;
          console.log('已根据playerId应用真实手牌:', this.playerId, this.myCards);
          this.gameStartApplied = true;
        } else {
          console.warn('未找到自己的真实手牌（playerId匹配失败或cards为空）:', this.playerId);
        }

        // 牌数：默认按 52 - N*10（若服务端没给 remaining）
        var n = players.length || 3;
        this.remainingCards = 52 - n * 10;

        // 开始发牌动画（使用 myInfo.cards / myCards）
        this.isDealing = true;
        this.dealtCards = [];
        var cardsForDeal = myInfo && Array.isArray(myInfo.cards) && myInfo.cards.length > 0 ?
        myInfo.cards.map(function (card) {return {
            suit: card && card.suit !== undefined ? card.suit : 'SuitSpade',
            rank: String(card && card.rank ? card.rank : 'RankA').replace('Rank', '') };}) :

        Array.isArray(this.myCards) ? this.myCards : [];

        if (cardsForDeal.length > 0) {
          cardsForDeal.forEach(function (c, idx) {
            setTimeout(function () {return _this5.dealtCards.push(c);}, 500 + idx * 300);
          });
          setTimeout(function () {_this5.isDealing = false;}, 500 + cardsForDeal.length * 300 + 1000);
        } else {
          // 没有手牌数据就直接结束动画
          setTimeout(function () {_this5.isDealing = false;}, 800);
        }

        this.gameLogs.unshift('游戏开始！');
        if (this.wildCard && this.wildCard.rank) this.gameLogs.unshift("\u4E07\u80FD\u724C\uFF1A".concat(this.wildCard.rank));
      } catch (e) {
        console.error('applyGameStartMessage失败:', e);
      }
    },

    // 开始发牌动画
    startDealAnimation: function startDealAnimation() {var _this6 = this;
      this.isDealing = true;

      // 动画结束后设置为非发牌状态
      var delayTime = 3000; // 3秒动画时间
      setTimeout(function () {
        _this6.isDealing = false;
      }, delayTime);
    },
    // 选择卡牌
    selectCard: function selectCard(index) {
      var cardIndex = this.selectedCards.indexOf(index);
      if (cardIndex > -1) {
        this.selectedCards.splice(cardIndex, 1);
      } else {
        this.selectedCards.push(index);
      }

      // 根据选择的牌数自动设置牌型（1=single, 2=pair, 3=triple, 4=bomb, 5=默认 straight）
      var cardCount = this.selectedCards.length;
      this.selectedType = this.typeByCount[cardCount] || '';
    },

    // 选择牌型
    selectType: function selectType(type) {
      this.selectedType = type;
    },

    // 选择牌值
    selectValue: function selectValue(value) {
      this.selectedValue = value;
    },
    // 选择花色
    selectSuit: function selectSuit(suit) {
      this.selectedSuit = suit;
    },

    // 出牌
    playCards: function playCards() {var _this7 = this;
      // 验证牌型
      if (!this.validatePlay()) {
        uni.showToast({ title: '牌型不符合要求', icon: 'none' });
        return;
      }

      // 构建出牌信息
      var cardIndices = this.selectedCards;

      // 对于顺子和同花顺，处理selectedValue
      var declaredRank = 'Rank' + this.selectedValue;
      var declaredStraight = '';
      if (this.selectedType === 'straight' || this.selectedType === 'straight_flush') {
        var valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        var maxRank;

        // 如果selectedValue是顺子字符串（如"2 3 4 5 6"）
        if (this.selectedValue.includes(' ')) {
          var straightRanks = this.selectedValue.split(' ');
          maxRank = straightRanks[straightRanks.length - 1];
          declaredStraight = this.selectedValue;
        } else {
          // 否则使用默认值
          maxRank = 'A';
          declaredStraight = 'A';
        }

        declaredRank = 'Rank' + maxRank;
        // 不要修改this.selectedValue，这样getDeclaration方法就可以显示完整的顺子组合
      }

      // 对于同花顺，处理selectedSuit
      var declaredSuit = '';
      if (this.selectedType === 'straight_flush' && this.selectedSuit) {
        declaredSuit = this.selectedSuit;
      }

      // 发送出牌消息
      var playMessage = {
        Type: 'play',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId,
          cardIndices: cardIndices,
          declaredType: this.selectedType,
          declaredRank: declaredRank,
          declaredSuit: declaredSuit,
          declaredStraight: declaredStraight } };


      if (_websocket.default && typeof _websocket.default.sendMessage === 'function') {
        _websocket.default.sendMessage(JSON.stringify(playMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }

      // 停止倒计时
      this.stopCountdown();

      // 显示自己的叫数
      var declaration = this.getDeclaration();
      this.callDisplay.self = {
        show: true,
        text: declaration };


      // 隐藏亮牌
      this.showChallengeCards = false;
      this.challengeCards = [];

      // 更新本地状态
      var message = "\u4F60\u51FA\u4E86: ".concat(declaration);
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
      // 从手牌中移除出的牌
      this.myCards = this.myCards.filter(function (_, index) {return !_this7.selectedCards.includes(index);});
      this.selectedCards = [];
      this.selectedType = '';
      this.selectedValue = '';
      this.isMyTurn = false;
    },

    // 验证牌型
    validatePlay: function validatePlay() {
      var cardCount = this.selectedCards.length;

      // 验证牌型是否正确
      var isValidType = false;
      switch (this.selectedType) {
        case 'single':
          isValidType = cardCount === 1;
          break;
        case 'pair':
          isValidType = cardCount === 2;
          break;
        case 'triple':
          isValidType = cardCount === 3;
          break;
        case 'straight':
          isValidType = cardCount === 5;
          break;
        case 'full_house':
          isValidType = cardCount === 5;
          break;
        case 'bomb':
          isValidType = cardCount === 4;
          break;
        case 'straight_flush':
          isValidType = cardCount === 5;
          break;
        default:
          isValidType = false;}


      if (!isValidType) {
        return false;
      }

      // 验证顺子和同花顺的点数是否连续
      if (this.selectedType === 'straight' || this.selectedType === 'straight_flush') {
        if (!this.validateStraight()) {
          return false;
        }
        // 验证是否选择了顺子组合
        if (!this.selectedValue) {
          uni.showToast({ title: '请选择顺子组合', icon: 'none' });
          return false;
        }
        // 验证同花顺是否选择了花色
        if (this.selectedType === 'straight_flush' && !this.selectedSuit) {
          uni.showToast({ title: '请选择花色', icon: 'none' });
          return false;
        }
      } else {
        // 验证其他牌型是否选择了牌值
        if (!this.selectedValue) {
          uni.showToast({ title: '请选择牌值', icon: 'none' });
          return false;
        }
      }

      // 如果是接牌，需要验证牌型比上一次大
      if (this.lastPlay.type) {
        // 牌型强度顺序（由弱到强）
        var typeStrength = {
          'single': 1,
          'pair': 2,
          'triple': 3,
          'straight': 4,
          'full_house': 5,
          'bomb': 6,
          'straight_flush': 7 };


        // 牌值大小顺序
        var valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        // 获取上一次的牌型和牌值
        var lastType = this.lastPlay.type;
        var lastValue = this.lastPlay.declaration.split(' ')[1];

        // 获取当前的牌型和牌值
        var currentType = this.selectedType;
        var currentValue = this.selectedValue;

        // 比较牌型强度
        if (typeStrength[currentType] < typeStrength[lastType]) {
          uni.showToast({ title: '牌型必须比上一次大', icon: 'none' });
          return false;
        }

        // 如果牌型相同，比较牌值大小
        if (typeStrength[currentType] === typeStrength[lastType]) {
          var lastValueIndex = valueOrder.indexOf(lastValue);
          var currentValueIndex = valueOrder.indexOf(currentValue);

          if (currentValueIndex <= lastValueIndex) {
            uni.showToast({ title: '牌值必须比上一次大', icon: 'none' });
            return false;
          }
        }
      }

      return true;
    },

    // 验证顺子和同花顺（心理游戏，不需要验证实际的牌）
    validateStraight: function validateStraight() {
      // 这是一个心理游戏，玩家可以谎报自己的牌型
      // 不需要验证实际的牌是否真的能组成顺子或同花顺
      return true;
    },

    // 获取牌型声明文本
    getDeclaration: function getDeclaration() {
      var typeNames = {
        'single': '单张',
        'pair': '对子',
        'triple': '三条',
        'straight': '顺子',
        'full_house': '葫芦',
        'bomb': '炸弹',
        'straight_flush': '同花顺' };


      // 花色图案映射
      var suitSymbols = {
        'SuitSpade': '♠',
        'SuitHeart': '♥',
        'SuitDiamond': '♦',
        'SuitClub': '♣' };


      if (this.selectedType === 'straight_flush' && this.selectedSuit) {
        var suitSymbol = suitSymbols[this.selectedSuit] || '';
        return "".concat(typeNames[this.selectedType], " ").concat(suitSymbol, " ").concat(this.selectedValue);
      }

      return "".concat(typeNames[this.selectedType], " ").concat(this.selectedValue);
    },

    // 质疑
    challenge: function challenge() {
      // 发送质疑消息
      var challengeMessage = {
        Type: 'challenge',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId } };


      if (_websocket.default && typeof _websocket.default.sendMessage === 'function') {
        _websocket.default.sendMessage(JSON.stringify(challengeMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }

      // 停止倒计时
      this.stopCountdown();

      // 显示质疑文字
      this.callDisplay.self = {
        show: true,
        text: '质疑' };


      var message = '你选择了质疑';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }

      // 隐藏操作框
      this.currentTurnPlayerName = '';
    },

    // 过牌
    pass: function pass() {
      // 发送过牌消息
      var passMessage = {
        Type: 'pass',
        Content: {
          room_id: this.roomId,
          player_id: this.playerId } };


      if (_websocket.default && typeof _websocket.default.sendMessage === 'function') {
        _websocket.default.sendMessage(JSON.stringify(passMessage));
      } else {
        console.error('websocketService未初始化或sendMessage方法不存在');
      }

      // 停止倒计时
      this.stopCountdown();

      // 显示过牌文字
      this.callDisplay.self = {
        show: true,
        text: '过牌' };


      // 重置质疑失败标记
      this.isChallengeFailed = false;

      var message = '你选择了过牌';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }

      // 隐藏操作框
      this.currentTurnPlayerName = '';
    },

    // 显示出牌选项（接牌）
    showPlayOptions: function showPlayOptions() {
      // 切换到出牌模式
      this.isMyTurn = true;
      // 重置质疑失败标记
      this.isChallengeFailed = false;
      var message = '你选择了接牌，请出牌';
      this.gameLogs.unshift(message);
      this.playerActions.unshift(message);
      // 限制消息数量，只显示最近的10条
      if (this.playerActions.length > 10) {
        this.playerActions = this.playerActions.slice(0, 10);
      }
    },

    // 重新开始游戏
    restartGame: function restartGame() {
      // 重置游戏状态
      this.myHP = 3;
      this.myCards = [];
      this.selectedCards = [];
      this.lastPlay = {
        player: '',
        type: '',
        cards: [],
        declaration: '' };

      this.isMyTurn = false;
      this.selectedType = '';
      this.selectedValue = '';
      this.gameLogs = [];
      this.gameEnd = false;
      this.isWinner = false;
      this.gameStatus = '游戏中';
      this.roomId = '';
      this.playerId = '';
      this.isChallengeFailed = false;

      // 使用本地存储标记需要自动开始匹配
      uni.setStorageSync('autoStartMatch', true);

      // 返回主页面
      uni.navigateBack({ delta: 1 });
    },

    // 退出游戏
    exitGame: function exitGame() {
      // 退出游戏时不需要断开WebSocket，由index.vue页面负责断开
      uni.navigateBack({ delta: 1 });
    },

    // 留下观看
    stayAndWatch: function stayAndWatch() {
      // 隐藏出局弹窗，继续观看游戏
      this.playerEliminated = false;
      // 设置观看模式状态
      this.isWatching = true;
      console.log('留下观看游戏');
    },

    // 退出观看
    exitWatch: function exitWatch() {
      // 退出观看模式，返回匹配页面并自动开始匹配
      this.isWatching = false;
      // 使用本地存储标记需要自动开始匹配
      uni.setStorageSync('autoStartMatch', true);
      // 返回匹配页面
      uni.navigateBack({ delta: 1 });
    },

    onUnload: function onUnload() {
      // 移除对WebSocket消息的监听
      uni.$off('websocketMessage', this.handleWebSocketMessage);
      uni.$off('websocketClose', this.handleWebSocketClose);
      // 游戏页面不需要断开WebSocket，由index.vue页面负责断开
    },

    // 处理 WebSocket 消息
    handleWebSocketMessage: function handleWebSocketMessage(message) {var _this8 = this;
      console.log('收到WebSocket消息:', message);
      console.log('消息类型:', message.type);
      console.log('消息内容:', message.content);
      // 记录所有消息类型，以便调试
      if (message.type !== 'heartbeat') {
        console.log('消息类型记录:', message.type);
        // 特别记录质疑相关的消息
        if (message.type.includes('challenge') || message.type.includes('challeng') || message.type.includes('pass')) {
          console.log('质疑或过牌相关消息:', message);
        }
      }

      // 添加操作消息到左边消息框
      var addActionMessage = function addActionMessage(message) {
        _this8.playerActions.unshift(message);
        // 限制消息数量，只显示最近的10条
        if (_this8.playerActions.length > 10) {
          _this8.playerActions = _this8.playerActions.slice(0, 10);
        }
      };

      if (message.type === 'join_success') {
        // 加入游戏成功
        this.roomId = message.content.room_id;
        // 只有在playerId未设置时才从join_success消息中获取，避免覆盖从URL参数中获取的playerId
        if (this.playerId === '') {
          this.playerId = message.content.player_id;
          console.log('从join_success消息获取playerId:', this.playerId);
        }
        this.gameLogs.unshift('加入游戏成功！');
        this.gameLogs.unshift("\u5F53\u524D\u623F\u95F4: ".concat(this.roomId));
        addActionMessage('加入游戏成功！');
      } else if (message.type === 'waiting_players') {
        // 等待其他玩家
        this.gameLogs.unshift(message.content.message);
        addActionMessage(message.content.message);
      } else if (message.type === 'ready_to_start') {
        // 可以开始游戏
        this.gameLogs.unshift(message.content.message);
        addActionMessage(message.content.message);
      } else if (message.type === 'player_joined') {
        // 其他玩家加入
        this.gameLogs.unshift("".concat(message.content.player.Name, " \u52A0\u5165\u4E86\u6E38\u620F"));
        addActionMessage("".concat(message.content.player.Name, " \u52A0\u5165\u4E86\u6E38\u620F"));
      } else if (message.type === 'game_start') {
        console.log('收到game_start消息:', message);
        console.log('message.content:', message.content);
        console.log('message.content.players:', message.content.players);
        // 游戏开始，先触发发牌动画
        this.isDealing = true;

        // 延迟设置游戏数据，让发牌动画先播放
        setTimeout(function () {
          console.log('处理game_start数据:', message.content, _this8.playerId);
          // 尝试通过playerId查找对应的玩家信息
          var myInfo = null;
          if (message.content.players) {
            console.log('遍历所有玩家信息:');
            message.content.players.forEach(function (player, index) {
              console.log("\u73A9\u5BB6".concat(index, ": id=").concat(player.id, ", name=").concat(player.name, ", cards=").concat(player.cards ? player.cards.length : 0));
            });
            myInfo = message.content.players.find(function (p) {return p.id === _this8.playerId;});
            if (myInfo) {
              console.log('通过playerId找到玩家:', myInfo);
              // 提取手牌并转换格式，确保包含花色和点数
              if (myInfo.cards && myInfo.cards.length > 0) {
                _this8.myCards = myInfo.cards.map(function (card) {
                  // 确保正确处理卡牌格式
                  var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                  // 正确处理花色，确保 0（黑桃）也能被正确识别
                  var suit = card.suit !== undefined ? card.suit : 'SuitSpade'; // 默认花色为黑桃
                  return { suit: suit, rank: rank };
                });
                _this8.myHP = myInfo.hp;
                console.log('通过playerId查找的手牌:', _this8.myCards);
              } else {
                console.log('玩家手牌不存在或为空:', myInfo.id);
                // 服务端未返回手牌，使用模拟手牌作为fallback
                // 注意：这只是在服务端没有返回手牌时的临时方案
                _this8.myCards = [
                { suit: 'SuitSpade', rank: 'A' },
                { suit: 'SuitHeart', rank: 'K' },
                { suit: 'SuitDiamond', rank: 'Q' },
                { suit: 'SuitClub', rank: 'J' },
                { suit: 'SuitSpade', rank: '10' },
                { suit: 'SuitHeart', rank: '9' },
                { suit: 'SuitDiamond', rank: '8' },
                { suit: 'SuitClub', rank: '7' },
                { suit: 'SuitSpade', rank: '6' },
                { suit: 'SuitHeart', rank: '5' }];

                console.log('使用模拟手牌作为fallback:', _this8.myCards);
              }
            } else {
              console.log('未找到匹配的playerId:', _this8.playerId);
              // 尝试使用第一个玩家的手牌作为fallback
              if (message.content.players.length > 0 && message.content.players[0].cards) {
                console.log('使用players[0]的手牌作为fallback:', message.content.players[0].cards);
                _this8.myCards = message.content.players[0].cards.map(function (card) {
                  // 确保正确处理卡牌格式
                  var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                  // 正确处理花色，确保 0（黑桃）也能被正确识别
                  var suit = card.suit !== undefined ? card.suit : 'SuitSpade'; // 默认花色为黑桃
                  return { suit: suit, rank: rank };
                });
                console.log('从players[0]获取的手牌:', _this8.myCards);
              } else {
                // 服务端未返回手牌，使用模拟手牌作为fallback
                // 注意：这只是在服务端没有返回手牌时的临时方案
                _this8.myCards = [
                { suit: 'SuitSpade', rank: 'A' },
                { suit: 'SuitHeart', rank: 'K' },
                { suit: 'SuitDiamond', rank: 'Q' },
                { suit: 'SuitClub', rank: 'J' },
                { suit: 'SuitSpade', rank: '10' },
                { suit: 'SuitHeart', rank: '9' },
                { suit: 'SuitDiamond', rank: '8' },
                { suit: 'SuitClub', rank: '7' },
                { suit: 'SuitSpade', rank: '6' },
                { suit: 'SuitHeart', rank: '5' }];

                console.log('使用模拟手牌作为fallback:', _this8.myCards);
              }
            }
          } else {
            console.log('message.content.players不存在');
            // 服务端未返回手牌，使用模拟手牌作为fallback
            // 注意：这只是在服务端没有返回手牌时的临时方案
            _this8.myCards = [
            { suit: 'SuitSpade', rank: 'A' },
            { suit: 'SuitHeart', rank: 'K' },
            { suit: 'SuitDiamond', rank: 'Q' },
            { suit: 'SuitClub', rank: 'J' },
            { suit: 'SuitSpade', rank: '10' },
            { suit: 'SuitHeart', rank: '9' },
            { suit: 'SuitDiamond', rank: '8' },
            { suit: 'SuitClub', rank: '7' },
            { suit: 'SuitSpade', rank: '6' },
            { suit: 'SuitHeart', rank: '5' }];

            console.log('使用模拟手牌作为fallback:', _this8.myCards);
          }
          // 存储万能牌的花色和点数
          _this8.wildCard = {
            suit: message.content.wildCard.suit,
            rank: message.content.wildCard.rank.replace('Rank', '') };

          _this8.opponents = message.content.players.
          filter(function (p) {return p.id !== _this8.playerId;}).
          map(function (p) {return {
              name: p.name,
              avatar: '🎭',
              hp: p.hp,
              cards: p.cardCount || p.cards.length };});


          // 设置剩余牌数
          // 一副牌有52张，3个玩家每人发10张，剩余52 - 3*10 = 22张
          _this8.remainingCards = 22;
          _this8.gameLogs.unshift('游戏开始！');
          _this8.gameLogs.unshift("\u4E07\u80FD\u724C\uFF1A".concat(_this8.wildCard.rank));
          addActionMessage('游戏开始！');
          addActionMessage("\u4E07\u80FD\u724C\uFF1A".concat(_this8.wildCard.rank));

          // 依次发放自己的手牌
          _this8.dealtCards = [];
          // 尝试获取当前玩家的卡牌信息
          var currentPlayerCards = null;
          if (myInfo && myInfo.cards) {
            currentPlayerCards = myInfo.cards;
          } else if (message.content.players && message.content.players.length > 0 && message.content.players[0].cards) {
            currentPlayerCards = message.content.players[0].cards;
          }

          if (currentPlayerCards) {
            console.log('使用真实手牌进行发牌动画:', currentPlayerCards);
            currentPlayerCards.forEach(function (card, index) {
              setTimeout(function () {
                var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                var suit = card.suit || 'SuitSpade'; // 默认花色为黑桃
                _this8.dealtCards.push({ suit: suit, rank: rank });
              }, 500 + index * 300);
            });
          } else if (_this8.myCards.length > 0) {
            // 使用模拟手牌进行发放动画
            console.log('使用模拟手牌进行发牌动画:', _this8.myCards);
            _this8.myCards.forEach(function (card, index) {
              setTimeout(function () {
                _this8.dealtCards.push(card);
              }, 500 + index * 300);
            });
          }

          // 动画结束后隐藏初始牌
          var cardCount = currentPlayerCards ? currentPlayerCards.length : _this8.myCards.length;
          var delayTime = 500 + cardCount * 300 + 1000;
          setTimeout(function () {
            _this8.isDealing = false;
          }, delayTime);
        }, 500);
      } else if (message.type === 'your_turn') {
        // 轮到我出牌（必须出牌）
        this.isMyTurn = true;
        // 使用消息中的currentPlayer字段，确保即使myName未初始化也能正确显示倒计时
        this.currentTurnPlayerName = message.content.currentPlayer || this.myName;
        this.currentTurnPlayerId = message.content.currentPlayerId || this.playerId;
        // 隐藏亮牌并清空出牌区（全部玩家过牌后进入新回合）
        this.showChallengeCards = false;
        this.challengeCards = [];
        this.lastPlay = {
          player: '',
          type: '',
          cards: [],
          declaration: '' };

        // 清除之前的叫数显示
        for (var opponentName in this.callDisplay.opponents) {
          this.callDisplay.opponents[opponentName].show = false;
        }
        // 清除自己的叫数显示
        this.callDisplay.self.show = false;
        this.gameLogs.unshift('轮到你出牌了！');
        console.log('当轮出牌玩家的id:', this.playerId);
        addActionMessage('轮到你出牌了！');

        // 启动倒计时（必须出牌状态）
        var timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(timeout, true);
      } else if (message.type === 'player_turn') {
        // 轮到其他玩家出牌
        this.isMyTurn = false;
        if (message && message.content && message.content.currentPlayer) {
          this.currentTurnPlayerName = message.content.currentPlayer;
        }
        // 设置当前回合玩家ID
        this.currentTurnPlayerId = message.content.currentPlayerId || '';
        this.gameLogs.unshift("\u8F6E\u5230 ".concat(message.content.currentPlayer, " \u51FA\u724C"));
        addActionMessage("\u8F6E\u5230 ".concat(message.content.currentPlayer, " \u51FA\u724C"));

        // 启动倒计时（非必须出牌状态）
        var _timeout = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(_timeout, false);
      } else if (message.type === 'player_played') {
        // 处理玩家出牌
        // 停止倒计时
        this.stopCountdown();
        // 重置自己的回合状态
        this.isMyTurn = false;

        console.log('玩家出牌消息内容:', message.content);
        // 测试代码：打印完整的消息内容
        console.log('完整的player_played消息:', message);
        var declaration = this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit);

        // 隐藏亮牌
        this.showChallengeCards = false;
        this.challengeCards = [];
        // 设置新的出牌信息
        this.lastPlay = {
          player: message.content.playerName,
          type: message.content.declaredType,
          cards: Array(message.content.tableCardsCount).fill('?'),
          declaration: declaration };


        // 清除之前的叫数显示
        for (var _opponentName in this.callDisplay.opponents) {
          this.callDisplay.opponents[_opponentName].show = false;
        }

        // 显示当前玩家的叫数
        if (message.content.playerName === this.myName) {
          // 自己出牌，显示自己的叫数
          this.callDisplay.self = {
            show: true,
            text: declaration };

        } else {
          // 对手出牌，显示对手的叫数
          if (!this.callDisplay.opponents[message.content.playerName]) {
            this.callDisplay.opponents[message.content.playerName] = {};
          }
          this.callDisplay.opponents[message.content.playerName] = {
            show: true,
            text: declaration };

        }

        // 更新出牌玩家的剩余牌数
        console.log('更新玩家', message.content.playerName, '的剩余牌数，出牌数量:', message.content.tableCardsCount);

        // 如果是自己出牌且是超时自动出牌，更新自己的手牌
        // 正常出牌时，playCards方法已经处理了手牌移除
        if (message.content.playerName === this.myName && message.content.timeout) {
          // 移除出的牌（默认出第一张）
          this.myCards = this.myCards.slice(1);
          console.log('自己超时自动出牌，剩余手牌:', this.myCards);
        } else {
          // 创建一个新的opponents数组
          var newOpponents = JSON.parse(JSON.stringify(this.opponents));
          for (var i = 0; i < newOpponents.length; i++) {
            if (newOpponents[i].name === message.content.playerName) {
              // 减去出牌数量，得到剩余牌数
              newOpponents[i].cards = Math.max(0, newOpponents[i].cards - 1); // 自动出牌默认出1张
              console.log('玩家', message.content.playerName, '的剩余牌数更新为:', newOpponents[i].cards);
              break;
            }
          }
          // 替换原数组
          this.opponents = newOpponents;
        }
        // 增加血条更新触发器的值，强制血条重新渲染
        this.hpUpdateTrigger++;
        // 强制更新UI
        this.$forceUpdate();

        this.gameLogs.unshift("".concat(message.content.playerName, " \u51FA\u4E86: ").concat(declaration));
        addActionMessage("".concat(message.content.playerName, " \u51FA\u4E86: ").concat(declaration));
      } else if (message.type === 'your_choice') {
        // 轮到我做出选择
        this.isMyTurn = false;
        this.currentTurnPlayerName = this.myName;
        this.currentTurnPlayerId = this.playerId;
        this.lastPlay = {
          player: '',
          type: message.content.declaredType,
          cards: Array(message.content.tableCardsCount).fill('?'),
          declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit) };

        // 隐藏自己上次的出牌选择消息框
        this.callDisplay.self.show = false;
        addActionMessage('轮到你做出选择（质疑/过牌）');

        // 启动倒计时
        var _timeout2 = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(_timeout2);
      } else if (message.type === 'player_choice') {
        // 轮到其他玩家做出选择
        this.isMyTurn = false;
        if (message && message.content && message.content.currentPlayer) {
          this.currentTurnPlayerName = message.content.currentPlayer;
        }
        // 设置当前回合玩家ID
        this.currentTurnPlayerId = message.content.currentPlayerId || '';
        // 轮到下家时重置质疑失败标记，恢复质疑选项
        this.isChallengeFailed = false;
        this.gameLogs.unshift("\u8F6E\u5230 ".concat(message.content.currentPlayer, " \u505A\u51FA\u9009\u62E9"));
        console.log('当轮出牌玩家的id:', message.content.currentPlayerId);
        addActionMessage("\u8F6E\u5230 ".concat(message.content.currentPlayer, " \u505A\u51FA\u9009\u62E9"));

        // 启动倒计时
        var _timeout3 = message.content && message.content.timeout ? message.content.timeout : 20;
        this.startCountdown(_timeout3);
      } else if (message.type === 'player_passed') {
        // 玩家选择了过牌
        console.log('收到player_passed消息:', message);
        this.lastChoice = {
          player: message.content.playerName,
          action: '选择了过牌' };


        // 如果是自己过牌，显示自己的过牌文字
        if (message.content.playerName === this.myName) {
          this.callDisplay.self = {
            show: true,
            text: '过牌' };

        } else {
          // 显示其他玩家的过牌文字
          if (!this.callDisplay.opponents[message.content.playerName]) {
            this.callDisplay.opponents[message.content.playerName] = {};
          }
          this.callDisplay.opponents[message.content.playerName] = {
            show: true,
            text: '过牌' };

          console.log('设置其他玩家的过牌文字:', message.content.playerName, '过牌');
        }
        this.gameLogs.unshift("".concat(message.content.playerName, " \u9009\u62E9\u4E86\u8FC7\u724C"));
        addActionMessage("".concat(message.content.playerName, " \u9009\u62E9\u4E86\u8FC7\u724C"));
      } else if (message.type === 'challenge' || message.type === 'player_challenged' || message.type === 'player_chose_challenge') {
        // 处理质疑相关消息
        console.log('收到质疑相关消息:', message);
        console.log('质疑消息类型:', message.type);

        // 尝试从不同字段获取质疑者名称
        var challengerName = message.content.challenger || message.content.playerName || message.content.player;

        if (challengerName) {
          this.lastChoice = {
            player: challengerName,
            action: '选择了质疑' };

          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[challengerName]) {
            this.callDisplay.opponents[challengerName] = {};
          }
          this.callDisplay.opponents[challengerName] = {
            show: true,
            text: '质疑' };

          console.log('设置其他玩家的质疑文字:', challengerName, '质疑');
          this.gameLogs.unshift("".concat(challengerName, " \u9009\u62E9\u4E86\u8D28\u7591"));
          addActionMessage("".concat(challengerName, " \u9009\u62E9\u4E86\u8D28\u7591"));
        } else {
          console.log('未找到质疑者名称:', message.content);
        }
      } else if (message.type === 'challenge_failed') {
        // 质疑失败
        var _challengerName = message.content.challenger;
        if (_challengerName) {
          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[_challengerName]) {
            this.callDisplay.opponents[_challengerName] = {};
          }
          this.callDisplay.opponents[_challengerName] = {
            show: true,
            text: '质疑' };

          console.log('设置其他玩家的质疑文字:', _challengerName, '质疑');
        }
        // 显示上一个玩家出的真实牌和质疑结果
        if (message.content.cards) {
          this.lastPlay = {
            player: message.content.challenged,
            type: message.content.declaredType,
            cards: message.content.cards,
            declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank) };

          console.log('显示上一个玩家出的真实牌:', message.content.cards);
          // 显示质疑结果弹窗
          this.showChallengeResultModal(false, message.content.message, message.content.cards);
        }
        // 实时更新血条状态
        console.log('更新前血条状态:', this.myHP);
        console.log('服务端返回的血条状态:', message.content.challengerHP);
        console.log('质疑者:', message.content.challenger);
        console.log('当前玩家:', this.myName);

        // 只有当当前玩家是质疑者时，才更新自己的myHP
        if (message.content.challenger === this.myName) {
          // 直接更新myHP
          this.myHP = message.content.challengerHP;
          console.log('更新后血条状态:', this.myHP);
          // 强制更新UI
          this.$forceUpdate();

          // 增加血条更新触发器的值，强制血条重新渲染
          this.hpUpdateTrigger++;

          // 强制更新UI
          console.log('强制更新UI后');
          // 再次强制更新
          setTimeout(function () {
            _this8.$forceUpdate();
            console.log('再次强制更新UI后');
          }, 100);

          // 再次强制更新，确保所有UI元素都能更新
          setTimeout(function () {
            _this8.$forceUpdate();
            console.log('再次强制更新UI后');
          }, 100);
          // 直接修改DOM来更新血条
          setTimeout(function () {
            _this8.updateHPDisplay();
          }, 100);
          // 设置质疑失败标记，重新选择时不显示质疑按钮
          this.isChallengeFailed = true;
          this.gameLogs.unshift("\u8D28\u7591\u5931\u8D25\uFF01\u4F60\u62631\u6EF4\u8840\uFF0C\u5269\u4F59 ".concat(this.myHP, " \u6EF4\u8840"));
          if (this.myHP <= 0) {
            // 玩家出局，但游戏可能还没结束，显示出局弹窗
            this.playerEliminated = true;
          }
          addActionMessage("\u8D28\u7591\u5931\u8D25\uFF01\u4F60\u62631\u6EF4\u8840\uFF0C\u5269\u4F59 ".concat(this.myHP, " \u6EF4\u8840"));
        }

        // 创建一个新的opponents数组，确保Vue能够检测到变化
        var _newOpponents = JSON.parse(JSON.stringify(this.opponents));
        for (var _i = 0; _i < _newOpponents.length; _i++) {
          if (_newOpponents[_i].name === message.content.challenger) {
            _newOpponents[_i].hp = message.content.challengerHP;
            console.log('更新新opponents数组中第', _i, '个元素的血量为:', message.content.challengerHP);
            break;
          }
        }
        // 直接替换整个opponents数组
        this.opponents = _newOpponents;
        console.log('更新后opponents数组:', JSON.parse(JSON.stringify(this.opponents)));
      } else if (message.type === 'challenge_succeeded') {
        // 质疑成功
        var _challengerName2 = message.content.challenger;
        var challengedName = message.content.challenged;
        console.log('质疑成功 - 质疑者:', _challengerName2, '被质疑者:', challengedName);
        if (_challengerName2) {
          // 显示其他玩家的质疑文字
          if (!this.callDisplay.opponents[_challengerName2]) {
            this.callDisplay.opponents[_challengerName2] = {};
          }
          this.callDisplay.opponents[_challengerName2] = {
            show: true,
            text: '质疑' };

          console.log('设置其他玩家的质疑文字:', _challengerName2, '质疑');
        }
        // 显示上一个玩家出的真实牌和质疑结果
        if (message.content.cards) {
          this.lastPlay = {
            player: message.content.challenged,
            type: message.content.declaredType,
            cards: message.content.cards,
            declaration: this.getDeclarationText(message.content.declaredType, message.content.declaredRank, message.content.declaredStraight, message.content.declaredSuit) };

          console.log('显示上一个玩家出的真实牌:', message.content.cards);
          // 显示质疑结果弹窗
          this.showChallengeResultModal(true, message.content.message, message.content.cards);
        }
        // 清空出牌区
        setTimeout(function () {
          _this8.showChallengeCards = false;
          _this8.challengeCards = [];
          _this8.lastPlay = {
            player: '',
            type: '',
            cards: [],
            declaration: '' };

        }, 3000);
        // 更新被质疑玩家的手牌数量（收回牌）
        var tableCardsCount = message.content.cards ? message.content.cards.length : 0;
        console.log('更新玩家', challengedName, '的手牌数量，收回牌数量:', tableCardsCount);
        console.log('当前玩家:', this.myName);

        // 检查被质疑玩家是否是当前玩家自己
        if (challengedName === this.myName) {
          // 如果被质疑玩家是自己，更新自己的手牌数量
          this.myCards = this.myCards.concat(message.content.cards);
          console.log('自己收回牌，手牌数量更新为:', this.myCards.length);
        } else {
          // 如果被质疑玩家是其他玩家，更新opponents数组中的手牌数量
          console.log('当前opponents数组:', this.opponents);
          // 创建一个新的opponents数组
          var _newOpponents2 = JSON.parse(JSON.stringify(this.opponents));
          var found = false;
          for (var _i2 = 0; _i2 < _newOpponents2.length; _i2++) {
            console.log('检查玩家:', _newOpponents2[_i2].name);
            if (_newOpponents2[_i2].name === challengedName) {
              // 加上收回的牌数量，得到新的手牌数量
              _newOpponents2[_i2].cards = _newOpponents2[_i2].cards + tableCardsCount;
              console.log('玩家', challengedName, '的手牌数量更新为:', _newOpponents2[_i2].cards);
              found = true;
              break;
            }
          }
          if (!found) {
            console.log('未找到被质疑玩家:', challengedName);
          }
          // 替换原数组
          this.opponents = _newOpponents2;
          console.log('更新后opponents数组:', this.opponents);
        }
        // 增加血条更新触发器的值，强制UI重新渲染
        this.hpUpdateTrigger++;
        // 强制更新UI
        this.$forceUpdate();
        // 确保出牌权交给质疑者
        console.log('当前玩家:', this.myName, '是否是质疑者:', this.myName === _challengerName2);
        if (this.myName === _challengerName2) {
          this.isMyTurn = true;
          this.currentTurnPlayerName = this.myName;
          console.log('出牌权交给质疑者:', this.myName);
        }
        this.gameLogs.unshift("\u8D28\u7591\u6210\u529F\uFF01".concat(message.content.challenged, " \u6536\u56DE\u724C\uFF0C").concat(_challengerName2, " \u83B7\u5F97\u51FA\u724C\u6743"));
        addActionMessage("\u8D28\u7591\u6210\u529F\uFF01".concat(message.content.challenged, " \u6536\u56DE\u724C\uFF0C").concat(_challengerName2, " \u83B7\u5F97\u51FA\u724C\u6743"));
      } else if (message.type === 'player_eliminated') {
        // 玩家出局
        this.gameLogs.unshift("".concat(message.content.playerName, " \u5DF2\u51FA\u5C40"));
        // 更新对手信息
        this.opponents = this.opponents.map(function (opponent) {
          if (opponent.name === message.content.playerName) {
            return _objectSpread({}, opponent, { hp: 0 });
          }
          return opponent;
        });
        addActionMessage("".concat(message.content.playerName, " \u5DF2\u51FA\u5C40"));

        // 如果是自己出局，显示出局弹窗
        if (message.content.playerName === this.myName) {
          this.playerEliminated = true;
        }
      } else if (message.type === 'player_won') {
        // 玩家获胜
        this.gameLogs.unshift("".concat(message.content.playerName, " \u624B\u724C\u51FA\u5B8C\uFF0C\u83B7\u5F97\u7B2C ").concat(message.content.rank, " \u540D\uFF01"));
        addActionMessage("".concat(message.content.playerName, " \u624B\u724C\u51FA\u5B8C\uFF0C\u83B7\u5F97\u7B2C ").concat(message.content.rank, " \u540D\uFF01"));
      } else if (message.type === 'game_over') {
        // 游戏结束
        this.gameEnd = true;
        this.currentTurnPlayerName = '';
        var ranking = message.content.ranking;
        // 保存排名列表
        this.rankingList = ranking;
        var myRank = ranking.find(function (item) {return item.name === uni.getStorageSync('user_name');});
        if (myRank && myRank.rank === 1) {
          this.isWinner = true;
          this.endMessage = '恭喜你获得游戏胜利！';
        } else {
          this.isWinner = false;
          this.endMessage = "\u6E38\u620F\u7ED3\u675F\uFF01\u4F60\u7684\u6392\u540D\uFF1A\u7B2C ".concat(myRank ? myRank.rank : '?', " \u540D");
        }
        addActionMessage(this.endMessage);
      } else if (message.type === 'error') {
        // 处理错误消息
        uni.showToast({ title: message.content.message, icon: 'none' });
        this.gameLogs.unshift('错误: ' + message.content.message);
        addActionMessage('错误: ' + message.content.message);
      }
    },

    // 获取牌型声明文本
    getDeclarationText: function getDeclarationText(type, rank, straight, suit) {
      var typeNames = {
        'single': '单张',
        'pair': '对子',
        'triple': '三条',
        'straight': '顺子',
        'full_house': '葫芦',
        'bomb': '炸弹',
        'straight_flush': '同花顺' };


      // 花色图案映射
      var suitSymbols = {
        'SuitSpade': '♠',
        'SuitHeart': '♥',
        'SuitDiamond': '♦',
        'SuitClub': '♣',
        // 添加可能的服务器返回格式
        'spade': '♠',
        'heart': '♥',
        'diamond': '♦',
        'club': '♣' };


      // 测试代码：打印所有参数
      console.log('getDeclarationText参数:', {
        type: type,
        rank: rank,
        straight: straight,
        suit: suit });


      if (type === 'straight_flush') {
        // 确保suit参数存在且不为空
        var suitSymbol = suit ? suitSymbols[suit] || '' : '♦'; // 默认使用方块花色
        console.log('同花顺花色:', suit, '花色符号:', suitSymbol);
        if (straight) {
          var _result = "".concat(typeNames[type] || type, " ").concat(suitSymbol, " ").concat(straight);
          console.log('返回结果:', _result);
          return _result;
        } else {
          // 根据rank生成完整的顺子组合
          var valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
          var rankValue = rank.replace('Rank', '');
          var rankIndex = valueOrder.indexOf(rankValue);
          if (rankIndex >= 4) {// 确保有足够的前面的牌来组成顺子
            var straightRanks = [];
            for (var i = rankIndex - 4; i <= rankIndex; i++) {
              straightRanks.push(valueOrder[i]);
            }
            var _result2 = "".concat(typeNames[type] || type, " ").concat(suitSymbol, " ").concat(straightRanks.join(' '));
            console.log('返回结果:', _result2);
            return _result2;
          } else {
            // 如果无法生成顺子组合，直接返回牌型和点数
            var _result3 = "".concat(typeNames[type] || type, " ").concat(suitSymbol, " ").concat(rankValue);
            console.log('返回结果:', _result3);
            return _result3;
          }
        }
      } else if (type === 'straight') {
        if (straight) {
          var _result4 = "".concat(typeNames[type] || type, " ").concat(straight);
          console.log('返回结果:', _result4);
          return _result4;
        } else {
          // 根据rank生成完整的顺子组合
          var _valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
          var _rankValue = rank.replace('Rank', '');
          var _rankIndex = _valueOrder.indexOf(_rankValue);
          if (_rankIndex >= 4) {// 确保有足够的前面的牌来组成顺子
            var _straightRanks = [];
            for (var _i3 = _rankIndex - 4; _i3 <= _rankIndex; _i3++) {
              _straightRanks.push(_valueOrder[_i3]);
            }
            var _result5 = "".concat(typeNames[type] || type, " ").concat(_straightRanks.join(' '));
            console.log('返回结果:', _result5);
            return _result5;
          } else {
            // 如果无法生成顺子组合，直接返回牌型和点数
            var _result6 = "".concat(typeNames[type] || type, " ").concat(_rankValue);
            console.log('返回结果:', _result6);
            return _result6;
          }
        }
      }
      var result = "".concat(typeNames[type] || type, " ").concat(rank.replace('Rank', ''));
      console.log('返回结果:', result);
      return result;
    },

    // 处理// 处理WebSocket连接关闭
    handleWebSocketClose: function handleWebSocketClose() {
      console.log('WebSocket连接已关闭');
      uni.showToast({ title: '连接已断开', icon: 'none' });
    },

    // 处理从index.vue传递过来的game_start消息
    handleGameStartMessage: function handleGameStartMessage(message) {var _this9 = this;
      console.log('从index.vue收到game_start消息:', message);
      console.log('当前playerId:', this.playerId);
      console.log('game_start消息内容:', JSON.stringify(message, null, 2));

      // 只有在playerId未设置时才设置
      if (this.playerId === '' && message.content.players && message.content.players.length > 0) {
        // 假设第一个玩家是当前玩家
        this.playerId = message.content.players[0].id;
        console.log('设置playerId:', this.playerId);
      }

      // 直接处理game_start消息
      console.log('收到game_start消息:', message);
      console.log('message.content:', message.content);
      console.log('message.content.players:', message.content.players);
      // 游戏开始，先触发发牌动画
      this.isDealing = true;

      // 延迟设置游戏数据，让发牌动画先播放
      setTimeout(function () {
        console.log('处理game_start数据:', message.content, _this9.playerId);
        // 尝试通过playerId查找对应的玩家信息
        var myInfo = null;
        if (message.content.players) {
          myInfo = message.content.players.find(function (p) {return p.id === _this9.playerId;});
          if (myInfo) {
            console.log('通过playerId找到玩家:', myInfo);
            // 提取手牌并转换格式，确保包含花色和点数
            if (myInfo.cards && myInfo.cards.length > 0) {
              _this9.myCards = myInfo.cards.map(function (card) {
                // 确保正确处理卡牌格式
                var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                // 正确处理花色，确保 0（黑桃）也能被正确识别
                var suit = card.suit !== undefined ? card.suit : 'S'; // 默认花色为黑桃
                return { suit: suit, rank: rank };
              });
              _this9.myHP = myInfo.hp;
              console.log('通过playerId查找的手牌:', _this9.myCards);
            } else {
              console.log('玩家手牌不存在或为空:', myInfo.id);
              // 服务端未返回手牌，使用模拟手牌作为fallback
              // 注意：这只是在服务端没有返回手牌时的临时方案
              _this9.myCards = [
              { suit: 'S', rank: 'A' },
              { suit: 'H', rank: 'K' },
              { suit: 'D', rank: 'Q' },
              { suit: 'C', rank: 'J' },
              { suit: 'S', rank: '10' },
              { suit: 'H', rank: '9' },
              { suit: 'D', rank: '8' },
              { suit: 'C', rank: '7' },
              { suit: 'S', rank: '6' },
              { suit: 'H', rank: '5' }];

              console.log('使用模拟手牌作为fallback:', _this9.myCards);
            }
          } else {
            console.log('未找到匹配的playerId:', _this9.playerId);
            // 尝试使用第一个玩家的手牌作为fallback
            if (message.content.players.length > 0 && message.content.players[0].cards) {
              console.log('使用players[0]的手牌作为fallback:', message.content.players[0].cards);
              _this9.myCards = message.content.players[0].cards.map(function (card) {
                // 确保正确处理卡牌格式
                var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
                // 正确处理花色，确保 0（黑桃）也能被正确识别
                var suit = card.suit !== undefined ? card.suit : 'S'; // 默认花色为黑桃
                return { suit: suit, rank: rank };
              });
              console.log('从players[0]获取的手牌:', _this9.myCards);
            } else {
              // 服务端未返回手牌，使用模拟手牌作为fallback
              // 注意：这只是在服务端没有返回手牌时的临时方案
              _this9.myCards = [
              { suit: 'S', rank: 'A' },
              { suit: 'H', rank: 'K' },
              { suit: 'D', rank: 'Q' },
              { suit: 'C', rank: 'J' },
              { suit: 'S', rank: '10' },
              { suit: 'H', rank: '9' },
              { suit: 'D', rank: '8' },
              { suit: 'C', rank: '7' },
              { suit: 'S', rank: '6' },
              { suit: 'H', rank: '5' }];

              console.log('使用模拟手牌作为fallback:', _this9.myCards);
            }
          }
        } else {
          console.log('message.content.players不存在');
          // 服务端未返回手牌，使用模拟手牌作为fallback
          // 注意：这只是在服务端没有返回手牌时的临时方案
          _this9.myCards = [
          { suit: 'S', rank: 'A' },
          { suit: 'H', rank: 'K' },
          { suit: 'D', rank: 'Q' },
          { suit: 'C', rank: 'J' },
          { suit: 'S', rank: '10' },
          { suit: 'H', rank: '9' },
          { suit: 'D', rank: '8' },
          { suit: 'C', rank: '7' },
          { suit: 'S', rank: '6' },
          { suit: 'H', rank: '5' }];

          console.log('使用模拟手牌作为fallback:', _this9.myCards);
        }
        // 存储万能牌的花色和点数
        _this9.wildCard = {
          suit: message.content.wildCard.suit,
          rank: message.content.wildCard.rank.replace('Rank', '') };

        _this9.opponents = message.content.players.
        filter(function (p) {return p.id !== _this9.playerId;}).
        map(function (p) {return {
            name: p.name,
            avatar: '🎭',
            hp: p.hp,
            cards: p.cardCount || p.cards.length };});


        // 设置剩余牌数
        // 一副牌有52张，3个玩家每人发10张，剩余52 - 3*10 = 22张
        _this9.remainingCards = 22;
        _this9.gameLogs.unshift('游戏开始！');
        _this9.gameLogs.unshift("\u4E07\u80FD\u724C\uFF1A".concat(_this9.wildCard.rank));

        // 依次发放自己的手牌
        _this9.dealtCards = [];
        // 尝试获取当前玩家的卡牌信息
        var currentPlayerCards = null;
        if (myInfo && myInfo.cards) {
          currentPlayerCards = myInfo.cards;
        } else if (message.content.players && message.content.players.length > 0 && message.content.players[0].cards) {
          currentPlayerCards = message.content.players[0].cards;
        }

        if (currentPlayerCards) {
          console.log('使用真实手牌进行发牌动画:', currentPlayerCards);
          currentPlayerCards.forEach(function (card, index) {
            setTimeout(function () {
              var rank = card.rank ? card.rank.replace('Rank', '') : 'A';
              var suit = card.suit || 'S'; // 默认花色为黑桃
              _this9.dealtCards.push({ suit: suit, rank: rank });
            }, index * 300); // 每张牌间隔300ms
          });

          // 动画结束后设置为非发牌状态
          setTimeout(function () {
            _this9.isDealing = false;
          }, currentPlayerCards.length * 300 + 1000);
        } else {
          // 没有真实手牌，使用模拟手牌进行发牌动画
          console.log('使用模拟手牌进行发牌动画');
          var mockCards = [
          { suit: 'S', rank: 'A' },
          { suit: 'H', rank: 'K' },
          { suit: 'D', rank: 'Q' },
          { suit: 'C', rank: 'J' },
          { suit: 'S', rank: '10' },
          { suit: 'H', rank: '9' },
          { suit: 'D', rank: '8' },
          { suit: 'C', rank: '7' },
          { suit: 'S', rank: '6' },
          { suit: 'H', rank: '5' }];

          mockCards.forEach(function (card, index) {
            setTimeout(function () {
              _this9.dealtCards.push(card);
            }, index * 300); // 每张牌间隔300ms
          });

          // 动画结束后设置为非发牌状态
          setTimeout(function () {
            _this9.isDealing = false;
          }, mockCards.length * 300 + 1000);
        }
      }, 100);
    },

    // 获取卡牌图片路径
    getCardImage: function getCardImage(card) {
      if (card === 'back' || card === 'rear') {
        return 'https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/rear.png';
      } else if (typeof card === 'string' && card.startsWith('W')) {
        // 万能牌，使用金色背景
        var value = card.substring(1);
        var mappedValue = value === '10' ? '10' : value === 'J' ? '11' : value === 'Q' ? '12' : value === 'K' ? '13' : value === 'A' ? '14' : value;
        return "https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/5-".concat(mappedValue, ".png");
      } else if (typeof card === 'object' && card.suit && card.rank) {
        // 处理包含花色和点数的卡牌对象
        var valueMap = {
          '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
          'J': '11', 'Q': '12', 'K': '13', 'A': '14' };


        // 花色映射：根据服务端返回的花色字符串
        // SuitSpade=黑桃, SuitHeart=红桃, SuitDiamond=方块, SuitClub=梅花
        var suitMap = {
          'SuitSpade': '0', // 黑桃
          'SuitHeart': '1', // 红桃
          'SuitDiamond': '2', // 方块
          'SuitClub': '3' // 梅花
        };

        // 处理rank字段，移除Rank前缀
        var rank = card.rank;
        if (rank.startsWith('Rank')) {
          rank = rank.substring(4); // 移除Rank前缀
        }

        var suit = suitMap[card.suit] || '0'; // 默认黑桃
        var _value = valueMap[rank] || rank;
        return "https://bucket-percent.oss-cn-hangzhou.aliyuncs.com/asset/liepoker/".concat(suit, "-").concat(_value, ".png");
      } else if (typeof card === 'string') {
        // 处理普通字符串类型的卡牌（兼容旧格式）
        var _valueMap = {
          '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
          'J': '11', 'Q': '12', 'K': '13', 'A': '14' };


        // 默认使用黑桃（0）
        var _suit = '0';
        var _value2 = _valueMap[card] || card;
        return "/static/liepoker/".concat(_suit, "-").concat(_value2, ".png");
      } else {
        // 处理其他类型的卡牌
        console.warn('未知卡牌类型:', card);
        return '/static/liepoker/rear.png';
      }
    },

    // 关闭质疑结果提示框
    closeChallengeResult: function closeChallengeResult() {
      this.showChallengeResult = false;
      // 不移除亮牌，等待玩家出牌或过牌后再处理
    },

    // 显示质疑结果
    showChallengeResultModal: function showChallengeResultModal(success, message, cards) {var _this10 = this;
      this.challengeCards = cards;
      this.showChallengeCards = true;
      this.challengeResult = {
        success: success,
        message: message };

      this.showChallengeResult = true;
      // 3秒后自动关闭提示框
      setTimeout(function () {
        _this10.closeChallengeResult();
      }, 3000);
    },

    // 直接更新血条显示
    updateHPDisplay: function updateHPDisplay() {
      console.log('直接更新血条显示，当前血量:', this.myHP);
      // 移除DOM操作，改为使用小程序的方式
      // 强制更新UI
      this.$forceUpdate();
      console.log('强制更新UI后血条状态:', this.myHP);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 86:
/*!**************************************************************************************************************!*\
  !*** F:/go-project/src/minigame/pages/lie/game.vue?vue&type=style&index=0&id=09d98812&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./game.vue?vue&type=style&index=0&id=09d98812&scoped=true&lang=css& */ 87);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_game_vue_vue_type_style_index_0_id_09d98812_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 87:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/go-project/src/minigame/pages/lie/game.vue?vue&type=style&index=0&id=09d98812&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[80,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/lie/game.js.map