# SSE（Server-Sent Events）

SSE[[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events)]是一种服务器推送技术。

比起传统的轮询来说，SSE 可以**减少不必要的网络请求**和**占用的带宽**。

- [https://zhuanlan.zhihu.com/p/444011262](https://zhuanlan.zhihu.com/p/444011262)

## SSE

客户端主动发送一个请求给服务器，通过请求头中的`Content-Type:text/event-stream`等向服务器表明这是一个长连接。

### 自动重连并能保证数据完整性

客户端每次在接受到消息后，会把消息`id`作为内部属性`Last-Event-ID`存储起来。在连接断开时，会触发`EventSource`的`error`事件，同是自动重连，再次重连成功时，会把`Last-Event-ID`发送给服务器。（但是客户端发送过来的消息不一定会有`id`，所以为了保证数据完整性，需要客户端在每条消息带上`id`）

### SSE 的限制性

- 连接数量有限制
  - （Chrome、Firefox 每个浏览器最多 6 个连接）
- 单向的
- 只允许文本消息

## SSE 和 WebSocket 的区别

- SSE 是基于 HTTP 协议，WS 是基于 TCP 协议。
- SSE 是单向通信，WS 是双向通信。
- SSE 只能发送文本，WS 发送二进制消息。
- SSE 有自动重连（原生），以及发送随机事件。
- SSE 基于 HTTP 跨域需要设置请求头。
- 相对于 WS，SSE 的资源占用更少，更轻量。

## SSE 的适用场景

- 需要服务器单方面的消息推送。
  - 由于 SSE 只能发送文本，如果需要二进制数据，可以接受到推送消息后，再通过接口请求拿取数据。
- 实时人数

## 兼容性

不支持 IE，其他杠杠的[[can i use](https://caniuse.com/?search=EventSource)]。

## SSE 客户端使用

通过`EventSource`创建一个连接。
