/*
 * @Date: 2023-04-21 13:29:51
 * @LastEditTime: 2023-06-23 00:09:10
 * @FilePath: /music-client/src/components/common/CtabsFor/index.ts
 * 介绍:
 */
import { RtabsListItem } from "@/components/rewrite/Rtabs";
import CtabsForVue from "./CtabsFor.vue";
export default "./CtabsFor.vue";
export interface CtabsForOptionsItem extends RtabsListItem {
  key?: StrNumber;
}

export function useCtabsForRef() {
  type Instance = GenericComponentExports<typeof CtabsForVue>;
  return ref<Instance>();
}
