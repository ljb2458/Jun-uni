/*
 * @Date: 2023-03-23 15:11:16
 * @LastEditTime: 2023-04-20 19:02:28
 * @FilePath: /music-client/src/utils/tools/css.ts
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
  return (pixel || 0) + "%";

}
