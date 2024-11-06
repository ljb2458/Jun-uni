/*
 * @Date: 2023-02-19 11:25:25
 * @LastEditTime: 2023-06-14 20:32:27
 * 介绍:
 */

import { launchHttp, Api } from "../index";

/**提币记录 */
export async function apiLaunch(
  data: ApiLaunch.Req
): Promise<Api.Res<ApiLaunch.Res>> {
  const res = await launchHttp.post<Api.Res<ApiLaunch.Res>>(
    "/wechat/launch",
    data
  );
  return res;
}

/**提币记录 */
export namespace ApiLaunch {
  export interface Res {
    apiUrl: string;
    appKey: string;
    appName: string;
    bunchName: string;
    imUrl: string;
    logo: string;
    privacyPolicyTitle: string;
    privacyPolicyUrl: string;
    serverName: string;
    siteUrl: string;
    theme: Theme;
    userAgreementTitle: string;
    userAgreementUrl: string;
  }
  export interface Theme {
    minorColor: string;
    popboxBackImage: string;
    primaryColor: string;
    topbarBackImage: string;
    topbarImage1: string;
    topbarImage2: string;
  }
  export interface Req {
    appVersion: string;
    miniProgram: UniNamespace.MiniProgram;
    systemInfo: UniApp.GetSystemInfoResult;
    referrerInfo: UniApp.ReferrerInfo;
    query: string;
    path: string;
    scene: number;
  }
}
