import { pages, tabBar, subPackages } from "@/pages.json";
import { cloneDeep } from "lodash";
/**
 * 提取 uni-app 的 options 形式方法中 success 回调的参数类型
 */
type SuccessCallback<T> = T extends { success?: (res: infer R) => void }
  ? R
  : never;

/**
 * 将 uni-app 的 options 形式的方法转换为 Promise 形式
 * @param fun uni-app 的 options 形式方法
 * @param opt 方法的参数
 * @returns Promise，返回 success 回调的数据类型
 */
export function uniApiToPromise<F extends Fun<any>>(
  fun: F,
  opt?: Parameters<F>[0]
): Promise<SuccessCallback<Parameters<F>[0]>> {
  return new Promise((resolve, reject) => {
    fun({
      ...opt,
      success: (res: SuccessCallback<Parameters<F>[0]>) => resolve(res),
      fail: (err: any) => reject(err),
    });
  });
}

/**
 * * 显示原生模态框
 * @param content 显示内容
 * @param options 配置项
 * @returns
 */
export async function uniShowModal(
  options?: Partial<UniApp.ShowModalOptions>
): Promise<UniApp.ShowModalRes> {
  return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
    uni.showModal({
      ...options,
      success(res) {
        if (res.confirm) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: reject,
    });
  });
}

/**
 * * 获取系统信息
 * @returns
 */
export function getSystemInfo(): Promise<
  UniApp.GetSystemInfoResult | undefined | void
> {
  return new Promise<UniApp.GetSystemInfoResult | undefined | void>(
    (resolve) => {
      uni.getSystemInfo({
        success(res) {
          resolve(res);
        },
        fail(err) {
          console.warn("获取系统信息失败", err);
          resolve();
        },
      });
    }
  );
}
let systemInfo: UniApp.GetSystemInfoResult;
/**获取设备信息，缓存优化过的方法 */
export function getSystemInfoCache(config?: { force?: boolean }) {
  if (systemInfo && config?.force !== true) return systemInfo;
  else {
    const res = uni.getSystemInfoSync();
    return (systemInfo = res);
  }
}
let accountInfo: UniNamespace.AccountInfo;

/**获取设备信息，缓存优化过的方法 */
export function getAccountInfoCache(config?: { force?: boolean }) {
  if (accountInfo && config?.force !== true) return accountInfo;
  else {
    const res = uni.getAccountInfoSync();
    return (accountInfo = res);
  }
}
/**
 * 返回平台名称
 */
export function getOs(): GetOsRes {
  return uni.$uv.os();
}

export type GetOsRes = "ios" | "android";

/**
 * 用于获取当前运行的平台名称
 */
export function getPlatform(): getPlatformRes {
  return uni.$uv?.platform;
}

/**
 * VUE3，HBuilderX 3.2.0+	vue3
VUE2	vue2
App	plus
App nvue	nvue
H5	h5
微信小程序	weixin
支付宝小程序	alipay
百度小程序	baidu
字节跳动小程序、飞书小程序	toutiao
QQ小程序	qq
快手小程序	kuaishou
360小程序	360
微信小程序/支付宝小程序/百度小程序/字节跳动小程序/QQ小程序/360小程序	mp
快应用通用(包含联盟、华为)	webview
快应用联盟	webview-union
快应用华为	webview-huawei
 */
export type getPlatformRes =
  | "vue3"
  | "vue2"
  | "plus"
  | "nvue"
  | "h5"
  | "weixin"
  | "alipay"
  | "alipay"
  | "toutiao"
  | "qq"
  | "kuaishou"
  | "360"
  | "mp"
  | "webview"
  | "webview-union"
  | "webview-huawei";
/**
 * * 获取当前页面的路径
 * 示例： /pages/example/components
 */
export function getCurrentPath(): string {
  return uni.$uv.page();
}
/**
 * * 获取节点信息
 * @param queryNode 节点标识 .class #id
 * @param _this 传入当前this，以兼容小程序
 * @returns
 */
export function getRect(
  queryNode: string,
  _this?: any
): Promise<UniNamespace.NodeInfo> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(_this || getCurrentInstance());
    query
      .select(queryNode)
      .boundingClientRect((data) => {
        resolve(data as UniNamespace.NodeInfo);
      })
      .exec();
  });
}

/**
 * * 通过位置获取节点可见状态
 * @param queryNode 节点标识 .class #id
 * @param _this 传入当前this，以兼容小程序
 * @returns
 */
export async function isNodeVisible(queryNode: string, _this?: any) {
  const sysInfo = getSystemInfoCache();
  const nodeInfo = await getRect(queryNode, _this || getCurrentInstance());

  const left = Number(nodeInfo.left);
  const right = Number(nodeInfo.right);
  const top = Number(nodeInfo.top);
  const bottom = Number(nodeInfo.bottom);
  return (
    left > 0 &&
    right < sysInfo.screenWidth &&
    bottom > 0 &&
    top < sysInfo.screenHeight
  );
}
/**数组类型转联合类型 */
export type RouteInfo = ArrayToUnion<typeof pages> & {
  tabbar: ArrayToUnion<typeof tabBar.list> | undefined;
};

/**
 * 获取当前页面信息，uni配置项
 * @returns
 */
export function getCurrentRouteInfo(): RouteInfo | undefined {
  const pagesInfo = getCurrentPages();
  const currentPage: AnyObject = pagesInfo[pagesInfo.length - 1];
  const routePath: string = currentPage.route;
  console.log("routePath", routePath);
  return getRouteInfo(routePath);
}
/**
 * 获取当前页面路由配置
 * @param routePath 路由路径
 * @returns
 */
export function getRouteInfo(routePath: string) {
  const pageInfo = cloneDeep(
    routersArray.find((page) => page.path == routePath)
  );
  if (!pageInfo) return;
  const tabbar = cloneDeep(
    tabBar.list.find((item) => item.pagePath == routePath)
  );
  return {
    ...pageInfo,
    tabbar,
  };
}

/**包含所有路由的数组（已展平） */
export const routersArray = pages.map((v) => ({ ...v, isSubPackages: false }));

const subPackagesPages = [...subPackages];
while (subPackagesPages.length) {
  const item = subPackagesPages.shift();
  if (!item?.pages.length) continue;
  const pages = item.pages.map((v) => ({
    ...v,
    path: `${item.root}/${v.path}`,
    isSubPackages: true,
  }));
  routersArray.push(...pages);
}
