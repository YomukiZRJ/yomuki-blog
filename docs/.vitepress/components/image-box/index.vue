<template>
  <a-image width="100%" :src="src" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  src: string;
}>();
</script>
<style>
.ant-image-preview-img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
