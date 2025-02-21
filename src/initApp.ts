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
// #ifdef APP-PLUS
plus.screen.lockOrientation("portrait-primary");
// #endif
/**
 * * 传入什么类型就返回什么类型，方便在对象中定义类型
 */
globalThis.defineType = <D>(v?: D) => v;
declare global {
  function defineType<D>(value: D): D;
  function defineType<D>(): D | undefined;
  interface GlobalThis {
    defineType: typeof defineType;
  }
}
export {};
