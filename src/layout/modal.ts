import Rmodal from "@/components/rewrite/Rmodal/Rmodal.vue";
type RmodalProps = ComponentPropsType<typeof Rmodal>;
export const show = ref(false);
export const config = ref<Cfg>({});
let _resolve = (v?: any) => {};
let _reject = (v?: any) => {};
const modal = {
  show(cfg?: Cfg) {
    config.value = { ...cfg };
    show.value = true;

    return new Promise<void>((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  },
  close() {
    show.value = false;
  },
};
export function onResovle() {
  modal.close();
  _resolve();
}
export function onReject() {
  modal.close();
  _reject();
}
export default modal;
export interface Cfg extends RmodalProps {}
