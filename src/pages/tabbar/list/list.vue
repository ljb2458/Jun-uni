<cfg lang="json">
{
  "navigationBarTitleText": "组件列表",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": false
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { _import } from "@/utils/tools/import";
import { bitsAuth } from "@/utils/tools/bits";
import router from "@/utils/router";

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
      tap() {
        router.push("@/pages/demo/CoAutoSquare.vue");
      },
    },
    {
      leftText: "卡片 CoCard",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCard.vue");
      },
    },
    {
      leftText: "级联选择器 CoCascader",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoCascader.vue");
      },
    },
    {
      leftText: "单元格 CoCell",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCell.vue");
      },
    },
    {
      leftText: "复选按钮 | 单选按钮 CoCheckBoxBtn",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoCheckBoxBtn.vue");
      },
    },
    {
      leftText: "折叠面板 CoCollapse",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoCollapse.vue");
      },
    },
    {
      leftText: "分割线 CoDivider",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoDivider.vue");
      },
    },
    {
      leftText: "下拉菜单 CoDropdown",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoDropdown.vue");
      },
    },
    {
      leftText: "错误 CoError",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoError.vue");
      },
    },
    {
      leftText: "宫格布局 CoGrid",
      type: ComponentsType.Layout,
      tap() {
        router.push("@/pages/demo/CoGrid.vue");
      },
    },
    {
      leftText: "iconfont图标 CoIcon",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoIcon.vue");
      },
    },
    {
      leftText: "列表 CoList",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoList.vue");
      },
    },
    {
      leftText: "列表状态 CoListStatus",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoListStatus.vue");
      },
    },
    {
      leftText: "地图 CoMap",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoMap.vue");
      },
    },
    {
      leftText: "通知栏 CoNotify",
      type: ComponentsType.Message,
      tap() {
        router.push("@/pages/demo/CoNotify.vue");
      },
    },
    {
      leftText: "页面 CoPageView",
      type:
        ComponentsType.Reinforce |
        ComponentsType.Layout |
        ComponentsType.Message,
      tap() {
        router.push("@/pages/demo/CoPageView.vue");
      },
    },
    {
      leftText: "自动请求分页列表 CoRequestList",
      type: ComponentsType.Data | ComponentsType.Reinforce,
      tap() {
        router.push("@/pages/demo/CoRequestList.vue");
      },
    },
    {
      leftText: "下拉选择 CoSelect",
      type: ComponentsType.Form,
      tap() {
        router.push("@/pages/demo/CoSelect.vue");
      },
    },
    {
      leftText: "排序控件 CoSortControl",
      type: ComponentsType.Data,
      tap() {
        router.push("@/pages/demo/CoSortControl.vue");
      },
    },
    {
      leftText: "状态标签 CoStateTag",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoStateTag.vue");
      },
    },
    {
      leftText: "竖状步骤条 CoStepLine",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoStepLine.vue");
      },
    },
    {
      leftText: "粘性布局 CoSticky",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoSticky.vue");
      },
    },
    {
      leftText: "标签页 CoTabsFor",
      type: ComponentsType.Exhibition | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoTabsFor.vue");
      },
    },
    {
      leftText: "3D组件 CoThreeJs",
      type: ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoThreeJs.vue");
      },
    },
    {
      leftText: "视频 CoVideo",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoVideo.vue");
      },
    },
    {
      leftText: "webview CoWebview",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
      tap() {
        router.push("@/pages/demo/CoWebview.vue");
      },
    },
  ];
  if (!keyword) return result;
  return result.filter((v) =>
    new RegExp(keyword.value.toLocaleLowerCase()).test(
      v.leftText.toLocaleLowerCase()
    )
  );
});

const tabsList = computed(() => [
  {
    name: "全部组件",
    list: cellList.value,
  },
  {
    name: "展示组件",
    list: cellList.value.filter((v) =>
      bitsAuth(v.type, ComponentsType.Exhibition)
    ),
  },
  {
    name: "表单组件",
    list: cellList.value.filter((v) => bitsAuth(v.type, ComponentsType.Form)),
  },
  {
    name: "数据组件",
    list: cellList.value.filter((v) => bitsAuth(v.type, ComponentsType.Data)),
  },
  {
    name: "通知组件",
    list: cellList.value.filter((v) =>
      bitsAuth(v.type, ComponentsType.Message)
    ),
  },
  {
    name: "加强组件",
    list: cellList.value.filter((v) =>
      bitsAuth(v.type, ComponentsType.Reinforce)
    ),
  },
]);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="P-row-md">
      <CoTabsFor
        v-model="tabIndex"
        :sticky="true"
        sticky-class="B-B2 PB-sm"
        :options="tabsList"
        title-scrollable
        :lazy="false"
      >
        <template #title-bottom>
          <GrFilterSearch
            v-model="keyword"
            class="MT-xs B-none PD-0"
            bg="var(--C-white)"
          />
        </template>
        <template #default="{ option }">
          <view style="min-height: 70vh">
            <CoCell
              @tap="item.tap"
              class="MT-md F-S-sm anim-rightToLeft"
              :="item"
              :key="item.leftText"
              v-for="item in option.list"
            >
            </CoCell>
          </view>
        </template>
      </CoTabsFor>
    </view>
  </CoPageView>
</template>

<style lang="scss"></style>
