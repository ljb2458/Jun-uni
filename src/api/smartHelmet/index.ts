import useUserinfoStore from "@/store/useUserinfoStore";
import { smartHelmetHttp, Api } from "../smartHelmet";
/**获取设备在线状态 */
export async function apiDeviceStatus(
  params: ApiDeviceStatus.Params
): Promise<Api.Res<ApiDeviceStatus.Res>> {
  const res = await smartHelmetHttp.get<Api.Res<ApiDeviceStatus.Res>>(
    `/pu/status/${params.puid}`,
    { custom: { failMessage: true } }
  );
  return res;
}

/**获取设备在线状态 */
export namespace ApiDeviceStatus {
  export interface Params {
    puid: string;
  }
  export interface Res {
    /**
     * 终端地址
     */
    addr?: string;
    /**
     * 开机时间
     */
    bootTime?: number;
    /**
     * 上报或设置的位置
     */
    gps?: Gps;
    /**
     * 设备ID
     */
    id: string;
    /**
     * 上线网络方式
     */
    network?: number;
    /**
     * 上线时间
     */
    onlineTime?: number;
    /**
     * 网络协议
     */
    protocol?: string;
    /**
     * 上线服务器地址
     */
    serverAddr?: string;
    /**
     * 0:不在线，1:在线
     */
    status: number;
    /**
     * 如果是UA设备，用户id
     */
    userid?: string;
    /**
     * 如果是UA设备，用户名称
     */
    userName?: string;
  }

  /**
   * 上报或设置的位置
   */
  export interface Gps {
    /**
     * 维度（WGS84）,单位：度
     */
    lat: number;
    /**
     * 经度（WGS84）,单位：度
     */
    lng: number;
    /**
     * UTC
     */
    time?: number;
  }
  export interface Req {}
}

/**安全帽本地文件下载地址 */
export function apiDeviceFileDownload(params: ApiDeviceFileDownload.Params) {
  const env = import.meta.env;
  const userinfoStore = useUserinfoStore();
  return `${env.VITE_HELMET_API_URL}${"/bvnru/v1"}/pu/download/${params.puid}/${
    params.fileId
  }?token=${userinfoStore.helmetToken}`;
}
/**安全帽本地文件下载地址 */
export namespace ApiDeviceFileDownload {
  export interface Params {
    puid: string;
    fileId: string;
  }
}
/**安全帽云文件下载地址 */
export function apiFileDownload(params: ApiFileDownload.Params) {
  const env = import.meta.env;
  const userinfoStore = useUserinfoStore();
  return `${env.VITE_HELMET_API_URL}${"/bvnru/v1"}/download/${
    params.fileId
  }?token=${userinfoStore.helmetToken}`;
}
/**安全帽云文件下载地址 */
export namespace ApiFileDownload {
  export interface Params {
    fileId: string;
  }
}
