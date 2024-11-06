/*
 * 介绍:函数工具
 */
/**
 * * 函数延迟调用
 * @param callback 回调
 * @param param 参数
 * @param time 延时时间
 * @returns
 */
export function funDelay<T>(
  callback: (...p: any) => T,
  param: any[] = [],
  time: number = 3000
) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(callback(...param)), time);
  });
}
