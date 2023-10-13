<!--
 * @Date: 2023-07-06 11:58:29
 * @LastEditTime: 2023-07-06 12:15:08
 * 介绍:操作菜单
-->
<script lang="ts" setup>
import { RactionSheetAction } from "./index";
import { filterObject } from "@/utils/tools/object";
const props = defineProps<{
  show?: boolean;
  title?: string;
  /**选项上方的描述信息 */
  description?: string;
  /**按钮的文字数组 */
  actions?: RactionSheetAction[];
  /**取消按钮的文字，不为空时显示按钮 */
  cancelText?: string;
  /**点击某个菜单项时是否关闭弹窗 */
  closeOnClickAction?: boolean;
  /**是否开启底部安全区适配 */
  safeAreaInsetBottom?: boolean;
  /**小程序的打开方式 */
  openType?:
    | "contact"
    | "getUserInfo"
    | "getPhoneNumber"
    | "error"
    | "launchApp"
    | "openSetting";
  /**点击遮罩是否允许关闭 */
  closeOnClickOverlay?: boolean;
  round?: StrNumber;
  /**指定返回用户信息的语言 */
  lang?: "zh_CN" | "zh_TW" | "en";
  /**会话来源，open-type="contact"时有效。只微信小程序有效 */
  sessionFrom?: string;
  /**会话内消息卡片标题，openType="contact"时有效 */
  sendMessageTitle?: string;
  /**会话内消息卡片点击跳转小程序路径，openType="contact"时有效 */
  sendMessagePath?: string;
  /**会话内消息卡片图片，openType="contact"时有效 */
  sendMessageImg?: string;
  /**是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 */
  showMessageCard?: boolean;
  /**打开 APP 时，向 APP 传递的参数，openType=launchApp 时有效 */
  appParameter?: string;
}>();
const emit = defineEmits<{
  (e: "select", v: any): void;
  (e: "close", v: any): void;
  /**用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，openType="getUserInfo"时有效 */
  (e: "getuserinfo", v: any): void;
  /**	客服消息回调，openType="contact"时有效 */
  (e: "contact", v: any): void;
  /**获取用户手机号回调，openType="getPhoneNumber"时有效 */
  (e: "getphonenumber", v: any): void;
  /**当使用开放能力时，发生错误的回调，openType="error"时有效 */
  (e: "error", v: any): void;
  /**打开 APP 成功的回调，openType="launchApp"时有效 */
  (e: "launchapp", v: any): void;
  /**在打开授权设置页后回调，openType="openSetting"时有效 */
  (e: "opensetting", v: any): void;
}>();
</script>
<template>
  <u-action-sheet
    :="filterObject(props)"
    @select="(e:any)=>emit('select',e)"
    @close="(e:any)=>emit('close',e)"
    @getuserinfo="(e:any)=>emit('getuserinfo',e)"
    @contact="(e:any)=>emit('contact',e)"
    @getphonenumber="(e:any)=>emit('getphonenumber',e)"
    @error="(e:any)=>emit('error',e)"
    @launchapp="(e:any)=>emit('launchapp',e)"
    @opensetting="(e:any)=>emit('opensetting',e)"
  ></u-action-sheet>
</template>
<style lang="scss" scoped></style>
