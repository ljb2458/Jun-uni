<cfg lang="json">
{
  "navigationBarTitleText": "帮助中心",
  "enablePullDownRefresh": false
}
</cfg>

<script setup lang="ts">
import { _require } from "@/utils/tools";
const menus = computed(() => [
  { img: _require("src/static/imgs/icon/help_1.png"), title: "新手指南" },
  { img: _require("src/static/imgs/icon/help_2.png"), title: "产品介绍" },
  { img: _require("src/static/imgs/icon/help_3.png"), title: "更多工具" },
]);
</script>

<template>
  <CoPageView class="B-B2 PT-md">
    <CoCard class="PD-md">
      <ReInput class="B-B2" :shape="'circle'" placeholder="请输入搜索关键词">
        <template #left>
          <up-icon name="search" size="28" />
        </template>
        <template #right>
          <u-button
            text="搜索"
            :type="'primary'"
            :size="'small'"
            :shape="'circle'"
          />
        </template>
      </ReInput>
      <view class="MT-md T-strong">新手指南</view>
      <view class="MT-md"><up-divider /></view>
      <view class="flex-J-SA MT-md">
        <view v-for="menu in menus" class="flex-A-C flex-col gap-xs">
          <ReImage
            width="32px"
            height="32px"
            :mode="'aspectFill'"
            :src="menu.img"
          />
          <view>{{ menu.title }}</view>
        </view>
      </view>
    </CoCard>
    <CoCard class="MT-md">
      <view class="T-strong PD-md border-B"> 热门问题 </view>
      <up-collapse accordion>
        <up-collapse-item
          title="商城首页如何添加视频？"
          :icon="_require('src/static/imgs/icon/help_4.png')"
        >
          <view class="C-T4">
            路径：系统管理-服务市场描述：选择【视频】，启用服务。然后退出系统账号，重新登陆。路径：电商系统-店铺管理操作：点击【页面设计】-【页面模块】-【添加模块】-【视频】，上传视频封面以及视频，设置下是否自动播放，点【确认保存】。
          </view>
        </up-collapse-item>
        <up-collapse-item
          title="商城首页如何添加视频？"
          :icon="_require('src/static/imgs/icon/help_4.png')"
        >
          <view class="C-T4">
            路径：系统管理-服务市场描述：选择【视频】，启用服务。然后退出系统账号，重新登陆。路径：电商系统-店铺管理操作：点击【页面设计】-【页面模块】-【添加模块】-【视频】，上传视频封面以及视频，设置下是否自动播放，点【确认保存】。
          </view>
        </up-collapse-item>
      </up-collapse>
    </CoCard>
    <CoCard class="MT-md">
      <view class="T-strong PD-md border-B"> 常见问题 </view>
      <view class="grid-2 P-row-sm border-B">
        <view class="P-row-md flex-col gap-xs flex-J-C flex-A-C">
          <ReImage
            class="inline-block"
            width="80px"
            height="80px"
            :src="_require('src/static/imgs/icon/help_5.png')"
          />
          <view>操作相关</view>
        </view>

        <view class="flex-1">
          <view class="PD-sm border-B">订小易对接金蝶云辰操作流程？</view>
          <view class="PD-sm border-B">订小易对接金蝶云辰操作流程？</view>
          <view class="PD-sm">订小易对接金蝶云辰操作流程？</view>
        </view>
      </view>

      <view class="grid-2 P-row-sm border-B">
        <view class="P-row-md flex-col gap-xs flex-J-C flex-A-C">
          <ReImage
            class="inline-block"
            width="80px"
            height="80px"
            :src="_require('src/static/imgs/icon/help_6.png')"
          />
          <view>业务相关</view>
        </view>

        <view class="flex-1">
          <view class="PD-sm border-B">操作员如何登录手机端？</view>
          <view class="PD-sm border-B">操作员如何登录手机端？</view>
          <view class="PD-sm">操作员如何登录手机端？</view>
        </view>
      </view>

      <view class="grid-2 P-row-sm border-B">
        <view class="P-row-md flex-col gap-xs flex-J-C flex-A-C">
          <ReImage
            class="inline-block"
            width="80px"
            height="80px"
            :src="_require('src/static/imgs/icon/help_7.png')"
          />
          <view>系统相关</view>
        </view>

        <view class="flex-1">
          <view class="PD-sm border-B">系统如何设置？</view>
          <view class="PD-sm border-B">系统如何设置？</view>
          <view class="PD-sm">系统如何设置？</view>
        </view>
      </view>
    </CoCard>
  </CoPageView>
</template>

<style lang="scss">
.u-collapse-item {
  .u-icon__img {
    height: 22px !important;
    width: 16px !important;
  }
}
.grid-2 {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
