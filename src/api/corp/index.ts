import { defHttp, Api } from "../index";
import { ApiPowerAppayList } from "./list";

/**用户权限（加入公司）申请 */
export async function apiApplyPower(
  data: ApiApplyPower.Req
): Promise<Api.Res<ApiApplyPower.Res>> {
  const res = await defHttp.post<Api.Res<ApiApplyPower.Res>>(
    "/userApplications/add",
    data,
    { custom: { successMessage: true, failMessage: true, routerBack: true } }
  );
  return res;
}

/**用户权限（加入公司）申请 */
export namespace ApiApplyPower {
  export interface Req {
    /**
     * 申请公司ID
     */
    companyId: number;
    /**
     * 处理时间
     */
    processedAt?: Date;
    /**
     * 处理人ID
     */
    processorId?: number;
    /**
     * 处理人姓名
     */
    processorName?: string;
    /**
     * 申请备注
     */
    remark?: string;
    status?: number;
    type: Type;
    /**
     * 申请用户ID
     */
    userId?: number;
    /**
     * 用户手机号码
     */
    userMobile?: string;
    /**
     * 申请用户姓名
     */
    userName?: string;
  }
  export enum Type {
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

    /**
     * 网格员
     */
    Grid = 3,
  }
  export interface Res {}
}

/**用户权限（加入公司）申请审核 */
export async function apiApplyPowerAudit(
  data: ApiApplyPowerAudit.Req
): Promise<Api.Res<ApiApplyPowerAudit.Res>> {
  const res = await defHttp.post<Api.Res<ApiApplyPowerAudit.Res>>(
    "/userApplications/setStatus",
    data,
    { custom: { successMessage: true, failMessage: true } }
  );
  return res;
}

/**用户权限（加入公司）申请审核 */
export namespace ApiApplyPowerAudit {
  export interface Req {
    /**
     * 主键Id
     */
    id: number;
    status?: ApiPowerAppayList.Status;
  }

  export interface Res {}
}

/**删除用户权限（加入公司）申请记录 */
export async function apiApplyPowerDel(
  data: ApiApplyPowerDel.Req
): Promise<Api.Res<ApiApplyPowerDel.Res>> {
  const res = await defHttp.post<Api.Res<ApiApplyPowerDel.Res>>(
    "/userApplications/delete",
    data,
    { custom: { successMessage: true, failMessage: true } }
  );
  return res;
}

/**删除用户权限（加入公司）申请记录 */
export namespace ApiApplyPowerDel {
  export interface Req {
    /**
     * 主键Id
     */
    id: number;
  }

  export interface Res {}
}

/**获取公司基本信息 */
export async function apiSysOrgExtDetail(
  data: ApiSysOrgExtDetail.Req
): Promise<Api.Res<ApiSysOrgExtDetail.Res>> {
  const res = await defHttp.get<Api.Res<ApiSysOrgExtDetail.Res>>(
    "/sysOrgExt/detail",
    { params: data }
  );
  return res;
}

/**获取公司基本信息 */
export namespace ApiSysOrgExtDetail {
  export interface Req {
    /**
     * 主键Id
     */
    id: number;
  }

  export interface Res {
    /**
     * 地址
     */
    address: string;
    /**
     * 机构子项
     */
    children: Res[];
    /**
     * 市
     */
    city: string;
    /**
     * 编码
     */
    code: string;
    /**
     * 联系方式
     */
    contact: string;
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
     * 负责人Id
     */
    directorId: number;
    /**
     * 是否禁止选中
     */
    disabled: boolean;
    /**
     * 区
     */
    district: string;
    /**
     * 雪花Id
     */
    id: number;
    /**
     * 软删除
     */
    isDelete: boolean;
    /**
     * 纬度
     */
    latitude: number;
    /**
     * 级别
     */
    level: number;
    /**
     * Logo
     */
    logo: string;
    /**
     * 经度
     */
    longitude: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 排序
     */
    orderNo: number;
    /**
     * 父Id
     */
    pid: number;
    /**
     * 省
     */
    province: string;
    qualification: string;
    /**
     * 备注
     */
    remark: string;
    status: number;
    /**
     * 租户Id
     */
    tenantId: number;
    /**
     * 机构类型-数据字典
     */
    type: string;
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
