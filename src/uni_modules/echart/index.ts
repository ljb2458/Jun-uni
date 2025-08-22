// nvue 不需要引入
// #ifdef VUE2
//@ts-ignore
import * as _echarts from "@/uni_modules/lime-echart/static/echarts.min";
// #endif
// #ifdef VUE3
// #ifdef MP
// 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用，但需要使用require
//@ts-ignore
const _echarts = require("../lime-echart/static/echarts.min");
// #endif
// #ifndef MP
// 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
//@ts-ignore
import * as echarts from "echarts/dist/echarts.esm";
// #endif
// #endif
import type * as ECHARTS from "echarts";

export const echarts: typeof ECHARTS = _echarts;
