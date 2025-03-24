import { pages, tabBar, subPackages } from "@/pages.json";
import { cloneDeep } from "lodash";
import { name } from "@/manifest.json";

export const appCfg = {
  icon: "",
  name: name,
};
// #ifdef MP-WEIXIN
appCfg.icon = __wxConfig.accountInfo.icon;
declare global {
  const __wxConfig: AnyObject;
}
// #endif
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
 * * 获取节点信息
 * @param selector 节点标识 .class #id
 * @param _this 传入当前this，以兼容小程序
 * @returns
 */
export function queryRect(
  selector: string,
  _this?: any
): Promise<UniNamespace.NodeInfo> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(_this || getCurrentInstance());
    query
      .select(selector)
      .boundingClientRect((data) => {
        resolve(data as UniNamespace.NodeInfo);
      })
      .exec();
  });
}
/**
 * * 获取节点
 * @param selector 节点标识 .class #id
 * @param _this 传入当前this，以兼容小程序
 * @returns
 */
export function queryNode(selector: string, _this?: any): Promise<any> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(_this || getCurrentInstance());
    query
      .select(selector)
      .node((data) => {
        resolve(data);
      })
      .exec();
  });
}

/**
 * * 通过位置获取节点可见状态
 * @param selector 节点标识 .class #id
 * @param _this 传入当前this，以兼容小程序
 * @returns
 */
export async function isNodeVisible(selector: string, _this?: any) {
  const sysInfo = getSystemInfoCache();
  const nodeInfo = await queryRect(selector, _this || getCurrentInstance());
  const left = Number(nodeInfo.left);
  const right = Number(nodeInfo.right);
  const top = Number(nodeInfo.top);
  const bottom = Number(nodeInfo.bottom);
  const verify =
    left >= 0 &&
    right <= sysInfo.screenWidth &&
    bottom >= 0 &&
    top <= sysInfo.screenHeight;
  return verify;
}

export type RouteInfo = ArrayToUnion<typeof pages> & {
  tabbar: ArrayToUnion<typeof tabBar.list> | undefined;
};

/**
 * 获取当前页面信息，uni配置项
 * @returns
 */
export function getCurrentRouteInfo() {
  const pagesInfo = getCurrentPages();
  const currentPage: AnyObject = pagesInfo[pagesInfo.length - 1];
  const routePath: string = currentPage.route;
  return {
    ...getRouteInfo(routePath),
    pages: pagesInfo,
  };
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
/**
 * 预览图片
 * @param urls
 * @param current
 */
export function previewImage(
  urls: string | string[],
  current: StrNumber = 0,
  options?: UniNamespace.PreviewImageOptions
) {
  if (typeof urls === "string") urls = [urls];
  uni.previewImage({
    ...options,
    urls,
    current,
  });
}

export type Media = PartialFlipBy<
  UniApp.MediaFile,
  "tempFilePath" | "size" | "fileType"
>;

/**
 * 选取图片或视频
 */
export async function uniChooseMedia(
  type: "image" | "video",
  options?: UniNamespace.ChooseImageOptions &
    UniNamespace.ChooseMediaOption &
    UniNamespace.ChooseVideoOptions
): Promise<Media[]> {
  // #ifndef APP || MP-WEIXIN || MP-DOUYIN || MP-FEISHU || MP-JD || MP-XIAOHONGSHU
  // 不支持 uni.chooseMedia 的平台，使用备用方案
  if (type === "image") {
    let { tempFilePaths, tempFiles } = await uniApiToPromise(
      uni.chooseImage,
      options
    );
    if (!Array.isArray(tempFilePaths)) tempFilePaths = [tempFilePaths];
    if (!Array.isArray(tempFiles)) tempFiles = [tempFiles as any];
    return tempFilePaths.map((v, i) => ({
      fileType: "image",
      tempFilePath: v,
      size: tempFiles[i].size,
    }));
  }
  if (type === "video") {
    let { duration, height, size, tempFilePath, width } = await uniApiToPromise(
      uni.chooseVideo,
      options
    );
    return [
      {
        size,
        tempFilePath,
        duration,
        fileType: "video",
        height,
        width,
      },
    ];
  }
  // #endif
  // #ifdef APP || MP-WEIXIN || MP-DOUYIN || MP-FEISHU || MP-JD || MP-XIAOHONGSHU
  const media = await uniApiToPromise(uni.chooseMedia, {
    ...options,
    mediaType: [type],
  });
  return media.tempFiles;
  // #endif
}
