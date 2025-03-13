import { CoStateOrm } from "@/components/common/CoStateTag/CoStateTag.vue";
import {
  ApiHouseInfoAdd,
  ApiTaskDetail,
  ApiWarnDetail,
} from "@/api/houseSafety/index";

/** 任务状态 orm 映射 */
export const taskStateOrm = computed<CoStateOrm>(() => [
  {
    label: "待发布",
    value: ApiTaskDetail.TaskStatus.WaitPublished,
    style: { background: "#f1c40f66", color: "#f1c40f" }, // 黄色系，表示待发布状态
  },
  {
    label: "待接收",
    value: ApiTaskDetail.TaskStatus.WaitReceiving,
    style: { background: "#3498db66", color: "#3498db" }, // 蓝色系，表示待接收状态
  },
  {
    label: "待处理",
    value: ApiTaskDetail.TaskStatus.WaitProcessed,
    style: { background: "#9b59b666", color: "#9b59b6" }, // 紫色系，表示待处理状态
  },
  {
    label: "待审核",
    value: ApiTaskDetail.TaskStatus.WaitExamine,
    style: { background: "#e67e2266", color: "#e67e22" }, // 橙色系，表示待审核状态
  },
  {
    label: "完成",
    value: ApiTaskDetail.TaskStatus.Completed,
    style: { background: "#2ecc7166", color: "#2ecc71" }, // 绿色系，表示完成状态
  },
]);

/** 任务类型 orm 映射 */
export const taskTypeOrm = computed(() => [
  {
    label: "检测任务",
    value: ApiTaskDetail.TaskType.Detection,
    style: { background: "#f1c40f66", color: "#f1c40f" }, // 黄色系，表示检测任务
  },
  {
    label: "设计任务",
    value: ApiTaskDetail.TaskType.Design,
    style: { background: "#3498db66", color: "#3498db" }, // 蓝色系，表示设计任务
  },
  {
    label: "加固任务",
    value: ApiTaskDetail.TaskType.Reinforce,
    style: { background: "#9b59b666", color: "#9b59b6" }, // 紫色系，表示加固任务
  },
  {
    label: "巡检任务",
    value: ApiTaskDetail.TaskType.Inspection,
    style: { background: "#e67e2266", color: "#e67e22" }, // 橙色系，表示巡检任务
  },
  {
    label: "复核任务",
    value: ApiTaskDetail.TaskType.Recheck,
    style: { background: "#2ecc7166", color: "#2ecc71" }, // 绿色系，表示复核任务
  },
]);

/** 房屋告警（告警）状态 orm 映射 */
export const warnStatusOrm = computed(() => [
  {
    label: "开放",
    value: ApiWarnDetail.Status.Open,
    style: { background: "#2ecc7166", color: "#2ecc71" }, // 绿色系，表示开放状态
  },
  {
    label: "任务中",
    value: ApiWarnDetail.Status.Running,
    style: { background: "#3498db66", color: "#3498db" }, // 蓝色系，表示任务中状态
  },
  {
    label: "关闭",
    value: ApiWarnDetail.Status.Closed,
    style: { background: "#c0392b66", color: "#c0392b" }, // 红色系，表示关闭状态
  },
]);

/** 房屋告警类型 orm 映射 */
export const warnTypeOrm = computed(() => [
  {
    label: "人人拍告警",
    value: ApiWarnDetail.Type.AiWarning,
    style: { background: "#d32f2f66", color: "#d32f2f" }, // 红色系，用于警告
  },
  {
    label: "卫星告警",
    value: ApiWarnDetail.Type.Satellite,
    style: { background: "#f1c40f66", color: "#f1c40f" }, // 黄色系，用于科技相关
  },
  {
    label: "硬件监控告警",
    value: ApiWarnDetail.Type.HardwareMonitor,
    style: { background: "#f57c0066", color: "#f57c00" }, // 橙色系，用于硬件相关
  },
]);

/** 建筑类型 ORM 映射 */
export const buildingTypeOrm = computed<CoStateOrm>(() => [
  {
    label: "公寓",
    value: ApiHouseInfoAdd.BuildingType.Apartment,
    style: { background: "#9c27b066", color: "#9c27b0" }, // 紫色系，用于公寓
  },
  {
    label: "平房",
    value: ApiHouseInfoAdd.BuildingType.Bungalow,
    style: { background: "#00bcd466", color: "#00bcd4" }, // 青色系，用于平房
  },
  {
    label: "复式",
    value: ApiHouseInfoAdd.BuildingType.Duplex,
    style: { background: "#ffc10766", color: "#ffc107" }, // 黄色系，用于复式
  },
  {
    label: "别墅",
    value: ApiHouseInfoAdd.BuildingType.Villa,
    style: { background: "#ff572266", color: "#ff5722" }, // 橙色系，用于别墅
  },
]);

/** 房屋类别 ORM 映射 */
export const housingCategoryOrm = computed<CoStateOrm>(() => [
  {
    label: "住宅",
    value: ApiHouseInfoAdd.HousingCategory.Residential,
    style: { background: "#4caf5066", color: "#4caf50" }, // 绿色系，用于住宅
  },
  {
    label: "商业",
    value: ApiHouseInfoAdd.HousingCategory.Commercial,
    style: { background: "#00acc166", color: "#00acc1" }, // 青色系，用于商业
  },
  {
    label: "混合用途",
    value: ApiHouseInfoAdd.HousingCategory.MixedUse,
    style: { background: "#e91e6366", color: "#e91e63" }, // 粉色系，用于混合用途
  },
]);

/** 安全等级 ORM 映射 */
export const safetyLevelOrm = computed<CoStateOrm>(() => [
  {
    label: "A级",
    value: ApiHouseInfoAdd.SafetyLevel.Asu,
    style: { background: "#2ecc7166", color: "#2ecc71" }, // 绿色系，表示最高安全等级
  },
  {
    label: "B级",
    value: ApiHouseInfoAdd.SafetyLevel.Bsu,
    style: { background: "#f1c40f66", color: "#f1c40f" }, // 黄色系，表示中等安全等级
  },
  {
    label: "C级",
    value: ApiHouseInfoAdd.SafetyLevel.Csu,
    style: { background: "#e67e2266", color: "#e67e22" }, // 橙色系，表示较低安全等级
  },
  {
    label: "D级",
    value: ApiHouseInfoAdd.SafetyLevel.Dsu,
    style: { background: "#e74c3c66", color: "#e74c3c" }, // 红色系，表示最低安全等级
  },
]);
