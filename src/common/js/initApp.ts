/*
 * @Date: 2023-02-21 21:40:40
 * @LastEditTime: 2023-09-09 10:28:39
 * 介绍:
 */
uni.$u.config.unit = "rpx";
uni.addInterceptor("showLoading", {
  invoke(args: UniNamespace.ShowLoadingOptions) {
    if (typeof args.mask !== "boolean") args.mask = true;
  },
});

uni.addInterceptor("showToast", {
  invoke(args: UniNamespace.ShowToastOptions) {
    args.icon ??= "none";
    args.duration ??= 3000;
  },
});

// const token: string | undefined = undefined;

// //1路由拦截，没有token时重定向到登录页面
// const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
// list.forEach((v) => {
//   uni.addInterceptor(v, {
//     invoke(args: UniNamespace.NavigateToOptions) {
//       if (!token) {
//         toLogin();
//         //取消本次路由跳转
//         return false;
//       }
//     },
//   });
// });

// function toLogin() {
//   uni.reLaunch({
//     url: "/pages/login/login",
//   });
//   uni.hideTabBar();
// }
