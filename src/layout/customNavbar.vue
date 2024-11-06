<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
import router from "@/package/js/router";
import { defaultStyle } from "./setCustomNavbar"
import { getCurrentRouteInfo } from "@/package/js/rewriteUni"



const props = defineProps<{
  useSafetyTop?: boolean;
  useCustomNavbar?: boolean;
}>();

const routeInfo = getCurrentRouteInfo()
const isCustomNavbar = computed(() => routeInfo?.style.navigationStyle === 'custom');
</script>
<template>
  <view class="customNavbar">
    <view v-if="props.useSafetyTop && isCustomNavbar" style="height: var(--status-bar-height)"></view>
    <view :style="{ ...defaultStyle }" v-if="isCustomNavbar" class="navbar flex-J-SB flex-A-C F-S-xl">
      <CoIcon style="flex: 1" v-if="!routeInfo?.tabbar" @click="router.back()" name="icon-fanhui" />
      <slot :slotProps="{ ...routeInfo }">
        <view class="T-A-C" style="flex: 1">{{ routeInfo?.style.navigationBarTitleText }}</view>
      </slot>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.customNavbar {
  position: sticky;
  top: 0;
  z-index: 999;
  padding-left: var(--gap-md);
  color: var(--C-B1);
  transition: all 0.3s;
}
</style>
