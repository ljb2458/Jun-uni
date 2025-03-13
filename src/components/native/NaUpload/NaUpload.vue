<script setup lang="ts">
import { FileListOption } from "@ttou/uv-typings/types/upload";
import setActionSheet from "@/layout/setActionSheet";
import { uniChooseMedia } from "@/utils/rewriteUni";
import router from "@/utils/router";
import { PhotoAlbum } from "@/enum/pubsubKey/helmet";
import { apiDeviceFileDownload } from "@/api/smartHelmet/index";
import useUserinfoStore from "@/store/useUserinfoStore";
import { apiUploadFile, ApiUploadFile } from "@/api/sys/index";
import { ApiFileList } from "@/api/smartHelmet/list";

export interface FileListItem extends FileListOption {
  helmetFile?: ApiFileList.ResItem;
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
    fileList?: FileListItem[];
    type?: "video" | "image";
    maxCount?: StrNumber;
    maxParallel?: StrNumber;
  }>(),
  { type: "video", maxCount: 6, fileList: () => [], maxParallel: 3 }
);

const emit = defineEmits<{
  "update:fileList": [v: FileListItem[]];
}>();

const userinfoStore = useUserinfoStore();

const fileList = useVModel(props, "fileList", emit, {
  defaultValue: [],
  deep: true,
});
const maxCount = computed(() => +props.maxCount - (fileList.value.length || 0));

function upload() {
  const msgKey = props.type === "video" ? "视频" : "图片";
  setActionSheet.open({
    title: "请选择上传方式",
    actions: [
      {
        name: "从手机相册上传",
        tap() {
          chooseMedia("album");
        },
      },
      {
        name: `手机摄像头拍摄${msgKey}`,
        tap() {
          chooseMedia("camera");
        },
      },
      {
        name: `智能安全帽本地${msgKey}`,
        async tap() {
          await router.push("@/pages/helmet/photoAlbum.vue", {
            query: {
              fileType: props.type,
              maxCount: maxCount.value,
            },
          });
          uni.$emit(
            PhotoAlbum.SetFilePicked,
            fileList.value.filter((v) => v.helmetFile).map((v) => v.helmetFile)
          );
          uni.$once(
            PhotoAlbum.OnFilePick,
            (helmetFiles: ApiFileList.ResItem[] | undefined) => {
              if (!helmetFiles) return;
              const list = fileList.value.filter((v) => !v.helmetFile);
              helmetFiles.forEach((helmetFile) => {
                const url = apiDeviceFileDownload({
                  fileId: helmetFile.fileID,
                  puid: userinfoStore.helmetId!,
                });
                list.push({
                  status: "success",
                  url,
                  helmetFile,
                });
              });
              fileList.value = list;
            }
          );
        },
      },
    ],
  });
}

async function chooseMedia(sourceType: "camera" | "album") {
  const mediaList = await uniChooseMedia(props.type, {
    sourceType: [sourceType],
    count: maxCount.value,
  });
  mediaList.forEach((media) => {
    fileList.value.push({
      status: "uploading",
      url: media.tempFilePath,
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
  <view class="NaUpload flex-A-C flex-1">
    <uv-upload
      @delete="delMedia"
      :fileList="fileList"
      :maxCount="0"
      class="MT-xs"
      :accept="props.type"
    />
    <view class="active" @tap="upload">
      <uv-upload
        class="MT-xs NaUpload__readonly"
        :accept="props.type"
        :maxCount="props.maxCount"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.NaUpload {
  .NaUpload__readonly {
    pointer-events: none;
  }
}
</style>
<script lang="ts">
import mpMixin from "@/components/libs/mixin/mpMixin";
import { useVModel } from "@/hooks/toolsHooks";
export default {
  mixins: [mpMixin],
};
</script>
