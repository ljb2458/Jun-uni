import { presetUni } from "@uni-helper/unocss-preset-uni";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
  Rule,
} from "unocss";
import { generateColors, text, bg, border } from "./config/cssVar";

function generateColorRules() {
  const colorMap = generateColors();
  const rules: Rule[] = [];
  Object.entries(colorMap).forEach(([key, value]) => {
    rules.push(
      [
        new RegExp(`^(c|text|color)-${key}$`),
        () => {
          return {
            color: text(value),
          };
        },
      ],
      [
        new RegExp(`^bg-${key}$`),
        () => {
          return {
            "background-color": bg(value),
          };
        },
      ],
      [
        new RegExp(`^(b|border)(-([tblrxy]))?-${key}$`),
        (match) => {
          const direction = match[3];
          if (!direction) {
            return {
              "border-color": border(value),
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
          const CSS_VAL = "var(--un-border-opacity,1)";
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
