/*
 * @Date: 2023-02-19 11:25:25
 * @LastEditTime: 2023-06-12 16:43:21
 * @FilePath: /music-client/src/api/module/list.ts
 * 介绍:
 */

import { defaHttp, ApiRes, Paging } from "../index";

/**提币记录 */
export async function apiWithdrawCoinLogs(
  data: Paging.Req
): Promise<ApiRes<Paging.Data<WithdrawCoinLogs.ResItem[]>>> {
  const res = await defaHttp.post<
    ApiRes<Paging.Data<WithdrawCoinLogs.ResItem[]>>
  >("/money/withdraw", { limit: 20, ...data });
  return res;
}

/**提币记录 */
export namespace WithdrawCoinLogs {
  export interface ResItem {
    /**
     * 实际转账金额，示例：1.980000
     */
    actual_number: string;
    /**
     * 币种信息，示例：-
     */
    /**
     * 币种ID，示例：2
     */
    coin_id: number;
    /**
     * 示例：2023-04-08 17:13:17
     */
    created_at: string;
    /**
     * 手续费，示例：0.02
     */
    fee: string;
    /**
     * 示例：2
     */
    id: number;
    /**
     * 提币数量，示例：2.000000
     */
    number: string;
    /**
     * 状态1:成功；2：失败；0区块确认中
     */
    status: number;
    /**
     * 状态 说明，示例：区块确认中
     */
    status_text: string;
    /**
     * 交易标识，示例：null
     */
    txid: string;
  }
}
