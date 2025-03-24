/*
 * 介绍:请求分页接口hooks
 */
import type { Ref } from "vue";
import { StateType } from "@/components/common/CoListStatus/CoListStatus.vue";

export namespace RequestList {
  /**分页状态 */
  export interface State {
    type: StateType;
    /**请求信息 */
    message: string;
  }
  export interface Res<L extends any[] = any[]> {
    isSuccess: boolean;
    message?: string;
    list: L;
    isEnd: boolean;
    [k: string]: any;
  }
  export interface Req {
    pageNo: number;
  }
  /**分页api方法类型限制 */
  export type Api<D extends Res = Res, P extends any[] = any[]> = (
    ...p: P
  ) => Promise<D> | D;

  export interface Config<F> {
    defPageNo?: number;
    /**默认请求数据 */
    giveReq?: (req: Req) => Partial<GetParams<F>[0]>;
    /**额外的方法参数 */
    giveExtraParams?: () => any[];
  }
  /**api方法参数 */
  export type GetParams<F> = F extends Fun ? Parameters<F> : any[];
  /**api方法返回类型 */
  export type GetRes<F> = F extends RequestList.Api<infer T>
    ? UnPromise<T>
    : any;
  /**api方法返回数据 */
  export type GetList<F> = GetRes<F> extends Res<infer D> ? D : any[];

  /**hooks返回结果 */
  export interface Return<F extends Api> {
    state: Ref<State>;
    result: Ref<GetRes<F>>;
    list: Ref<GetList<F>>;
    request: Fun;
    rerequest: Fun;
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
 * @param isOnePage 是否单页接口
 * @param config 请求参数及配置
 */
export function useRequestList<F extends RequestList.Api>(
  api: F,
  config?: RequestList.Config<F>
): RequestList.Return<F> {
  config = { ...config };
  if (typeof config.defPageNo !== "number") config.defPageNo = 1;
  const apiParam1: RequestList.Req & AnyObject = {
    pageNo: config.defPageNo,
  };
  /**api请求状态*/
  const state = ref<RequestList.State>({
    type: "next",
    message: "",
  });
  /**接口返回数据 */
  const list = ref<any[]>([]);
  const result = ref<RequestList.GetRes<F>>();
  /**重置分页接口 */
  async function rerequest() {
    apiParam1.pageNo = config!.defPageNo!;
    stateNext();
    return await request();
  }
  /**请求分页接口 */
  async function request() {
    try {
      if (state.value.type !== "next") {
        console.warn("List state is not equal to next");
        return;
      }
      stateLoading();
      const giveReq = config?.giveReq || (() => ({}));
      const giveExtraParams = config?.giveExtraParams || (() => []);
      /**请求api第一个参数 */
      const param1 = { ...apiParam1, ...giveReq(apiParam1) };
      /**除第一个参数外的额外请求参数 */
      const params = [param1, ...giveExtraParams()] as RequestList.GetParams<F>;
      stateLoading();
      result.value = (await api(...params)) as any;
      stateNext();
      if (!result.value?.isSuccess) {
        return stateErr(result.value?.message);
      }
      if (Object.is(apiParam1.pageNo, config!.defPageNo)) list.value = [];
      list.value = list.value.concat(result.value.list);
      apiParam1.pageNo++;
      if (result.value.isEnd) {
        if (!list.value.length) return stateNull();
        return stateEnd();
      }
    } catch (error: any) {
      console.error(error);
      return stateErr(error);
    }
  }
  return {
    state,
    list: list as any,
    result: result as any,
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
