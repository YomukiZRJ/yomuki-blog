<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-05 16:53:54
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 17:27:15
-->
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
