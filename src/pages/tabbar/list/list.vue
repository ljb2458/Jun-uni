<route lang="json">
{
  "navigationBarTitleText": "组件列表",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { _import } from "@/utils/tools/import";
import { bitsAuth, getBitsArray } from "@/utils/tools/bits";
import router from "@/utils/router";
import { routerCheck } from "@/init";
import { getCurrentRouteInfo } from "@/utils/rewriteUni";

onShow(async () => {
  const verify = await routerCheck(`/${getCurrentRouteInfo()?.path}`, true);
  if (verify === false) return;
  console.log("验证登录，通过");
});

enum ComponentsType {
  /**展示组件 */
  Exhibition = 0b1,
  /**表单组件 */
  Form = 0b10,
  /**数据组件 */
  Data = 0b100,
  /**通知组件 */
  Message = 0b1000,
  /**加强组件 */
  Reinforce = 0b10000,
  /**布局组件 */
  Layout = 0b100000,
}

const tabIndex = ref(0);
const keyword = ref("");

const cellList = computed(() => {
  const result = [
    {
      leftText: "自动正方形 CoAutoSquare",
      type: ComponentsType.Layout,
      async tap() {
        router.push("@/pages/demo/CoAutoSquareDemo.vue");
      },
    },
    {
      leftText: "卡片 CoCard",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCardDemo.vue");
      },
    },
    {
      leftText: "级联选择器 CoCascader",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoCascaderDemo.vue");
      },
    },
    {
      leftText: "单元格 CoCell",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCellDemo.vue");
      },
    },
    {
      leftText: "复选按钮 | 单选按钮 CoCheckBoxBtn",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoCheckBoxBtnDemo.vue");
      },
    },
    {
      leftText: "折叠面板 CoCollapse",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCollapseDemo.vue");
      },
    },
    {
      leftText: "分割线 CoDivider",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoDividerDemo.vue");
      },
    },
    {
      leftText: "下拉菜单 CoDropdown",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoDropdownDemo.vue");
      },
    },
    {
      leftText: "错误 CoError",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoErrorDemo.vue");
      },
    },
    {
      leftText: "宫格布局 CoGrid",
      type: ComponentsType.Layout,
      tap() {
        router.push("@/pages/demo/CoGridDemo.vue");
      },
    },
    {
      leftText: "iconfont图标 CoIcon",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoIconDemo.vue");
      },
    },
    {
      leftText: "列表 CoList",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoListDemo.vue");
      },
    },
    {
      leftText: "列表状态 CoListStatus",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoListStatusDemo.vue");
      },
    },
    {
      leftText: "地图 CoMap",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoMapDemo.vue");
      },
    },
    {
      leftText: "通知栏 CoNotify",
      type: ComponentsType.Message,
      tap() {
        router.push("@/pages/demo/CoNotifyDemo.vue");
      },
    },
    {
      leftText: "页面 CoPageView",
      type:
        ComponentsType.Reinforce |
        ComponentsType.Layout |
        ComponentsType.Message,
      tap() {
        router.push("@/pages/demo/CoPageViewDemo.vue");
      },
    },
    {
      leftText: "自动请求分页列表 CoRequestList",
      type: ComponentsType.Data | ComponentsType.Reinforce,
      tap() {
        router.push("@/pages/demo/CoRequestListDemo.vue");
      },
    },
    {
      leftText: "下拉选择 CoSelect",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoSelectDemo.vue");
      },
    },
    {
      leftText: "排序控件 CoSortControl",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoSortControlDemo.vue");
      },
    },
    {
      leftText: "状态标签 CoStateTag",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoStateTagDemo.vue");
      },
    },
    {
      leftText: "竖状步骤条 CoStepLine",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoStepLineDemo.vue");
      },
    },
    {
      leftText: "粘性布局 CoSticky",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoStickyDemo.vue");
      },
    },
    {
      leftText: "标签页 CoTabsFor",
      type: ComponentsType.Exhibition | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoTabsForDemo.vue");
      },
    },
    {
      leftText: "3D组件 CoThreeJs",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoThreeJsDemo.vue");
      },
    },
    {
      leftText: "视频 CoVideo",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoVideoDemo.vue");
      },
    },
    {
      leftText: "webview CoWebview",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoWebviewDemo.vue");
      },
    },
  ];
  if (!keyword.value) return result;
  return [];
});

const tabsList = computed(() => {
  return [
    {
      label: "全部",
      list: cellList.value,
      value: 0,
    },
    {
      label: "展示",
      value: ComponentsType.Exhibition,
      list: cellList.value.filter((v) =>
        bitsAuth(v.type, ComponentsType.Exhibition)
      ),
    },
    {
      label: "布局",
      value: ComponentsType.Layout,
      list: cellList.value.filter((v) =>
        bitsAuth(v.type, ComponentsType.Layout)
      ),
    },
    {
      label: "表单",
      value: ComponentsType.Form,
      list: cellList.value.filter((v) => bitsAuth(v.type, ComponentsType.Form)),
    },
    {
      label: "数据",
      value: ComponentsType.Data,
      list: cellList.value.filter((v) => bitsAuth(v.type, ComponentsType.Data)),
    },
    {
      label: "通知",
      value: ComponentsType.Message,
      list: cellList.value.filter((v) =>
        bitsAuth(v.type, ComponentsType.Message)
      ),
    },
    {
      label: "加强",
      value: ComponentsType.Reinforce,
      list: cellList.value.filter((v) =>
        bitsAuth(v.type, ComponentsType.Reinforce)
      ),
    },
  ];
});
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="px-sm">
      <CoTabsFor
        v-model="tabIndex"
        :sticky="true"
        sticky-class="bg-jun-bg-1 pb-2.2"
        :options="tabsList.map((v) => ({ ...v, name: v.label + '组件' }))"
        title-scrollable
        :lazy="false"
      >
        <template #title-bottom>
          <GrFilterSearch v-model="keyword" class="mt-2 bg-transparent p-0" />
        </template>
        <template #default="{ option }">
          <view style="min-height: 70vh">
            <CoCell
              @tap="item.tap"
              class="mt-lg text-sm anim-rightToLeft"
              :="item"
              :key="item.leftText"
              v-for="item in option.list"
            >
              <template #right>
                <view class="flex gap-xs">
                  <CoStateTag
                    class="bg-jun-primary c-white rd-9999999px text-xs px-2"
                    v-for="type in getBitsArray(item.type)"
                    :state-orm="tabsList.slice(1)"
                    :value="type"
                    :is-fun="bitsAuth"
                  />
                </view>
              </template>
            </CoCell>
          </view>
        </template>
      </CoTabsFor>
    </view>
  </CoPageView>
</template>

<style lang="scss"></style>
