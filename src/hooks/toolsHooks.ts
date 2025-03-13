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
  emit?: Fun,
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
      innerRef.value = newValue;
    },
    { deep }
  );
  if (emit) {
    watch(
      innerRef,
      (newValue: T[K]) => {
        emit(event, newValue);
      },
      { deep }
    );
  }

  return innerRef;
}

/**
 * 使用 uni.$on 订阅
 * @returns
 */
export function useUniOn() {
  const pubsubObj: AnyObject<Fun[]> = {};
  function $on(message: string, fun: Fun) {
    uni.$on(message, fun);
    const old = pubsubObj[message] || [];
    pubsubObj[message] = old.concat(fun);
    return () => {
      uni.$off(message, fun);
    };
  }
  function $off(message: string, fun: Fun) {
    uni.$off(message, fun);
    const index = pubsubObj[message]?.findIndex((val) => Object.is(val, fun));
    if (index >= 0) pubsubObj[message].splice(index, 1);
  }
  function $offAll() {
    for (const key in pubsubObj) {
      const funList = pubsubObj[key];
      funList.forEach((v) => uni.$off(key, v));
      funList.length = 0;
    }
  }
  onBeforeUnmount($offAll);
  return { $on, $off, $offAll };
}
