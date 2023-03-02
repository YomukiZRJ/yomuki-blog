<template>
  <img
    class="image-box"
    width="100%"
    :src="imgUrl"
    @click="handleClick"
  >
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string
}>()
const isFullUrl = (url: string) => /^https?:\/\//.test(url) || /^http?:\/\//.test(url)
const imgUrl = computed(() => isFullUrl(props.src) ? props.src : `http://assets.yomuki.com/md/${props.src}`)
const handleClick = () => {
  window.open(imgUrl.value)
}
</script>

<style>
.image-box {
  width: auto;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
