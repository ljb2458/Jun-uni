import useSysStore from "@/store/useSysStore";

export const dictOrm = computed(() => {
  const sysStore = useSysStore();
  return sysStore.dictOrm;
});
