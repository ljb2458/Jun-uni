<!-- 列表状态；包含 next:可继续加载 | loading:加载中 | end:加载完成 | error:错误 | null:没有数据 几种状态的页面展示 -->
<script lang="ts" setup>
import mpMixin from "@/components/libs/mixin/mpMixin";
import { _import } from "@/utils/tools/import";
/** next:可继续加载 | loading:加载中 | end:加载完成 | error:错误 | null:没有数据 */
export type StateType = "next" | "loading" | "end" | "error" | "null";
defineOptions(mpMixin);
const props = withDefaults(
  defineProps<{
    type?: StateType;
    message?: string;
  }>(),
  {
    type: "next",
  }
);
const emit = defineEmits<{
  (e: "load"): void;
  (e: "reload"): void;
}>();
function reload() {
  emit("reload");
}
function load() {
  emit("load");
}
</script>
<template>
  <view class="CoListStatus">
    <view v-show="props.type === 'loading'" class="flex justify-center gap-2">
      <wd-loading :size="'36rpx'"></wd-loading>
      <view>{{ props.message }}</view>
    </view>
    <view v-show="props.type === 'null'" class="Rempty pt-xl pb-xl">
      <wd-status-tip
        :image="_import('/src/static/components/imgs/content.png')"
        :tip="props.message"
      />
    </view>
    <view v-show="props.type === 'next'">
      <wd-divider @tap="load">{{ props.message || "继续加载" }}</wd-divider>
    </view>
    <view v-show="props.type === 'end'">
      <wd-divider @tap="load">{{ props.message || "没有更多了" }}</wd-divider>
    </view>
    <view v-show="props.type === 'error'">
      <CoError
        class="pt-xl pb-xl"
        :message="props.message || '出错了！'"
        @click-button="reload"
      >
      </CoError>
    </view>
  </view>
</template>
<style lang="scss" scoped></style>
