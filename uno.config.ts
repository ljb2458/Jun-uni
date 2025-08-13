import { presetUni } from "@uni-helper/unocss-preset-uni";
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
function generateColors() {
  const baseColors = {
    c: [0, 0, 0],
    bg: [255, 255, 255],
    success: [62, 185, 1],
    fail: [255, 51, 51],
    warn: [255, 187, 0],
    primary: [0, 120, 212],
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
  const toColorString = (color: number[]) =>
    `rgba(${color.join(",")}, var(--un-text-opacity, 1))`;
  const generateVariants = (baseColor: number[]) => {
    const variants: Record<string, string> = {};
    const darkMode = isDark(baseColor);
    variants["DEFAULT"] = toColorString(baseColor);

    for (let i = 1; i <= 9; i++) {
      let variant: number[];

      if (darkMode) {
        variant = lighten(baseColor, i * 10);
      } else {
        variant = darken(baseColor, i * 10);
      }

      variants[i] = toColorString(variant);
    }
    return variants;
  };

  const result = Object.fromEntries(
    Object.entries(baseColors).map(([name, color]) => [
      name,
      generateVariants(color),
    ])
  );

  return { jun: result };
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
  presets: [
    presetUni({
      attributify: {
        prefixedOnly: true,
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: { ...generateColors() },
  },
  rules: [
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
});
