import { RtabsListItem } from "@@/components/rewrite/Rtabs";
export default "./CtabsFor.vue";
export interface CtabsForOptionsItem extends RtabsListItem {
  key?: StrNumber;
}
export type CtabsForOptions<extra = AnyObject> = Array<
  CtabsForOptionsItem & extra
>;
