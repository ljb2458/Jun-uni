/*
 * @Date: 2023-02-18 22:28:47
 * @LastEditTime: 2023-02-22 20:12:06
 * @FilePath: /my-vue3-project/src/types/global/reset.d.ts
 * 介绍:
 */
interface ImportMetaEnv {
  /** 开发环境环境变量*/
  VITE_BASE_URL: string;
  /**代理开关*/
  VITE_PROXY: "0" | "1";
  /**接口后缀 */
  VITE_API_PREFIX: string;
}

declare namespace UniNamespace {
  interface RequestSuccessCallbackResult {
    data: any;
  }
}
interface Uni {
  $u: AnyObject;
}
