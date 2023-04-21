/*
 * @Date: 2023-04-21 18:16:39
 * @LastEditTime: 2023-04-21 20:21:51
 * @FilePath: /music-client/src/components/rewrite/Rtabs/index.ts
 * 介绍:
 */
export default "./Rtabs.vue";
export interface RtabsListItem extends AnyObject {
  name: string;
  badge?: Badge;
  disabled?: boolean;
}
export interface Badge {
  isDot?: boolean;
  value?: number;
}
export type RtabsList = Array<RtabsListItem>;
