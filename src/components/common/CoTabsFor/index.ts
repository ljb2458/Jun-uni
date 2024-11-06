import { RTabsListItem } from "@/components/rewrite/ReTabs/ReTabs.vue";
import CTabsForVue from "./CoTabsFor.vue";

export interface CTabsForOptionsItem extends RTabsListItem {
  key?: StrNumber;
}

export function useCTabsForRef() {
  type Instance = GenericComponentExports<typeof CTabsForVue>;
  return ref<Instance>();
}
