<!--
 * @Date: 2023-09-28 18:07:46
 * @LastEditTime: 2023-10-13 11:22:33
 * 介绍:
-->
<script lang="ts" setup>
import router from "@/hooks/router";
import { UniPage } from "@/sdk/rewriteUni";

const props = defineProps<{
  title?: string;
  meta: UniPage.Meta;
}>();
</script>
<template>
  <view
    v-if="meta.navigationBar.style === 'custom'"
    class="navbar flex-J-SB flex-A-C C-B1 T-S-xl"
  >
    <Cicon
      style="flex: 1"
      v-if="!meta.isTabBar"
      @click="router.back()"
      name="icon-fanhui"
    />
    <view class="T-A-C" style="flex: 1">{{
      props.title || meta.navigationBar.titleText
    }}</view>
    <view style="flex: 1" class="T-S-sm T-A-R">
      0x000.00000 <Cicon class="T-S-sm" name="icon-fuzhi" />
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
