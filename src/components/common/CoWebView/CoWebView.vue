<script setup lang="ts">
import { WebViewOnMessageEvent } from "@uni-helper/uni-app-types";
export interface MessageEvent {
  action: string;
  data: AnyObject;
}

const props = defineProps<{
  src: string;
  modelValue?: AnyObject;
}>();

const emit = defineEmits<{
  message: [v: MessageEvent];
  "update:modelValue": [v: AnyObject];
}>();
function onMessage(e: WebViewOnMessageEvent) {
  const data = e.detail.data;
  data.forEach((item: MessageEvent) => {
    emit("message", item);
    if (item.action === "update") return emit("update:modelValue", item.data);
  });
}
</script>

<template>
  <web-view
    :src="`${src}#${JSON.stringify(modelValue || '{}')}`"
    @message="onMessage"
  >
  </web-view>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { _import } from "@/utils/tools/import";
export default {
  mixins: [mpMixin],
};
</script>
