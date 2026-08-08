// 游戏配置
export const gameConfig = {
  // 默认超时时间（秒）
  // 0 表示无限制，将显示思考时间而不是倒计时
  // 正数表示倒计时秒数，超时后会自动执行操作
  defaultTimeout: 60,

  // 骰蛊游戏配置
  dice: {
    defaultTimeout: 60
  },

  // 谎言扑克游戏配置
  lie: {
    defaultTimeout: 20
  },

  // 德州扑克游戏配置
  texas: {
    defaultTimeout: 30
  }
};

// 导出默认配置
export default gameConfig;
