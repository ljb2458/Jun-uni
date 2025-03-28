<cfg lang="json">
{
  "navigationBarTitleText": "首页",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": true
}
</cfg>

<script setup lang="ts">
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";
import { RequestList } from "@/components/common/CoRequestList/useRequestList";
import { CoRequestListInstance } from "@/components/common/CoRequestList/CoRequestList.vue";

const tabsList = reactive([
  {
    name: "tabs1",
  },
  {
    name: "tabs2",
  },
]);
const currTab = ref(0);
const searchKey = ref("");

async function api(
  pageNo: number,
  e: { name: string }
): Promise<RequestList.Res<string[]>> {
  console.log(`加载了${e.name}的数据`);
  const list: string[] = [];
  for (let i = 0; i < 10; i++) {
    list.push(`name:${e.name}; pageNo:${pageNo};\nrandom:${Math.random()}`);
  }
  return {
    isEnd: false,
    isSuccess: true,
    list,
    message: "success",
  };
}
const CoRequestListRef = ref<CoRequestListInstance<typeof api>>();

const list = computed(() =>
  CoRequestListRef.value?.list.filter((v) =>
    new RegExp(searchKey.value).test(v)
  )
);
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="MG-md border-all">
      <text class="F-S-lg">TabsFor</text>
      <view>
        适用多端的tabs组件，有较好的 TypeScript
        支持，使用成本较低，支持自动高度、懒加载、自动吸顶、滑动等功能。
      </view>
    </view>
    <CoTabsFor
      :sticky="true"
      sticky-class="B-B2"
      :options="tabsList"
      v-model="currTab"
    >
      <template #title-bottom>
        <GrFilterSearch
          v-model="searchKey"
          class="MT-xs M-row-md B-none PD-0"
          bg="var(--C-white)"
          v-model:select-value="currTab"
          :selections="tabsList.map((v, i) => ({ label: v.name, value: i }))"
        />
      </template>
      <template #default="{ option }">
        <CoRequestList
          ref="CoRequestListRef"
          :param="{ name: option.name }"
          :api="api"
        >
          <view class="MG-md border-all">
            <text class="F-S-lg">RequestList</text>
            <view>
              自动为您加载分页数据，使用成本极低，有较好的 TypeScript
              支持、支持下拉刷新、上拉触底加载、列表状态自动处理、极好的ts支持等。
            </view>
          </view>
          <view
            class="MG-md PD-md B-B1 R-sm"
            v-for="(item, index) in list"
            :key="index"
          >
            {{ item }}
          </view>
        </CoRequestList>
      </template>
    </CoTabsFor>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
