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
import { randomUUID } from "@/utils/tools/generate";

const tabsList = reactive([
  {
    name: "选项卡1",
    CoRequestListRef: defineType<CoRequestListInstance<typeof api>>(),
  },
  {
    name: "选项卡2",
    CoRequestListRef: defineType<CoRequestListInstance<typeof api>>(),
  },
]);
const currTab = ref(0);
const searchKey = ref("");

interface ApiResItem {
  pageNo: number;
  name: string;
  random: string;
}

async function api(
  pageNo: number,
  { name }: { name: string }
): Promise<RequestList.Res<ApiResItem[]>> {
  console.log(`加载了${name}的数据`);
  const list: ApiResItem[] = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      pageNo,
      name,
      random: randomUUID(),
    });
  }
  await new Promise((reslove) => setTimeout(reslove, 1000));
  return {
    isEnd: false,
    isSuccess: true,
    list: list.filter((v) => new RegExp(searchKey.value).test(v.random)),
    message: "success",
  };
}
</script>

<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="MG-md border-all PD-sm">
      <text class="F-S-lg">CoTabsFor</text>
      <view>
        适用多端的tabs组件，支持自动高度、懒加载、自动吸顶、滑动等功能。
      </view>
    </view>
    <CoTabsFor
      :sticky="true"
      sticky-class="B-B2 PB-sm"
      :options="tabsList"
      v-model="currTab"
    >
      <template #title-bottom>
        <GrFilterSearch
          @blur="tabsList[currTab].CoRequestListRef?.rerequest()"
          v-model="searchKey"
          class="MT-xs MG-row-md B-none PD-0"
          bg="var(--C-white)"
          v-model:select-value="currTab"
          :selections="tabsList.map((v, i) => ({ label: v.name, value: i }))"
        />
      </template>
      <template #default="{ option }">
        <CoRequestList
          :_ref="(e:any)=>tabsList[currTab].CoRequestListRef = e"
          :param="{ name: option.name }"
          :api="api"
        >
          <template #default="{ list }">
            <view class="MG-md border-all PD-sm">
              <text class="F-S-lg">CoRequestList</text>
              <view>
                自动为您加载分页数据，支持下拉刷新、上拉触底加载、列表状态自动处理、ref
                获取数据等。
              </view>
            </view>
            <view
              class="flex-A-C gap-sm F-S-sm MG-md PD-md B-B1 R-sm anim-rightToLeft"
              v-for="item in list"
              :key="item.random"
            >
              <view class="F-S-xxl C-M1">
                P<text class="F-S-sm">{{ item.pageNo }}</text>
              </view>
              <view>
                <view class="T-strong">{{ item.name }}</view>
                <view class="T-break">{{ item.random }}</view>
              </view>
            </view>
          </template>
        </CoRequestList>
      </template>
    </CoTabsFor>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
