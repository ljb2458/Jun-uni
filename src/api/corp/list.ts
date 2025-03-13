import { Api, defHttp, PagingApi } from "..";
/**申请加入机构（公司） */
export async function apiSysOrgExtList(
  data: ApiSysOrgExtList.Req
): Promise<PagingApi.Res<ApiSysOrgExtList.ResItem[]>> {
  const res = await defHttp.get<Api.Res<ApiSysOrgExtList.ResItem[]>>(
    "/sysOrgExt/WXGetList",
    { params: data }
  );
  const items = res.result || [];
  return {
    ...(res as any),
    result: {
      items,
      hasNextPage: false,
      hasPrevPage: false,
      page: 1,
      pageSize: 999999,
      total: items.length,
      totalPages: 1,
    },
  };
}

/**申请加入机构（公司） */
export namespace ApiSysOrgExtList {
  export interface Req extends PagingApi.Req {
    /**
     * 编码
     */
    Code?: string;
    /**
     * 主键Id
     */
    Id?: number;
    /**
     * 名称
     */
    Name?: string;
    /**
     * 公司业务类型
     */
    Qualification?: Qualification;
    /**
     * 机构类型
     */
    Type?: Type;
  }
  export enum Qualification {
    /**
     * 检测
     */
    Detection = 0,

    /**
     * 设计
     */
    Design = 1,

    /**
     * 加固
     */
    Reinforcement = 2,
  }

  /**
   * 组织层级枚举
   */
  export enum Type {
    /**
     * 集团层级
     */
    Bloc = 101,

    /**
     * 公司层级
     */
    Company = 201,

    /**
     * 部门层级
     */
    Department = 301,

    /**
     * 区域层级
     */
    Area = 401,

    /**
     * 组层级
     */
    Group = 501,
  }
  export interface ResItem {
    pid: number;
    name: string;
    code: string;
    level: number;
    type: string;
    directorId: string;
    longitude: number;
    latitude: number;
    orderNo: number;
    status: number;
    remark: string;
    children: ResItem[];
    disabled: boolean;
    province: string;
    city: string;
    district: string;
    address: string;
    contact: string;
    logo: string;
    qualification?: string;
    tenantId: number;
    createTime: Date;
    updateTime: Date;
    createUserId: number;
    createUserName: string;
    updateUserId: number;
    updateUserName: string;
    isDelete: boolean;
    id: number;
  }
}
/**用户权限申请表 */
export async function apiPowerAppayList(
  data: ApiPowerAppayList.Req
): Promise<PagingApi.Res<ApiPowerAppayList.ResItem[]>> {
  const res = await defHttp.get<PagingApi.Res<ApiPowerAppayList.ResItem[]>>(
    "/userApplications/page",
    { params: data }
  );
  return res;
}

/**用户权限申请表 */
export namespace ApiPowerAppayList {
  export interface Req extends PagingApi.Req {
    /**
     * 关键字查询
     */
    SearchKey?: string;
    /**
     * 状态
     */
    Status?: Status;
    /**
     * 申请资格类型
     */
    Type?: Type;
    /**
     * 申请用户姓名
     */
    UserName?: string;
    /**
     * 申请时间
     */
    ApplicationDate?: Date;
    /**
     * 申请时间范围
     */
    ApplicationDateRange?: Date[];
  }
  /**
   * 用户申请状态枚举
   */
  export enum Status {
    /**
     * 待处理状态
     */
    WaitProcessed = 0,

    /**
     * 通过状态
     */
    Approved = 1,

    /**
     * 拒绝状态
     */
    Denied = 2,
  }
  /**
   * 用户申请资格类型枚举
   */
  export enum Type {
    /**
     * 检测资格
     */
    Detection = 0,

    /**
     * 设计资格
     */
    Design = 1,

    /**
     * 加固资格
     */
    Reinforcement = 2,

    /**
     * 网格员资格
     */
    Grid = 3,
  }
  export interface ResItem {
    /**
     * 申请时间
     */
    applicationDate: Date;
    /**
     * 申请公司ID
     */
    companyId: number;
    /**
     * 主键Id
     */
    id: number;
    /**
     * 处理时间
     */
    processedAt: Date;
    /**
     * 处理人ID
     */
    processorId: number;
    /**
     * 处理人姓名
     */
    processorName: string;
    /**
     * 申请备注
     */
    remark: string;
    status: number;
    type: number;
    /**
     * 申请用户ID
     */
    userId: number;
    /**
     * 用户手机号码
     */
    userMobile: string;
    /**
     * 申请用户姓名
     */
    userName: string;
  }
}
