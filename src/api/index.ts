/*
 * @Date: 2023-02-18 21:05:28
 * @LastEditTime: 2023-04-21 23:39:17
 * @FilePath: /music-client/src/api/index.ts
 * 介绍:
 */
import { HttpRequest } from "@@/utils/HttpRequest/HttpRequest";
const env = import.meta.env;
let baseURL = "";
if (env.VITE_PROXY == "1") {
  baseURL = env.VITE_API_PREFIX; //配置默认请求地址--跨域代理
} else {
  baseURL = env.VITE_BASE_URL + env.VITE_API_PREFIX; //配置默认请求地址--无代理
}
const defaHttp = new HttpRequest({
  baseURL,
});

export { defaHttp };

export type ApiReturn<T> = Promise<ApiRes<T>>;

/**请求res类型 */
export interface ApiRes<T> {
  code: 200;
  msg: string;
  status: boolean;
  data: T;
}
export namespace Paging {
  /**请求分页接口返res类型 */
  export type Res<T> = ApiRes<Data<T>>;
  /**分页data类型 */
  export interface Data<T> {
    /**当前页码数 */
    current_page: number;
    data: T;
    /**第一页URL */
    first_page_url: string;
    /**首页 */
    from: number;
    /**尾页 */
    last_page: number;
    /**尾页URL */
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    /**下一页url */
    next_page_url: string;
    path: string;
    /**每页数据长度 */
    per_page: number;
    prev_page_url: string;
    /**下一页 */
    to: number;
    /**总数 */
    total: number;
  }

  /**分页参数 */
  export interface Req {
    page: number;
  }
}
