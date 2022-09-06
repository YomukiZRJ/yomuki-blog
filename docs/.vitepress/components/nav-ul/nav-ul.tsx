/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-08-05 16:14:59
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-05 16:16:37
 */
import { defineComponent } from "vue";
export default defineComponent({
  name: "NavUl",
  emits: [],
  setup(props, ctx) {
    return () => {
      return <ul></ul>;
    };
  },
});
