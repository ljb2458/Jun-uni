<script setup lang="ts">
import { StyleValue } from "vue";
import { uniApiToPromise } from "@/utils/rewriteUni";
import { randomUUID } from "@/utils/tools/generate";
import { _import } from "@/utils/tools/import";
import type {
  MapProps,
  MapMarker,
  MapCallout,
  MapOnRegionchangeEvent,
  MapLabel,
  MapCustomCallout,
  MapOnUpdatedEvent,
} from "@uni-helper/uni-app-types";
import { useVModel } from "@/hooks/toolsHooks";
import envCoverView from "./envCoverView.vue";
import envCoverImage from "./envCoverImage.vue";
import { debounce } from "lodash";

export interface CoMapMarker extends MapMarker, AnyObject {
  iconPath?: string;
  callout?: CoMapCallout;
  label?: CoMapLabel;
  customCallout?: CoMapCustomCallout;
}
export interface CoMapCustomCallout
  extends Partial<MapCustomCallout>,
    AnyObject {}
export interface CoMapLabel extends Partial<MapLabel>, AnyObject {}
export interface CoMapCallout extends Partial<MapCallout>, AnyObject {}
export interface CoMapMapProps extends MapProps {
  markers?: CoMapMarker[];
}
export type CoMapControl = "scale" | "local";
export interface GetLocationRes {
  latitude: number;
  longitude: number;
}
export interface GetLocation {
  (): GetLocationRes | Promise<GetLocationRes>;
}

const MIN_SCALE = 3;
const MAX_SCALE = 20;
const LATITUDE = 39.909;
const LONGITUDE = 116.39742;
const MAP_ID = `map-${randomUUID().slice(0, 60)}`;
const props = withDefaults(
  defineProps<{
    showMap?: boolean;
    mapHidIcon?: boolean | string;
    mapProps?: CoMapMapProps;
    topHeight?: string;
    bottomHeight?: string;
    leftIcons?: IconItem[];
    rightIcons?: IconItem[];
    fill?: boolean;
    /**是否显示全屏控件 */
    showFill?: boolean;
    /**全屏时不展示的控件 */
    fillExcludeCotrol?: CoMapControl[];
    /**非全屏时不展示的控件 */
    normalExcludeCotrol?: CoMapControl[];
    scale?: number;
    getLocation?: GetLocation;
  }>(),
  {
    mapProps: () => ({}),
    leftIcons: () => [],
    rightIcons: () => [],
    topHeight: "100px",
    bottomHeight: "0px",
    showMap: true,
    scale: 16,
    showFill: true,
    showScale: true,
    getLocation: () => () => uniApiToPromise(uni.getLocation),
  }
);
const SCALE = props.scale;
const $mapProps = computed(() => ({
  latitude: LATITUDE,
  longitude: LONGITUDE,
  minScale: MIN_SCALE,
  maxScale: MAX_SCALE,

  layerStyle: 1,
  enable3D: true,
  enableZoom: true,
  enableScroll: true,
  enablePoi: true,
  enableBuilding: true,
  enableIndoorMap: true,
  ...props.mapProps,
}));

const emit = defineEmits<{
  "update:showMap": [v: boolean];
  "update:fill": [v: boolean];
  "update:scale": [v: number];
}>();

const showMap = useVModel(props, "showMap", emit);
const fill = useVModel(props, "fill", emit);
const externalScale = useVModel(props, "scale", emit);
/**
 * 双指滑动后，得到的缩放倍率，防止缩放倍率相互干扰，增加该字段
 */
const realScale = ref<number | undefined>(externalScale.value);

const scale = computed({
  get() {
    if (Object.is(realScale.value, undefined)) return externalScale.value;
    return realScale.value || SCALE;
  },
  set(v) {
    externalScale.value = v;
    realScale.value = undefined;
  },
});

const layoutInfo = computed(() => {
  let { topHeight, bottomHeight } = props;
  if (!fill.value) topHeight = bottomHeight = "0px";
  return { topHeight, bottomHeight };
});

const latitude = useVModel(props.mapProps, "latitude", undefined, {
  defaultValue: LATITUDE,
});
const longitude = useVModel(props.mapProps, "longitude", undefined, {
  defaultValue: LONGITUDE,
});

onMounted(() => {
  mapCtx = uni.createMapContext(MAP_ID, getCurrentInstance());
  watch(
    () => props.mapProps.includePoints,
    () => {
      updateMapScale();
    }
  );
});
const updateMapScale = debounce(
  async () => {
    const res = await uniApiToPromise(mapCtx.getScale);
    realScale.value = res.scale;
  },
  300,
  { leading: true, trailing: true }
);
function onUpdated(e: MapOnUpdatedEvent) {
  if (typeof props.mapProps.onUpdated == "function")
    props.mapProps.onUpdated(e);
  updateMapScale();
}
function onRegionchange(e: MapOnRegionchangeEvent) {
  if (typeof props.mapProps.onRegionchange == "function")
    props.mapProps.onRegionchange(e);
  if (e.causedBy === "update") return;
  updateMapScale();
}
let mapCtx: UniNamespace.MapContext;

function changeFill(value: boolean = !fill.value) {
  fill.value = value;
}

async function changeScale(value: number) {
  const minScale = $mapProps.value.minScale;
  const maxScale = $mapProps.value.maxScale;
  if (value > maxScale) value = maxScale;
  if (value < minScale) value = minScale;
  const res = await uniApiToPromise(mapCtx.getCenterLocation);
  latitude.value = res.latitude;
  longitude.value = res.longitude;
  scale.value = value;
}
async function moveToLocal() {
  const res = await props.getLocation();
  latitude.value = res.latitude;
  longitude.value = res.longitude;
  mapCtx.moveToLocation({
    latitude: latitude.value,
    longitude: longitude.value,
  });
  changeScale(SCALE);
}

interface IconItem {
  class?: any;
  iconPath?: string;
  tap?: Fun;
  style?: StyleValue;
  orderNo?: number;
}

const leftIconList = computed<IconItem[]>(() => {
  const iconArray = [...props.leftIcons];
  if (!showMap.value) return iconArray;
  iconArray.unshift({
    class: ["_MT-auto", "_B-none"],
    orderNo: -999999999999999,
  });
  iconArray.push({
    class: ["_MB-auto", "_B-none"],
    orderNo: 999999999999999,
  });
  return iconArray.toSorted((a, b) => Number(a.orderNo) - Number(b.orderNo));
});

const rightIconList = computed<IconItem[]>(() => {
  const iconArray = [...props.rightIcons];
  if (!showMap.value) return iconArray;

  if (fill.value) {
    if (!props.fillExcludeCotrol?.includes("scale")) addScaleCotrol();
    if (!props.fillExcludeCotrol?.includes("local")) addLocalCotrol();
    //点击此icon时隐藏地图，此时，地图默认slot中的内容会显现出来
    if (props.mapHidIcon) {
      let iconPath = _import("src/static/components/imgs/menu.png");
      if (typeof props.mapHidIcon !== "boolean") iconPath = props.mapHidIcon;
      iconArray.unshift({
        iconPath,
        tap: () => {
          showMap.value = !showMap.value;
        },
        orderNo: 1,
      });
    }
  } else {
    if (!props.normalExcludeCotrol?.includes("scale")) addScaleCotrol();
    if (!props.normalExcludeCotrol?.includes("local")) addLocalCotrol();
  }

  if (props.showFill) {
    iconArray.push({
      iconPath: fill.value
        ? _import("src/static/components/imgs/fullScreenExit.png")
        : _import("src/static/components/imgs/fullScreen.png"),
      tap: () => changeFill(),
      class: ["_MT-auto"],
      orderNo: 31,
    });
  }

  iconArray.unshift({
    class: ["_MT-auto", "_B-none"],
    orderNo: -999999999999999,
  });
  iconArray.push({
    class: ["_MB-auto", "_B-none"],
    orderNo: 999999999999999,
  });
  return iconArray.toSorted((a, b) => Number(a.orderNo) - Number(b.orderNo));
  function addLocalCotrol() {
    iconArray.push({
      class: ["_MT-auto"],
      iconPath: _import("src/static/components/imgs/local.png"),
      tap: () => moveToLocal(),
      orderNo: 21,
    });
  }
  function addScaleCotrol() {
    iconArray.push(
      {
        class: ["_MB-0 _MT-auto"],
        iconPath: _import("src/static/components/imgs/plus.png"),
        tap() {
          changeScale(scale.value + 1);
        },
        orderNo: 11,
      },
      {
        class: ["_MT-0"],
        iconPath: _import("src/static/components/imgs/reduce.png"),
        tap() {
          changeScale(scale.value - 1);
        },
        orderNo: 12,
      }
    );
  }
});
</script>

<template>
  <view class="CoMap" :class="{ CoMap__fill: fill }">
    <slot></slot>
    <envCoverView
      class="controls__left"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <envCoverView
        v-for="(item, index) in leftIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <envCoverImage
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></envCoverImage>
      </envCoverView>
    </envCoverView>
    <envCoverView
      class="controls__right"
      :style="{
        top: layoutInfo.topHeight,
        bottom: layoutInfo.bottomHeight,
      }"
    >
      <envCoverView
        v-for="(item, index) in rightIconList"
        :key="index"
        class="controls_iconBox"
        :class="item.class"
        :style="[item.style]"
      >
        <envCoverImage
          @tap="item.tap"
          class="controls_iconImg"
          :src="item.iconPath"
        ></envCoverImage>
      </envCoverView>
    </envCoverView>
    <envCoverView
      class="controls__top"
      :show="fill"
      :style="{ height: layoutInfo.topHeight }"
    >
      <slot name="top"></slot>
    </envCoverView>
    <envCoverView
      class="controls__bottom"
      :show="fill"
      :style="{ height: layoutInfo.bottomHeight }"
    >
      <slot name="bottom"></slot>
    </envCoverView>
    <map
      v-show="showMap"
      :id="MAP_ID"
      :latitude="latitude"
      :longitude="longitude"
      :scale="externalScale"
      :theme="$mapProps.theme"
      :min-scale="$mapProps.minScale"
      :max-scale="$mapProps.maxScale"
      :layer-style="$mapProps.layerStyle"
      :markers="$mapProps.markers"
      :polyline="$mapProps.polyline"
      :circles="$mapProps.circles"
      :polygons="$mapProps.polygons"
      :controls="$mapProps.controls"
      :include-points="$mapProps.includePoints"
      :enable-3d="$mapProps.enable3D"
      :show-compass="$mapProps.showCompass"
      :enable-zoom="$mapProps.enableZoom"
      :enable-scroll="$mapProps.enableScroll"
      :enable-rotate="$mapProps.enableRotate"
      :enable-overlooking="$mapProps.enableOverlooking"
      :enable-satellite="$mapProps.enableSatellite"
      :enable-traffic="$mapProps.enableTraffic"
      :enable-poi="$mapProps.enablePoi"
      :enable-building="$mapProps.enableBuilding"
      :show-location="$mapProps.showLocation"
      :enable-indoor-map="$mapProps.enableIndoorMap"
      @markertap="$mapProps.onMarkertap"
      @labeltap="$mapProps.onLabeltap"
      @callouttap="$mapProps.onCallouttap"
      @controltap="$mapProps.onControltap"
      @tap="$mapProps.onTap"
      @anchorpointtap="$mapProps.onAnchorpointtap"
      @poitap="$mapProps.onPoitap"
      @regionchange="onRegionchange"
      @updated="onUpdated"
    >
      <template #callout>
        <slot
          name="callout"
          :markers="$mapProps.markers?.filter((v) => v.customCallout)"
        ></slot>
      </template>
    </map>
  </view>
</template>

<style lang="scss" scoped>
.CoMap {
  position: relative;
  $gap-row: 12px;
  $icon-size: 34px;
  $bottom-height: 54px;
  transition: all 150ms linear;
  overflow: hidden;
  background-color: #ffffff;

  .controls__top,
  .controls__bottom,
  .controls__left,
  .controls__right {
    position: absolute;
    z-index: 9;
    // border: solid red 1px;
  }
  .controls_iconBox {
    &:active {
      background-color: #8c8c8c;
    }
    background-color: #ffffff;
    border-radius: 6px;
    padding: 6px;
    height: $icon-size;
    width: $icon-size;
    box-sizing: border-box;
    .controls_iconImg {
      height: 100%;
      width: 100%;
    }
  }
  .controls__top {
    top: 0;
    left: 0;
    right: 0;
  }
  .controls__bottom {
    bottom: 0;
    right: 0;
    left: 0;
  }
  .controls__left,
  .controls__right {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
  }
  .controls__left {
    left: $gap-row;
    width: $icon-size;
  }
  .controls__right {
    right: $gap-row;
    width: $icon-size;
  }

  map {
    height: 100%;
    width: 100%;
  }
}
.CoMap__fill {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999;
  margin: 0 !important;
  border-radius: 0 !important;
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
export default {
  mixins: [mpMixin],
};
</script>
