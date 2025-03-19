import router, { replaceUrl } from "./utils/router";
import useSysStore from "@/store/useSysStore";
import useUserinfoStore from "./store/useUserinfoStore";
import { Sys } from "./enum/pubsubKey/system";
import {
  HouseAdminCode,
  HouseAdminRoute,
  LOGIN_WHITE_LIST,
  LOGIN_PATH,
} from "@/enum/auth";

/**app setup 时初始化 */
export function setupAppInit() {
  useRouterInterceptor();
  const userinfoStore = useUserinfoStore();
  if (userinfoStore.tokenInfo) loginedInit();
}
/**登录完成时初始化 */
export async function loginedInit() {
  const sysStore = useSysStore();
  const userinfoStore = useUserinfoStore();
  userinfoStore.getWxUserinfo(true);
  await sysStore.geAllDictList();
  uni.$emit(Sys.OnLogin);
}

uni.addInterceptor("showLoading", {
  invoke(args: UniNamespace.ShowLoadingOptions) {
    if (args.mask !== false) args.mask = true;
    return args;
  },
});

uni.addInterceptor("showToast", {
  invoke(args: UniNamespace.ShowToastOptions) {
    args.icon ??= "none";
    args.duration ??= 3000;
    return args;
  },
});
// #ifdef APP
plus.screen.lockOrientation("portrait-primary");
// #endif
/**
 * * 传入什么类型就返回什么类型，方便在对象中定义类型
 */
globalThis.defineType = <D>(v?: D) => v;
declare global {
  function defineType<D>(value: D): D;
  function defineType<D>(): D | undefined;
}

export function useRouterInterceptor() {
  const interceptorRouterList = [
    "navigateTo",
    "redirectTo",
    "reLaunch",
    "switchTab",
  ];
  interceptorRouterList.forEach((key) => {
    uni.addInterceptor(key, {
      async invoke(args: UniNamespace.NavigateToOptions) {
        const { url } = args;
        const res = await roleCheck(url as string);
        if (res === false) return false;
        return args;
      },
    });
  });
}
export async function roleCheck(
  url: string,
  replace = false
): Promise<boolean> {
  const env = import.meta.env;
  if (env.VITE_REQUIRED_LOGIN === "0") return true;
  const [path] = url.split("?");
  if (Object.is(path, replaceUrl(LOGIN_PATH))) {
    //是登录页
    return true;
  }

  if (LOGIN_WHITE_LIST.some((regexp) => regexp.test(path))) {
    //在白名单中
    return true;
  }
  const userinfoStore = useUserinfoStore();
  if (!userinfoStore.tokenInfo) {
    console.warn(`未登录且 url:“${path}” 不在登录白名单中`);
    if (replace) {
      await router.backOrHome();
    }
    await router.push(LOGIN_PATH, {
      query: { replace: path },
    });
    uni.showToast({ title: "请先登录小程序" });
    return false;
  }
  if (
    HouseAdminRoute.some((v) => v.test(url)) &&
    !HouseAdminCode.some((v) => userinfoStore.userinfo?.roleInfo?.code === v)
  ) {
    if (replace) {
      await router.backOrHome();
    }
    uni.showToast({ title: "您无权进入！" });
    return false;
  }
  return true;
}
