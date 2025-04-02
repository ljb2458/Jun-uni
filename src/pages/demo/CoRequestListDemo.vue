<cfg lang="json">
{
  "navigationBarTitleText": "自动请求分页列表",
  "enablePullDownRefresh": true,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import { RequestList } from "@/components/common/CoRequestList/useRequestList";
import { CoRequestListInstance } from "@/components/common/CoRequestList/CoRequestList.vue";
import { randomUUID } from "@/utils/tools/generate";

interface ApiResItem {
  pageNo: number;
  random: string;
}

const searchKey = ref("");
const CoRequestListRef = ref<CoRequestListInstance<typeof api>>();

async function api(pageNo: number): Promise<RequestList.Res<ApiResItem[]>> {
  const list: ApiResItem[] = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      pageNo,
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
    <CoRequestList ref="CoRequestListRef" :api="api">
      <template #default="{ list }">
        <view class="MG-md MB-0">
          <view class="F-S-lg">CoRequestList</view>
          <view class="PD-sm">
            自动为您加载分页数据，支持下拉刷新、上拉触底加载、列表状态自动处理、ref
            获取数据等。
          </view>
        </view>
        <CoSticky>
          <uv-search
            class="B-B1 R-sm PD-sm"
            v-model="searchKey"
            :inputAlign="'left'"
            @search="CoRequestListRef?.reload"
            @custom="CoRequestListRef?.reload"
          />
        </CoSticky>
        <view
          class="flex-A-C gap-sm F-S-sm MG-md PD-md B-B1 R-sm anim-rightToLeft"
          v-for="item in list"
          :key="item.random"
        >
          <view class="F-S-xxl C-M1">
            P<text class="F-S-sm">{{ item.pageNo }}</text>
          </view>
          <view>
            <view class="T-break">{{ item.random }}</view>
          </view>
        </view>
      </template>
    </CoRequestList>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
