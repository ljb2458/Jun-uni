/*
 * @Date: 2023-02-15 14:36:19
 * @LastEditTime: 2023-02-19 18:13:38
 * @FilePath: /my-vue3-project/src/utils/HttpRequest/HttpRequest.ts
 * 介绍:请求封装文件https://www.quanzhan.co/luch-request/guide/3.x/#example
 */
import luchRequest, { HttpRequestConfig, HttpResponse } from "luch-request";
import type { IncomingHttpHeaders } from "http";
import { filterParams } from "@@/utils/tools/index";

export class HttpRequest {
  luch: luchRequest;
  constructor(config: HttpRequestConfig) {
    this.luch = new luchRequest(config);
  }
  request<T>(config: HttpRequestCfg): Promise<T> {
    return new Promise((resolve) => {
      this.luch
        .request(this.#befor(config))
        .then((res) => resolve(this.#succeeded(res, config)))
        .catch((err) => resolve(this.#failed(err, config)));
    });
  }
  get<T>(url: string, params?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "GET",
      params,
      url,
    };
    return new Promise((resolve) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#succeeded(res, config)))
        .catch((err) => resolve(this.#failed(err, config)));
    });
  }
  post<T>(url: string, data?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "POST",
      data,
      url,
    };
    return new Promise((resolve) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#succeeded(res, config)))
        .catch((err) => resolve(this.#failed(err, config)));
    });
  }
  put<T>(url: string, data?: AnyObject, config?: HttpRequestCfg): Promise<T> {
    const option: HttpRequestCfg = {
      ...config,
      method: "PUT",
      data,
      url,
    };
    return new Promise((resolve) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#succeeded(res, config)))
        .catch((err) => resolve(this.#failed(err, config)));
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
    return new Promise((resolve) => {
      this.luch
        .request(this.#befor(option))
        .then((res) => resolve(this.#succeeded(res, config)))
        .catch((err) => resolve(this.#failed(err, config)));
    });
  }
  #befor(config: HttpRequestCfg): HttpRequestConfig {
    if (config.mode?.includes("showLoading")) {
      uni.showLoading({
        mask: true,
        title: "请稍候...",
      });
    }
    if (config.mode?.includes("removeResVoid")) {
      let data: AnyObject | undefined = config.data;
      let params: AnyObject | undefined = config.params;
      if (data) config.data = filterParams(data);
      if (params) config.params = filterParams(params);
      config = { ...config, data, params };
    }
    delete config.mode;
    return config;
  }
  #succeeded(res: HttpResponse, config: HttpRequestCfg | undefined): any {
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
      res.data = filterParams(res.data);
    }
    return res.data;
  }
  #failed(error: HttpError, config: HttpRequestCfg | undefined): any {
    if (config?.mode?.includes("showLoading")) {
      uni.hideLoading();
    }
    if (config?.mode?.includes("showError")) {
      uni.showToast({
        icon: "error",
        title: (error.errMsg || "请求失败") + error.statusCode,
      });
    }
    return {
      code: error.statusCode,
      message: error.errMsg,
      data: error.data?.data,
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
  mode?: Mode[];
}
export type Mode =
  | "showError"
  | "showSucceed"
  | "showLoading"
  | "removeReqVoid"
  | "removeResVoid";
export interface ApiRes<T> {
  code: number;
  message: string;
  data: T;
}

