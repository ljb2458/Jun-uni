import { HttpRequestConfig } from "luch-request";
import { defHttp, Api } from "../index";

/**获取用户手机号 */
export async function apiGetWxPhone(
  data: ApiGetWxPhone.Req
): Promise<Api.Res<ApiGetWxPhone.Res>> {
  const res = await defHttp.get<Api.Res<ApiGetWxPhone.Res>>(
    "/SysWxOpenHouseSafety/wxPhone",
    { params: data }
  );
  return res;
}

/**获取用户手机号 */
export namespace ApiGetWxPhone {
  export interface Req {
    /**
     * Code
     */
    Code: string;
    /**
     * OpenId
     */
    OpenId: string;
  }
  export interface Res {
    phoneNumber: string;
  }
}

/**获取微信用户信息 */
export async function apiWxUserinfo(): Promise<Api.Res<ApiWxUserinfo.Res>> {
  const res = await defHttp.get<Api.Res<ApiWxUserinfo.Res>>(
    "/account/wXUserInfo"
  );
  return res;
}

/**获取微信用户信息 */
export namespace ApiWxUserinfo {
  export interface Req {}

  export interface Res {
    /**真实姓名 */
    userAppName: string;
    /**
     * 账号
     */
    account: string;
    /**
     * 账号类型
     */
    accountType: AccountType;
    /**
     * 地址
     */
    address: string;
    /**
     * 年龄
     */
    age: number;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 待审核公司人员数量
     */
    awaitingApprovalCompanyPersonCount: number;
    /**
     * 出生日期
     */
    birthday: Date;
    /**
     * 证件类型
     */
    cardType: number;
    /**
     * 毕业院校
     */
    college: string;
    /**
     * 公司人员数量
     */
    companyPersonCount: number;
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
     * 文化程度
     */
    cultureLevel: number;
    /**
     * 邮箱
     */
    email: string;
    /**
     * 紧急联系人地址
     */
    emergencyAddress: string;
    /**
     * 紧急联系人
     */
    emergencyContact: string;
    /**
     * 紧急联系人电话
     */
    emergencyPhone: string;
    /**
     * 擅长领域
     */
    expertise: string;
    /**
     * 雪花Id
     */
    id: number;
    /**
     * 身份证号
     */
    idCardNum: string;
    /**
     * 个人简介
     */
    introduction: string;
    /**
     * 工号
     */
    jobNum: string;
    /**
     * 入职日期
     */
    joinDate: Date;
    /**
     * 最新密码修改时间
     */
    lastChangePasswordTime: Date;
    /**
     * 最新登录地点
     */
    lastLoginAddress: string;
    /**
     * 最新登录设备
     */
    lastLoginDevice: string;
    /**
     * 最新登录Ip
     */
    lastLoginIp: string;
    /**
     * 最新登录时间
     */
    lastLoginTime: Date;
    /**
     * 直属主管Id
     */
    managerUserId: number;
    /**
     * 民族
     */
    nation: string;
    /**
     * 昵称
     */
    nickName: string;
    /**
     * 办公室
     */
    office: string;
    /**
     * 办公电话
     */
    officePhone: string;
    /**
     * 办公区域
     */
    officeZone: string;
    /**
     * 排序
     */
    orderNo: number;
    /**
     * 直属机构Id
     */
    orgId: number;
    /**
     * 手机号码
     */
    phone: string;
    /**
     * 政治面貌
     */
    politicalOutlook: string;
    /**
     * 职位Id
     */
    posId: number;
    /**
     * 职级
     */
    posLevel: string;
    /**
     * 职称
     */
    posTitle: string;
    /**
     * 真实姓名
     */
    realName: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 性别
     */
    sex: number;
    /**
     * 电子签名
     */
    signature: string;
    /**
     * 状态
     */
    status: number;
    /**
     * 系统机构
     */
    sysOrg: SysOrg;
    /**
     * 租户Id
     */
    tenantId: number;
    /**
     * Token版本号
     */
    tokenVersion: number;
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
    roleInfo: RoleInfo;
  }

  export enum AccountType {
    /**
     * 会员角色，编码：666，名称：Member会员
     */
    Member = 666,

    /**
     * 注册用户角色，编码：666，名称：RegUser注册用户
     */
    RegUser = 666,

    /**
     * 普通账号角色，编码：777，名称：NormalUser普通账号
     */
    NormalUser = 777,

    /**
     * 系统管理员角色，编码：888，名称：SysAdmin系统管理员
     */
    SysAdmin = 888,

    /**
     * 超级管理员角色，编码：999，名称：SuperAdmin超级管理员
     */
    SuperAdmin = 999,
  }
  export interface RoleInfo {
    /**
     * 编码
     */
    code: string;
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
    dataScope: number;
    /**
     * 雪花Id
     */
    id: number;
    /**
     * 软删除
     */
    isDelete: boolean;
    /**
     * 名称
     */
    name: string;
    /**
     * 排序
     */
    orderNo: number;
    /**
     * 备注
     */
    remark: string;
    status: number;
    sysFlag: number;
    /**
     * 租户Id
     */
    tenantId: number;
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

  /**
   * SysOrg，系统机构表
   */
  export interface SysOrg {
    /**
     * 地址
     */
    address: string;
    /**
     * 机构子项
     */
    children: SysOrg[];
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
    /**
     * 资质
     */
    qualification: string;
    /**
     * 备注
     */
    remark: string;
    /**
     * 状态
     */
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

/**微信登录 */
export async function apiLogin(
  data: ApiLogin.Req
): Promise<Api.Res<ApiLogin.Res>> {
  const res = await defHttp.post<Api.Res<ApiLogin.Res>>(
    "/account/wxMiniLogin",
    data,
    {
      custom: {
        failMessage: true,
      },
    }
  );
  return res;
}

/**微信登录 */
export namespace ApiLogin {
  export interface Req {
    mobile: string;
    openId: string;
  }
  export interface Res {
    accessToken: string;
    refreshToken: string;
  }
}

/**检查用户是否有网格员角色 */
export async function apiCheckUserRole(
  data: ApiCheckUserRole.Req
): Promise<Api.Res<ApiCheckUserRole.Res>> {
  const res = await defHttp.post<Api.Res<ApiCheckUserRole.Res>>(
    "/account/checkUserRole",
    data
  );
  return res;
}

/**检查用户是否有网格员角色 */
export namespace ApiCheckUserRole {
  export interface Req {
    mobile?: string;
    openId: string;
  }
  export interface Res {
    code: Code;
    msg: string;
  }
  export enum Code {
    /** 无权限 */
    None = 0,

    /** 审核中 */
    WaitProcessed = 1,

    /** 通过 */
    Approved = 2,

    /** 拒绝 */
    Denied = 3,
  }
}

/**微信小程序申请成为网格员 */
export async function apiUserRequestGridRole(
  data: ApiUserRequestGridRole.Req
): Promise<Api.Res<ApiUserRequestGridRole.Res>> {
  const res = await defHttp.post<Api.Res<ApiUserRequestGridRole.Res>>(
    "/account/userRequestGridRole",
    data,
    {
      custom: {
        failMessage: true,
        successMessage: true,
      },
    }
  );
  return res;
}

/**微信小程序申请成为网格员 */
export namespace ApiUserRequestGridRole {
  export interface Req {
    address?: string;
    mobile?: string;
    name?: string;
  }
  export interface Res {}
}

/**智能安全帽token */
export async function apiGetSmartHelmetToken(): Promise<
  Api.Res<ApiGetSmartHelmetToken.Res>
> {
  const res = await defHttp.get<Api.Res<ApiGetSmartHelmetToken.Res>>(
    "/smartHelmet/getToken"
  );
  return res;
}

/**智能安全帽token */
export namespace ApiGetSmartHelmetToken {
  export interface Req {}

  export interface Res {
    code: number;
    data: LoginResponse;
    msg: string;
  }

  /**
   * LoginResponse
   */
  export interface LoginResponse {
    appID: number;
    changePassword: boolean;
    locking: number;
    remaining: number;
    timeout: number;
    token: string;
  }
}

/**上传小程序头像 */
export async function apiUploadAvatar(
  data: ApiUploadAvatar.Req
): Promise<Api.Res<ApiUploadAvatar.Res>> {
  console.log("data", data);
  const res = await defHttp.upload<Api.Res<ApiUploadAvatar.Res>>(
    "/SysWxOpenHouseSafety/uploadAvatar",
    data
  );
  return res;
}

/**上传小程序头像 */
export namespace ApiUploadAvatar {
  export interface Res {
    /**
     * 所属Id（如主对象）
     */
    belongId: number;
    /**
     * 仓储名称
     */
    bucketName: string;
    /**
     * 创建者部门Id
     */
    createOrgId: number;
    /**
     * 创建者部门名称
     */
    createOrgName: string;
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
     * 文件MD5
     */
    fileMd5: string;
    /**
     * 文件名称（源文件名）
     */
    fileName: string;
    /**
     * 存储路径
     */
    filePath: string;
    /**
     * 文件类别
     */
    fileType: string;
    /**
     * 雪花Id
     */
    id: number;

    /**
     * 是否公开
     * 若为true则所有人都可以查看，默认只有自己或有权限的可以查看
     */
    isPublic: boolean;
    /**
     * 提供者
     */
    provider: string;
    /**
     * 关联对象Id
     */
    relationId: number;
    /**
     * 关联对象名称（如子对象）
     */
    relationName: string;
    /**
     * 文件大小信息-计算后的
     */
    sizeInfo: string;
    /**
     * 文件大小KB
     */
    sizeKb: number;
    /**
     * 文件后缀
     */
    suffix: string;
    /**
     * 租户Id
     */
    tenantId: number;
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
    /**
     * 外链地址-OSS上传后生成外链地址方便前端预览
     */
    url: string;
  }

  export interface Req extends HttpRequestConfig<UniApp.UploadTask> {
    formData: {
      openId: string;
      fileType?: string;
      path?: string;
    };
  }
}

/**更新用户基本信息 */
export async function apiUpdateUserInfo(
  data: ApiUpdateUserInfo.Req
): Promise<Api.Res<ApiUpdateUserInfo.Res>> {
  const res = await defHttp.post<Api.Res<ApiUpdateUserInfo.Res>>(
    "/account/updateBaseInfo",
    data,
    {
      custom: {
        failMessage: true,
        successMessage: true,
        routerBack: true,
      },
    }
  );
  return res;
}

/**更新用户基本信息 */
export namespace ApiUpdateUserInfo {
  export interface Req {
    /**个人简介 */
    introduction: string;
    address?: string;
    mobile?: string;
    name?: string;
  }
  export interface Res {}
}
