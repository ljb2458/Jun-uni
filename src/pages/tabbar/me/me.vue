<cfg lang="json">
{
  "navigationBarTitleText": "我的",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom"
}
</cfg>
<script lang="ts" setup>
import { onPageScroll } from "@dcloudio/uni-app";
</script>
<template>
  <CoPageView :onPageScroll="onPageScroll"> </CoPageView>
</template>
<style lang="scss" scoped></style>
