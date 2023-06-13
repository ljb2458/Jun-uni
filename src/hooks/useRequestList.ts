/*
 * @Date: 2023-01-16 15:49:10
 * @LastEditTime: 2023-06-12 14:50:46
 * @FilePath: /music-client/src/hooks/useRequestList.ts
 * 介绍:请求分页接口hooks
 */
import { Paging, ApiRes } from "@@/api";
import type { Ref } from "vue";

export default function usePaging<D extends any[] = any[]>(
  api: Function,
  config?: RequestConfig
) {
  /**api请求状态*/
  const state = ref<State>({
    type: "next",
    message: "",
  });
  /**接口返回数据 */
  const data = ref<any[]>([]);
  const params: RequsetParams = { page: 1 };
  /**重置分页接口 */
  async function rerequest() {
    params.page = 1;
    return await request();
  }
  /**请求分页接口 */
  async function request(): Promise<State> {
    try {
      stateLoading();
      /**请求之前执行返回数据 */
      let extraParams;
      const requestBefore = config?.requestBefore;
      if (typeof requestBefore === "function")
        extraParams = await requestBefore(params);
      if (extraParams === false) return state.value;

      const res: ApiRes<Paging.Data<any[]>> = await api({
        ...params,
        ...config?.extraParams,
        ...extraParams,
      });
      if (res.code !== 200) {
        return stateErr(res.msg);
      }
      if (isOnePage()) {
        //*储存单页数据
        data.value.length = 0;
        data.value = res.data as any;
        return stateEnd();
      }
      // // 服务器总数据为0
      // if (!(res.data.total > 0)) {
      //   return stateNull();
      // }
      //首次请求
      if (!params.page || params.page <= 1) data.value = [];
      // //当前数据大于总数
      // if (apiData.value.length >= res.data.total) {
      //   return stateEnd();
      // }
      //当前页码不等于服务器查询的页码
      if (res.data.current_page != params.page) {
        return stateNext();
      }
      if (res.data.current_page == 1 && res.data?.data.length == 0)
        return stateNull();
      if (res.data?.data.length == 0) return stateEnd();
      //*存储分页数据
      data.value?.push(...res.data.data);
      params.page++;
      //当前数据大于总数
      if (data.value.length >= res.data.total) {
        return stateEnd();
      }
      return stateNext();
    } catch (error: any) {
      return stateErr(error);
    }
  }
  return {
    state,
    data: data as Ref<D>,
    request,
    rerequest,
    stateErr,
    stateEnd,
    stateNull,
    stateNext,
    stateLoading,
  };
  function isOnePage() {
    return config?.isOnePage === true;
  }

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

/**请求参数 */
export interface ReqData extends AnyObject {
  page: number;
}
/**分页状态 */
export interface State {
  type: StateType;
  /**请求信息 */
  message: string;
}

export type StateType = "error" | "null" | "end" | "next" | "loading";
export interface RequestConfig {
  /**是否单页列表 */
  isOnePage?: boolean;
  /**返回值作为请求数据，返回fase取消请求 */
  requestBefore?: RequestBefore;
  /**额外的请求数据 */
  extraParams?: AnyObject;
}
interface _RequestBefore {
  (params: RequsetParams): any;
}
export type RequestBefore = _RequestBefore | Promise<_RequestBefore>;

export interface RequsetParams {
  page: number;
}
