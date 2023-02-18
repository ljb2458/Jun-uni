/*
 * @Date: 2023-02-18 21:05:28
 * @LastEditTime: 2023-02-18 22:27:36
 * @FilePath: /my-vue3-project/src/api/index.ts
 * 介绍:
 */
import { HttpRequest } from "@@/utils/HttpRequest/HttpRequest";
const env = import.meta.env;
let baseUrl = "";
if (env.VITE_PROXY == "1") {
  baseUrl = env.VITE_API_PREFIX; //配置默认请求地址--跨域代理
} else {
  baseUrl = env.VITE_BASE_URL + env.VITE_API_PREFIX; //配置默认请求地址--无代理
}
const defaHttp = new HttpRequest({ baseUrl });

export { defaHttp };
