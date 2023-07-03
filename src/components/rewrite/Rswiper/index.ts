/*
 * @Date: 2023-06-13 19:26:57
 * @LastEditTime: 2023-07-03 18:27:00
 * 介绍:
 */
export interface _ListItem extends AnyObject {
  url?: string;
  title?: string;
  poster?: string;
  type?: "video" | "image";
}
export type ListItem = _ListItem | string;
