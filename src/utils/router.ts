/*
 * @Date: 2023-02-19 13:37:05
 * @LastEditTime: 2023-04-20 18:51:58
 * 介绍:路由跳转
 */
import { objToQuery } from "@/utils/tools/object";

const router = {
  /**跳转路由 */
  push(url: string, config?: RouterToOption) {
    return new Promise<UniApp.NavigateToSuccessOptions>((resolve, reject) => {
      let queryStr = "";
      if (config?.query) queryStr = `${objToQuery(config.query, false)}`;
      delete config?.query;
      console.log("queryStr", `${replaceUrl(url)}?${queryStr}`);
      uni.navigateTo({
        ...config,
        url: `${replaceUrl(url)}?${queryStr}`,
        success: resolve,
        fail: reject,
      });
    });
  },
  /**重定向路由 */
  replace(url: string, config?: RouterToOption) {
    return new Promise<UniApp.NavigateToSuccessOptions>((resolve, reject) => {
      let queryStr = "";
      if (config?.query) queryStr = `${objToQuery(config.query, false)}`;
      delete config?.query;
      uni.redirectTo({
        ...config,
        url: `${replaceUrl(url)}?${queryStr}`,
        success: resolve,
        fail: reject,
      });
    });
  },
  /**切换tabbar */
  tabbar(url: string) {
    return new Promise<void>((resolve, reject) => {
      uni.switchTab({
        url: replaceUrl(url),
        fail: reject,
        success: resolve,
      });
    });
  },
  /**路由返回 */
  back(delta: number = 1, config?: Partial<UniApp.NavigateBackOptions>) {
    return new Promise<void>((resolve, reject) => {
      uni.navigateBack({
        ...config,
        fail: reject,
        success: resolve,
        delta,
      });
    });
  },
  /**关闭所有页面并跳转 */
  replaceAll(url: string, config?: RouterToOption) {
    return new Promise<UniApp.NavigateToSuccessOptions>((resolve, reject) => {
      let queryStr = "";
      if (config?.query) queryStr = `${objToQuery(config.query, false)}`;
      delete config?.query;
      uni.reLaunch({
        ...config,
        url: `${replaceUrl(url)}?${queryStr}`,
        success: resolve,
        fail: reject,
      });
    });
  },
};
function replaceUrl(url: string) {
  return url.replace(/^src/, "").replace(/.vue$/, "");
}
export default router;
interface RouterToOption extends Partial<UniApp.NavigateToOptions> {
  query?: AnyObject;
}
