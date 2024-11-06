<script lang="ts">
import mpMixin from '@/components/libs/mixin/mpMixin';
export default {
  mixins: [mpMixin],
}
</script>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  height?: string;
  width?: string;
  bg?: string;
}>(), {
  bg: 'var(--C-LG1)',
  height: '2px',
  width: '80px',
})
</script>

<template>
  <view class="CoDivider" :style="{background:bg,height,width}"></view>
</template>

<style lang="scss" scoped>
.CoDivider{
  border-radius: var(--R-max);
}
</style>
