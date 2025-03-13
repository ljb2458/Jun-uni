import { defHttp, Api } from "../index";
import { ApiUserTaskList } from "./list";

/**增加房屋基本信息 */
export async function apiHouseInfoAdd(
  data: ApiHouseInfoAdd.Req
): Promise<Api.Res<ApiHouseInfoAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiHouseInfoAdd.Res>>(
    "/houseInfo/add",
    data,
    {
      custom: {
        failMessage: true,
      },
    }
  );
  return res;
}

/** 增加房屋基本信息 */
export namespace ApiHouseInfoAdd {
  /** 请求接口 */
  export interface Req {
    /** 地址 */
    address: string;
    /** 建筑面积 */
    buildingArea: number;
    /** 建筑层数 */
    buildingFloors: number;
    /** 建筑类型 */
    buildingType: BuildingType;
    /** 市 */
    city: number;
    /** 建成时间 */
    constructionYear: Date;
    /** 创建时间 */
    createTime: Date;
    /** 创建者Id */
    createUserId: number;
    /** 创建者姓名 */
    createUserName: string;
    /** 设计高度 */
    designHeight: number;
    /** 区 */
    district: number;
    /** 网格员联系方式 */
    gridOfficerContact: string;
    /** 网格员ID */
    gridOfficerId: number;
    /** 网格员姓名 */
    gridOfficerName: string;
    /** 房屋类别 */
    housingCategory: HousingCategory;
    /** 软删除 */
    isDelete: boolean;
    /** 是否经过专业设计 */
    isProDesigned: boolean;
    /** 是否经过安全鉴定 */
    isSafetyAssessed: boolean;
    /** 是否进行抗震加固 */
    isSeismicRetrofitted: boolean;
    /** 是否采取构造措施 */
    isStructuralMeasures: boolean;
    /** 产权人姓名 */
    ownerName: string;
    /** 产权人电话 */
    ownerPhone: string;
    /** 省 */
    province: number;
    /** 安全等级 */
    safetyLevel: SafetyLevel;
    /** 结构类型 */
    structureType: number;
    /** 图斑编号 */
    tbNumber: string;
    /** 更新时间 */
    updateTime: Date;
    /** 修改者Id */
    updateUserId: number;
    /** 修改者姓名 */
    updateUserName: string;
  } /** 建筑类型枚举 */
  export enum BuildingType {
    /** 公寓 */
    Apartment = 0,
    /** 平房 */
    Bungalow = 1,
    /** 复式 */
    Duplex = 2,
    /** 别墅 */
    Villa = 3,
  }

  /** 房屋类别枚举 */
  export enum HousingCategory {
    /** 住宅 */
    Residential = 0,
    /** 商业 */
    Commercial = 1,
    /** 混合用途 */
    MixedUse = 2,
  }

  /** 安全等级枚举 */
  export enum SafetyLevel {
    /** A级 */
    Asu = 1,
    /** B级 */
    Bsu = 2,
    /** C级 */
    Csu = 3,
    /** D级 */
    Dsu = 4,
  }

  /** 响应接口 */
  export interface Res {}
}

/**房屋问题上报 */
export async function apiHouseDangerousAdd(
  data: ApiHouseDangerousAdd.Req
): Promise<Api.Res<ApiHouseDangerousAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiHouseDangerousAdd.Res>>(
    "/everybodyTakePicture/add",
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

/** 房屋问题上报 */
export namespace ApiHouseDangerousAdd {
  /** 请求接口 */
  export interface Req {
    address: string;
    /**
     * 区
     */
    area?: number;
    /**
     * 市
     */
    city?: number;
    latitude: number;
    longitude: number;
    /**
     * 省
     */
    province?: number;
    /**
     * 拍照详情
     */
    takePictureDetails: string;
    /**图片路径；','分隔 */
    takePicturePath: string;
    takePictureVideoPath?: string;
    /**
     * 安全帽图片地址
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频地址
     */
    helmetVideosPath?: string;
  }

  /** 响应接口 */
  export interface Res {}
}
/**巡检问题上报 */
export async function apiCheckLoopDangerousAdd(
  data: ApiCheckLoopDangerousAdd.Req
): Promise<Api.Res<ApiCheckLoopDangerousAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiCheckLoopDangerousAdd.Res>>(
    "/dailyInspection/reportProblem",
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

/** 巡检问题上报 */
export namespace ApiCheckLoopDangerousAdd {
  /** 请求接口 */
  export interface Req {
    dailyInspection: DailyInspection;
    everybodytakepicture: Everybodytakepicture;
  }
  export interface DailyInspection extends ApiCheckLoopAdd.Req {}
  export interface Everybodytakepicture extends ApiHouseDangerousAdd.Req {}

  /** 响应接口 */
  export interface Res {}
}

/** 巡检打卡 */
export async function apiCheckLoopAdd(
  data: ApiCheckLoopAdd.Req
): Promise<Api.Res<ApiCheckLoopAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiCheckLoopAdd.Res>>(
    "/dailyInspection/add",
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

/** 巡检打卡 */
export namespace ApiCheckLoopAdd {
  /** 请求接口 */
  export interface Req {
    /**
     * 地标详细地址
     */
    detailedAddress: string;
    /**
     * 维度
     */
    latitude: number;
    /**
     * 经度
     */
    longitude: number;
    /**
     * 地址名字
     */
    name: string;
  }

  /** 响应接口 */
  export interface Res {}
}

/** 任务详情 */
export async function apiTaskDetail(
  data: ApiTaskDetail.Params
): Promise<Api.Res<ApiTaskDetail.Res>> {
  const res = await defHttp.get<Api.Res<ApiTaskDetail.Res>>(
    `/taskmanage/getTaskProcessingRecords/`,
    {
      params: data,
      custom: {
        failMessage: true,
      },
    }
  );
  return res;
}

/** 任务详情 */
export namespace ApiTaskDetail {
  /** 请求接口 */
  export interface Req {}
  export interface Params {
    taskId: string;
  }

  /** 响应接口 */
  export interface Res {
    /**
     * 市
     */
    city: number;
    /**
     * 完成时间
     */
    completedTime: Date;
    /**
     * 区
     */
    district: number;
    houseInfo: HouseInfoOutput;
    /**
     * 房屋Id
     */
    houseInfoId: number;
    /**
     * 省
     */
    province: number;
    receiveUserId: number;
    receiveUserName: string;
    /**
     * 报告时间
     */
    reportTime: Date;
    /**
     * 任务地点
     */
    taskAddress: string;
    taskSchedules?: TaskSchedule[];
    /**
     * 任务状态
     */
    taskStatus: TaskStatus;
    /**
     * 任务类型
     */
    taskType: TaskType;
    warningDetails: WarningDetails;
  }

  /**
   * HouseInfoOutput，房屋基本信息输出参数
   */
  export interface HouseInfoOutput {
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

  /**
   * TaskSchedule
   */
  export interface TaskSchedule {
    description: string;
    taskManagerId: number;
    taskStatus: number;
    receiveUserId: number;
    receiveUserName: string;
    recheckImages: string;
    recheckVideos: string;
    taskMode: number;
    taskType: number;
    taskDescription: string;
    attachmentsPath: string;
    helmetImagesPath: string;
    helmetVideosPath: string;
    createTime: Date;
    updateTime: Date;
    createUserId: number;
    createUserName: string;
    updateUserId: string;
    updateUserName: string;
    isDelete: boolean;
    id: number;
  }

  /**
   * WarningDetails
   */
  export interface WarningDetails {
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
     * 房屋id
     */
    houseId: number;
    houseInfo: HouseInfoOutput;
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
     * 监测高度
     */
    satelliteMonitorHeight: string;
    /**
     * 安全等级
     */
    satelliteSafetyLevel: number;
    /**
     * 状态
     */
    status: number;
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
    takePicturePath: string;
    takePictureVideoPath: string;
    helmetImagesPath: string;
    helmetVideosPath: string;
    /**
     * 拍照安全等级
     */
    takePictureSafetyLevel: number;
    /**
     * 任务管理id
     */
    taskManageId: number;
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
  export enum TaskStatus {
    /** 待发布 */
    WaitPublished = 1,

    /** 待接收 */
    WaitReceiving,

    /** 待处理 */
    WaitProcessed,

    /** 待审核 */
    WaitExamine,

    /** 完成 */
    Completed,
  }
  /**
   * 任务类型枚举
   */
  export enum TaskType {
    /** 检测任务 */
    Detection = 0,

    /** 设计任务 */
    Design = 1,

    /** 加固任务 */
    Reinforce = 2,

    /** 巡检任务 */
    Inspection = 3,

    /** 复核任务 */
    Recheck = 4,
  }
}

/** 告警详情 */
export async function apiWarnDetail(
  params: ApiWarnDetail.Params
): Promise<Api.Res<ApiWarnDetail.Res>> {
  const res = await defHttp.post<Api.Res<ApiWarnDetail.Res>>(
    `/warning/getWarningDetails/${params.warningId}`,
    undefined,
    {
      custom: {
        failMessage: true,
      },
    }
  );
  return res;
}

/** 告警详情 */
export namespace ApiWarnDetail {
  /** 请求接口 */
  export interface Req {}
  export interface Params {
    warningId: string;
  }

  /** 响应接口 */
  export interface Res {
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
    everybodyTakePictures: EverybodyTakePictureOutput;
    taskDetail: Taskprocessingrecords[];
    taskManage: ApiUserTaskList.ResItem;
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
    houseInfo: HouseInfoOutput;
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
     * 监测高度
     */
    satelliteMonitorHeight: string;
    /**
     * 安全等级
     */
    satelliteSafetyLevel: number;
    status: Status;
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
    type: Type;
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

  /**
   * HouseInfoOutput，房屋基本信息输出参数
   */
  export interface HouseInfoOutput {
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
  /**
   * EverybodyTakePictureOutput
   */
  export interface EverybodyTakePictureOutput {
    /**
     * 拍照详情
     */
    takePictureDetails: string;
    /**
     * 拍照安全等级
     */
    takePictureSafetyLevel: number;
  }

  /**
   * Taskprocessingrecords，任务处理记录
   */
  export interface Taskprocessingrecords {
    /**
     * 附件地址
     */
    attachmentsPath: string;
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
    /**
     * 描述
     */
    description: string;
    /**
     * 安全帽图片地址
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频地址
     */
    helmetVideosPath: string;
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
     * 接收用户id
     */
    receiveUserId: number;
    /**
     * 接收用户姓名
     */
    receiveUserName: string;
    /**
     * 复核任务图片
     */
    recheckImages: string;
    /**
     * 复核任务视频地址
     */
    recheckVideos: string;
    /**
     * 任务描述
     */
    taskDescription: string;
    /**
     * 任务id
     */
    taskManagerId: number;
    /**
     * 任务模式: 个人 抢单
     */
    taskMode: number;
    /**
     * 任务状态
     */
    taskStatus: number;
    /**
     * 任务类型
     */
    taskType: number;
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

  export enum Status {
    /**
     * 打开
     */
    Open = 1,
    /**
     * 任务中
     */
    Running = 2,
    /**
     * 关闭
     */
    Closed = 3,
  }
  /**
   * 告警类型枚举
   */
  export enum Type {
    /**
     * AI告警
     */
    AiWarning = 1,
    /**
     * 卫星告警
     */
    Satellite = 2,
    /**
     * 硬件监控告警
     */
    HardwareMonitor = 3,
  }
}

/** 提交检测任务 */
export async function apiCheckTaskResultAdd(
  data: ApiCheckTaskResultAdd.Req
): Promise<Api.Res<ApiCheckTaskResultAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiCheckTaskResultAdd.Res>>(
    `/taskmanage/userSubmitDetectionTask`,
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

/** 提交检测任务 */
export namespace ApiCheckTaskResultAdd {
  /** 请求接口 */
  export interface Req {
    /**
     * 鉴定依据
     */
    detectionBasis?: string;
    /**
     * 鉴定结论
     */
    detectionConclusion?: string;
    detectionLv?: number;
    /**
     * 检测日期
     */
    detectionTime?: Date;
    detectionType?: number;
    /**
     * 文件地址
     */
    filePath?: string;
    /**
     * 房屋id
     */
    houseId?: number;
    taskId?: number;
  }

  /** 响应接口 */
  export interface Res {}
}
/** 录入巡检结论（任务完成） */
export async function apiCheckLoopResultAdd(
  data: ApiCheckLoopResultAdd.Req
): Promise<Api.Res<ApiCheckLoopResultAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiCheckLoopResultAdd.Res>>(
    `/taskmanage/userSubmitRecheckTask`,
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

/** 录入巡检结论（任务完成） */
export namespace ApiCheckLoopResultAdd {
  /** 请求接口 */
  export interface Req {
    description: string;
    /**
     * 安全帽图片地址
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频地址
     */
    helmetVideosPath?: string;
    houseId: number;
    recheckImages: string;
    recheckVideos?: string;
    taskId: number;
  }

  /** 响应接口 */
  export interface Res {}
}
/** 接受任务 */
export async function apiGetTask(
  params: ApiGetTask.Params
): Promise<Api.Res<ApiGetTask.Res>> {
  const res = await defHttp.post<Api.Res<ApiGetTask.Res>>(
    `/taskmanage/userReceiveTask/${params.taskId}`,
    undefined,
    {
      custom: {
        failMessage: true,
        successMessage: true,
      },
    }
  );
  return res;
}

/** 接受任务 */
export namespace ApiGetTask {
  export interface Params {
    taskId: number;
  }
  /** 请求接口 */
  export interface Req {}

  /** 响应接口 */
  export interface Res {}
}

/** 任务转派 */
export async function apiTaskTransfer(
  data: ApiTaskTransfer.Req
): Promise<Api.Res<ApiTaskTransfer.Res>> {
  const res = await defHttp.post<Api.Res<ApiTaskTransfer.Res>>(
    `/taskmanage/userReassignmentTask`,
    data,
    {
      custom: {
        failMessage: true,
        successMessage: true,
        loadingMessage: "请稍候...",
        routerBack: true,
      },
    }
  );
  return res;
}

/** 任务转派 */
export namespace ApiTaskTransfer {
  /** 请求接口 */
  export interface Req {
    receiveUserId: number;
    receiveUserName: string;
    taskId: number;
  }

  /** 响应接口 */
  export interface Res {}
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
  export interface Req {}

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
}

/**增加房屋检测报告 */
export async function apiHouseCheckResultAdd(
  data: ApiHouseCheckResultAdd.Req
): Promise<Api.Res<ApiHouseCheckResultAdd.Res>> {
  const res = await defHttp.post<Api.Res<ApiHouseCheckResultAdd.Res>>(
    "/houseDetectionReport/add",
    data,
    { custom: { successMessage: true, failMessage: true, routerBack: true } }
  );
  return res;
}

/**增加房屋检测报告 */
export namespace ApiHouseCheckResultAdd {
  export interface Req {
    /**任务id */
    taskManageId: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 鉴定依据
     */
    detectionBasis?: string;
    /**
     * 鉴定结论
     */
    detectionConclusion?: string;
    /**
     * 鉴定等级
     */
    detectionLv?: number;
    /**
     * 检测日期
     */
    detectionTime?: Date;
    /**
     * 鉴定类型
     */
    detectionType?: number;
    /**
     * 文件地址
     */
    filePath?: string;
    /**
     * 房屋id
     */
    houseId?: number;
  }
  export interface Res {}
}

/**获取房屋基本信息 */
export async function apiHouseInfoDetail(
  data: ApiHouseInfoDetail.Req
): Promise<Api.Res<ApiHouseInfoDetail.Res>> {
  const res = await defHttp.get<Api.Res<ApiHouseInfoDetail.Res>>(
    "/houseInfo/DetailTaskInfo",
    { params: data }
  );
  return res;
}

/**获取房屋基本信息 */
export namespace ApiHouseInfoDetail {
  export interface Req {
    /**id */
    id: number;
  }
  export interface Res {
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
    /**房屋类别 */
    housingCategory: number;
    /**
     * 雪花Id
     */
    id: number;
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
    safetyLevel: number;
    structureType: number;
    /**
     * 任务详情
     */
    taskDetail?: Taskprocessingrecords[];
    taskmanage?: Taskmanage;
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
    warning?: Warning;
  }

  /**
   * Taskprocessingrecords，任务处理记录
   */
  export interface Taskprocessingrecords {
    /**
     * 附件地址
     */
    attachmentsPath: string;
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
    /**
     * 描述
     */
    description: string;
    /**
     * 安全帽图片地址
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频地址
     */
    helmetVideosPath: string;
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
     * 接收用户id
     */
    receiveUserId: number;
    /**
     * 接收用户姓名
     */
    receiveUserName: string;
    /**
     * 复核任务图片
     */
    recheckImages: string;
    /**
     * 复核任务视频地址
     */
    recheckVideos: string;
    /**
     * 任务描述
     */
    taskDescription: string;
    /**
     * 任务id
     */
    taskManagerId: number;
    /**
     * 任务模式: 个人 抢单
     */
    taskMode: number;
    /**
     * 任务状态
     */
    taskStatus: number;
    /**
     * 任务类型
     */
    taskType: number;
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
   * Taskmanage，任务管理
   */
  export interface Taskmanage {
    /**
     * 市
     */
    city: number;
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
     * 区
     */
    district: number;
    /**
     * 房屋Id
     */
    houseId: number;
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
    province: number;
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
    taskStatus: number;
    /**
     * 任务类型
     */
    taskType: number;
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
     * 告警Id
     */
    warningId: number;
  }

  /**
   * Warning，警告
   */
  export interface Warning {
    /**
     * 地址
     */
    address: string;
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
     * 区
     */
    district: number;
    /**
     * 安全帽图片地址
     */
    helmetImagesPath: string;
    /**
     * 安全帽视频地址
     */
    helmetVideosPath: string;
    /**
     * 房屋id
     */
    houseId: number;
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
     * 经度
     */
    longitude: number;
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
     * 监测高度
     */
    satelliteMonitorHeight: string;
    satelliteSafetyLevel: number;
    status: number;
    /**
     * 拍照详情
     */
    takePictureDetails: string;
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
