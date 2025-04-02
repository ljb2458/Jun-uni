<cfg lang="json">
{
  "navigationBarTitleText": "级联选择器",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import cnRegionsTree from "./components/cnRegionsTree.json";
import cnRegions from "./components/cnRegions.json";

import { CoCascaderLoadChildrenEnvet } from "@/components/common/CoCascader/CoCascader.vue";
const province_list = computed(() =>
  Object.entries(cnRegions.province_list).map((v) => ({
    value: v[0],
    label: v[1],
  }))
);

async function getNextLevelList(e: CoCascaderLoadChildrenEnvet) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const code = e.item?.value;
  const strCode = String(code);
  const trimmedCode = strCode.replace(/0+$/, "");
  const codeLength = trimmedCode.length;

  // 确定当前层级
  let currentList: Record<number, string>;
  let nextListKey: keyof typeof cnRegions;
  let prefixLength: number;

  if (codeLength <= 2) {
    currentList = cnRegions.province_list;
    nextListKey = "city_list";
    prefixLength = 2;
  } else if (codeLength <= 4) {
    currentList = cnRegions.city_list;
    nextListKey = "county_list";
    prefixLength = 4;
  } else {
    return null; // 区级没有下一级
  }

  // 验证处理后的 code 长度是否符合要求
  if (trimmedCode.length !== prefixLength) return null;

  // 检查当前层级是否存在匹配项
  const hasMatch = Object.keys(currentList).some((k) =>
    k.startsWith(trimmedCode.padEnd(6, "0").substring(0, prefixLength))
  );

  if (!hasMatch) return null;

  // 收集下一级列表
  const nextList = cnRegions[nextListKey];
  const list = Object.entries(nextList).filter(([key]) =>
    key.startsWith(strCode.substring(0, prefixLength))
  );
  return list.map(([k, v]) => ({ label: v, value: k }));
}
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="PD-md">
      <view class="F-S-lg MT-md">基本使用</view>
      <CoCascader
        class="MT-xs B-B1 R-sm flex-A-C flex-J-SB PD-sm"
        :options="cnRegionsTree"
      >
      </CoCascader>

      <view class="F-S-lg MT-md">不展示空提示</view>
      <CoCascader
        class="MT-xs B-B1 R-sm flex-A-C flex-J-SB PD-sm"
        :showEmpty="false"
        :options="cnRegionsTree"
      >
      </CoCascader>

      <view class="F-S-lg MT-md">点击相同项不取消选择</view>
      <CoCascader
        class="MT-xs B-B1 R-sm flex-A-C flex-J-SB PD-sm"
        :deselectable="false"
        :options="cnRegionsTree"
      >
      </CoCascader>
      <view class="F-S-lg MT-md">懒加载</view>
      <CoCascader
        class="MT-xs B-B1 R-sm flex-A-C flex-J-SB PD-sm"
        :deselectable="false"
        :options="province_list"
        :loadChildren="getNextLevelList"
      ></CoCascader>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
