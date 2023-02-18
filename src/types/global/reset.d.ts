interface ImportMetaEnv {
  /** 开发环境环境变量*/
  VITE_BASE_URL: string;
  /**代理开关*/
  VITE_PROXY: "0" | "1";
  /**接口后缀 */
  VITE_API_PREFIX: string;
}

declare namespace UniNamespace {
  interface RequestSuccessCallbackResult {
    data: any;
  }
}
