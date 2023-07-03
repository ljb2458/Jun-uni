/*
 * @Date: 2023-05-17 11:42:53
 * @LastEditTime: 2023-07-03 19:41:20
 * @FilePath: /music-client/src/components/types/index.ts
 * 介绍:
 */
import { Property } from "csstype";

export type ColorTheme = "info" | "primary" | "error" | "warning" | "success";
export type GetPropsType<D extends abstract new (...args: any) => any> =
  InstanceType<D>["$props"];
export type BorderStyle = Property.BorderStyle;
export type JustifyItems = Property.JustifyItems;
export type AlignItems = Property.AlignItems;
export type BoxPosition = "left" | "right" | "top" | "bottom" | "center";
