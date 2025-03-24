<script setup lang="ts">
import {
  AmbientLight,
  AnimationMixer,
  LoopOnce,
  Color,
  DirectionalLight,
  AnimationAction,
} from "three-platformize";
import { GLTFLoader } from "three-platformize/examples/jsm/loaders/GLTFLoader";
import { CoThreeJsCtx } from "@/components/common/CoThreeJs/CoThreeJs.vue";

let animation: AnimationMixer;
const loader = new GLTFLoader();

async function onLoad(ctx: CoThreeJsCtx) {
  // 开启DeviceOrientation
  //   ctx.platform.enableDeviceOrientation("ui");
  const gltf = await loader.loadAsync(
    "https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb"
  );
  gltf.scene.position.set(0, -2, 0);
  ctx.defCamera.lookAt(gltf.scene.position);
  ctx.defScene.add(gltf.scene);
  ctx.defScene.add(new AmbientLight(0xffffff, 1.0));
  ctx.defScene.add(new DirectionalLight(0xffffff, 1.0));
  ctx.defScene.background = new Color(0xffffff);
  animation = new AnimationMixer(gltf.scene);
  // init animtion
  const states = [
    "Idle",
    "Walking",
    "Running",
    "Dance",
    "Death",
    "Sitting",
    "Standing",
  ];
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
  const actions: { [k: string]: AnimationAction } = {};
  for (let i = 0; i < gltf.animations.length; i++) {
    const clip = gltf.animations[i];
    const action = animation.clipAction(clip);
    actions[clip.name] = action;
    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = LoopOnce;
    }
  }
  const activeAction = actions["Walking"];
  activeAction.play();
  ctx.onUpdate((clock) => {
    animation.update(clock.getDelta());
  });
}
</script>

<template>
  <CoThreeJs @load="onLoad"></CoThreeJs>
</template>

<style lang="scss" scoped></style>
