import { defaHttp, Api } from "../index";

/**登录 */
export async function apiLogin(
  data: ApiLogin.Req
): Promise<Api.Res<ApiLogin.Res>> {
  const res = await defaHttp.post<Api.Res<ApiLogin.Res>>(
    "/Account/Login",
    data
  );
  return res;
}

/**登录 */
export namespace ApiLogin {
  export interface Res {
    userName: string;
    userToken: string;
  }
  export interface Req {
    UserName: string;
    Password: string;
  }
}
