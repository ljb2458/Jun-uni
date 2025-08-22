<route lang="json">
{
  "navigationBarTitleText": "通知栏",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import setNotify from "@/layout/notify";
import { ColorTheme } from "@/components/types";
const notify = ref({
  show: false,
  type: defineType<ColorTheme>("info"),
  message: "这是一个提示消息",
  top: "0px",
});

function showNotify(type: ColorTheme) {
  notify.value.type = type;
  notify.value.message = `这是一个 ${type} 提示`;
  notify.value.show = true;
}
</script>

<template>
  <CoPageView
    class="demoPage bg-jun-bg-1 pb-lg"
    :onPageScroll="onPageScroll"
    :useNotify="true"
  >
    <view class="p-lg">
      <view class="mt-lg text-lg">基本示例</view>
      <view class="p-lg">
        <wd-button @click="showNotify('info')" type="primary" class="mt-2.2 w-full">
          显示信息提示
        </wd-button>
        <wd-button @click="showNotify('success')" type="success" class="mt-2.2 w-full">
          显示成功提示
        </wd-button>
        <wd-button @click="showNotify('error')" type="error" class="mt-2.2 w-full">
          显示错误提示
        </wd-button>
        <wd-button @click="showNotify('warning')" type="warning" class="mt-2.2 w-full">
          显示警告提示
        </wd-button>
        <wd-button @click="showNotify('primary')" type="primary" class="mt-2.2 w-full">
          显示主色调提示
        </wd-button>
      </view>

      <view class="mt-lg text-lg">使用全局提示（推荐）</view>
      <view class="c-jun-c-2">
        注册组件 CoPageView 并传入 :useNotify="true" 然后引用 @/layout/setNotify
      </view>
      <view class="p-lg">
        <wd-button
          @click="setNotify.success('全局 notify 提示')"
          type="primary"
          class="mt-2.2 w-full"
        >
          显示全局 notify 提示
        </wd-button>
      </view>
    </view>

    <!-- CoNotify 组件 -->
    <CoNotify
      v-model:show="notify.show"
      :type="notify.type"
      :message="notify.message"
      :top="notify.top"
    />
  </CoPageView>
</template>

<style lang="scss" scoped></style>
