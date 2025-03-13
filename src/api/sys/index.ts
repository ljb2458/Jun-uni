import { HttpRequestConfig } from "luch-request";
import { defHttp, Api } from "../index";

/**获取小程序openId */
export async function apiGetWxOpenId(
  data: ApiGetWxOpenId.Req
): Promise<Api.Res<ApiGetWxOpenId.Res>> {
  const res = await defHttp.get<Api.Res<ApiGetWxOpenId.Res>>(
    "/SysWxOpenHouseSafety/wxOpenId",
    { params: data }
  );
  return res;
}

/**获取小程序openId */
export namespace ApiGetWxOpenId {
  export interface Req {
    JsCode: string;
  }
  export interface Res {
    openId: string;
  }
}

/**文件上传 */
export async function apiUploadFile(
  data: ApiUploadFile.Req
): Promise<Api.Res<ApiUploadFile.Res>> {
  const res = await defHttp.upload<Api.Res<ApiUploadFile.Res>>(
    "/sysFile/uploadFile",
    data
  );
  return res;
}

/**文件上传 */
export namespace ApiUploadFile {
  export interface Req extends HttpRequestConfig<UniApp.UploadTask> {
    formData?: {
      FileType?: string;
      IsPublic?: string;
      Path?: string;
      SavePath?: string;
      AllowSuffix?: string;
    };
  }
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
     * 软删除
     */
    isDelete: boolean;
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
}

/**全部字典列表 */
export async function apiGeAllDictList(): Promise<
  Api.Res<ApiGeAllDictList.ResOrm>
> {
  const res = await defHttp.get<Api.Res<ApiGeAllDictList.ResOrm>>(
    "/sysDictType/allDictList"
  );
  return res;
}

/**全部字典列表 */
export namespace ApiGeAllDictList {
  export interface ResOrm extends Record<ResKey, ResOrmItem[]> {}
  export interface ResOrmItem {
    code: string;
    extData: string;
    name: string;
    orderNo: number;
    remark: string;
    tagType: TagType;
    typeCode: string;
    value: StrNumber;
    styleSetting: string;
    classSetting: string;
  }
  export type TagType = "primary" | "success" | "info" | "danger" | "warning";

  export type ResKey =
    | "WechatReturnCodeEnum"
    | "code_gen_query_type"
    | "code_gen_net_type"
    | "code_gen_create_type"
    | "code_gen_base_class"
    | "GoViewProStateEnum"
    | "AlipayCertTypeEnum"
    | "AlipayIdentityTypeEnum"
    | "CacheTypeEnum"
    | "CardTypeEnum"
    | "CryptogramEnum"
    | "CultureLevelEnum"
    | "DataOpTypeEnum"
    | "FilterLogicEnum"
    | "FilterOperatorEnum"
    | "FinishStatusEnum"
    | "GenderEnum"
    | "HttpMethodEnum"
    | "JobCreateTypeEnum"
    | "MessageTypeEnum"
    | "NoticeStatusEnum"
    | "NoticeUserStatusEnum"
    | "RequestTypeEnum"
    | "TenantEventTypeEnum"
    | "TenantTypeEnum"
    | "UserEventTypeEnum"
    | "TaskTypeEnum"
    | "UserApplicationsStatusEnum"
    | "HouseSafetyGradeEnum"
    | "BuildingTypeEnum"
    | "HousingCategoryEnum"
    | "StructureTypeEnum"
    | "UserApplicationsTypeEnum"
    | "FileTypeEnum"
    | "TaskModeEnum"
    | "QualificationTypeEnum"
    | "CheckUserRoleEnum"
    | "HouseDetectionLvEnum"
    | "HouseDetectionTypeEnum"
    | "UserQualificationTypeEnum"
    | "CodeGenTypeEnum"
    | "DataScopeEnum"
    | "ElasticSearchAuthTypeEnum"
    | "JobStatusEnum"
    | "LoginModeEnum"
    | "LoginTypeEnum"
    | "MaritalStatusEnum"
    | "MenuTypeEnum"
    | "NationEnum"
    | "NoticeTypeEnum"
    | "PlatformTypeEnum"
    | "PrintTypeEnum"
    | "StatusEnum"
    | "YesNoEnum"
    | "TaskStatusEnum"
    | "SafetyLevelEnum"
    | "WarningCodeEnum"
    | "WarningStatusEnum"
    | "HouseWarringTypeEnum"
    | "KnowledgeRepositoryType"
    | "code_gen_effect_type"
    | "code_gen_print_type"
    | "org_type"
    | "AccountTypeEnum";
}
/**获取轮播图列表 */
export async function apiSwiperList(): Promise<Api.Res<ApiSwiperList.Res>> {
  const res = await defHttp.get<Api.Res<ApiSwiperList.Res>>("/carousel/list");
  return res;
}

/**获取轮播图列表 */
export namespace ApiSwiperList {
  export interface Req {}
  export interface Res
    extends Array<{
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
       * 轮播图分组编码
       */
      groupCode: string;
      /**
       * 主键Id
       */
      id: number;
      /**
       * 图片地址
       */
      imagePath: string;
      imagePathAttachment: SysFile;
      /**
       * 软删除
       */
      isDelete: boolean;
      /**
       * 轮播图名称
       */
      name: string;
      /**
       * 排序
       */
      order: number;
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
       * 跳转地址
       */
      url: string;
    }> {}

  /**
   * SysFile，系统文件表
   */
  export interface SysFile {
    /**
     * 所属Id（如主对象）
     */
    belongId?: number;
    /**
     * 仓储名称
     */
    bucketName?: string;
    /**
     * 创建者部门Id
     */
    createOrgId?: number;
    /**
     * 创建者部门名称
     */
    createOrgName?: string;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 创建者Id
     */
    createUserId?: number;
    /**
     * 创建者姓名
     */
    createUserName?: string;
    /**
     * 文件MD5
     */
    fileMd5?: string;
    /**
     * 文件名称（源文件名）
     */
    fileName?: string;
    /**
     * 存储路径
     */
    filePath?: string;
    /**
     * 文件类别
     */
    fileType?: string;
    /**
     * 雪花Id
     */
    id?: number;
    /**
     * 软删除
     */
    isDelete?: boolean;
    /**
     * 是否公开
     * 若为true则所有人都可以查看，默认只有自己或有权限的可以查看
     */
    isPublic?: boolean;
    /**
     * 提供者
     */
    provider?: string;
    /**
     * 关联对象Id
     */
    relationId?: number;
    /**
     * 关联对象名称（如子对象）
     */
    relationName?: string;
    /**
     * 文件大小信息-计算后的
     */
    sizeInfo?: string;
    /**
     * 文件大小KB
     */
    sizeKb?: number;
    /**
     * 文件后缀
     */
    suffix?: string;
    /**
     * 租户Id
     */
    tenantId?: number;
    /**
     * 更新时间
     */
    updateTime?: Date;
    /**
     * 修改者Id
     */
    updateUserId?: number;
    /**
     * 修改者姓名
     */
    updateUserName?: string;
    /**
     * 外链地址-OSS上传后生成外链地址方便前端预览
     */
    url?: string;
  }
}
