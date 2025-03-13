import { Api, defHttp, PagingApi } from "../index";
import type { ApiHouseInfoAdd, ApiTaskDetail, ApiWarnDetail } from ".";

/**获取房屋基本信息列表 */
export async function apiHouseList(
  data: ApiHouseList.Req
): Promise<PagingApi.Res<ApiHouseList.ResItem[]>> {
  const res = await defHttp.get<Api.Res<ApiHouseList.ResItem[]>>(
    "/houseInfo/list",
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

/**获取房屋基本信息列表 */
export namespace ApiHouseList {
  export interface Req extends PagingApi.Req {
    /**
     * 经度筛选
     */
    Longitude?: number;
    /**
     * 经度筛选偏移量
     */
    LongitudeDeviation?: number;
    /**
     * 纬度筛选
     */
    Latitude?: number;
    /**
     * 纬度筛选偏移量
     */
    LatitudeDeviation?: number;
    /**
     * 地址
     */
    Address?: string;
    /**
     * 市
     */
    City?: number;
    /**
     * 建成时间
     */
    ConstructionYear?: Date;
    /**
     * 建成时间范围
     */
    ConstructionYearRange?: Date[];
    /**
     * 区
     */
    District?: number;
    /**
     * 省
     */
    Province?: number;
    /**
     * 房屋安全等级
     */
    SafetyLevel?: number;
    /**
     * 关键字查询
     */
    SearchKey?: string;
  }

  export interface ResItem {
    /**
     * 地址
     */
    address: string;
    /**
     * 建筑面积
     */
    buildingArea: number;
    /**
     * 建筑层数
     */
    buildingFloors: number;
    buildingType: number;
    /**
     * 市
     */
    city: number;
    /**
     * 城市名字
     */
    cityName: string;
    /**
     * 建成时间
     */
    constructionYear: Date;
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
     * 设计高度
     */
    designHeight: number;
    /**
     * 区
     */
    district: number;
    /**
     * 区 描述
     */
    districtName: string;
    /**
     * 网格员联系方式
     */
    gridOfficerContact: string;
    /**
     * 网格员ID
     */
    gridOfficerId: number;
    /**
     * 网格员姓名
     */
    gridOfficerName: string;
    housingCategory: number;
    /**
     * 雪花Id
     */
    id: number;
    /**
     * 软删除
     */
    isDelete: boolean;
    /**
     * 是否经过专业设计
     */
    isProDesigned: boolean;
    /**
     * 是否经过安全鉴定
     */
    isSafetyAssessed: boolean;
    /**
     * 是否进行抗震加固
     */
    isSeismicRetrofitted: boolean;
    /**
     * 是否采取构造措施
     */
    isStructuralMeasures: boolean;
    /**
     * 维度
     */
    latitude: number;
    /**
     * 经度
     */
    longitude: number;
    /**
     * 产权人姓名
     */
    ownerName: string;
    /**
     * 产权人电话
     */
    ownerPhone: string;
    /**
     * 省
     */
    province: number;
    /**
     * 省 描述
     */
    provinceName: string;
    safetyLevel: number;
    structureType: number;
    /**
     * 图斑编号
     */
    tbNumber: string;
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
/**任务处理统计 */
export async function apiTaskStatistics(): Promise<
  Api.Res<ApiTaskStatistics.Res>
> {
  const res = await defHttp.get<Api.Res<ApiTaskStatistics.Res>>(
    "/taskmanage/userStatistics"
  );
  return res;
}

/**任务处理统计 */
export namespace ApiTaskStatistics {
  export interface Res {
    /**
     * 完成
     */
    completed: number;
    /**
     * 处理中
     */
    waiting: number;
    /**
     * 待处理
     */
    waitReceiving: number;
  }
  export interface Req {}
}
/**获取用户任务列表 */
export async function apiUserTaskList(
  data: ApiUserTaskList.Req
): Promise<PagingApi.Res<ApiUserTaskList.ResItem[]>> {
  const res = await defHttp.post<PagingApi.Res<ApiUserTaskList.ResItem[]>>(
    "/taskmanage/listUserTask",
    data
  );
  return res;
}

/**获取用户任务列表 */
export namespace ApiUserTaskList {
  export interface Req extends PagingApi.Req {
    taskStatus?: ApiTaskDetail.TaskStatus;
    taskType?: ApiTaskDetail.TaskType;
    searchKey?: string;
  }

  export interface ResItem {
    /**
     * 区
     */
    area: string;
    /**
     * 市
     */
    city: string;
    /**
     * 编码
     */
    code: string;
    /**
     * 完成时间
     */
    completedTime: Date;
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
     * 房屋Id
     */
    houseInfoId: number;
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
     * 省
     */
    province: string;
    /**
     * 报告时间
     */
    reportTime: Date;
    /**
     * 任务地点
     */
    taskAddress: string;
    /**
     * 任务状态
     */
    taskStatus: ApiTaskDetail.TaskStatus;
    /**
     * 任务类型
     */
    taskType: ApiTaskDetail.TaskType;
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

/**获取用户告警列表 */
export async function apiUserWarnList(
  data: ApiUserWarnList.Req
): Promise<PagingApi.Res<ApiUserWarnList.ResItem[]>> {
  const res = await defHttp.post<PagingApi.Res<ApiUserWarnList.ResItem[]>>(
    "/warning/listUserWarning",
    data
  );
  return res;
}

/**获取用户告警列表 */
export namespace ApiUserWarnList {
  export interface Req extends PagingApi.Req {
    searchKey?: string;
    status?: ApiWarnDetail.Status;
    type?: ApiWarnDetail.Type;
  }

  export interface ResItem {
    /**
     * 地址
     */
    address: string;
    /**
     * 区
     */
    area: number;
    /**
     * 区 描述
     */
    areaName: string;
    /**
     * 市
     */
    city: number;
    /**
     * 关闭理由
     */
    closeCause: number;
    /**
     * 编码
     */
    code: string;
    /**
     * 完成时间
     */
    completedTime: Date;
    /**
     * 坐标
     */
    coordinate: string;
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
     * 人人拍id
     */
    everybodyTakePictureId: number;
    /**
     * 安全帽图片路径
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频路径
     */
    helmetVideosPath: string;
    /**
     * 房屋id
     */
    houseId: number;
    /**
     * 主键Id
     */
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 省
     */
    province: number;
    /**
     * 初始高度
     */
    satelliteInitialHeight: string;
    /**
     * 监控差距
     */
    satelliteMonitorGap: string;
    /**
     * 安全等级
     */
    satelliteSafetyLevel: number;
    /**
     * 状态
     */
    status: ApiWarnDetail.Status;
    /**
     * 拍照详情
     */
    takePictureDetails: string;
    /**
     * 人人拍id
     */
    takePictureId: number;
    /**
     * 人人拍图片路径
     */
    takePictureImagesPath: string;
    /**
     * 拍照安全等级
     */
    takePictureSafetyLevel: number;
    /**
     * 人人拍视频路径
     */
    takePictureVideosPath: string;
    /**
     * 任务管理id
     */
    taskManageId: number;
    type: ApiWarnDetail.Type;
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
     * 上传用户
     */
    uploadUserId: number;
    /**
     * 上传用户名
     */
    uploadUserName: string;
    /**
     * 上传用户手机号
     */
    uploadUserPhone: string;
  }
}

/**获取用户告警列表 */
export async function apiHouseListPage(
  data: ApiHouseListPage.Req
): Promise<PagingApi.Res<ApiHouseListPage.ResItem[]>> {
  const res = await defHttp.post<PagingApi.Res<ApiHouseListPage.ResItem[]>>(
    "/houseInfo/page",
    data
  );
  return res;
}

/**获取用户告警列表 */
export namespace ApiHouseListPage {
  export interface Req extends PagingApi.Req {
    /**
     * 地址
     */
    address?: string;
    /**
     * 市
     */
    city?: number;
    /**
     * 建成时间
     */
    constructionYear?: Date;
    /**
     * 建成时间范围
     */
    constructionYearRange?: Date[];
    /**
     * 区
     */
    district?: number;
    /**
     * 纬度
     */
    latitude?: number;
    /**
     * 纬度偏差值
     */
    latitudeDeviation?: number;
    /**
     * 经度
     */
    longitude?: number;
    /**
     * 经度偏差值
     */
    longitudeDeviation?: number;
    /**
     * 省
     */
    province?: number;
    safetyLevel?: ApiHouseInfoAdd.SafetyLevel;
    /**
     * 房屋安全等级数组(数组,单个 建议只传一个)
     */
    safetyLevelArray?: ApiHouseInfoAdd.SafetyLevel[];
    /**
     * 关键字查询
     */
    searchKey?: string;
  }

  export interface ResItem {
    /**
     * 地址
     */
    address: string;
    /**
     * 审批用地
     */
    approvedLand: string;
    /**
     * 建筑面积
     */
    buildingArea: number;
    /**
     * 建筑层数
     */
    buildingFloors: number;
    buildingType: number;
    /**
     * 市
     */
    city: number;
    /**
     * 城市名字
     */
    cityName: string;
    /**
     * 建成时间
     */
    constructionYear: Date;
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
     * 当前高度
     */
    currentHeight: number;
    /**
     * 设计高度
     */
    designHeight: number;
    /**
     * 区
     */
    district: number;
    /**
     * 区 描述
     */
    districtName: string;
    /**
     * 网格员联系方式
     */
    gridOfficerContact: string;
    /**
     * 网格员ID
     */
    gridOfficerId: number;
    /**
     * 网格员姓名
     */
    gridOfficerName: string;
    /**
     * 房屋户型图
     */
    houseLayoutImage: string;
    /**
     * 房屋偏移量
     */
    houseOffset: number;
    /**
     * 房屋沉降量
     */
    houseSettlement: number;
    housingCategory: number;
    /**
     * 雪花Id
     */
    id: number;
    /**
     * 软删除
     */
    isDelete: boolean;
    /**
     * 是否经过专业设计
     */
    isProDesigned: boolean;
    /**
     * 是否经过安全鉴定
     */
    isSafetyAssessed: boolean;
    /**
     * 是否进行抗震加固
     */
    isSeismicRetrofitted: boolean;
    /**
     * 是否采取构造措施
     */
    isStructuralMeasures: boolean;
    /**
     * 维度
     */
    latitude: number;
    /**
     * 经度
     */
    longitude: number;
    /**
     * 产权人姓名
     */
    ownerName: string;
    /**
     * 产权人电话
     */
    ownerPhone: string;
    /**
     * 省
     */
    province: number;
    /**
     * 省 描述
     */
    provinceName: string;
    safetyLevel: number;
    structureType: number;
    /**
     * 图斑编号
     */
    tbNumber: string;
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
