<route lang="json">
{
  "navigationBarTitleText": "页面",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</route>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import notify from "@/layout/notify";
import actionSheet, { OnSelectEvent } from "@/layout/actionSheet";
import modal from "@/layout/modal";

/**打开模态框 */
function openModal() {
  modal
    .open({
      title: "这是全局 modal 模态框",
      showCancelButton: true,
    })
    .then(() => notify.success(`确认`))
    .catch(() => notify.error(`点击了取消`));
}

/**打开操作菜单 */
function showActionSheet() {
  function onSelect({ item }: OnSelectEvent) {
    console.log(`点击了${item.name}`);
    notify.primary(`点击了${item.name}`);
  }
  actionSheet.open({
    actions: [
      {
        name: "选项1",
        subname: "副标题",
        onSelect,
      },
      {
        name: "选项2",
        onSelect,
      },
      {
        name: "选项3",
        onSelect,
      },
    ],
  });
}
const showBottomView = ref(true);
</script>

<template>
  <CoPageView
    class="bg-jun-bg-1 pb-lg"
    :useCustomNavbar="true"
    :useSafetyBottom="true"
    :useSafetyTop="true"
    :useModal="true"
    :useActionSheet="true"
    :useNotify="true"
    :onPageScroll="onPageScroll"
  >
    <template #fixedBottom="{}">
      <view v-if="showBottomView" class="m-2.2">
        fixedBottom 固定在底部的插槽,该插槽的内容会被额外注册一遍用于占位
        <wd-button
          class="w-full"
          :type="'primary'"
          @tap="notify.primary('点击了底部按钮')"
        >
          底部按钮
        </wd-button>
      </view>
    </template>
    <view class="p-lg">
      <view class="mt-lg text-lg">基本使用</view>
      <view class="c-jun-c-2 p-2.2">
        一般项目根目录下 README.md
        中所提供的代码片段足以满足基本使用。但是你任可以对组件进行更多自定义修改。
      </view>
      <view> useCustomNavbar </view>
      <view class="c-jun-c-2 p-2.2">
        是否使用自定义顶部导航栏，默认为true，在页面配置 navigationStyle 不为
        custom 时设置为 true 无效。
      </view>
      <view> useSafetyTop </view>
      <view class="c-jun-c-2 p-2.2">
        是否使用顶部安全区，默认为true，开启后会在顶部生成一个定高的 view
        进行占位，在页面配置 navigationStyle 不为 custom 时设置为 true 无效。
      </view>
      <view> useSafetyBottom </view>
      <view class="c-jun-c-2 p-2.2">
        是否使用底部安全区，默认为true，开启后会在底部生成一个定高的 view
        进行占位
      </view>
      <view> onPageScroll </view>
      <view class="c-jun-c-2 p-2.2">
        请传入该方法，内部使用该方法监听滚动条，从而设置顶部导航栏，后续可能继续扩展
      </view>
      <view> bgImg </view>
      <view class="c-jun-c-2 p-2.2">
        在小程序中背景图使用受限，使用该 props 定义背景图，背景图 image 的
        z-index 为 -1，因此，使用该属性时请不要设置元素的背景颜色
      </view>
      <view class="mt-lg text-lg">全局组件</view>
      <view class="p-lg">
        <wd-button
          @click="notify.success('全局 notify 提示')"
          type="primary"
          class="mt-2.2 w-full"
        >
          显示全局 notify 提示
        </wd-button>
      </view>
      <view class="p-lg">
        <wd-button
          @click="showActionSheet"
          type="primary"
          class="mt-2.2 w-full"
        >
          显示全局 actionSheet 操作菜单
        </wd-button>
      </view>
      <view class="p-lg">
        <wd-button @click="openModal" type="primary" class="mt-2.2 w-full">
          显示全局 modal 模态框
        </wd-button>
      </view>
    </view>
    <view
      style="height: var(--layout-navbar-height); border-color: red"
      class="border-all mx-sm"
    >
      <view class="text-lg"> 导航栏高度 var(--layout-navbar-height) </view>
    </view>
    <view
      style="height: var(--layout-page-height); border-color: red"
      class="border-all mx-sm"
    >
      <view class="text-lg"> 内容区高度 var(--layout-page-height) </view>
      <view class="p-2.2">
        不带 fixedBottom 插槽高度的内容区高度，其高度刚好等于 (页面高度) -
        (tabbar) - (navbar) - (顶部安全区) - (底部安全区)。
      </view>
      <wd-button class="w-full" @tap="showBottomView = !showBottomView">
        显隐底部插槽按钮后看看高度是否正确
      </wd-button>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
