<route lang="json">
{
  "navigationBarTitleText": "自动请求分页列表",
  "enablePullDownRefresh": true,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

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
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <CoRequestList ref="CoRequestListRef" :api="api">
      <template #default="{ list }">
        <view class="m-lg mb-0">
          <view class="text-lg">CoRequestList</view>
          <view class="p-2.2">
            自动为您加载分页数据，支持下拉刷新、上拉触底加载、列表状态自动处理、ref
            获取数据等。
          </view>
          <view class="p-2.2">
            将页面配置的 enablePullDownRefresh 设为 true
            页面中可见的列表将会在下拉刷新被触发后重新加载。 你也可以调用
            ref.reload 或 ref.rerequest 方法重新加载。如果有需要，你也可以通过
            ref.list 获取列表数据并直接修改或替换
          </view>
          <view class="p-2.2">
            将页面配置的 enablePullDownRefresh 设为 true
            页面中可见的列表将会在下拉刷新被触发后重新加载。
            你也可以调用列表身上的 reload 或 rerequest 方法重新加载
          </view>
        </view>
        <CoSticky>
          <uv-search
            class="bg-jun-bg rd-md p-2.2"
            v-model="searchKey"
            :inputAlign="'left'"
            @search="CoRequestListRef?.reload"
            @custom="CoRequestListRef?.reload"
          />
        </CoSticky>
        <view
          class="flex items-center gap-sm text-sm m-lg p-lg bg-jun-bg rd-md anim-rightToLeft"
          v-for="item in list"
          :key="item.random"
        >
          <view class="text-xxl c-jun-primary">
            P<text class="text-sm">{{ item.pageNo }}</text>
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
