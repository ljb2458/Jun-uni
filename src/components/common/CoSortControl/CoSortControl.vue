<script setup lang="ts">
const ASC = "Asc";
const DESC = "Desc";

type Order = typeof ASC | typeof DESC | undefined | "";
const props = withDefaults(
  defineProps<{
    /**是否可多个 */
    multiple?: boolean;
    /**排序字段的 value */
    value: string;
    /**排序字段；多个用,隔开 */
    field: string | undefined;
    /**排序方式 Desc | Asc；多个用,隔开 */
    order: string | undefined;
  }>(),
  {
    order: "",
    field: "",
  }
);

const orderArr = computed({
  get() {
    return props.order.split(",");
  },
  set(v) {
    emit("update:order", v.join(","));
  },
});
const fieldArr = computed({
  get() {
    return props.field.split(",");
  },
  set(v) {
    emit("update:field", v.join(","));
  },
});

const nowIndex = computed<number>(() => {
  if (!props.field || !props.order || !props.value) return -1;
  const fields = fieldArr.value;
  return fields.findIndex((v) => v === props.value);
});

const nowOrder = computed<Order>(() => {
  const index = nowIndex.value;
  if (index === -1) return;
  const order = orderArr.value[index];
  if (!order) return;
  return order as any;
});

function giveNot(key: Order) {
  if (!key || key === "Desc") return ASC;
  return DESC;
}

const emit = defineEmits<{
  "update:field": [v: string | undefined];
  "update:order": [v: string | undefined];
  change: [v: string | undefined];
}>();

function changeSort() {
  const newOrder = giveNot(nowOrder.value);
  if (!props.multiple) {
    emit("update:field", props.value);
    emit("update:order", newOrder);
    emit("change", newOrder);
    return;
  }
  const index = nowIndex.value;
  const _fieldArr = [...fieldArr.value];
  const _orderArr = [...orderArr.value];
  if (index === -1) {
    _fieldArr.push(props.value);
    _orderArr.push(newOrder);
  } else {
    _orderArr[index] = newOrder;
  }

  fieldArr.value = _fieldArr;
  orderArr.value = _orderArr;
  emit("change", newOrder);
}
</script>

<template>
  <view @tap="changeSort" class="CoSortControl inline-flex flex-A-STR">
    <slot> </slot>
    <view class="CoSortControl_marker ML-xxs flex-col">
      <view class="MT-auto" style="margin-bottom: -2.5px">
        <uv-icon
          name="arrow-up-fill"
          size="12px"
          :color="nowOrder == ASC ? 'var(--C-M1)' : ''"
        />
      </view>
      <view class="MB-auto">
        <uv-icon
          name="arrow-down-fill"
          size="12px"
          :color="nowOrder == DESC ? 'var(--C-M1)' : ''"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.CoSortControl {
  .CoSortControl_marker {
    transform: scaleY(0.7);
    .uv-icon {
      border: none !important;
    }
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
