import router from "@/utils/router";
import { StateEnum } from "@/components/common/CoStateTag/CoStateTag.vue";

function toCorpList(query: AnyObject) {
  router.push("src/pages/corp/corpList.vue", { query });
}
export const corpTypeEnum = computed<StateEnum>(() => [
  {
    state: 1,
    icon: "icon-jiance",
    label: "检测公司",
    style: { background: "#27ae60" },
    tap: () => {
      toCorpList({ state: 1 });
    },
  },
  {
    state: 2,
    icon: "icon-sheji",
    label: "设计公司",
    style: { background: "#722ed1" },
    tap: () => {
      toCorpList({ state: 2 });
    },
  },
  {
    state: 3,
    icon: "icon-jiagu",
    label: "加固公司",
    style: { background: "#0078D4" },
    tap: () => {
      toCorpList({ state: 3 });
    },
  },
]);
