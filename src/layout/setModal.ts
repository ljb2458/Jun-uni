import { ModalProps } from "@ttou/uv-typings/types/modal";
export const showModal = ref(false);
export const modalProps = ref<ModalProps>({});
let _resolve = () => {};
let _reject = () => {};
const setModal = {
  /**打开全局 mobal 提示框 */
  open(props?: ModalProps) {
    if (props) modalProps.value = { ...props };
    showModal.value = true;
    return new Promise<void>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  },
  /**关闭全局 mobal 提示框 */
  close() {
    showModal.value = false;
  },
};
export function onResovle() {
  setModal.close();
  _resolve();
}
export function onReject() {
  setModal.close();
  _reject();
}
export default setModal;
