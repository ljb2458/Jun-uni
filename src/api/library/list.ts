import { defHttp, PagingApi } from "..";
/**查询知识库列表 */
export async function apiBookList(
  data: ApiBookList.Req
): Promise<PagingApi.Res<ApiBookList.ResItem[]>> {
  const res = await defHttp.post<PagingApi.Res<ApiBookList.ResItem[]>>(
    "/knowledgerepository/page",
    data
  );
  return res;
}

/**查询知识库列表 */
export namespace ApiBookList {
  export interface Req extends PagingApi.Req {
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 创建时间范围
     */
    createTimeRange?: Date[];
    /**
     * 关键字查询
     */
    searchKey?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 类别
     */
    type?: number;
    order?: string;
  }
  export interface ResItem {
    /**
     * 内容
     */
    content: string;
    /**
     * 创建时间
     */
    createTime: Date;
    /**
     * 创建者Id
     */
    createUserId: number;
    /**
     * 创建者姓名
     */
    createUserName: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 主键Id
     */
    id: number;
    /**
     * 软删除
     */
    isDelete: boolean;
    /**
     * 浏览量
     */
    pageView: number;
    /**
     * pdf地址
     */
    pdfPath: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 类别
     */
    type: number;
    /**
     * 更新时间
     */
    updateTime: Date;
    /**
     * 修改者Id
     */
    updateUserId: number;
    /**
     * 修改者姓名
     */
    updateUserName: string;
  }
}
