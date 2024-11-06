/*
 * 介绍:
 */
export function isPhone(phone: string) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone);
}
/**
 * 是非空字符
 * @param str 
 * @returns 
 */
export function isNonNullStr(str: string) {
  return str.replace(/\s*/g, "") !== "";
}

export function isUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(path);
}
