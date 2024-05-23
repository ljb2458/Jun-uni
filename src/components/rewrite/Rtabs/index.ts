/*
 * @Date: 2023-04-21 18:16:39
 * @LastEditTime: 2023-06-14 12:28:01
 * @FilePath: /music-client/src/components/rewrite/Rtabs/index.ts
 * 介绍:
 */
export default "./Rtabs.vue";
export interface RtabsListItem {
  name?: string;
  badge?: Badge;
  disabled?: boolean;
  [k: string]: any;
}
export interface Badge {
  isDot?: boolean;
  value?: number;
}
