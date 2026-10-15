/**
 * 格式化相对时间
 * - 1分钟内 → "刚刚"
 * - 1小时内 → "x分钟前"
 * - 24小时内 → "x小时前"
 * - 超过24小时 → "yyyy-MM-dd"
 */
export function formatRelativeTime(date: string | Date): string {
  const now = Date.now();
  const target = new Date(date).getTime();
  const diff = now - target; // 毫秒差

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1)    return '刚刚';
  if (minutes < 60)   return `${minutes}分钟前`;
  if (hours < 24)     return `${hours}小时前`;

  // 超过24小时，显示具体日期
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}