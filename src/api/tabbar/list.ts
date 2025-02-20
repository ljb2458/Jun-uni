import { defaHttp, Api } from "../index";

/**主机树 */
export async function apiHostTree(): Promise<Api.Res<ApiHostTree.ResItem[]>> {
  const res = await defaHttp.post<Api.Res<ApiHostTree.ResItem[]>>(
    "/Opsweb/hostTree"
  );
  return res;
}

/**主机树 */
export namespace ApiHostTree {
  export interface ResItem {
    dataCenterID: number;
    dataCenterName: string;
    clusters: Cluster[];
  }

  export interface Cluster {
    clusterID: number;
    clusterName: string;
    dataCenterID: number;
    hosts: Host[];
    services: Service[] | null;
  }

  export interface Host {
    status: number;
    firstConnectTime: Date;
    lastConnectTime: Date | null;
    connectAddress: null | string;
    hostID: number;
    hostName: string;
    dataCenterID: number;
    dataCenterName: string;
    clusterID: number;
    clusterName: string;
    serverID: number;
    serverName: null;
    address: null | string;
    innerIP: null;
    allowMode: number;
    remarks: null | string;
    isEnable: boolean;
    allowedOrigin: null;
    refreshTokenLifeTime: number;
    secret: null;
    configContent: null | string;
  }

  export interface Service {
    serviceID: number;
    serviceName: string;
    hostCount: number;
    errorCount: number;
    lastReleaseID: null;
    lastReleaseVersion: null | string;
    lastReleaseTime: null | Date;
  }
}

/**获取主机下的服务 */
export async function apiServiceDeploys(
  data: ApiServiceDeploys.Req
): Promise<Api.Res<ApiServiceDeploys.ResItem[]>> {
  const res = await defaHttp.post<Api.Res<ApiServiceDeploys.ResItem[]>>(
    "/Opsweb/serviceDeploys",
    data,
    {
      custom: {
        errorMessage: true,
      },
    }
  );
  return res;
}

/**获取主机下的服务 */
export namespace ApiServiceDeploys {
  export interface Req {
    DataCenterID: number;
    ClusterID: number;
    HostID: number;
    ServiceTemplateID?: number;
  }
  export interface ResItem {
    deployID: number;
    dataCenterID: number;
    clusterID: number;
    clusterName: string;
    hostID: number;
    hostName: string;
    servicePriority: number;
    serviceName: string;
    serviceRecordID: number;
    serviceVersion: string;
    isActive: boolean;
    reportStatus: number;
    reportTime: null;
    lastServiceRecordID: number;
    lastServiceVersion: string;
    serviceID: number;
    port: number | null;
    deployTime: Date;
    deployStatus: DeployStatus;
    startTime: Date | null;
  }

  export enum DeployStatus {
    None = 0,

    /**准备中*/
    Planned = 1,

    /**开始执行*/
    Deploying = 2,

    /**正在下载程序包*/
    Downloading = 4,

    /**过程状态*/
    Processes = DeployStatus.Planned |
      DeployStatus.Deploying |
      DeployStatus.Downloading,

    /**执行失败*/
    Faulted = 8,

    /**运行中*/
    Running = 16,

    /**已停止*/
    Stoped = 32,

    /**已取消*/
    Canceled = 64,

    /**结果状态*/
    Finishes = DeployStatus.Canceled |
      DeployStatus.Faulted |
      DeployStatus.Running |
      DeployStatus.Stoped,
  }
}
