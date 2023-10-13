/*
 * @Date: 2023-06-15 16:21:15
 * @LastEditTime: 2023-07-03 13:43:04
 * @FilePath: /music-client/src/components/common/CrequestList/index.ts
 * 介绍:
 */
import CrequestList from "./CrequestList.vue";
import type { Api, GetApiData, GetApiRes } from "@/hooks/useRequestList";

export function useCrequestListRef<F extends Api>() {
  //@ts-ignore
  // type Instance = Omit<InstanceType<typeof CrequestList>, "data">;
  type Instance = GenericComponentExports<typeof CrequestList>;
  return ref<
    Omit<Instance, "data" | "res"> & {
      data: GetApiData<F>;
      res: GetApiRes<F> | undefined;
    }
  >();
}
