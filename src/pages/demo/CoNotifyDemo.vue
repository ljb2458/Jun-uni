<cfg lang="json">
{
  "navigationBarTitleText": "通知栏",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import setNotify from "@/layout/setNotify";
const notify = ref({
  show: false,
  type: "info",
  message: "这是一个提示消息",
  top: "0px",
});

function showNotify(type: string) {
  notify.value.type = type;
  notify.value.message = `这是一个 ${type} 提示`;
  notify.value.show = true;
}
</script>

<template>
  <CoPageView
    class="demoPage B-B2 PB-md"
    :onPageScroll="onPageScroll"
    :useNotify="true"
  >
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本示例</view>
      <view class="PD-md">
        <uv-button @click="showNotify('info')" type="primary" class="MT-sm">
          显示信息提示
        </uv-button>
        <uv-button @click="showNotify('success')" type="success" class="MT-sm">
          显示成功提示
        </uv-button>
        <uv-button @click="showNotify('error')" type="error" class="MT-sm">
          显示错误提示
        </uv-button>
        <uv-button @click="showNotify('warning')" type="warning" class="MT-sm">
          显示警告提示
        </uv-button>
        <uv-button @click="showNotify('primary')" type="primary" class="MT-sm">
          显示主色调提示
        </uv-button>
      </view>

      <view class="MT-md F-S-lg">使用全局提示（推荐）</view>
      <view class="C-T3">
        注册组件 CoPageView 并传入 :useNotify="true" 然后引用 @/layout/setNotify
      </view>
      <view class="PD-md">
        <uv-button
          @click="setNotify.success('全局 notify 提示')"
          type="primary"
          class="MT-sm"
        >
          显示全局 notify 提示
        </uv-button>
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
