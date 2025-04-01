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
    { leftText: "自动正方形 CoAutoSquare", type: ComponentsType.Layout },
    { leftText: "卡片 CoCard", type: ComponentsType.Exhibition },
    { leftText: "级联选择器 CoCascader", type: ComponentsType.Form },
    { leftText: "单元格 CoCell", type: ComponentsType.Exhibition },
    {
      leftText: "复选按钮 | 单选按钮 CoCheckBoxBtn",
      type: ComponentsType.Form,
    },
    { leftText: "折叠面板 CoCollapse", type: ComponentsType.Exhibition },
    { leftText: "分割线 CoDivider", type: ComponentsType.Exhibition },
    { leftText: "下拉菜单 CoDropdown", type: ComponentsType.Exhibition },
    { leftText: "错误 CoError", type: ComponentsType.Exhibition },
    { leftText: "宫格布局 CoGrid", type: ComponentsType.Layout },
    { leftText: "iconfont图标 CoIcon", type: ComponentsType.Exhibition },
    { leftText: "列表 CoList", type: ComponentsType.Data },
    { leftText: "列表状态 CoListStatus", type: ComponentsType.Data },
    {
      leftText: "地图 CoMap",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
    },
    { leftText: "通知栏 CoNotify", type: ComponentsType.Message },
    {
      leftText: "页面 CoPageView",
      type: ComponentsType.Reinforce | ComponentsType.Layout,
    },
    {
      leftText: "自动请求分页列表 CoRequestList",
      type: ComponentsType.Data | ComponentsType.Reinforce,
    },
    { leftText: "下拉选择 CoSelect", type: ComponentsType.Form },
    { leftText: "排序控件 CoSortControl", type: ComponentsType.Data },
    { leftText: "状态标签 CoStateTag", type: ComponentsType.Exhibition },
    { leftText: "竖状步骤条 CoStepLine", type: ComponentsType.Exhibition },
    { leftText: "粘性布局 CoSticky", type: ComponentsType.Exhibition },
    {
      leftText: "标签页 CoTabsFor",
      type: ComponentsType.Exhibition | ComponentsType.Exhibition,
    },
    { leftText: "3d组件 CoThreeJs", type: ComponentsType.Exhibition },
    {
      leftText: "视频 CoVideo",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
    },
    {
      leftText: "webview",
      type: ComponentsType.Reinforce | ComponentsType.Exhibition,
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
      <CoTabsFor v-model="tabIndex" :options="tabsList" title-scrollable>
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
