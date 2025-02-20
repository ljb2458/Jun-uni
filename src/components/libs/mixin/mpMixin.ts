export const mpMixin = {
  // #ifdef MP-WEIXIN
  options: {
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
    virtualHost: true,
    styleIsolation: "shared",
  },
  // #endif
};

export default mpMixin;
