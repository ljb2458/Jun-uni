/*
 * @Date: 2023-02-18 21:05:28
 * @LastEditTime: 2023-02-19 18:02:56
 * @FilePath: /my-vue3-project/src/api/index.ts
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
export interface ApiRes<T> {
  code: number;
  message: string;
  data: T;
}
