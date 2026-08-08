// 时间/时长格式化工具

/**
 * 将总秒数格式化为 HH:MM:SS 形式（例如 32 秒 -> "00:00:32"）
 * @param {number} totalSeconds 总秒数
 * @returns {string} 形如 00:00:32 的字符串
 */
export function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default {
  formatDuration
};
