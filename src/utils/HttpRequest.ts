/*
 * 介绍:请求封装文件https://www.quanzhan.co/luch-request/guide/3.x/#example
 */
import luchRequest, {
  HttpRequestConfig,
  HttpResponse,
  HttpError,
  HttpData,
  HttpRequestTask,
  HttpUploadTask,
} from "luch-request";
import { filterObject } from "@/utils/tools/object";
import router from "./router";
const env = import.meta.env;

export namespace CreateHttpRequest {
  export interface MyConfig {
    isSuccess: IsSuccess;
    giveMsg: ReturnMsg;
    giveErrMsg: ReturnErrMsg;
  }
  export interface Config<D = any> extends HttpRequestConfig<D> {
    custom?: Custom;
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
  export interface UploadRequest {
    <R = any, D = HttpUploadTask>(url: string, config?: Config<D>): Promise<R>;
  }
  export interface Instance extends luchRequest {
    get: GetRequest;
    upload: UploadRequest;
    post: NotGetRequest;
    delete: NotGetRequest;
    head: NotGetRequest;
    options: NotGetRequest;
    put: NotGetRequest;
    connect: NotGetRequest;
    trace: NotGetRequest;
    config: Config;
  }
  export interface Custom {
    /**接口请求失败后显示的 message true 则从接口动态获取 */
    failMessage?: string | boolean;
    /**接口请求成功后显示的 message true 则从接口动态获取 */
    successMessage?: string | boolean;
    /**接口请求报错后显示的 message true 则从错误信息动态获取 */
    errorMessage?: string | boolean;
    /**接口请求中全局 loading true 则为 请稍侯... */
    loadingMessage?: string | boolean;
    /**是否在请求前过滤无效字段 */
    filterReq?: boolean;
    /**请求成功后路由返回 */
    routerBack?: boolean;
    [k: string]: any;
  }
}
export function createHttpRequest(
  myConfig: CreateHttpRequest.MyConfig,
  config?: CreateHttpRequest.Config
) {
  const httpRequest: CreateHttpRequest.Instance = new luchRequest(config);

  httpRequest.interceptors.request.use((config) => {
    if (env.VITE_API_LOG === "1") console.info(config);
    const custom = config.custom;
    if (custom?.filterReq) {
      if (config.data) config.data = filterObject(config.data);
      if (config.params) config.params = filterObject(config.params);
    }
    return config;
  });
  httpRequest.interceptors.response.use(
    (res) => {
      if (env.VITE_API_LOG === "1") console.info(res);
      handleAfter();
      return res;
      async function handleAfter() {
        const custom = res.config.custom;
        const {
          showFailMsg,
          failText,
          showLoading,
          showSuccessMsg,
          successText,
        } = customHelper(custom);
        if (showLoading) uni.hideLoading();
        const message = myConfig.giveMsg(res);
        const isSuccess = myConfig.isSuccess(res);
        if (res.data) res.data.isSuccess = isSuccess;
        if (isSuccess) {
          if (custom?.routerBack === true) {
            try {
              await router.back();
            } catch (error) {
              console.error(error);
            }
          }
          if (showSuccessMsg) {
            uni.showToast({
              title: successText || message || "成功！",
              icon: "success",
            });
          }
        } else {
          if (showFailMsg) {
            uni.showToast({ title: failText || message || "网络请求失败！" });
          }
        }
      }
    },
    (error) => {
      console.error(error);
      const custom = error.config.custom;
      const message = myConfig.giveErrMsg(error);
      const { showErrorMsg, errorText, showLoading } = customHelper(custom);
      if (showLoading) uni.hideLoading();
      if (showErrorMsg) {
        uni.showToast({ title: errorText || message || "服务器错误！" });
      }
      return error;
    }
  );
  return httpRequest;
}
function customHelper(mode: CreateHttpRequest.Custom | undefined) {
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
