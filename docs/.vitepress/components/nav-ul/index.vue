<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      {{ item.text }}
      <ul>
        <li v-for="(c, i) in item.items" :key="i">
          <a :href="c.link + '.html'">{{ c.text }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { INav } from "./type";
const props = defineProps<{
  list: INav[];
}>();
</script>
