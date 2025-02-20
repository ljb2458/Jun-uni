import { defaHttp, Api } from "../index";

/**获取主机下的服务 */
export async function apiAssignDeploys(
  data: ApiAssignDeploys.ReqItem[]
): Promise<Api.Res<ApiAssignDeploys.Res>> {
  const res = await defaHttp.post<Api.Res<ApiAssignDeploys.Res>>(
    "/Opsweb/AssignDeploys",
    data,
    {
      custom: {
        successMessage: true,
        errorMessage: true,
      },
    }
  );
  return res;
}

/**获取主机下的服务 */
export namespace ApiAssignDeploys {
  export interface ReqItem {
    DataCenterID: number;
    ClusterID: number;
    HostID: number;
    DeployID: number;
    ServiceID: number;
    ServiceRecordID: number;
    DeployType: DeployType;
  }
  export enum DeployType {
    /**
     * 上线/下线已被取消
     */
    None = 0,

    /**
     * (上线) 启动服务 (可能包含下载、更新相关操作)
     */
    Launch = 1,

    /**
     * (下线) 停止服务
     */
    Stop = 2,

    /**
     * 重启：先关闭，再运行
     */
    Restart = 4,
  }

  export interface Res {}
}
