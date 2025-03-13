import { smartHelmetHttp, PagingApi } from "../smartHelmet";
/**获取设备列表 */
export async function apiDeviceList(
  data: ApiDeviceList.Req
): Promise<PagingApi.Res<ApiDeviceList.ResItem[]>> {
  const res = await smartHelmetHttp.post<
    PagingApi.Res<ApiDeviceList.ResItem[]>
  >("/pu/list", data);
  return res;
}

/**获取设备列表 */
export namespace ApiDeviceList {
  export interface ResItem {
    /**
     * 组ID
     */
    id: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 上级组ID
     */
    pid: string;
  }
  export interface Req extends PagingApi.Req {
    /**
     * 过滤条件
     */
    filter?: Filter;
  }
  /**
   * 过滤条件
   */
  export interface Filter {
    /**
     * 模糊匹配设备组名称
     */
    match?: string;
    /**
     * 返回所有上级组(指定pid时无效)
     */
    parent?: boolean;
    /**
     * 上级组ID
     */
    pid?: string;
  }
}
/**设备文件检索 */
export async function apiFileList(
  data: ApiFileList.Req,
  params: ApiFileList.Params
): Promise<PagingApi.Res<ApiFileList.ResItem[]>> {
  const res = await smartHelmetHttp.post<PagingApi.Res<ApiFileList.ResItem[]>>(
    `/pu/recordfile/filter/${params.puid}`,
    data
  );
  return res;
}

/**设备文件检索 */
export namespace ApiFileList {
  export interface Params {
    puid: string;
  }
  export interface ResItem extends AnyObject {
    /**
     * 录像开始时间，Unix时间戳，精确到秒
     */
    beginTime: number;
    /**
     * 录像来源通道号
     */
    channelIndex?: number;
    /**
     * 分类ID
     */
    classID?: number;
    /**
     * 分类名称
     */
    className?: string;
    /**
     * 描述1，精确查找
     */
    desc1?: string;
    /**
     * 描述2，模糊匹配
     */
    desc2?: string;
    /**
     * 录像结束时间，Unix时间戳，精确到秒
     */
    endTime?: number;
    /**
     * 文件哈希(sha256)
     */
    fileHash?: string;
    /**
     * 文件ID， 由NRU生成
     */
    fileID: string;
    /**
     * 服务器上的文件 id
     */
    serverFileId: string;
    /**
     * 文件名
     */
    fileName?: string;
    /**
     * 存储全路径
     */
    filePath: string;
    /**
     * 文件大小(单位byte)
     */
    fileSize: number;
    /**
     * 文件类型
     */
    fileType: FileType;
    /**
     * 文件入库时间，Unix时间戳，精确到秒
     */
    insertTime: number;
    /**
     * 纬度，北纬是正值，南纬是负值,单位:度
     */
    lat?: number;
    /**
     * 经度，东经是正值，西经负值,单位:度
     */
    lng?: number;
    /**
     * 录像原因
     */
    recordReason?: RecordReason;
  }

  export interface Req extends PagingApi.Req {
    /**
     * 过滤条件
     */
    filter?: Filter;
  }
  /**
   * 过滤条件
   */
  export interface Filter {
    /**
     * 开始时间，Unix时间戳，精确到秒
     */
    beginTime: number;
    /**
     * 通道号，-1：不作为索引条件
     */
    channelIndex?: number;
    /**
     * 描述1 精确查找
     */
    desc1?: string;
    /**
     * 描述2 模糊匹配
     */
    desc2?: string;
    /**
     * 结束时间，Unix时间戳，精确到秒
     */
    endTime: number;
    /**
     * 文件类型
     */
    fileType?: FileType[];
    /**
     * 模糊匹配，包括puID,userID,文件名
     */
    match?: string;
    /**
     * 设备ID
     */
    puID: string;
    /**
     * 录像原因
     */
    recordReason?: RecordReason[];
    /**
     * 用户ID
     */
    userID?: string;
  }

  export enum FileType {
    Audio = "audio",
    Firmware = "firmware",
    Gps = "gps",
    Image = "image",
    Log = "log",
    Video = "video",
  }

  export enum RecordReason {
    Alarm = "alarm",
    Auto = "auto",
    Call = "call",
    Download = "download",
    Manual = "manual",
    Time = "time",
    Upload = "upload",
  }
}
