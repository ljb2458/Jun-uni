<cfg lang="json">
{
  "navigationBarTitleText": "页面",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>

<script setup lang="ts">
import { onPageScroll } from "@dcloudio/uni-app";
import setNotify from "@/layout/setNotify";
import setActionSheet, {
  ActionSheetOptionsItem,
} from "@/layout/setActionSheet";
import setModal from "@/layout/setModal";

/**打开模态框 */
function openModal() {
  setModal
    .open({
      title: "这是全局 modal 模态框",
      showCancelButton: true,
    })
    .then(() => setNotify.success(`确认`))
    .catch(() => setNotify.error(`点击了取消`));
}

/**打开操作菜单 */
function showActionSheet() {
  function select(e: ActionSheetOptionsItem) {
    console.log(`点击了${e.name}`);
    setNotify.primary(`点击了${e.name}`);
  }
  setActionSheet.open({
    actions: [
      {
        name: "选项1",
        subname: "副标题",
        select,
      },
      {
        name: "选项2",
        select,
      },
      {
        name: "选项3",
        select,
      },
    ],
  });
}
const showBottomView = ref(true);
</script>

<template>
  <CoPageView
    class="B-B2 PB-md"
    :useCustomNavbar="true"
    :useSafetyBottom="true"
    :useSafetyTop="true"
    :useModal="true"
    :useActionSheet="true"
    :useNotify="true"
    :onPageScroll="onPageScroll"
  >
    <template #fixedBottom="{}">
      <view v-if="showBottomView" class="MG-sm">
        fixedBottom 固定在底部的插槽,该插槽的内容会被额外注册一遍用于占位
        <uv-button :type="'primary'" @tap="setNotify.primary('点击了底部按钮')">
          底部按钮
        </uv-button>
      </view>
    </template>
    <view class="PD-md">
      <view class="MT-md F-S-lg">基本使用</view>
      <view class="C-T3 PD-sm">
        一般项目根目录下 README.md
        中所提供的代码片段足以满足基本使用。但是你任可以对组件进行更多自定义修改。
      </view>
      <view> useCustomNavbar </view>
      <view class="C-T3 PD-sm">
        是否使用自定义顶部导航栏，默认为true，在页面配置 navigationStyle 不为
        custom 时设置为 true 无效。
      </view>
      <view> useSafetyTop </view>
      <view class="C-T3 PD-sm">
        是否使用顶部安全区，默认为true，开启后会在顶部生成一个定高的 view
        进行占位，在页面配置 navigationStyle 不为 custom 时设置为 true 无效。
      </view>
      <view> useSafetyBottom </view>
      <view class="C-T3 PD-sm">
        是否使用底部安全区，默认为true，开启后会在底部生成一个定高的 view
        进行占位
      </view>
      <view> onPageScroll </view>
      <view class="C-T3 PD-sm">
        请传入该方法，内部使用该方法监听滚动条，从而设置顶部导航栏，后续可能继续扩展
      </view>
      <view> bgImg </view>
      <view class="C-T3 PD-sm">
        在小程序中背景图使用受限，使用该 props 定义背景图，背景图 image 的
        z-index 为 -1，因此，使用该属性时请不要设置元素的背景颜色
      </view>
      <view class="MT-md F-S-lg">全局组件</view>
      <view class="PD-md">
        <uv-button
          @click="setNotify.success('全局 notify 提示')"
          type="primary"
          class="MT-sm"
        >
          显示全局 notify 提示
        </uv-button>
      </view>
      <view class="PD-md">
        <uv-button @click="showActionSheet" type="primary" class="MT-sm">
          显示全局 actionSheet 操作菜单
        </uv-button>
      </view>
      <view class="PD-md">
        <uv-button @click="openModal" type="primary" class="MT-sm">
          显示全局 modal 模态框
        </uv-button>
      </view>
    </view>
    <view
      style="height: var(--layout-navbar-height); border-color: red"
      class="border-all MG-row-md"
    >
      <view class="F-S-lg"> 导航栏高度 var(--layout-navbar-height) </view>
    </view>
    <view
      style="height: var(--layout-page-height); border-color: red"
      class="border-all MG-row-md"
    >
      <view class="F-S-lg"> 内容区高度 var(--layout-page-height) </view>
      <view class="PD-sm">
        不带 fixedBottom 插槽高度的内容区高度，其高度刚好等于 (页面高度) -
        (tabbar) - (navbar) - (顶部安全区) - (底部安全区)。
      </view>
      <uv-button @tap="showBottomView = !showBottomView">
        显隐底部插槽按钮后看看高度是否正确
      </uv-button>
    </view>
  </CoPageView>
</template>

<style lang="scss" scoped></style>
