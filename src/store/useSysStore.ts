import { defineStore } from "pinia";
import { localStorage } from "mp-storage";
import { apiLogin, ApiLogin } from "@/api/sys";

const env = import.meta.env;
export default defineStore("SysStore", {
  //*全局仓库
  state: initState,
  //*全局函数
  actions: {
    async login() {
      const params = {
        UserName: "123",
        Password: "123",
      };
      const res = await apiLogin(params);
      return (this.defaHttpHeader = res.data);
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
    defaHttpHeader: ApiLogin.Res | undefined;
  }
}
/**初始化pinia */
function initState(): SysStore.Data {
  return {
    defaHttpHeader: undefined,
  };
}
