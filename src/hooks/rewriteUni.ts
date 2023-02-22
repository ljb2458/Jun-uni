/**
 * * 显示原生模态框
 * @param content 显示内容
 * @param options 配置项
 * @returns
 */
export async function uniShowModal(
  content: string,
  options?: Partial<UniApp.ShowModalOptions>
): Promise<UniApp.ShowModalRes> {
  return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
    uni.showModal({
      title: "提示",
      ...options,
      content,
      success(res) {
        if (res.confirm) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: reject,
    });
  });
}

/**
 * * 获取系统信息
 * @returns
 */
export function uniGetSystemInfo(): Promise<
  UniApp.GetSystemInfoResult | never
> {
  return new Promise<UniApp.GetSystemInfoResult | never>((resolve) => {
    uni.getSystemInfo({
      success(res) {
        resolve(res);
      },
      fail(err) {
        console.warn("获取系统信息失败", err);
        resolve(uniGetSystemInfo());
      },
    });
  });
}
