import router from "./utils/router";
import { useUserStore } from "./store/user/index";
import { Sys } from "./enum/pubsubKey/system";
import { LOGIN_WHITE_LIST } from "@/enum/auth";
import { openLoginPopup } from "./layout/loginPopup";

/**app setup 时初始化 */
export function setupAppInit() {
  useRouterInterceptor();
  // const userStore = useUserStore();
  // if (userStore.token) loginedInit();
}
/**登录完成时初始化 */
export async function loginedInit() {
  // const sysStore = useSysStore();
  // const userStore = useUserStore();
  // userStore.getWxUserinfo(true);
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
        const res = await routerCheck(url as string);
        if (res === false) return false;
        return args;
      },
    });
  });
}
export async function routerCheck(
  url: string,
  replace = false
): Promise<boolean> {
  const env = import.meta.env;
  const userStore = useUserStore();
  if (env.VITE_REQUIRED_LOGIN === "0") return true;
  const [path] = url.split("?");
  if (LOGIN_WHITE_LIST.some((regexp) => regexp.test(path))) {
    //在白名单中
    return true;
  }
  if (!userStore.token) {
    try {
      await openLoginPopup();
      return true;
    } catch (error) {
      if (replace) router.backOrHome();
      return false;
    }
  }
  return true;
}
