
/**
 * * 省略文本
 * @param text 省略文本
 * @param config 省略配置
 */
export function omitText(
  text: string | null | undefined,
  config: [number, string, number] = [6, "...", 4]
) {
  if (!text) return "----";
  if (text.length <= config[0] + config[2]) return text;
  let res = text.slice(0, config[0]);
  res += config[1];
  res += text.slice(text.length - config[2]);
  return res;
}