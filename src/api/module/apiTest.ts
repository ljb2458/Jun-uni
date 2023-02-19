/*
 * @Date: 2023-02-19 11:25:25
 * @LastEditTime: 2023-02-19 17:07:14
 * @FilePath: /my-vue3-project/src/api/module/apiTest.ts
 * 介绍:
 */
import { defaHttp, ApiReturn } from "../index";

export async function apiTest400() {
  const res = await defaHttp.get("/start", undefined, { mode: ["showError"] });
  return res
}
