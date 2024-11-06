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
