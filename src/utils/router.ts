import { objToQuery } from "@/utils/tools/object";
import useSysStore from "@/store/useSysStore";

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
  return url.replace(/(?:^src|^\/src|^@)/, "").replace(/.vue$/, "");
}
export default router;
interface RouterToOption extends Partial<UniApp.NavigateToOptions> {
  query?: AnyObject;
}

// export const LOGIN_WHITE_LIST = [/^\/pages\/tabbar/, /^\/pages\/system/];
// const LOGIN_PATH = "@/pages/system/login.vue";

// export function useRouterInterceptor() {
//   const interceptorRouterList = [
//     "navigateTo",
//     "redirectTo",
//     "reLaunch",
//     "switchTab",
//   ];
//   interceptorRouterList.forEach((key) => {
//     uni.addInterceptor(key, {
//       invoke(args: UniNamespace.NavigateToOptions) {
//         const env = import.meta.env;
//         if (env.VITE_REQUIRED_LOGIN === "0") return;
//         const { url } = args;
//         if (Object.is(url, replaceUrl(LOGIN_PATH))) {
//           //是登录页
//           return;
//         }
//         if (LOGIN_WHITE_LIST.some((regexp) => regexp.test(url as string))) {
//           //在白名单中
//           return;
//         }
//         const sysStore = useSysStore();
//         if (sysStore.defaHttpHeader) {
//           //已登录
//           return;
//         }
//         router.push(LOGIN_PATH, {
//           query: { replace: url },
//         });
//         uni.showToast({ title: "请先登录小程序" });
//         console.warn(`未登录且 url:“${url}” 不在登录白名单中，已跳转登录`);
//         return false;
//       },
//     });
//   });
// }
