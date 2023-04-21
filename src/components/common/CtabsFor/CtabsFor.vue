<!--
 * @Date: 2023-02-28 21:36:43
 * @LastEditTime: 2023-04-21 15:16:59
 * @FilePath: /music-client/src/components/common/CtabsFor/CtabsFor.vue
 * 介绍:
-->
<script lang="ts" setup>
import { unitPercent } from "@@/utils/tools/css";
import { uniGetSystemInfo } from "@@/hooks/rewriteUni";
import { CSSProperties } from "vue";
import dayjs from "dayjs";
import { CtabsForOptions } from "./index";

const props = withDefaults(
  defineProps<{
    /**间距 */
    gap?: string;
    offsetTop?: string;
    sticky?: boolean;
    options: CtabsForOptions;
  }>(),
  {
    sticky: true,
    gap: "var(--gap-md)",
    offsetTop: "calc(var(--gap-md) + var(--window-top))",
  }
);
const tabList: AnyObject[] = [];

function setTab(tab: typeof tabList[0], index: number) {
  swiperTo(index);
}
const currentTab = computed(() => tabList[currentIndex.value]);
const currentIndex = ref(0);

const contentItemStyle = reactive<CSSProperties>({
  "--x": "0%",
});
const contentItemClass = reactive({
  Ctabs_content_item__transit: false,
});
const state = reactive({
  /**是否静止中 */
  isStatic: true,
});
/**起始x */
let startX = 0;
let startY = 0;
/**拖动偏移 */
let skewingX = 0;
let skewingY = 0;
/**开始时间戳 */
let startTime = 0;
/**取消本次滑动? */
let abandon = false;
let boxInfo: UniApp.GetSystemInfoResult;
uniGetSystemInfo().then((res) => (boxInfo = res));

/**触摸开始 */
function onTouchstart(e: TouchEvent) {
  startTime = dayjs().valueOf();
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  startX = touchPosition.clientX;
  startY = touchPosition.clientY;
}
/**触摸移动 */
function onTouchmove(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  skewingX = touchPosition.clientX - startX;
  skewingY = touchPosition.clientY - startY;
  const currTime = getTouchTime();
  if (!(Math.abs(skewingY) < Math.abs(skewingX)) && currTime < 100) {
    abandon = true;
    swiperTo(currentIndex.value);
    return;
  }
  if (abandon) return;
  const percent = skewingX / boxInfo.windowWidth - currentIndex.value;
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0) return;
  //*右滑边界限制
  if (isRightTo() && !(currentIndex.value + 1 < tabList.length)) return;
  state.isStatic = false;
  contentItemStyle["--x"] = unitPercent(percent);
}
/**触摸中断 */
function onTouchcancel(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  abandon = false;
  swiperTo(currentIndex.value);
}
/**触摸结束 */
function onTouchend(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0)
    return swiperTo(currentIndex.value);
  //*右滑边界限制
  if (isRightTo() && !(currentIndex.value + 1 < tabList.length)) {
    abandon = false;
    return swiperTo(currentIndex.value);
  }
  if (
    (getTouchTime() < 500 &&
      isRightTo() &&
      skewingX < -boxInfo.windowWidth * 0.15) ||
    (isRightTo() && skewingX < -boxInfo.windowWidth * 0.4)
  ) {
    //* 右滑满足
    abandon = false;
    swiperTo(++currentIndex.value);
  } else if (
    (getTouchTime() < 200 &&
      isLeftTo() &&
      skewingX > boxInfo.windowWidth * 0.15) ||
    (isLeftTo() && skewingX > boxInfo.windowWidth * 0.4)
  ) {
    //*左滑满足
    abandon = false;
    swiperTo(--currentIndex.value);
  } else {
    abandon = false;
    swiperTo(currentIndex.value);
  }
}
/**给出滑动时间 */
function getTouchTime() {
  return dayjs().valueOf() - startTime;
}
/**是左滑 */
function isRightTo() {
  return skewingX < 0;
}
/**是右滑 */
function isLeftTo() {
  return skewingX > 0;
}
let transitTimeout: NodeJS.Timeout;
/**
 * * 前往swiper页
 * @param index 当前索引数
 */
function swiperTo(index: number = currentIndex.value) {
  if (transitTimeout) clearTimeout(transitTimeout);
  currentIndex.value = index;
  contentItemClass.Ctabs_content_item__transit = true;
  skewingX = 0;
  skewingY = 0;
  startX = 0;
  startY = 0;
  contentItemStyle["--x"] = unitPercent(0 - index);
  //*定时清除过渡
  transitTimeout = setTimeout(() => {
    contentItemClass.Ctabs_content_item__transit = false;
    state.isStatic = true;
  }, 200);
}
</script>

<template>
  <view
    :style="{ '--gap': props.gap, '--offsetTop': props.offsetTop }"
    class="Ctabs"
  >
    <!-- tabs标题部分 -->
    <view
      class="Ctabs_title auto-ML-sm"
      :class="{ Ctabs_title__sticky: props.sticky }"
    >
      <template
        v-for="(tab, index) in tabList"
        :key="getTabKey(tab, index) || index"
      >
        <view @click="setTab(tab, index)" class="Ctabs_title_item">
          <!-- props标题 -->
          <text v-if="tab.props?.title">{{ tab.props.title }}</text>
          <!-- slot标题 -->
          <component
            v-else
            :is="tab.children.title"
            :active="currentTab === tab"
          >
          </component>
        </view>
      </template>
    </view>

    <!-- tabs内容部分 -->
    <view
      @touchmove="onTouchmove"
      @touchcancel="onTouchcancel"
      @touchend="onTouchend"
      @touchstart="onTouchstart"
      class="Ctabs_content"
    >
      <view
        :class="{
          ...contentItemClass,
          Ctabs_content_item__hiddle: currentTab !== tab && state.isStatic,
        }"
        :style="{ ...contentItemStyle }"
        v-for="tab in tabList"
        class="Ctabs_content_item"
      >
        <component :is="tab" :active="currentTab === tab"> </component>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.Ctabs {
  margin: 0 calc(0px - var(--gap));
  padding: 0 var(--gap);
  .Ctabs_title {
    display: flex;
    align-items: center;
    background-color: var(--C-O2);
    padding: 0.2em var(--gap-sm);
    border-radius: 6px;
  }
  .Ctabs_title__sticky {
    position: sticky;
    top: var(--offsetTop);
  }
  .Ctabs_content {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    .Ctabs_content_item {
      transform: translateX(var(--x));
      flex: 0 0 100%;
      width: 100%;
    }
  }
  .Ctabs_content_item__transit {
    transition: all 200ms linear;
    overflow: hidden;
  }
  .Ctabs_content_item__hiddle {
    height: 0;
  }
}
</style>
