import { objToQuery } from "@/utils/tools/object";
import {
  routersArray,
  getRouteInfo,
  getCurrentRouteInfo,
} from "@/utils/rewriteUni";

const router = {
  /**跳转路由 */
  push(url: string, config?: RouterToOption) {
    return new Promise<UniApp.NavigateToSuccessOptions>((resolve, reject) => {
      let queryStr = "";
      if (config?.query) queryStr = `${objToQuery(config.query, false)}`;
      delete config?.query;
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
  backOrHome(delta: number = 1, config?: Partial<UniApp.NavigateBackOptions>) {
    const page = getCurrentRouteInfo();
    if (page?.tabbar || page.pages.length == 1) {
      return router.home();
    } else {
      return router.back(delta, config);
    }
  },
  home() {
    const path = routersArray[0].path;
    const homeInfo = getRouteInfo(path);
    if (homeInfo?.tabbar) {
      return router.tabbar(`/${path}`);
    } else {
      return router.push(`/${path}`);
    }
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
export function replaceUrl(url: string) {
  return url.replace(/(?:^src|^\/src|^@)/, "").replace(/.vue$/, "");
}
export default router;
interface RouterToOption extends Partial<UniApp.NavigateToOptions> {
  query?: AnyObject;
}
