import { defineStore } from "pinia";
import { localStorage } from "mp-storage";
import {
  apiGetWxPhone,
  ApiGetWxPhone,
  apiLogin,
  ApiLogin,
  ApiWxUserinfo,
  apiGetWxOpenId,
} from "@/api/userinfo";

export const useUserStore = defineStore("UserinfoStore", {
  //*全局仓库
  state,
  //*全局函数
  actions: {
    clear() {
      this.data = undefined;
      this.phone = undefined;
      this.openId = undefined;
    },
    async getWxOpenId(
      code: string,
      refresh = false
    ): Promise<string | undefined> {
      if (this.openId && refresh !== true) return this.openId;
      const res = await apiGetWxOpenId({ JsCode: code });
      if (!res.isSuccess) return;
      this.openId = res.result.openId;
      return this.openId;
    },
    // async getWxUserinfo(
    //   refresh = false
    // ): Promise<UserinfoStore.Userinfo | undefined> {
    //   if (this.userinfo && refresh !== true) return this.userinfo;
    //   const res = await apiWxUserinfo();
    //   if (!res.isSuccess) return;
    //   this.setUserInfo(res.result);
    //   return this.userinfo;
    // },

    async getWxPhone(req: ApiGetWxPhone.Req): Promise<string | undefined> {
      const res = await apiGetWxPhone(req);
      if (!res.isSuccess) return;
      const phone = res.result.phoneNumber;
      this.phone = phone;
      return phone;
    },
    async login(req: ApiLogin.Req): Promise<ApiLogin.Res | undefined> {
      const res = await apiLogin(req);
      if (!res.isSuccess) return;
      this.data = res.result;
      return res.result;
    },
    // setUserInfo(val: UserinfoStore.Userinfo, replace = false) {
    //   if (replace === true) {
    //     this.userinfo = val;
    //     return;
    //   }
    //   this.userinfo = {
    //     ...this.userinfo,
    //     ...val,
    //   };
    // },
  },
  //*计算属性
  getters: {
    token(state) {
      return state.data?.accessToken;
    },
  },
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
    /**微信openId，用户在微信平台的唯一id */
    openId: string | undefined;
    // userinfo: Userinfo | undefined;
    phone: string | undefined;
    data: ApiLogin.Res | undefined;
  }
  export interface Userinfo extends Partial<ApiWxUserinfo.Res> {}
}
/**初始化pinia */
function state(): UserinfoStore.Store {
  return {
    openId: undefined,
    phone: undefined,
    // userinfo: undefined,
    data: undefined,
  };
}
