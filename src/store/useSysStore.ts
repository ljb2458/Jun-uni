import { defineStore } from "pinia";
import { localStorage } from "mp-storage";

const env = import.meta.env;
export default defineStore("SysStore", {
  //*全局仓库
  state,
  //*全局函数
  actions: {
    setDefaHttpHeader(val: SysStore.DefaHttpHeader, replace = false) {
      if (replace === true) {
        this.defaHttpHeader = val;
        return;
      }
      this.defaHttpHeader = {
        ...this.defaHttpHeader,
        ...val,
      };
    },
  },
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
export namespace SysStore {
  export interface Data {
    openId: string | undefined;
    defaHttpHeader: DefaHttpHeader | undefined;
  }
  export interface DefaHttpHeader extends AnyObject {}
}
/**初始化pinia */
function state(): SysStore.Data {
  return {
    openId: undefined,
    defaHttpHeader: undefined,
  };
}
