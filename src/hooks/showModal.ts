/**显示模态框 */
export default async function (
  content: string,
  options?: Partial<UniApp.ShowModalOptions>
) {
  return new Promise<UniApp.ShowModalRes>((resolve, reject) => {
    uni.showModal({
      title:"提示",
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
