<!--
 * @Date: 2023-07-04 09:55:38
 * @LastEditTime: 2023-07-05 15:11:33
 * 介绍:
-->
<cfg lang="json">
{
  "title": "折叠面板",
  "enablePullDownRefresh": false
}
</cfg>
<script lang="ts" setup>
const current = ref(0);
const current2 = ref([0, 1]);
</script>
<template>
  <CpageView>
    <view class="auto-MB-md">
      <view class="T-S-lg">手风琴模式</view>
      <u-collapse :value="current" accordion>
        <u-collapse-item name="0" title="标题" value="副标题" label="描述">
          折叠面板的内容，该组件仅编写类型支持，使用方法与官方无异，为了兼容微信小程序，不对该组件进行二次封装
        </u-collapse-item>
        <u-collapse-item
          name="1"
          title="手风琴模式"
          value="副标题"
          label="描述"
        >
          手风琴模式，仅可打开一个
        </u-collapse-item>
      </u-collapse>
      <view class="T-S-lg">非手风琴模式</view>
      <u-collapse :value="current2">
        <u-collapse-item name="0" title="标题" value="副标题" label="描述">
          折叠面板的内容，该组件仅编写类型支持，使用方法与官方无异，为了兼容微信小程序，不对该组件进行二次封装
        </u-collapse-item>
        <u-collapse-item
          name="1"
          title="手风琴模式"
          value="副标题"
          label="描述"
        >
          手风琴模式，仅可打开一个
        </u-collapse-item>
      </u-collapse>
    </view>
  </CpageView>
</template>
<style lang="scss" scoped></style>
