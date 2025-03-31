import { RequestList } from "@/components/common/CoRequestList/useRequestList";
import useSysStore from "@/store/useSysStore";
import { createHttpRequest } from "@/utils/HttpRequest";
const env = import.meta.env;
let baseURL = "";
if (env.VITE_PROXY == "1") {
  baseURL = env.VITE_API_PREFIX || ""; //配置默认请求地址--跨域代理
} else {
  baseURL = env.VITE_API_URL + env.VITE_API_PREFIX || ""; //配置默认请求地址--无代理
}
export const defHttp = createHttpRequest(
  {
    isSuccess(res) {
      return res?.data?.code === 200;
    },
    giveMsg(res) {
      return res?.data?.message;
    },
    giveErrMsg(error) {
      return error?.errMsg;
    },
  },
  {
    baseURL,
  }
);
defHttp.interceptors.request.use((config) => {
  const sysStore = useSysStore();
  config.header = {
    ...config.header,
    ...sysStore.defHttpHeader,
  };
  return config;
});
defHttp.interceptors.response.use(
  (result) => {
    if (!result) return result;
    const { method } = result.config;
    if (method === "DOWNLOAD") return result;
    return result?.data;
  },
  (error) => {
    return Promise.resolve({
      code: error.statusCode,
      message: error.errMsg,
      isSuccess: false,
    });
  }
);
/**请求res类型 */
export namespace Api {
  export interface SuccessRes<T> {
    code: 200;
    message: string;
    time: Date;
    type: string;
    isSuccess: true;
    result: T;
  }
  export interface FailRes<T> {
    code: number;
    message: string;
    time: Date;
    type: string;
    isSuccess: false;
    result?: T;
  }
  export type Res<T> = SuccessRes<T> | FailRes<T>;
}
export namespace PagingApi {
  /**请求分页接口返res类型 */
  export type Res<T extends any[] = any[]> = Api.SuccessRes<Data<T>>;
  /**分页data类型 */
  export interface Data<T extends any[] = any[]> {
    /**
     * 是否有下一页
     */
    hasNextPage: boolean;
    /**
     * 是否有上一页
     */
    hasPrevPage: boolean;
    /**
     * 当前页集合
     */
    items: T;
    /**
     * 页码
     */
    page: number;
    /**
     * 页容量
     */
    pageSize: number;
    /**
     * 总条数
     */
    total: number;
    /**
     * 总页数
     */
    totalPages: number;
  }

  /**分页参数 */
  export interface Req {
    /**
     * 分页，从零开始
     */
    page: number;
    /**
     * 分页大小
     */
    pageSize?: number;
    /**
     * 排序字段
     */
    field?: string;
    /**
     * 排序方向
     */
    order?: "Asc" | "Desc";

    search?: Search;

    filter?: Filter;
  }

  /**
   * Search，模糊查询条件
   */
  export interface Search {
    /**
     * 字段名称集合
     */
    fields?: string[];
    /**
     * 关键字
     */
    keyword?: string;
  }
  /**
   * Filter，筛选过滤条件
   */
  export interface Filter {
    /**
     * 字段名称
     */
    field?: string;
    /**
     * 筛选过滤条件子项
     */
    filters?: Filter[];
    logic?: number;
    operator?: number;
    /**
     * 字段值
     */
    value?: any;
  }
}
/**
 * 分页接口适配器，用于将 api 接口函数转换为 useRequsetList 函数要求传入的 api 函数
 */
export function usePagingAdapter<
  F extends Fun<any[], Promise<PagingApi.Res<any[]>>> = Fun
>(api: F) {
  return async (
    pageNo: number,
    ...params: any[]
  ): Promise<RequestList.Res<UnPromise<ReturnType<F>>["result"]["items"]>> => {
    params[0] = {
      ...(params[0] || []),
      page: pageNo,
    };
    const result = await api(...params);
    return {
      message: result.message,
      isSuccess: result.isSuccess,
      list: result.result?.items || [],
      isEnd: !result.result?.hasNextPage,
    };
  };
}
