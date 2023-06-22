/*
 * @Date: 2023-06-15 16:21:15
 * @LastEditTime: 2023-06-23 00:06:57
 * @FilePath: /music-client/src/components/common/CrequestList/index.ts
 * 介绍:
 */
import CrequestList from "./CrequestList.vue";
export function useCrequestListRef<T extends any[] = any[]>() {
  //@ts-ignore
  // type Instance = Omit<InstanceType<typeof CrequestList>, "data">;
  type Instance = GenericComponentExports<typeof CrequestList>;
  return ref<Instance & { data: T }>();
}
