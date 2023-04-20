/*
 * @Date: 2023-03-23 15:11:16
 * @LastEditTime: 2023-03-29 10:22:34
 * @FilePath: /mode-startup-template/src/utils/tools/index.ts
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
