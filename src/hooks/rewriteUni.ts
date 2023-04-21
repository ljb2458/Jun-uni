/*
 * @Date: 2023-04-20 18:38:28
 * @LastEditTime: 2023-04-21 15:11:40
 * @FilePath: /music-client/src/hooks/rewriteUni.ts
 * 介绍:
 */
/**
 * * 显示原生模态框
 * @param content 显示内容
 * @param options 配置项
 * @returns
 */
export async function uniShowModal(
  content: string,
  options?: Partial<UniApp.ShowModalOptions>
): Promise<UniApp.ShowModalRes> {
  return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
    uni.showModal({
      title: "提示",
      ...options,
      content,
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
export function uniGetSystemInfo(): Promise<
  UniApp.GetSystemInfoResult | never
> {
  return new Promise<UniApp.GetSystemInfoResult | never>((resolve) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res);
      },
      fail(err) {
        console.warn("获取系统信息失败", err);
        resolve(uniGetSystemInfo());
      },
    });
  });
}

/**
 * 返回平台名称
 */
export function getOs(): GetOsRes {
  return uni.$u.os();
}

export type GetOsRes = "ios" | "android";

/**
 * 用于获取当前运行的平台名称
 */
export function getPlatform(): GetPlatformRes {
  return uni.$u.platform;
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
export type GetPlatformRes =
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
  return uni.$u.page();
}
/**
 * * 获取节点信息
 * @param queryNode 节点名称 .class #id
 * @param all
 * @returns
 */
export function getRect(queryNode: string): Promise<GetRectRes> {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(getCurrentInstance());
    query
      .select(queryNode)
      .boundingClientRect((data) => {
        resolve(data as any);
      })
      .exec();
  });
}
export interface GetRectRes extends UniApp.NodeInfo {}
