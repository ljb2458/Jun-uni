/*
 * @Date: 2023-04-03 18:59:36
 * @LastEditTime: 2023-09-14 18:23:27

 * 介绍:时间工具
 */
import { fixedNumber } from "./number";
import dayjs, { Dayjs } from "dayjs";
/**
 * * 统计时间
 * @param day 当前时间
 * @param timeLimit 期限
 */
export function timeStatistics(
  day: string | Date | Dayjs,
  timeLimit: string | Date | Dayjs
) {
  day = dayjs(day);
  timeLimit = dayjs(timeLimit);
  /**相差时间 */
  const diffTime = timeLimit.diff(day, "ms");
  const D = Number(timeLimit.diff(day, "day"));
  /**相差毫秒 */
  const ms = fixedNumber(Math.floor((Math.abs(diffTime) / 10) % 100));
  /**相差秒 */
  const S = fixedNumber(Math.abs(timeLimit.diff(day, "second")));
  const s = fixedNumber(Number(S) % 60);
  /**相差分 */
  const M = fixedNumber(Math.abs(timeLimit.diff(day, "minute")));
  const m = fixedNumber(Number(M) % 60);
  /**相差总小时 */
  const H = fixedNumber(Math.abs(timeLimit.diff(day, "hour")));
  const h = fixedNumber(Number(H) % 24);

  return {
    /**相差时间，不大于1则到期 */
    diffTime,
    /**相差总小时 */
    H,
    /**相差小时 */
    h,
    /**相差分钟 */
    m,
    /**相差总分钟 */
    M,
    /**相差秒 */
    s,
    /**相差总秒 */
    S,
    ms,
    /**相差总天 */
    D,
  };
}
