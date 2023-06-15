/*
 * @Date: 2023-02-18 22:28:47
 * @LastEditTime: 2023-02-22 20:12:06
 * @FilePath: /my-vue3-project/src/types/global/reset.d.ts
 * 介绍:
 */
declare namespace UniNamespace {
  interface RequestSuccessCallbackResult {
    data: any;
  }
}
interface Uni {
  $u: AnyObject;
}
