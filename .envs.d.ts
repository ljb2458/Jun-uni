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
  /**需要登录 */
  VITE_REQUIRED_LOGIN: "0" | "1";
  /**安全帽 API URL */
  VITE_HELMET_API_URL: string;
  /**安全帽 API 后缀 */
  VITE_HELMET_API_PREFIX: string;
  /**远程静态资源地址 */
  VITE_STATIC_URL: string;
  /**是否使用远程静态资源 */
  USE_STATIC_URL: "0" | "1";
  /**打印请求参数 */
  VITE_API_LOG: "0" | "1";
}
