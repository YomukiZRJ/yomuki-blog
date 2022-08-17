<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 16:41:36
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 16:43:16
-->
# 20220609 - EventBus
- 记录下事件公交~
- js版的
- ts的以后，以后再说 🙈
```js
export default class {
  #eventMap;
  constructor() {
    this.#eventMap = new Map(); // 用于存储订阅事件的Map
  }
  /**
   * @description: 订阅事件
   * @param {String} name
   * @param {Function} callback
   * @return {Number} callbackId
   */
  $on(name, callback) {
    this.#setEventCallback(name, callback);
  }
  /**
   * @description: 发布事件
   * @param {*} name
   * @param {array} args
   */
  $emit(name, ...args) {
    if (!this.#eventMap.size || !this.#eventMap.has(name)) return;
    const callbackMap = this.#eventMap.get(name);
    callbackMap.forEach((val, callback) => {
      callback(...args);
      if (val === "once") {
        this.$off(name, callback);
      }
    });
  }
  /**
   * @description: 取消事件
   * @param {*} name
   * @param {*} callback
   * @return {*}
   */
  $off(name, callback) {
    if (!this.#eventMap.size || !this.#eventMap.has(name)) return;
    const callbackMap = this.#eventMap.get(name);
    if (!callbackMap.has(callback)) return;
    callbackMap.delete(callback);
    if (callbackMap.size) return;
    this.#eventMap.delete(name);
  }
  /**
   * @description: 订阅一次性事件
   * @param {*} name
   * @param {*} callback
   * @return {*}
   */
  $once(name, callback) {
    this.#setEventCallback(name, callback, "once");
  }
  /**
   * @description: 设置事件回调
   * @param {*} name
   * @param {*} callback
   * @param {*} callbackType
   * @return {*}
   */
  #setEventCallback(name, callback, callbackType = "on") {
    if (!this.#eventMap.has(name)) {
      this.#eventMap.set(name, new Map());
    }
    this.#eventMap.get(name).set(callback, callbackType);
  }
}
```