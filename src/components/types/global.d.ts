/*
 * @Date: 2023-06-22 23:50:29
 * @LastEditTime: 2023-06-22 23:50:40
 * 介绍:
 */
type GenericComponentExports<D extends (...p: any[]) => any> = Parameters<
  NonNullable<NonNullable<ReturnType<D>["__ctx"]>["expose"]>
>[0];
