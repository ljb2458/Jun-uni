import { defineStore } from "pinia";
import { localStorage } from "mp-storage";
import { apiLaunch } from "@/api/sys";
import {
  getSystemInfoCache,
  getAccountInfoCache,
} from "@/package/js/rewriteUni";

const env = import.meta.env;
export default defineStore("SysStore", {
  //*全局仓库
  state: initState,
  //*全局函数
  actions: {
    async launch() {
      const appId = "wxf6d74a8200e1fe2d";
      const envVersion = env.DEV ? "develop" : "production";
      const miniProgram = getAccountInfoCache().miniProgram;
      const systemInfo = getSystemInfoCache();
      const appVersion = "3.3.129";
      const query = "";
      const referrerInfo = uni.getLaunchOptionsSync().referrerInfo;
      const path = "pages/home/launcher";
      const scene = 1001;

      const res = await apiLaunch({
        appVersion,
        miniProgram,
        systemInfo,
        referrerInfo,
        query,
        path,
        scene,
      });
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
interface SysStore {}
/**初始化pinia */
function initState(): SysStore {
  return {};
}
