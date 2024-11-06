<cfg lang="json">
{
  "navigationBarTitleText": "我的",
  "enablePullDownRefresh": false,
  "navigationStyle": "custom",
  "navigationBarTextStyle": "white"
}
</cfg>
<script lang="ts" setup>
import { _require } from "@/utils/tools";
import { onPageScroll } from "@dcloudio/uni-app";
import taskStatistics from "./components/taskStatistics.vue";
import loopCheck from "./components/loopCheck.vue";
import { StateEnum } from "@/components/common/CoStateTag/CoStateTag.vue";
import {
  ButtonOnChooseaddressEvent,
  ButtonOnGetphonenumberEvent,
} from "@uni-helper/uni-app-types";
import { uniApiToPromise } from "@/utils/rewriteUni";
import useUserinfoStore from "@/store/useUserinfoStore";

const userAuthEnum: StateEnum = [
  {
    state: 1,
    label: "管理员",
    class: "C-M1 B-M1-O3 R-max P-row-xs F-S-xs ML-xs",
  },
];
const layoutInfo = reactive({
  scrollTop: 0,
});
onPageScroll((e) => {
  layoutInfo.scrollTop = e.scrollTop;
});

const userinfoStore = useUserinfoStore();

async function getPhoneNumber(e: ButtonOnGetphonenumberEvent) {
  console.log("getPhoneNumber:", e);
  const { code } = await uniApiToPromise(uni.login);
  console.log("code", code);
  const { encryptedData, iv } = e.detail;
  if (!encryptedData || !iv) return;
}
function chooseavatar(e: ButtonOnChooseaddressEvent) {
  console.log("chooseavatar:", e);
  uploadAvater(e.detail.avatarUrl);
}

function uploadAvater(url: string) {
  userinfoStore.userinfo = {
    ...userinfoStore.userinfo,
    avatarUrl: url,
  };
}
</script>
<template>
  <CoPageView class="B-B2 PB-md" :onPageScroll="onPageScroll">
    <view class="flex-A-C MG-md gap-sm F-S-sm">
      <button
        :open-type="'chooseAvatar'"
        @chooseavatar="chooseavatar"
        class="PD-0 B-B0"
      >
        <uv-image
          radius="var(--R-sm)"
          height="58px"
          width="58px"
          :src="
            userinfoStore.userinfo?.avatarUrl ||
            _require('src/static/imgs/icon/avatar__logout.jpg')
          "
          :mode="'aspectFill'"
        ></uv-image>
      </button>
      <view>
        <view class="flex-A-C">
          <view class="F-S-md T-strong">张三</view>
          <!-- <button
              open-type="getPhoneNumber"
              @getphonenumber="getPhoneNumber"
              class="PD-0 B-none F-S-md T-strong"
            >
              点击登录
            </button> -->
          <CoStateTag :stateEnum="userAuthEnum" :state="1" />
        </view>
        <view class="C-T3">18888888888</view>
        <view>某某企业</view>
      </view>
    </view>

    <taskStatistics :scrollTop="layoutInfo.scrollTop" />
    <loopCheck :scrollTop="layoutInfo.scrollTop" />
  </CoPageView>
</template>
<style lang="scss" scoped></style>
