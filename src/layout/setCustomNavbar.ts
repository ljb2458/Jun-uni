import { getSystemInfoCache } from "@/utils/rewriteUni";
import type { CSSProperties } from "vue";
import { unitPx } from "@/utils/tools/css";
export const defaultStyle = reactive<CSSProperties>({});

export function computedDefaultStyle() {
  const { screenWidth } = getSystemInfoCache();
  //#ifndef APP || H5 || MP-LARK
  const info = uni.getMenuButtonBoundingClientRect();
  const top = info.top / 2;
  defaultStyle.paddingTop = unitPx(top);
  defaultStyle.height = unitPx(info.height + top);
  if (screenWidth) defaultStyle.paddingRight = unitPx(screenWidth - info.left);
  else defaultStyle.paddingRight = unitPx(info.width);
  //#endif
}
computedDefaultStyle();
