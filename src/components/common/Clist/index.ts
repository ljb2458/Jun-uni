import Clist from "./Clist.vue";
export interface LoadParam {
  reload: boolean;
}
export function useClistRef() {
  return ref<InstanceType<typeof Clist>>();
}
