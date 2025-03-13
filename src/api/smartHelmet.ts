import useUserinfoStore from "@/store/useUserinfoStore";
import { createHttpRequest } from "@/utils/HttpRequest";
import { RequestList } from "@/components/common/CoRequestList/useRequestList";

const env = import.meta.env;
let baseURL = "";
if (env.VITE_PROXY == "1") {
  baseURL = env.VITE_HELMET_API_PREFIX || ""; //配置默认请求地址--跨域代理
} else {
  baseURL = env.VITE_HELMET_API_URL + env.VITE_HELMET_API_PREFIX || ""; //配置默认请求地址--无代理
}
export const smartHelmetHttp = createHttpRequest(
  {
    isSuccess(res) {
      return res?.data?.code === 0;
    },
    giveMsg(res) {
      return res?.data?.msg;
    },
    giveErrMsg(error) {
      return error?.errMsg;
    },
  },
  {
    baseURL,
  }
);
smartHelmetHttp.interceptors.request.use((config) => {
  const userinfoStore = useUserinfoStore();
  config.header = {
    ...config.header,
    Authorization: `${userinfoStore.helmetToken}`,
  };
  return config;
});
smartHelmetHttp.interceptors.response.use(
  async (result) => {
    if (result.config.method === "DOWNLOAD") return result;
    const res = result.data;
    if (Object.is(res?.code, 9)) {
      //*token失效，刷新token
      const userinfoStore = useUserinfoStore();
      await userinfoStore.getSmartHelmetToken(true);
      let retry = result.config.custom?.retry || 0;
      if (retry < 1) {
        ++retry;
        return smartHelmetHttp.request({
          ...result.config,
          custom: { retry },
        });
      }
    }
    return res;
  },
  (error) => {
    return Promise.resolve({
      code: error.statusCode,
      message: error.errMsg,
      isSuccess: false,
    });
  }
);
/**请求res类型 */
export namespace Api {
  export interface SuccessRes<T> {
    code: 0;
    msg: string;
    isSuccess: true;
    data: T;
  }
  export interface FailRes<T> {
    code: number;
    msg: string;
    isSuccess: false;
    data?: T;
  }
  export type Res<T> = SuccessRes<T> | FailRes<T>;
}
export namespace PagingApi {
  /**请求分页接口返res类型 */
  export interface Res<T extends any[]> extends Api.SuccessRes<T> {
    pageInfo: PageInfo;
  }

  /**
   * 分页结果信息
   *
   * pageInfo，分页,从零开始
   */
  export interface PageInfo {
    /**
     * 分页,从零开始
     */
    page: number;
    /**
     * 分页大小
     */
    pageSize: number;
    /**
     * 条目总数
     */
    totalCount: number;
  }
  export interface Req {
    /**
     * 分页，从零开始
     */
    page: number;
    /**
     * 分页大小
     */
    pageSize: number;
  }
}

export function usePagingAdapter<
  F extends Fun<any[], Promise<PagingApi.Res<any[]>>> = Fun
>(api: F) {
  return async (
    ...params: Parameters<F>
  ): Promise<RequestList.Res<UnPromise<ReturnType<F>>["data"]>> => {
    const req = params.shift();
    const result = await api({ ...req, page: req.PageNo }, ...params);
    return {
      isSuccess: result.isSuccess,
      list: result.data || [],
      isEnd:
        (+result.pageInfo?.page + 1) * result.pageInfo?.pageSize >=
        result.pageInfo?.totalCount,
      message: result.msg,
    };
  };
}
