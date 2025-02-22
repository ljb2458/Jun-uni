import { defineStore } from "pinia";
import { localStorage } from "mp-storage";

export default defineStore("UserinfoStore", {
  //*全局仓库
  state: initState,
  //*全局函数
  actions: {},
  //*计算属性
  getters: {},
  //*仓库数据缓存
  persist: [
    {
      key: "UserinfoStore",
      storage: localStorage, //指定储存位置
    },
  ],
});
/**state类型定义 */
export namespace UserinfoStore {
  export interface Store {
    userinfo: Userinfo | undefined;
  }
  export interface Userinfo {
    avatarUrl?: string;
    nickname?: string;
    mobile?: string;
  }
}
/**初始化pinia */
function initState(): UserinfoStore.Store {
  return {
    userinfo: undefined,
  };
}
