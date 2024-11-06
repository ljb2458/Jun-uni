/*
 * @Date: 2023-02-18 21:05:28
 * @LastEditTime: 2023-07-03 16:12:45
 * 介绍:
 */
import { HttpRequest } from "@/utils/HttpRequest/HttpRequest";
const env = import.meta.env;
let baseURL = "";
if (env.VITE_PROXY == "1") {
  baseURL = env.VITE_API_PREFIX; //配置默认请求地址--跨域代理
} else {
  baseURL = env.VITE_BASE_URL + env.VITE_API_PREFIX; //配置默认请求地址--无代理
}
export const defaHttp = new HttpRequest(
  {
    baseURL,
  },
  {
    isSuccess: (res) => res?.data?.code === 200,
    returnFailMsg: (res) => res?.data?.msg,
    returnSuccessMsg: (res) => res?.data?.msg,
  }
);

export const launchHttp = new HttpRequest(
  {
    baseURL: env.VITE_LAUNCH_URL,
  },
  {
    isSuccess: (res) => !!res,
    returnFailMsg: (res) => res?.errMsg,
    returnSuccessMsg: (res) => res?.data,
  }
);

/**请求res类型 */
export namespace Api {
  export interface Res<T> {
    code: number;
    msg: string;
    status: boolean;
    data: T;
  }
}
export namespace PagingApi {
  /**请求分页接口返res类型 */
  export type Res<T extends any[] = any[]> = Api.Res<Data<T>>;
  /**分页data类型 */
  export interface Data<T extends any[] = any[]> {
    /**当前页码数 */
    current_page: number;
    data: T;
    /**第一页 */
    first_page: string;
    /**尾页 */
    last_page: number;
    /**每页数据长度 */
    per_page: number;
    /**总数 */
    total: number;
  }

  /**分页参数 */
  export interface Req {
    page: number;
  }
}
