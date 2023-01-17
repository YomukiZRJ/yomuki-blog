<template>
  <a-image
    width="100%"
    :src="imgUrl"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string
  assets: string
}>()
const imgUrl = computed(() => props.src ? props.src : `http://assets.yomuki.com/md/${props.assets}`)
</script>

<style>
.ant-image-preview-img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
