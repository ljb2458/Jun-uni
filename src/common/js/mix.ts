import { _require } from "@@/utils/tools";
export const titleInactiveStyle = `--height: 80rpx;width: 200rpx;text-align: center;height: var(--height);line-height: var(--height);color:var(--C-B1);`;
export const titleActiveStyle = `${titleInactiveStyle}background-image: url(${_require(
  "src/static/images/tabs_title__active.png"
)});background-repeat: no-repeat;background-size: contain;background-position: 50% 50%;`;
