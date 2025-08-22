export function generateColors() {
  const baseColors = {
    c: [0, 0, 0],
    bg: [255, 255, 255],
    success: [62, 185, 1],
    fail: [255, 51, 51],
    warn: [240, 85, 36],
    primary: [116, 52, 242],
  };
  type Keys = keyof typeof baseColors;

  const lighten = (color: number[], value: number) =>
    color.map((c) => Math.min(255, Math.round(c + value)));

  const darken = (color: number[], value: number) =>
    color.map((c) => Math.max(0, Math.round(c - value)));

  const isDark = (color: number[]) => {
    const [r, g, b] = color;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 127.5;
  };

  // const toColorString = (color: number[]) =>
  //   `rgba(${color.join(",")}, var(--un-text-opacity, 1))`;

  const result: Record<`jun-${Keys}` | `jun-${Keys}-${number}`, any> =
    {} as any;

  for (const [name, color] of Object.entries(baseColors)) {
    const darkMode = isDark(color);
    // result[`jun-${name}`] = toColorString(color);
    result[`jun-${name as Keys}`] = color;

    for (let i = 1; i <= 5; i++) {
      let variant: number[];
      if (darkMode) {
        variant = lighten(color, i * 20);
      } else {
        variant = darken(color, i * 20);
      }
      // result[`jun-${name}-${i}`] = toColorString(variant);
      result[`jun-${name as Keys}-${i}`] = variant;
    }
  }
  return result;
}

export function text(rgb: number[]) {
  return `rgba(${rgb.join(",")},var(--un-text-opacity,1))`;
}
export function bg(rgb: number[]) {
  return `rgba(${rgb.join(",")},var(--un-bg-opacity,1))`;
}
export function border(rgb: number[]) {
  const CSS_VAL = "var(--un-border-opacity,1)";
  return `rgba(${rgb.join(",")},${CSS_VAL})`;
}
