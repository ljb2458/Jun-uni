<script setup lang="ts">
import { FileListOption } from "@ttou/uv-typings/types/upload";
import { apiUploadFile, ApiUploadFile } from "@/api/sys/index";
import { UploadAccept } from "@ttou/uv-typings/types/upload";

export interface UploadEvent {
  file: Array<{
    name: string;
    size: number;
    time: number;
    type: string;
    url: string;
  }>;
  index: number;
  name: string;
}
export interface FileListItem extends FileListOption {
  /**尝试请求次数 */
  requestCount?: number;
  /**远程服务器返回的图片url */
  remoteUrl?: string;
  /**远程服务器返回的data数据 */
  data?: ApiUploadFile.Res;
}
export type FileList = FileListItem[];
const props = withDefaults(
  defineProps<{
    /**
     * 上传区域的图标的颜色
     * @default "#D3D4D6"
     */
    uploadIconColor?: string;
    /**
     * 是否启用(显示/隐藏)组件
     * @default false
     */
    useBeforeRead?: boolean;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 上传区域的提示文字
     * @default ""
     */
    uploadText?: string;
    multiple: boolean;
    fileList?: FileListItem[];
    maxCount?: StrNumber;
    maxParallel?: StrNumber;
    accept?: UploadAccept;
  }>(),
  { maxCount: 6, fileList: () => [], maxParallel: 3 }
);

const emit = defineEmits<{
  "update:fileList": [v: FileListItem[]];
}>();

const fileList = useVModel(props, "fileList", emit, {
  defaultValue: [],
  deep: true,
});
const maxCount = computed(() => +props.maxCount - (fileList.value.length || 0));

function onAfterRead(e: UploadEvent) {
  e.file.forEach((media) => {
    fileList.value.push({
      status: "uploading",
      url: media.url,
      message: "等待中...",
      requestCount: 0,
    });
  });
  let maxParallel = +props.maxParallel || 3;
  let index = 0;
  while (maxParallel > 0) {
    handleUpload();
  }

  async function handleUpload() {
    if (index >= fileList.value.length) {
      maxParallel = 0;
    }
    const item = fileList.value[index];

    index++;
    if (!item || item.status !== "uploading" || item.requestCount !== 0) return;

    item.requestCount++;
    maxParallel--;
    item.message = "上传中...";
    const res = await apiUploadFile({
      filePath: item.url,
      name: "file",
      getTask(task) {
        task.onProgressUpdate((v) => {
          item.message = `${v.progress}%`;
        });
      },
    });
    item.status = res.isSuccess ? "success" : "failed";
    item.message = res.message;
    item.data = res.result;
    item.remoteUrl = res.result?.url;
    handleUpload();
  }
}
function delMedia(e: { index: number; name: string; file: FileListItem }) {
  fileList.value.splice(e.index, 1);
}
</script>

<template>
  <uv-upload
    :="{ ...$attrs, ...props }"
    @afterRead="onAfterRead"
    @delete="delMedia"
    :fileList="fileList"
    class="MT-xs"
  />
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { useVModel } from "@/hooks/toolsHooks";
export default {
  mixins: [mpMixin],
};
</script>
