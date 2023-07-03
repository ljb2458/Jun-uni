/*
 * @Date: 2023-03-23 15:11:16
 * @LastEditTime: 2023-04-20 20:11:28
 * 介绍:
 */
export function unitPx(pixel: string | undefined | number): string {
  return (pixel || 0) + "px";
}
export function unitRem(pixel: string | undefined | number): string {
  return (pixel || 0) + "rem";
}
export function unitVmax(pixel: string | undefined | number): string {
  return (pixel || 0) + "vmax";
}
export function unitVmin(pixel: string | undefined | number): string {
  return (pixel || 0) + "Vmin";
}
export function unitPercent(pixel: string | undefined | number): string {
  return Number(pixel || 0) * 100 + "%";
}
