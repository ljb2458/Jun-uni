export function unitPx(pixel: string | undefined | number): string {
  return (pixel || 0) + "px";
}
export function unitRem(pixel: string | undefined | number): string {
  return (pixel || 0) + "rem";
}
export function unitVw(pixel: string | undefined | number): string {
  return (pixel || 0) + "vw";
}
export function unitVh(pixel: string | undefined | number): string {
  return (pixel || 0) + "vh";
}
export function unitVmax(pixel: string | undefined | number): string {
  return (pixel || 0) + "vmax";
}
export function unitVmin(pixel: string | undefined | number): string {
  return (pixel || 0) + "Vmin";
}
export function unitPercent(pixel: string | undefined | number): string {
  return Number(pixel || 0) * 100 + "%";
}

/**
 * 转换为rgba颜色
 * @param color 十六进制、rgb 或 rgba 颜色
 * @param diaphaneity 透明度（0到1之间的数值），如果颜色本身包含透明度，则优先级低于此参数
 */
export function toRgba(color: string, diaphaneity?: number): string {
  // 归一化处理颜色
  let r: number,
    g: number,
    b: number,
    a: number = diaphaneity !== undefined ? diaphaneity : 1;

  if (color[0] === "#") {
    // 处理十六进制颜色
    const hex = color.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      // 处理简写的十六进制颜色（如 #fff 或 #ffff）
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      if (hex.length === 4) {
        a = parseInt(hex[3] + hex[3], 16) / 255;
      }
    } else if (hex.length === 6 || hex.length === 8) {
      // 处理完整的十六进制颜色（如 #ffffff 或 #ffffff88）
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      if (hex.length === 8) {
        a = parseInt(hex.slice(6, 8), 16) / 255;
      }
    } else {
      throw new Error("Invalid hexadecimal color format");
    }
  } else if (color.startsWith("rgb")) {
    // 处理RGB或RGBA颜色
    const rgbaValues = color.match(/[\d.]+/g);
    if (rgbaValues && (rgbaValues.length === 3 || rgbaValues.length === 4)) {
      r = parseInt(rgbaValues[0]);
      g = parseInt(rgbaValues[1]);
      b = parseInt(rgbaValues[2]);
      if (rgbaValues.length === 4) {
        a = parseFloat(rgbaValues[3]);
      }
    } else {
      throw new Error("Invalid RGB/RGBA color format");
    }
  } else {
    throw new Error("Invalid color format");
  }

  // 确保透明度在0到1之间
  if (a < 0 || a > 1) {
    throw new Error("Alpha value must be between 0 and 1");
  }

  // 如果传入了diaphaneity参数，则覆盖颜色本身的透明度
  if (diaphaneity !== undefined) {
    a = diaphaneity;
  }

  // 返回RGBA颜色
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
