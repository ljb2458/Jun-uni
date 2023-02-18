/*
 * @Date: 2023-02-15 14:36:19
 * @LastEditTime: 2023-02-18 22:56:58
 * @FilePath: /my-vue3-project/src/utils/HttpRequest/HttpRequest.ts
 * 介绍:请求封装文件
 */
import omit from "lodash/fp/omit";
import isNuLL from "lodash/fp/isNuLL";

export class HttpRequest {
  before?: (
    url: string,
    data: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) => HttpRequestOptions;
  succeeded?: (
    res: UniApp.RequestSuccessCallbackResult,
    config: RequestConfig | undefined
  ) => any;
  failed?: (
    error: UniApp.GeneralCallbackResult,
    config: RequestConfig | undefined
  ) => any;
  baseUrl: string;
  constructor(config: CreateConfig) {
    this.before = config.before;
    this.succeeded = config.succeeded;
    this.failed = config.failed;
    this.baseUrl = config.baseUrl || "";
  }
  #failed(
    error: UniApp.GeneralCallbackResult,
    config: RequestConfig | undefined
  ) {
    if (config?.mode?.includes("showLoading")) {
      uni.hideLoading();
    }
    if (config?.mode?.includes("showError")) {
      uni.showToast({
        icon: "error",
        title: error.errMsg || "请求失败",
      });
    }
    if (typeof this.failed === "function") error = this.failed(error, config);
    return error;
  }
  #succeeded(
    res: UniApp.RequestSuccessCallbackResult,
    config: RequestConfig | undefined
  ) {
    if (config?.mode?.includes("showLoading")) {
      uni.hideLoading();
    }
    if (config?.mode?.includes("showSucceed")) {
      uni.showToast({
        icon: "success",
        title: res.data?.message || "",
      });
    }
    if (config?.mode?.includes("removeResVoid")) {
      res.data = omit(res.data, isNuLL);
    }
    if (typeof this.succeeded === "function") res = this.succeeded(res, config);
    return res;
  }
  #before(
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) {
    if (config?.mode?.includes("removeReqVoid")) {
      data = omit(data, isNuLL);
    }
    let res: UniApp.RequestOptions = {
      ...requestOptions,
      url: this.baseUrl + url,
      data,
    };
    if (typeof this.before === "function") res = this.before(url, data, config);
    return res;
  }
  get(
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) {
    new Promise((resolve) => {
      uni.request({
        ...this.#before(url, data, config, requestOptions),
        method: "GET",
        success: (res) => {
          resolve(this.#succeeded(res, config));
        },
        fail: (error) => {
          resolve(this.#failed(error, config));
        },
      });
    });
  }
  post(
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) {
    new Promise((resolve) => {
      uni.request({
        ...this.#before(url, data, config, requestOptions),
        method: "POST",
        success: (res) => {
          resolve(this.#succeeded(res, config));
        },
        fail: (error) => {
          resolve(this.#failed(error, config));
        },
      });
    });
  }
  put(
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) {
    new Promise((resolve) => {
      uni.request({
        ...this.#before(url, data, config, requestOptions),
        method: "PUT",
        success: (res) => {
          resolve(this.#succeeded(res, config));
        },
        fail: (error) => {
          resolve(this.#failed(error, config));
        },
      });
    });
  }
  delete(
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) {
    new Promise((resolve) => {
      uni.request({
        ...this.#before(url, data, config, requestOptions),
        method: "DELETE",
        success: (res) => {
          resolve(this.#succeeded(res, config));
        },
        fail: (error) => {
          resolve(this.#failed(error, config));
        },
      });
    });
  }
}
/**创建配置 */
export interface CreateConfig {
  before?: (
    url: string,
    data?: any,
    config?: RequestConfig,
    requestOptions?: HttpRequest
  ) => HttpRequestOptions;
  succeeded?: (
    res: UniApp.RequestSuccessCallbackResult,
    config: RequestConfig | undefined
  ) => any;
  failed?: (
    error: UniApp.GeneralCallbackResult,
    config: RequestConfig | undefined
  ) => any;
  baseUrl?: string;
}
export interface RequestConfig extends AnyObject {
  mode?: Mode[];
}
export type Mode =
  | "showError"
  | "showSucceed"
  | "showLoading"
  | "removeReqVoid"
  | "removeResVoid";

/**请求选项 */
export interface HttpRequestOptions {
  /**
   * 资源url
   */
  url: string;
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   */
  header?: any;
  /**
   * 超时时间
   */
  timeout?: number;
  /**
   * 如果设为json，会尝试对返回的数据做一次 JSON.parse
   */
  dataType?: string;
  /**
   * 设置响应的数据类型。合法值：text、arraybuffer
   */
  responseType?: string;
  /**
   * 验证 ssl 证书
   */
  sslVerify?: boolean;
  /**
   * 跨域请求时是否携带凭证
   */
  withCredentials?: boolean;
  /**
   * DNS解析时优先使用 ipv4
   */
  firstIpv4?: boolean;
  /**
   * 开启 http2
   */
  enableHttp2?: boolean;
  /**
   * 开启 quic
   */
  enableQuic?: boolean;
  /**
   * 开启 cache
   */
  enableCache?: boolean;
  /**
   * 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  enableHttpDNS?: boolean;
  /**
   * HttpDNS 服务商 Id。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
   */
  httpDNSServiceId?: boolean;
  /**
   * 开启 transfer-encoding chunked
   */
  enableChunked?: boolean;
  /**
   * wifi下使用移动网络发送请求
   */
  forceCellularNetwork?: boolean;
  /**
   * 默认 false，开启后可在headers中编辑cookie（支付宝小程序10.2.33版本开始支持）
   */
  enableCookie?: boolean;
  /**
   * 是否开启云加速（详见[云加速服务](https://smartprogram.baidu.com/docs/develop/extended/component-codeless/cloud-speed/introduction/)）
   */
  cloudCache?: object | boolean;
  /**
   * 控制当前请求是否延时至首屏内容渲染后发送
   */
  defer?: boolean;
}
