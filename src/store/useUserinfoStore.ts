import { defineStore } from "pinia";
import { localStorage } from "mp-storage";
import {
  apiGetWxPhone,
  ApiGetWxPhone,
  apiLogin,
  ApiLogin,
  apiGetSmartHelmetToken,
  apiCheckUserRole,
  ApiCheckUserRole,
  apiWxUserinfo,
  ApiWxUserinfo,
} from "@/api/userinfo";
import useSysStore from "./useSysStore";
import { uniApiToPromise } from "@/utils/rewriteUni";

export default defineStore("UserinfoStore", {
  //*全局仓库
  state,
  //*全局函数
  actions: {
    async getWxUserinfo(
      refresh = false
    ): Promise<UserinfoStore.Userinfo | undefined> {
      if (this.userinfo && refresh !== true) return this.userinfo;
      const res = await apiWxUserinfo();
      if (!res.isSuccess) return;
      this.setUserInfo(res.result);
      return this.userinfo;
    },
    async getSmartHelmetToken(refresh = false): Promise<string | undefined> {
      if (this.helmetToken && refresh !== true) return this.helmetToken;
      const res = await apiGetSmartHelmetToken();
      if (!res.isSuccess) return;
      const token = res.result.data?.token;
      if (!token) return;
      this.helmetToken = token;
      return token;
    },
    async getUserRole(
      req?: ApiCheckUserRole.Req,
      refresh = false
    ): Promise<ApiCheckUserRole.Res | undefined> {
      if (this.helmetToken && refresh !== true) return this.role;
      if (!req) {
        const { code } = await uniApiToPromise(uni.login);
        const sysStore = useSysStore();
        const openId = await sysStore.getWxOpenId(code);
        const mobile = this.userinfo?.phone;
        if (!openId) return uni.showToast({ title: "invalid openId" });
        req = {
          openId,
          mobile,
        };
      }
      const res = await apiCheckUserRole(req);
      if (!res.isSuccess) return;
      this.role = res.result;
      return this.role;
    },
    async getWxPhone(req: ApiGetWxPhone.Req): Promise<string | undefined> {
      const res = await apiGetWxPhone(req);
      if (!res.isSuccess) return;
      const phone = res.result.phoneNumber;
      this.setUserInfo({ phone });
      return phone;
    },
    async login(req: ApiLogin.Req): Promise<ApiLogin.Res | undefined> {
      const res = await apiLogin(req);
      if (!res.isSuccess) return;
      const sysStore = useSysStore();
      sysStore.setDefHttpHeader({
        Authorization: `Bearer ${res.result.accessToken}`,
      });
      this.tokenInfo = res.result;
      return res.result;
    },
    setUserInfo(val: UserinfoStore.Userinfo, replace = false) {
      if (replace === true) {
        this.userinfo = val;
        return;
      }
      this.userinfo = {
        ...this.userinfo,
        ...val,
      };
    },
  },
  //*计算属性
  getters: {
    helmetId(state) {
      if (!state._helmetId) return;
      return `PU_${state._helmetId}`;
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
    helmetToken: string | undefined;
    _helmetId: string | undefined;
    userinfo: Userinfo | undefined;
    tokenInfo: ApiLogin.Res | undefined;
    role: ApiCheckUserRole.Res | undefined;
  }
  export interface Userinfo extends Partial<ApiWxUserinfo.Res> {}
}
/**初始化pinia */
function state(): UserinfoStore.Store {
  return {
    role: undefined,
    _helmetId: undefined,
    userinfo: undefined,
    helmetToken: undefined,
    tokenInfo: undefined,
  };
}
