/*
 * @Date: 2023-02-19 11:43:32
 * @LastEditTime: 2023-06-15 18:54:58
 * @FilePath: /music-client/src/store/useSysStore.ts
 * 介绍:
 */
import { defineStore } from "pinia";
import { localStorage } from "mp-storage";

export default defineStore("SysStore", {
  //*全局仓库
  state: initState,
  //*全局函数
  actions: {},
  //*计算属性
  getters: {},
  //*仓库数据缓存
  persist: [
    {
      key: "SysStore",
      storage: localStorage, //指定储存位置
    },
  ],
});
/**state类型定义 */
interface SysStore {}
/**初始化pinia */
function initState(): SysStore {
  return {};
}
