import { presetUni } from "@uni-helper/unocss-preset-uni";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  Rule,
} from "unocss";

function generateColors() {
  const baseColors = {
    c: [0, 0, 0],
    bg: [255, 255, 255],
    success: [62, 185, 1],
    fail: [255, 51, 51],
    warn: [240, 85, 36],
    primary: [116, 52, 242],
  };

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

  const result: Record<string, any> = {};

  for (const [name, color] of Object.entries(baseColors)) {
    const darkMode = isDark(color);
    // result[`jun-${name}`] = toColorString(color);
    result[`jun-${name}`] = color;

    for (let i = 1; i <= 5; i++) {
      let variant: number[];
      if (darkMode) {
        variant = lighten(color, i * 20);
      } else {
        variant = darken(color, i * 20);
      }
      // result[`jun-${name}-${i}`] = toColorString(variant);
      result[`jun-${name}-${i}`] = variant;
    }
  }
  return result;
}

function generateColorRules() {
  const colorMap = generateColors();
  const rules: Rule[] = [];
  Object.entries(colorMap).forEach(([key, value]) => {
    rules.push(
      [
        new RegExp(`^(c|text|color)-${key}$`),
        () => {
          return {
            color: `rgba(${value.join(",")},var(--un-text-opacity,1))`,
          };
        },
      ],
      [
        new RegExp(`^bg-${key}$`),
        () => {
          return {
            "background-color": `rgba(${value.join(
              ","
            )},var(--un-bg-opacity,1))`,
          };
        },
      ],
      [
        new RegExp(`^(b|border)(-([tblrxy]))?-${key}$`),
        (match) => {
          const direction = match[3];
          const CSS_VAL = "var(--un-border-opacity,1)";
          if (!direction) {
            return {
              "border-color": `rgba(${value.join(",")},${CSS_VAL})`,
            };
          }
          const directions: Record<string, string[]> = {
            t: ["top"],
            b: ["bottom"],
            l: ["left"],
            r: ["right"],
            x: ["left", "right"],
            y: ["top", "bottom"],
          };
          const keys = directions[direction];
          return keys.map((key) => {
            const cssVal = `var(--un-border-${key}-opacity,${CSS_VAL})`;
            return {
              [`border-${key}-color`]: `rgba(${value.join(",")},${cssVal})`,
            };
          });
        },
      ]
    );
  });
  return rules;
}
function generateBorderRules() {
  const borderRules = [
    { key: "all", property: "border" },
    { key: "top", property: "border-top" },
    { key: "right", property: "border-right" },
    { key: "bottom", property: "border-bottom" },
    { key: "left", property: "border-left" } as const,
  ];
  return borderRules.map<[string, any]>(({ key, property }) => [
    `border-${key}`,
    { [property]: "1px solid #88888888" },
  ]);
}

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  //使用 theme 总是导致莫名的bug，将 generateColors 转为 rules 配置
  // theme: {
  //   colors: generateColors(),
  // },
  shortcuts: {
    active: "cursor-pointer active:(filter brightness-90 invert-5 bg-jun-bg)",
    "z-max": "z-99999999999999999",
    "rd-max": "rd-99999999999999999",
  },
  rules: [
    ...generateColorRules(),
    ...generateBorderRules(),
    [
      /^text-overflow-(\d+)$/,
      ([_, d]) => {
        return {
          display: "-webkit-box",
          "-webkit-line-clamp": d,
          "line-clamp": d,
          "-webkit-box-orient": "vertical",
          "box-orient": "vertical",
          overflow: "hidden",
          "text-overflow": "ellipsis",
          "word-break": "break-all",
          "white-space": "break-spaces",
        };
      },
    ],
  ],
  safelist: ["text-jun-primary"],
  presets: [presetUni()],
});
