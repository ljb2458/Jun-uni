/*
 * @Date: 2023-04-21 13:37:49
 * @LastEditTime: 2023-04-21 15:56:17
 * @FilePath: /music-client/src/components/common/Cswiper/index.ts
 * 介绍:
 */
export default "./Cswiper.vue";
export type CswiperOptions<extra = AnyObject> = Array<
  CswiperOptionsItem & extra
>;
export interface CswiperOptionsItem {
  key?: StrNumber;
}
