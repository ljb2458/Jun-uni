import { Api, defHttp, PagingApi } from "../index";

/**获取网格员用户列表 */
export async function apiGridUserList(
  data: ApiGridUserList.Req
): Promise<PagingApi.Res<ApiGridUserList.ResItem[]>> {
  const res = await defHttp.get<Api.Res<ApiGridUserList.ResItem[]>>(
    "/account/gridUserList",
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

/**获取网格员用户列表 */
export namespace ApiGridUserList {
  export interface Req extends PagingApi.Req {
    nickName?: string;
    realName?: string;
  }

  export interface ResItem {
    account: string;
    realName: string;
    nickName: string;
    avatar: string;
    sex: number;
    age: number;
    birthday: string;
    nation: string;
    phone: string;
    cardType: number;
    idCardNum: string;
    email: string;
    address: string;
    cultureLevel: number;
    politicalOutlook: string;
    college: string;
    officePhone: string;
    emergencyContact: string;
    emergencyPhone: string;
    emergencyAddress: string;
    introduction: string;
    orderNo: number;
    status: number;
    remark: string;
    accountType: number;
    orgId: number;
    sysOrg: sysOrg;
    managerUserId: number;
    posId: number;
    jobNum: string;
    posLevel: string;
    posTitle: string;
    expertise: string;
    officeZone: string;
    office: string;
    joinDate: string;
    lastLoginIp: string;
    lastLoginAddress: string;
    lastLoginTime: string;
    lastLoginDevice: string;
    signature: string;
    tokenVersion: number;
    lastChangePasswordTime: string;
    tenantId: number;
    createTime: string;
    updateTime: string;
    createUserId: number;
    createUserName: string;
    updateUserId: number;
    updateUserName: string;
    isDelete: boolean;
    id: number;
  }
  interface sysOrg {
    pid: number;
    name: string;
    code: string;
    level: number;
    type: string;
    directorId: number;
    longitude: number;
    latitude: number;
    orderNo: number;
    status: number;
    remark: string;
    disabled: boolean;
    province: string;
    city: string;
    district: string;
    address: string;
    contact: string;
    logo: string;
    qualification: string;
    tenantId: number;
    createTime: string;
    updateTime: string;
    createUserId: number;
    createUserName: string;
    updateUserId: number;
    updateUserName: string;
    isDelete: boolean;
    id: number;
  }
}
