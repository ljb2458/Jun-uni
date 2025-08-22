<script setup lang="ts">
import { useUserStore } from "@/store/user/index";
import { ButtonOnGetphonenumberEvent } from "@uni-helper/uni-app-types";
import { _resolve, closeLoginPopup, showLoginPopup } from ".";
import { uniApiToPromise } from "@/utils/rewriteUni";
import { loginedInit } from "@/init";
const userStore = useUserStore();
const agreement = ref(false);

const loading = reactive({
  mobileLogin: false,
  signin: false,
});

async function mobileLogin(e: ButtonOnGetphonenumberEvent) {
  if (loading.mobileLogin) return;
  loading.mobileLogin = true;
  const { code } = await uniApiToPromise(uni.login);
  const openId = await userStore.getWxOpenId(code);
  loading.mobileLogin = false;
  if (!openId) return uni.showToast({ title: "获取 openId 失败！" });
  const { code: phoneCode } = e;
  if (!phoneCode) return;
  loading.mobileLogin = true;
  const mobile = await userStore.getWxPhone({
    OpenId: openId,
    Code: phoneCode,
  });
  loading.mobileLogin = false;

  if (!mobile) return uni.showToast({ title: "获取手机号失败！" });
  //登录小程序
  loading.mobileLogin = true;
  const res = await userStore.login({ openId, mobile });
  loading.mobileLogin = false;
  if (!res) return;
  _resolve();
  showLoginPopup.value = false;
  uni.showToast({ title: "登录成功！" });
  //登录后初始化
  await loginedInit();
}
</script>
<template>
  <wd-popup
    :z-index="99999999"
    v-model="showLoginPopup"
    @close="closeLoginPopup"
    closable
    position="bottom"
  >
    <view class="text-center my-xs font-600 text-lg"> 登录享受更多服务 </view>
    <view class="flex justify-center my-lg">
      <wd-button
        open-type="getPhoneNumber"
        @getphonenumber="mobileLogin"
        :loading="loading.mobileLogin"
        :type="'primary'"
        :size="'large'"
        :disabled="!agreement"
      >
        本机号码一键登录
      </wd-button>
    </view>
    <view class="flex mb-sm justify-center">
      <wd-checkbox shape="circle" v-model="agreement">
        我已阅读并同意《用户服务协议》和《隐私政策》
      </wd-checkbox>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped></style>
