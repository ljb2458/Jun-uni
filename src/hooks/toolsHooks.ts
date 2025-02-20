import dayjs from "dayjs";
import type { Ref } from "vue";

const intervalRecord: AnyObject<intervalRecordItem | undefined> = {};
interface intervalRecordItem {
  interval: NodeJS.Timeout | void;
  callbacks: Function[];
}

/**
 * * 使用循环定时器
 * @param callback 回调
 * @param time 间隔毫秒
 * @param cfg 初始化配置
 * @returns
 */
export function useInterval(
  callback: Function,
  time: number = 1000,
  cfg?: HookConfig
) {
  function intervalPublish() {
    intervalRecord[time.toString()]?.callbacks.forEach((f: any) => {
      if (typeof f === "function") f();
    });
  }
  function open() {
    if (!intervalRecord[time.toString()]) {
      console.log(`开启间隔为${time}的循环定时器`);
      intervalRecord[time.toString()] = {
        interval: setInterval(intervalPublish, time),
        callbacks: [],
      };
    }
    intervalRecord[time.toString()]!.callbacks.push(callback);
  }
  function close() {
    const intervalRecordItem = intervalRecord[time?.toString()];
    if (!intervalRecordItem) return;
    const callbacks = intervalRecordItem.callbacks;
    for (const key in callbacks) {
      const i = Number(key);
      if (callbacks[i] === callback) callbacks.splice(i, 1);
    }
    if (callbacks.length <= 0) {
      if (intervalRecordItem.interval) {
        console.log(`清除间隔为${time}的循环定时器`);
        clearInterval(intervalRecordItem.interval);
      }
      intervalRecord[time?.toString()] = undefined;
    }
  }
  if (cfg?.setupOpen !== false) open();
  if (cfg?.unmountedClear !== false) onUnmounted(close);

  return { close, open };
}
interface HookConfig {
  setupOpen?: boolean;
  unmountedClear?: boolean;
}

export function useCurrentDate(time = 1000, cfg?: HookConfig) {
  /**当前时间 */
  const currentDate = ref(dayjs());
  function setCurrentDate() {
    currentDate.value = dayjs();
  }
  const { close, open } = useInterval(setCurrentDate, time, cfg);
  return { currentDate, close, open };
}

export interface UseVModelOptions<T> {
  /**
   * 当未传递属性时，使用默认值
   *
   * @default undefined
   */
  defaultValue?: T;
  /**
   * 深度监听对象/数组
   *
   * @default false
   */
  deep?: boolean;
}

export function useVModel<
  T extends AnyObject,
  K extends keyof T & string,
  O extends UseVModelOptions<T[K]> = {}
>(
  props: T,
  key: K,
  emit?: (name: `update:${K}`, value: T[K]) => void,
  options: O = {} as O
): Ref<T[K]> {
  type UK = `update:${K}`;
  const event: UK = `update:${key}`;
  const { defaultValue, deep = false } = options;
  const innerRef = ref<T[K]>(
    unref(Object.is(props[key], undefined) ? defaultValue! : props[key])
  );
  watch(
    () => props[key],
    (newValue) => {
      if (Object.is(newValue, innerRef.value)) return;
      innerRef.value = newValue;
    },
    { deep }
  );
  if (emit) {
    watch(
      innerRef,
      (newValue: T[K]) => {
        if (Object.is(newValue, props[key])) return;
        emit(event, newValue);
      },
      { deep }
    );
  }

  return innerRef;
}
