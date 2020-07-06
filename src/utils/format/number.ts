/**
 * @name 安全数字区间
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function range (num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}
