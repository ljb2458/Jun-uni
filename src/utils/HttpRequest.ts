/*
 * 介绍:请求封装文件https://www.quanzhan.co/luch-request/guide/3.x/#example
 */
import luchRequest, {
  HttpRequestConfig,
  HttpResponse,
  HttpError,
  HttpData,
  HttpRequestTask,
} from "luch-request";
import { filterObject } from "@/utils/tools/object";

export namespace CreateHttpRequest {
  export interface MyConfig {
    isSuccess: IsSuccess;
    returnMsg: ReturnMsg;
    returnErrMsg: ReturnErrMsg;
  }
  export interface Config<D = any> extends HttpRequestConfig<D> {
    custom?: Mode;
  }
  export interface IsSuccess<D = HttpResponse> {
    (res: D): boolean;
  }
  export interface ReturnMsg<D = HttpResponse> {
    (res: D): string;
  }
  export interface ReturnErrMsg<D = HttpError> {
    (res: D): string;
  }
  export interface NotGetRequest {
    <R = any, D = HttpRequestTask>(
      url: string,
      data?: HttpData,
      config?: Config<D>
    ): Promise<R>;
  }
  export interface GetRequest {
    <R = any, D = HttpRequestTask>(url: string, config?: Config<D>): Promise<R>;
  }
  export interface Instance extends luchRequest {
    get: GetRequest;
    post: NotGetRequest;
    delete: NotGetRequest;
    head: NotGetRequest;
    options: NotGetRequest;
    put: NotGetRequest;
    connect: NotGetRequest;
    trace: NotGetRequest;
    config: Config;
  }
  export interface Mode {
    failMessage?: string | boolean;
    successMessage?: string | boolean;
    loadingMessage?: string | boolean;
    filterReq?: boolean;
    errorMessage?: string | boolean;
    [k: string]: any;
  }
}
export function createHttpRequest(
  myConfig: CreateHttpRequest.MyConfig,
  config?: CreateHttpRequest.Config
) {
  const httpRequest: CreateHttpRequest.Instance = new luchRequest(config);

  httpRequest.interceptors.request.use((config) => {
    const custom = config.custom;
    if (custom?.filterReq) {
      if (config.data) config.data = filterObject(config.data);
      if (config.params) config.params = filterObject(config.params);
    }
    return config;
  });
  httpRequest.interceptors.response.use(
    (res) => {
      const custom = res.config.custom;
      const {
        showFailMsg,
        failText,
        showLoading,
        showSuccessMsg,
        successText,
      } = helper(custom);
      if (showLoading) uni.hideLoading();
      const message = myConfig.returnMsg(res);
      const isSuccess = myConfig.isSuccess(res);
      if (res.data) res.data.isSuccess = isSuccess;
      if (isSuccess) {
        if (showSuccessMsg) {
          uni.showToast({
            title: message || successText,
            icon: "success",
          });
        }
      } else {
        if (showFailMsg) {
          uni.showToast({ title: message || failText, icon: "fail" });
        }
      }
      return res;
    },
    (error) => {
      const custom = error.config.custom;
      const message = myConfig.returnErrMsg(error);
      const { showErrorMsg, errorText, showLoading } = helper(custom);
      if (showLoading) uni.hideLoading();
      if (showErrorMsg) {
        uni.showToast({ title: message || errorText, icon: "error" });
      }
    }
  );
  return httpRequest;
}
function helper(mode: CreateHttpRequest.Mode | undefined) {
  const loadingMessage = mode?.loadingMessage;
  const showLoading =
    loadingMessage === true || typeof loadingMessage === "string";
  const loadingText =
    typeof loadingMessage === "string" ? loadingMessage : "请稍候...";

  const successMessage = mode?.successMessage;
  const showSuccessMsg =
    successMessage === true || typeof successMessage === "string";
  const successText =
    typeof successMessage === "string" ? successMessage : undefined;

  const failMessage = mode?.failMessage;
  const showFailMsg = failMessage === true || typeof failMessage === "string";
  const failText = typeof failMessage === "string" ? failMessage : undefined;

  const errorMessage = mode?.errorMessage;
  const showErrorMsg =
    errorMessage === true || typeof errorMessage === "string";
  const errorText = typeof errorMessage === "string" ? errorMessage : undefined;

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
