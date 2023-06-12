/*
 * @Date: 2023-01-16 15:49:10
 * @LastEditTime: 2023-04-24 10:56:36
 * @FilePath: /music-client/src/hooks/useRequestList.ts
 * 介绍:请求分页接口hooks
 */
import { Paging, ApiRes } from "@@/api";
export default function usePaging(
  api: Function,
  /**返回值作为请求数据，返回fase取消请求 */
  before?: (params: RequsetParams) => any,
  config?: RequestConfig
) {
  /**api请求状态*/
  const state = ref<GetListDataReturn>({
    type: "",
    message: "",
  });
  /**接口返回数据 */
  const data = ref<any[]>([]);
  const params: RequsetParams = { page: 1 };
  /**重置分页接口 */
  async function reRequest() {
    params.page = 1;
    return await request();
  }
  /**请求分页接口 */
  async function request(): Promise<GetListDataReturn> {
    try {
      stateLoading();
      /**请求之前执行 */
      let extraParams;
      if (before && typeof before === "function")
        extraParams = await before(params);
      if (extraParams === false) return state.value;
      const res: ApiRes<Paging.Data<any[]>> = await api({
        ...params,
        ...extraParams,
      });
      if (res.code !== 200) {
        return stateErr(res.msg);
      }
      if (isOnePage()) {
        //*储存单页数据
        data.value.length = 0;
        data.value = res.data.data;
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
        return stateVoid();
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
      return stateVoid();
    } catch (error: any) {
      return stateErr(error);
    }
  }
  return {
    state,
    data,
    request,
    reRequest,
    stateErr,
    stateEnd,
    stateNull,
    stateVoid,
    stateLoading,
  };
  function isOnePage() {
    return config?.isOnePage === true;
  }

  function stateErr(message?: string) {
    state.value.type = "error";
    state.value.message = message?.toString() || "error";
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
  function stateVoid(message?: string) {
    state.value.type = "";
    state.value.message = "点击加载更多";
    return state.value;
  }
  function stateLoading() {
    state.value.type = "loading";
    state.value.message = "正在加载";
    return state.value;
  }
}

/**请求参数 */
export interface ReqData extends AnyObject {
  page: number;
}
/**分页状态 */
export interface GetListDataReturn {
  type: StateType;
  /**请求信息 */
  message: string;
}

export type StateType = "error" | "null" | "end" | "" | "loading";
export interface RequestConfig {
  /**是否单页列表 */
  isOnePage?: boolean;
}

export interface RequsetParams {
  page: number;
}
