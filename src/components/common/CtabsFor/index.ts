/*
 * @Date: 2023-04-21 13:29:51
 * @LastEditTime: 2023-06-12 16:20:38
 * @FilePath: /music-client/src/components/common/CtabsFor/index.ts
 * 介绍:
 */
import { RtabsListItem } from "@@/components/rewrite/Rtabs";
export default "./CtabsFor.vue";
export interface CtabsForOptionsItem extends RtabsListItem {
  key?: StrNumber;
}
export type CtabsForOptions<extra = AnyObject> = Array<
  CtabsForOptionsItem & extra
>;
