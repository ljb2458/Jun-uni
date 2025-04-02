<!-- 标签页 -->
<script lang="ts" setup generic="Item extends CoTabsForOptionsItem">
//@ts-ignore
import uvTabs from "@climblee/uv-ui/components/uv-tabs/uv-tabs.vue";
import { unitPercent } from "@/utils/tools/css";
import { queryRect } from "@/utils/rewriteUni";
import { CSSProperties } from "vue";
import dayjs from "dayjs";
import { randomUUID } from "@/utils/tools/generate";
import { useVModel } from "@/hooks/toolsHooks";
import type { StyleValue } from "vue";
import type CoTabsFor from "./CoTabsFor.vue";

export interface CoTabsForOptionsItem extends AnyObject {}
export type CoTabsForInstance = GenericComponentExports<typeof CoTabsFor>;

const props = withDefaults(
  defineProps<{
    /**当前选中的 tab index*/
    modelValue?: StrNumber;
    /**间距 */
    gap?: string;
    /**tabs 配置数据 */
    options: Item[];
    /**开启粘性布局 */
    sticky?: Boolean;
    /**粘性组件的自定义tyle */
    stickyStyle?: StyleValue;
    /**粘性组件的自定义class */
    stickyClass?: any;
    /**距离顶部多少触发粘性布局 */
    stickyTop?: StrNumber;
    /**懒加载 */
    lazy?: boolean;
    //----tabs组件开始---
    /**标题options中的键名 */
    titleKeyName?: string;
    /**标题滑块颜色 */
    titleLineColor?: string;
    /**标题滑块宽度 */
    titleLineWidth?: StrNumber;
    /**标题滑块高度 */
    titleLineHeight?: StrNumber;
    /**标题滑块背景size */
    titleLineBgSize?: "cover" | "contain" | "percentage" | string;
    /**标题item的样式 */
    titleItemStyle?: StyleValue;
    /**标题菜单选中样式 */
    titleActiveStyle?: StyleValue;
    /**标题非选中样式 */
    titleInactiveStyle?: StyleValue;
    /**标题是否可滚动 */
    titleScrollable?: boolean;
    //----tabs组件结束---
  }>(),
  {
    modelValue: 0,
    offsetTop: 0,
    gap: "var(--gap-md)",
    lazy: true,
    titleKeyName: "name",
    titleScrollable: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [v: StrNumber];
}>();

type TabsListItem = Item & { load: boolean; index: number };

const currentIndex = useVModel(props, "modelValue", emit);
const tabsList = ref<Array<TabsListItem>>([]);
watch(
  () => props.options,
  (newValue) => {
    tabsList.value = newValue.map((v, index) => ({
      ...v,
      index,
      load: !props.lazy || index === currentIndex.value,
    }));
  },
  {
    immediate: true,
  }
);
const currentSwiper = computed(() => tabsList.value[+currentIndex.value]);
const contentSwiperItemStyle = reactive<CSSProperties>({
  "--CoTabsFor-x": "0%",
});
const contentItemClass = reactive({
  CoTabsFor_item__transit: false,
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
let CoTabsForId = `CoTabsFor${randomUUID()}`;
/**swiper节点信息 */
let nodeInfo: UniNamespace.NodeInfo;
/**更新CoTabsFor节点信息 */
function updateNodeInfo() {
  queryRect(`#${CoTabsForId}`).then((res) => {
    nodeInfo = res;
  });
}
/**节点宽度 */
function nodeWidth() {
  return nodeInfo.width || uni.upx2px(750);
}
onMounted(() => updateNodeInfo());
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
    swiperToByIndex(+currentIndex.value);
    return;
  }
  if (abandon) return;
  const percent = skewingX / nodeWidth() - +currentIndex.value;
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0) return;
  //*右滑边界限制
  if (isRightTo() && !(+currentIndex.value + 1 < tabsList.value.length)) return;
  //*侧滑超过50px将标签栏设为活动的
  if (Math.abs(skewingX) > 50) state.isStatic = false;
  contentSwiperItemStyle["--CoTabsFor-x"] = unitPercent(percent);
}
/**触摸中断 */
function onTouchcancel(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  abandon = false;
  swiperToByIndex(+currentIndex.value);
}
/**触摸结束 */
function onTouchend(e: TouchEvent) {
  if (abandon) return (abandon = false);
  /**最后一根手指的信息 */
  // const touchPosition = e.changedTouches[0];
  //*左滑边界限制
  if (skewingX > 0 && currentIndex.value == 0)
    return swiperToByIndex(currentIndex.value);
  //*右滑边界限制
  if (isRightTo() && !(+currentIndex.value + 1 < tabsList.value.length)) {
    abandon = false;
    return swiperToByIndex(+currentIndex.value);
  }
  if (
    (getTouchTime() < 500 && isRightTo() && skewingX < -nodeWidth() * 0.15) ||
    (isRightTo() && skewingX < -nodeWidth() * 0.4)
  ) {
    //* 右滑满足
    abandon = false;
    currentIndex.value = +currentIndex.value + 1;
    swiperToByIndex(currentIndex.value);
  } else if (
    (getTouchTime() < 200 && isLeftTo() && skewingX > nodeWidth() * 0.15) ||
    (isLeftTo() && skewingX > nodeWidth() * 0.4)
  ) {
    //*左滑满足
    abandon = false;
    currentIndex.value = +currentIndex.value - 1;
    swiperToByIndex(currentIndex.value);
  } else {
    abandon = false;
    swiperToByIndex(+currentIndex.value);
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
 * @param key 当前Title
 */
function swiperToByTitle(title: StrNumber = currentIndex.value) {
  if (transitTimeout) clearTimeout(transitTimeout);
  for (let k in tabsList.value) {
    if (tabsList.value[k][props.titleKeyName] === title) {
      swiperToByIndex(Number(k));
      break;
    }
  }
}
function swiperToByIndex(index: number) {
  currentIndex.value = index;
  contentItemClass.CoTabsFor_item__transit = true;
  skewingX = 0;
  skewingY = 0;
  startX = 0;
  startY = 0;
  contentSwiperItemStyle["--CoTabsFor-x"] = unitPercent(0 - index);
  //*定时清除过渡
  transitTimeout = setTimeout(() => {
    contentItemClass.CoTabsFor_item__transit = false;
    state.isStatic = true;
  }, 200);
}
defineExpose({
  swiperToByTitle,
  swiperToByIndex,
  updateNodeInfo,
  currentIndex,
  currentSwiper,
});
watch(
  currentIndex,
  (newValue) => {
    tabsList.value[+newValue].load = true;
    swiperToByIndex(+newValue);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <view :style="{ '--gap': gap }" :id="CoTabsForId" class="CoTabsFor">
    <CoSticky
      :disabled="!sticky"
      :style="[stickyStyle]"
      :class="stickyClass"
      class="CoTabsFor_title"
      :offset-top="stickyTop"
    >
      <view class="CoTabsFor_title-top">
        <slot name="title-top"></slot>
      </view>
      <uv-tabs
        class="CoTabsFor_title-content"
        :current="currentIndex"
        :list="tabsList"
        :keyName="(titleKeyName as any)"
        :lineColor="titleLineColor"
        :lineWidth="titleLineWidth"
        :lineHeight="titleLineHeight"
        :lineBgSize="titleLineBgSize"
        :itemStyle="(titleItemStyle as any)"
        :activeStyle="(titleActiveStyle as any)"
        :inactiveStyle="(titleInactiveStyle as any)"
        :scrollable="titleScrollable"
        @change="(e:any) => swiperToByIndex(e.index)"
      >
        <template #left>
          <slot name="title-left"></slot>
        </template>
        <template #right>
          <slot name="title-right"></slot>
        </template>
      </uv-tabs>
      <view class="CoTabsFor_title-bottom">
        <slot name="title-bottom"> </slot>
      </view>
    </CoSticky>
    <!-- 内容部分 -->
    <view
      @touchmove="onTouchmove"
      @touchcancel="onTouchcancel"
      @touchend="onTouchend"
      @touchstart="onTouchstart"
      class="CoTabsFor_item-wrap"
    >
      <view
        :class="{
          ...contentItemClass,
          CoTabsFor_item__hiddle: currentIndex !== tab.index && state.isStatic,
        }"
        :style="{ ...contentSwiperItemStyle }"
        v-for="tab in tabsList"
        :key="tab.key"
        class="CoTabsFor_item"
      >
        <view class="CoTabsFor_item_content">
          <slot
            v-if="tab.load"
            name="default"
            :option="tab"
            :active="currentIndex === tab.index"
          >
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoTabsFor {
  margin: 0 calc(0px - var(--gap));
  .CoTabsFor_title {
    padding-left: var(--gap);
    padding-right: var(--gap);
    // .CoTabsFor_title-top,
    // .CoTabsFor_title-bottom {
    // }
  }

  .CoTabsFor_item-wrap {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    .CoTabsFor_item {
      transform: translateX(var(--CoTabsFor-x));
      flex: 0 0 100%;
      width: 100%;
      .CoTabsFor_item_content {
        margin: 0 var(--gap);
      }
    }
  }
  .CoTabsFor_item__transit {
    transition: all 200ms linear;
    overflow: hidden;
  }
  .CoTabsFor_item__hiddle {
    height: 0 !important;
    overflow: hidden;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
