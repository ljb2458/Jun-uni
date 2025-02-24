/*
 * @Date: 2023-02-18 20:06:36
 * @LastEditTime: 2023-06-15 18:48:44
 * 介绍:
 */
/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** 开发环境环境变量*/
  VITE_API_URL: string;
  /**代理开关*/
  VITE_PROXY: "0" | "1";
  /**接口后缀 */
  VITE_API_PREFIX: string;
  /**项目启动接口地址 */
  VITE_LAUNCH_URL: string;
}
