/*
 * 介绍:请求封装文件https://www.quanzhan.co/luch-request/guide/3.x/#example
 */
import luchRequest, { HttpRequestConfig, HttpResponse } from "luch-request";
import type { IncomingHttpHeaders } from "http";
import { filterObject } from "@/utils/tools/object";

export interface IsSuccess<D = HttpResponse> {
  (res: D): boolean;
}
export interface ReturnMsg<D = HttpResponse> {
  (res: D): string;
}
export interface MyCongfig<D = HttpResponse> {
  isSuccess: IsSuccess<D>;
  returnSuccessMsg: ReturnMsg<D>;
  returnFailMsg: ReturnMsg<D>;
}

export class HttpRequest {
  luch: luchRequest;
  constructor(config: HttpRequestConfig, private myConfig: MyCongfig) {
    this.luch = new luchRequest(config);
  }
  request<T>(config: HttpRequestCfg): Promise<T> {
    return new Promise((resolve, reject) => {
      this.luch
        .request(this.#befor(config))
        .then((res) => resolve(this.#success(res, config)))
        .catch((err) => reject(this.#fail(err, config)));
    });
  }
  get<T>(url: string, params?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "GET",
      params,
      url,
    };
    return new Promise((resolve, reject) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#success(res, config)))
        .catch((err) => reject(this.#fail(err, config)));
    });
  }
  post<T>(url: string, data?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "POST",
      data,
      url,
    };
    return new Promise((resolve, reject) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#success(res, config)))
        .catch((err) => reject(this.#fail(err, config)));
    });
  }
  put<T>(url: string, data?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "PUT",
      data,
      url,
    };
    return new Promise((resolve, reject) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#success(res, config)))
        .catch((err) => reject(this.#fail(err, config)));
    });
  }
  delete<T>(
    url: string,
    data?: AnyObject,
    config?: HttpRequestCfg
  ): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "DELETE",
      data,
      url,
    };
    return new Promise((resolve, reject) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#success(res, config)))
        .catch((err) => reject(this.#fail(err, config)));
    });
  }
  #befor(config: HttpRequestCfg): HttpRequestConfig {
    const { showLoading, loadingText } = this.#helper(config);
    if (showLoading) {
      uni.showLoading({
        mask: true,
        title: loadingText,
      });
    }
    if (config.mode?.filterReq) {
      let data: AnyObject | undefined = config.data;
      let params: AnyObject | undefined = config.params;
      if (data) config.data = filterObject(data);
      if (params) config.params = filterObject(params);
      config = { ...config, data, params };
    }
    delete config.mode;
    return config;
  }
  #success(res: HttpResponse, config: HttpRequestCfg | undefined): any {
    const { showLoading, showSuccessMsg, successText, showFailMsg, failText } =
      this.#helper(config);
    if (showLoading) {
      uni.hideLoading();
    }
    if (showSuccessMsg && this.myConfig.isSuccess(res)) {
      uni.showToast({
        icon: "success",
        title: successText || this.myConfig.returnSuccessMsg(res) || "成功！",
      });
    } else if (showFailMsg) {
      uni.showToast({
        icon: "success",
        title: failText || this.myConfig.returnFailMsg(res) || "失败！",
      });
    }
    return res;
  }
  #fail(error: HttpError, config: HttpRequestCfg | undefined): any {
    console.log(error);

    const { showLoading, showErrorMsg, errorText } = this.#helper(config);
    if (showLoading) {
      uni.hideLoading();
    }
    if (showErrorMsg) {
      uni.showToast({
        icon: "error",
        title: errorText || error.errMsg || "网络异常，请重试！",
      });
    }
    return error;
  }
  #helper(config: HttpRequestCfg | undefined) {
    const loadingMessage = config?.mode?.loadingMessage;
    const showLoading =
      loadingMessage === true || typeof loadingMessage === "string";
    const loadingText =
      typeof loadingMessage === "string" ? loadingMessage : "请稍候...";

    const successMessage = config?.mode?.successMessage;
    const showSuccessMsg =
      successMessage === true || typeof successMessage === "string";
    const successText =
      typeof successMessage === "string" ? successMessage : undefined;

    const failMessage = config?.mode?.failMessage;
    const showFailMsg = failMessage === true || typeof failMessage === "string";
    const failText = typeof failMessage === "string" ? failMessage : undefined;

    const errorMessage = config?.mode?.errorMessage;
    const showErrorMsg =
      errorMessage === true || typeof errorMessage === "string";
    const errorText =
      typeof errorMessage === "string" ? errorMessage : undefined;

    return {
      showLoading,
      loadingText,
      showFailMsg,
      failText,
      showSuccessMsg,
      successText,
      showErrorMsg,
      errorText,
    };
  }
}
export interface HttpError {
  config: HttpRequestConfig;
  cookies?: string[];
  data: AnyObject | void;
  errMsg: string;
  header: IncomingHttpHeaders;
  rawData: AnyObject | void;
  statusCode: number;
}
/**请求操作配置 */
export interface HttpRequestCfg extends HttpRequestConfig {
  mode?: Mode;
}
export interface Mode {
  failMessage?: string | boolean;
  successMessage?: string | boolean;
  loadingMessage?: string | boolean;
  filterReq?: boolean;
  errorMessage?: string | boolean;
}
export interface ApiRes<T> {
  code: number;
  message: string;
  data: T;
}
