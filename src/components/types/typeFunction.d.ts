/*
 * @Date: 2023-06-22 23:50:29
 * @LastEditTime: 2023-07-06 14:44:19
 * 介绍:
 */
/**泛型组件出口类型 */
type GenericComponentExports<D extends (...p: any[]) => any> =
  import("vue").ComponentPublicInstance &
    Parameters<NonNullable<NonNullable<ReturnType<D>["__ctx"]>["expose"]>>[0];
type ComponentPropsType<D extends abstract new (...args: any) => any> =
  InstanceType<D>["$props"];
