/*
 * @Date: 2023-01-16 15:49:10
 * @LastEditTime: 2023-07-03 16:10:52
 * 介绍:请求分页接口hooks
 */
import { PagingApi, ApiRes } from "@@/api";
import type { Ref } from "vue";

export default function usePaging<F extends Api>(
  api: F,
  config?: RequestConfig<F>
) {
  /**api请求状态*/
  const state = ref<State>({
    type: "next",
    message: "",
  });
  /**接口返回数据 */
  const data = ref<any[]>([]);
  const res = ref();
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
      const _params = { ...params, ...config?.defaultParams };
      const _extraParams = config?.extraParams || [];
      /**请求之前执行返回数据 */
      let extraParams;
      const requestBefore = config?.requestBefore;
      if (typeof requestBefore === "function")
        extraParams = await requestBefore(_params, ..._extraParams);
      if (extraParams === false) return state.value;
      const _res: ApiRes<PagingApi.Data<any[]>> = await api(
        {
          ..._params,
          ...extraParams,
        },
        ..._extraParams
      );
      res.value = _res;
      if (_res.code !== 200) {
        return stateErr(_res.msg);
      }
      if (isOnePage()) {
        //*储存单页数据
        data.value = _res.data as any;
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
      if (_res.data.current_page != params.page) {
        return stateNext();
      }
      if (_res.data.current_page == 1 && _res.data?.data.length == 0)
        return stateNull();
      if (_res.data?.data.length == 0) return stateEnd();
      //*存储分页数据
      data.value?.push(..._res.data.data);
      params.page++;
      //当前数据大于总数
      if (data.value.length >= _res.data.total) {
        return stateEnd();
      }
      return stateNext();
    } catch (error: any) {
      return stateErr(error);
    }
  }
  return {
    state,
    data: data as Ref<GetApiData<F>>,
    res: res as Ref<GetApiRes<F>>,
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

export type RequestBefore<T = any> = T | Promise<T>;
/**api类型 */
export type Api<T extends PagingApi.Res<any[]> = PagingApi.Res<any[]>> = (
  ...p: any[]
) => Promise<T>;
/**得到res数据类型 */
export type GetApiRes<F extends Api> = UnPromise<ReturnType<F>>;
/**获得data数据类型 */
export type GetApiData<F extends Api> = GetApiRes<F> extends PagingApi.Res<infer D>
  ? D
  : any[];
/**获得默认参数 */
export type GetParams<F extends Api> = Partial<Parameters<F>[0]>;

export interface RequsetParams {
  page: number;
}

/**获得请求前回调参数 */
export type GetRequestBefore<F extends Api> = (
  a: GetParams<F>,
  ...b: any[]
) => Promise<GetParams<F>> | GetParams<F>;
/**请求配置 */
export interface RequestConfig<F extends Api = any> {
  /**是否单页列表 */
  isOnePage?: boolean;
  /**返回值作为默认请求数据*/
  requestBefore?: GetRequestBefore<F>;
  /**默认请求数据 */
  defaultParams?: GetParams<F>;
  /**额外的请求数据 */
  extraParams?: any[];
}
