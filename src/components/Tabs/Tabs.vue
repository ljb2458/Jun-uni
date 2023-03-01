<!--
 * @Date: 2023-02-28 21:36:43
 * @LastEditTime: 2023-03-02 00:23:25
 * @FilePath: /my-vue3-project/src/components/Tabs/Tabs.vue
 * 介绍:
-->
<script lang="ts" setup>
import TabsItem from "./TabsItem.vue";
import { unitPercent } from "@@/utils/tools";
import { uniGetSystemInfo } from "@@/hooks/rewriteUni";
import { CSSProperties } from "vue";
const props = withDefaults(
  defineProps<{
    /**间距 */
    gap: string;
    stickyTop: string;
  }>(),
  {
    gap: "var(--gap-l)",
    stickyTop: "calc(var(--gap-l) + var(--window-top))",
  }
);
const tabList: AnyObject[] = [];

const slot = useSlots();
if (slot.default) {
  const temp = slot.default();
  findTabsItem(temp);
}
/**找到tabsItem */
function findTabsItem(childs: AnyObject[]) {
  childs.forEach((child) => {
    if (child.type === TabsItem) {
      tabList.push(child as any);
    } else if (child.children.constructor === Array) {
      findTabsItem(child.children);
    }
  });
}
function getTabKey(tab: typeof tabList[0]) {
  //   console.log(tab);
  return tab.props?.key || tab.props?.title;
}
function setTab(tab: typeof tabList[0], index: number) {
  swiperTo(index);
}
const currentTab = computed(() => tabList[currentIndex.value]);
const currentIndex = ref(0);

const contentItemStyle = reactive<CSSProperties>({
  "--x": "0%",
});
const contentItemClass = reactive({
  Tabs_content_item__transit: false,
});
/**起始x */
let startX = 0;
/**拖动偏移 */
let skewing = 0;
let sysInfo: UniApp.GetSystemInfoResult;
uniGetSystemInfo().then((res) => (sysInfo = res));

/**触摸开始 */
function onTouchstart(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  startX = touchPosition.clientX;
}
/**触摸移动 */
function onTouchmove(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  skewing = touchPosition.clientX - startX;
  const percent = skewing / sysInfo.windowWidth - currentIndex.value;
  //*左滑边界限制
  if (skewing > 0 && currentIndex.value == 0) return;
  //*右滑边界限制
  if (skewing < 0 && !(currentIndex.value + 1 < tabList.length)) return;
  contentItemStyle["--x"] = unitPercent(percent);
}
/**触摸中断 */
function onTouchcancel(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  swiperTo(currentIndex.value);
}
/**触摸结束 */
function onTouchend(e: TouchEvent) {
  /**最后一根手指的信息 */
  const touchPosition = e.changedTouches[0];
  //*左滑边界限制
  if (skewing > 0 && currentIndex.value == 0)
    return swiperTo(currentIndex.value);
  //*右滑边界限制
  if (skewing < 0 && !(currentIndex.value + 1 < tabList.length))
    return swiperTo(currentIndex.value);
  if (skewing < 0 && skewing < -sysInfo.windowWidth * 0.2) {
    //* 右滑满足
    swiperTo(++currentIndex.value);
  } else if (skewing > 0 && skewing > sysInfo.windowWidth * 0.2) {
    //*左滑满足
    swiperTo(--currentIndex.value);
  } else {
    swiperTo(currentIndex.value);
  }
}
let transitTimeout: NodeJS.Timeout;
/**
 * * 前往swiper页
 * @param index 当前索引数
 */
function swiperTo(index: number) {
  if (transitTimeout) clearTimeout(transitTimeout);
  currentIndex.value = index;
  contentItemClass.Tabs_content_item__transit = true;
  skewing = 0;
  contentItemStyle["--x"] = unitPercent(0 - index);
  //*定时清除过渡
  transitTimeout = setTimeout(
    () => (contentItemClass.Tabs_content_item__transit = false),
    200
  );
}
</script>

<template>
  <view
    :style="{ '--gap': props.gap, '--stickyTop': props.stickyTop }"
    class="Tabs"
  >
    <!-- tabs标题部分 -->
    <view class="Tabs_title auto-ml-m">
      <template
        v-for="(tab, index) in tabList"
        :key="getTabKey(tab, index) || index"
      >
        <view @click="setTab(tab, index)" class="Tabs_title_item">
          <!-- props标题 -->
          <text v-if="tab.props?.title">{{ tab.props.title }}</text>
          <!-- slot标题 -->
          <component
            v-else
            :is="tab.children.title"
            :active="currentTab == tab"
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
      class="Tabs_content"
    >
      <view
        :class="{ ...contentItemClass }"
        :style="{ ...contentItemStyle }"
        v-for="tab in tabList"
        class="Tabs_content_item"
      >
        <component :is="tab"> </component>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.Tabs {
  margin: 0 calc(0px - var(--gap));
  padding: 0 var(--gap);
  .Tabs_title {
    position: sticky;
    top: var(--stickyTop);
    display: flex;
    align-items: center;
    background-color: var(--C-O2);
    padding: 0.2em var(--gap-m);
    border-radius: 6px;
  }
  .Tabs_content {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    .Tabs_content_item {
      transform: translateX(var(--x));
      flex: 0 0 100%;
      width: 100%;
    }
  }
  .Tabs_content_item__transit {
    transition: all 200ms linear;
  }
}
</style>
