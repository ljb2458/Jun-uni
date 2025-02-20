/*
 * 介绍:请求分页接口hooks
 */
import { PagingApi, Api } from "@/api";
import type { Ref } from "vue";
import { StateType } from "@/components/common/CoListStatus/CoListStatus.vue";

export namespace RequestList {
  export interface OnePageRes<D extends any[] = any[]> extends Api.Res<D> {}
  /**分页状态 */
  export interface State {
    type: StateType;
    /**请求信息 */
    message: string;
  }
  /**分页api方法类型限制 */
  export type ApiPaging<D extends PagingApi.Res = PagingApi.Res> = (
    ...p: any[]
  ) => Promise<D> | D;
  /**单页api方法类型限制 */
  export type ApiOnePage<D extends OnePageRes = OnePageRes> = (
    ...p: any[]
  ) => Promise<D> | D;
  /**api方法类型限制联合 */
  export type Api<D = any> = D extends PagingApi.Res
    ? ApiPaging<D>
    : D extends OnePageRes
    ? ApiOnePage<D>
    : never;

  /**请求前等待，返回状态则取消请求并应用状态 */
  export type RequestBefore<F> = (
    ...a: ApiParams<F>
  ) => Promise<State | undefined> | State | undefined;
  export interface Config<F> {
    /**请求前等待，返回状态则取消请求并应用状态*/
    requestBefore?: RequestBefore<F>;
    /**默认请求数据 */
    returnReq?: () => Partial<ApiParams<F>[0]>;
    /**额外的请求数据 */
    returnExtraParams?: () => any[];
  }
  /**api方法参数 */
  export type ApiParams<F> = F extends Fun ? Parameters<F> : any[];
  /**api方法返回类型 */
  export type ApiRes<F> = F extends RequestList.Api<infer T>
    ? UnPromise<T>
    : any;
  /**api方法返回数据 */
  export type ApiData<F> = ApiRes<F> extends PagingApi.Res<infer D>
    ? D
    : ApiRes<F> extends OnePageRes<infer D>
    ? D
    : any[];
  /**单页api方法返回数据 */
  export type ApiOnePageData<F> = ApiRes<F> extends OnePageRes<infer D>
    ? D
    : any[];
  /**分页api方法返回数据 */
  export type ApiPagingData<F> = ApiRes<F> extends PagingApi.Res<infer D>
    ? D
    : any[];
  /**hooks返回结果 */
  export interface Return<R = any, D = any[]> {
    state: Ref<State>;
    res: Ref<R>;
    data: Ref<D>;
    request: Fun<[], Promise<RequestList.State>>;
    rerequest: Fun<[], Promise<RequestList.State>>;
    stateErr: Fun<[string]>;
    stateEnd: Fun<[string]>;
    stateNull: Fun<[string]>;
    stateNext: Fun<[string]>;
    stateLoading: Fun;
  }
}
/**
 *
 * @param api api接口
 * @param isOnePage 是单页
 * @param config 请求参数及配置
 */
export function useRequestList<F extends RequestList.ApiOnePage>(
  api: F,
  isOnePage: true,
  config?: RequestList.Config<F>
): RequestList.Return<RequestList.ApiRes<F>, RequestList.ApiOnePageData<F>>;
/**
 *
 * @param api api接口
 * @param isOnePage 分页接口
 * @param config 请求参数及配置
 */
export function useRequestList<F extends RequestList.ApiPaging>(
  api: F,
  isOnePage: false,
  config?: RequestList.Config<F>
): RequestList.Return<RequestList.ApiRes<F>, RequestList.ApiPagingData<F>>;
/**
 *
 * @param api api接口
 * @param isOnePage 分页接口
 * @param config 请求参数及配置
 */
export function useRequestList<F extends RequestList.Api>(
  api: F,
  isOnePage: boolean,
  config?: RequestList.Config<F>
): RequestList.Return<RequestList.ApiRes<F>, RequestList.ApiData<F>>;
/**
 *
 * @param api api接口
 * @param isOnePage 是否单页接口
 * @param config 请求参数及配置
 */
export function useRequestList<F extends RequestList.Api>(
  api: F,
  isOnePage: boolean = false,
  config?: RequestList.Config<F>
): RequestList.Return {
  /**api请求状态*/
  const state = ref<RequestList.State>({
    type: "next",
    message: "",
  });
  /**接口返回数据 */
  const data = ref<any[]>([]);
  const res = ref<any>();
  const defaultReq: PagingApi.Req & AnyObject = { page: 1 };
  /**重置分页接口 */
  async function rerequest() {
    defaultReq.page = 1;
    return await request();
  }
  /**请求分页接口 */
  async function request(): Promise<RequestList.State> {
    try {
      stateLoading();
      const returnReq = config?.returnReq || (() => ({}));
      const returnExtraParams = config?.returnExtraParams || (() => []);
      const requestBefore = config?.requestBefore || (() => undefined);
      /**请求api第一个参数 */
      const req = { ...defaultReq, ...(returnReq() || {}) };
      /**除第一个参数外的额外请求参数 */
      const extraParams = returnExtraParams() || [];
      const params = [req, ...extraParams] as RequestList.ApiParams<F>;
      /**请求之前执行返回数据 */
      const userState = await requestBefore(...params);
      if (userState?.type) return (state.value = userState);
      res.value = await api(...params);
      if (res.value.code !== 200) {
        return stateErr(res.value.msg);
      }
      // // 服务器总数据为0
      // if (!(res.data.total > 0)) {
      //   return stateNull();
      // }
      //首次请求
      if (!defaultReq.page || defaultReq.page <= 1) data.value = [];
      if (isOnePage) {
        data.value = res.value.data;
        if (data.value.length === 0) return stateNull();
        return stateEnd();
      }
      // //当前数据大于总数
      // if (apiData.value.length >= res.data.total) {
      //   return stateEnd();
      // }
      //当前页码不等于服务器查询的页码
      if (res.value.data.current_page != defaultReq.page) {
        return stateNext();
      }
      if (res.value.data.current_page == 1 && res.value.data?.data.length == 0)
        return stateNull();
      if (res.value.data?.data.length == 0) return stateEnd();
      //*存储分页数据
      data.value?.push(...res.value.data.data);
      defaultReq.page++;
      //当前数据大于总数
      if (data.value.length >= res.value.data.total) {
        return stateEnd();
      }
      return stateNext();
    } catch (error: any) {
      return stateErr(error);
    }
  }
  return {
    state,
    data,
    res,
    request,
    rerequest,
    stateErr,
    stateEnd,
    stateNull,
    stateNext,
    stateLoading,
  };
  function stateErr(message?: string) {
    state.value.type = "error";
    state.value.message = message || "";
    return state.value;
  }
  function stateEnd(message?: string) {
    state.value.type = "end";
    state.value.message = message || "没有更多数据了";
    return state.value;
  }
  function stateNull(message?: string) {
    state.value.type = "null";
    state.value.message = message || "没有更多数据了";
    return state.value;
  }
  function stateNext(message?: string) {
    state.value.type = "next";
    state.value.message = message || "";
    return state.value;
  }
  function stateLoading() {
    state.value.type = "loading";
    state.value.message = "正在加载...";
    return state.value;
  }
}
