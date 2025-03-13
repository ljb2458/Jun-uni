/**
 * * 获取资源路径
 * @param path 从src开始键入
 * @returns
 */
export function _import(path: string) {
  return path.replace(/(?:^src|^\/src|^@)/, "");
}
const env = import.meta.env;

/**
 * * 从服务器获取资源路径
 * @param path 服务器上的文件路径
 * @returns
 */
export function importCloud(path: string | undefined) {
  if (!path) return "";
  if (path[0] !== "/") path = "/" + path;
  return env.VITE_STATIC_URL + path;
}
