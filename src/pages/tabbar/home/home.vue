<route lang="json">
{
  "navigationBarTitleText": "首页",
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white",
  "enablePullDownRefresh": true
}
</route>

<script setup lang="ts">
import { _import } from "@/utils/tools/import";
import { onPageScroll } from "@dcloudio/uni-app";
import { RequestList } from "@/components/common/CoRequestList/useRequestList";
import { CoRequestListInstance } from "@/components/common/CoRequestList/CoRequestList.vue";
import { randomUUID } from "@/utils/tools/generate";
import router from "@/utils/router";

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
const swiperArray = [
  {
    url: _import("/src/static/imgs/block/cascader.jpg"),
    title: "级联选择器",
    onTap() {
      router.push("/src/pages/demo/CoCascaderDemo.vue");
    },
  },
  {
    url: _import("/src/static/imgs/block/three.jpg"),
    title: "threejs 3D",
    onTap() {
      router.push("/src/pages/demo/CoThreeJsDemo.vue");
    },
  },
  {
    url: _import("/src/static/imgs/block/echarts.jpg"),
    title: "echarts 图表",
    onTap() {
      router.tabbar("/src/pages/tabbar/me/me.vue");
    },
  },
];
function onClickSwiper({
  item,
}: {
  item: (typeof swiperArray)[0];
  index: number;
}) {
  item.onTap();
}
</script>

<template>
  <CoPageView class="bg-jun-bg-1 pb-lg" :onPageScroll="onPageScroll">
    <view class="mt-sm">
      <wd-swiper
        @click="onClickSwiper"
        class="mt-1"
        value-key="url"
        textKey="title"
        custom-text-class="swiper_text"
        :list="swiperArray"
        previousMargin="48rpx"
        nextMargin="48rpx"
        :indicator="{ type: 'dots' }"
        custom-image-class="rd-lg border-all"
        custom-next-image-class="swiper_next rd-lg  border-all"
        custom-prev-image-class="swiper_prev rd-lg  border-all"
      >
      </wd-swiper>
    </view>
    <view
      class="m-lg border-all b-jun-primary rd-md c-jun-primary bg-jun-primary bg-op-20 p-2.2 indent-2"
    >
      <text class="text-lg indent-0">CoTabsFor 标签页</text>
      <view>该组件编写时还没有 wd-uni 现在更推荐使用 wd-tabs </view>
      <view>
        适用多端的tabs组件，支持自动高度、懒加载、自动吸顶、滑动等功能。
      </view>
    </view>
    <CoTabsFor
      :sticky="true"
      sticky-class="bg-jun-bg-1 pb-2.2"
      :options="tabsList"
      v-model="currTab"
    >
      <template #title-bottom>
        <GrFilterSearch
          @blur="tabsList[currTab].CoRequestListRef?.rerequest()"
          v-model="searchKey"
          class="mt-2 mx-sm bg-transparent p-0"
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
            <view
              class="m-lg border-all b-jun-primary rd-md c-jun-primary bg-jun-primary bg-op-20 p-2.2 indent-2"
            >
              <text class="text-lg">CoRequestList 请求分页列表</text>
              <view>
                自动为您加载分页数据，支持下拉刷新、上拉触底加载、列表状态自动处理、ref
                获取数据等。
              </view>
            </view>
            <view
              class="flex items-center gap-sm text-sm m-lg p-lg bg-jun-bg rd-md anim-rightToLeft"
              v-for="item in list"
              :key="item.random"
            >
              <view class="text-xxl c-jun-primary">
                P<text class="text-sm">{{ item.pageNo }}</text>
              </view>
              <view>
                <view class="font-bold">{{ item.name }}</view>
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
<style lang="scss">
.swiper_next {
  @apply transform-origin-l ml-2;
  transform: scale(0.9);
}
.swiper_prev {
  @apply transform-origin-r mr-2;
  transform: scale(0.9);
}
.swiper_text {
  @apply \!c-jun-c;
}
</style>
