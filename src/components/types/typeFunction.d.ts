/*
 * @Date: 2023-06-22 23:50:29
 * @LastEditTime: 2023-06-24 22:54:13
 * 介绍:
 */
/**泛型组件出口类型 */
type GenericComponentExports<D extends (...p: any[]) => any> =
  import("vue").ComponentPublicInstance &
    Parameters<NonNullable<NonNullable<ReturnType<D>["__ctx"]>["expose"]>>[0];
