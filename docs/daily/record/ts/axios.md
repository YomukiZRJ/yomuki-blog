<!--
 * @Desc: 
 * @Author: 曾茹菁
 * @Date: 2022-08-02 11:29:55
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-08-02 13:25:02
-->
# axios的又又又封装，这次用了ts
复习一下ts嘿嘿。
## 基础server
- 入参
  - axiosConfig
  -   自定义业务配置（业务相关的请求拦截，业务相关的响应拦截,.......）
-   返回
    -   axios实例  

处理请求和响应拦截。响应拦截中会处理通用的http错误。响应拦截一旦被拦截就会进入reject状态。
```js
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const NETWORK_STATUS_MAP: { [index: number]: string } = {
    400: '错误的请求',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求错误，未找到该资源',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器端出错',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'http版本不支持该请求'
}
/**
 * 自定义的响应拦截返回类型
 */
export interface IBusinessInterceptorsResponse {
    flag: boolean;
    msg: string
}
/**
 * 自定义请求拦截fn
 */
type interceptorsRequestType = (config: AxiosRequestConfig) => AxiosRequestConfig;
/**
 * 自定义响应拦截fn
 */
type interceptorsResponseType = (response: AxiosResponse) => IBusinessInterceptorsResponse
/**
 * 业务类配置
 */
export interface IBusinessConfig {
    interceptorsRequest?: interceptorsRequestType;
    interceptorsResponse?: interceptorsResponseType;
}
/**
 * @description: useuseuse
 * @param {AxiosRequestConfig} config
 * @param {IBusinessConfig} businessConfig
 * @return {*}
 */
const useServer = (config: AxiosRequestConfig, businessConfig?: IBusinessConfig) => {
    const server: AxiosInstance = axios.create(config);
    /**
     * 请求拦截
     */
    server.interceptors.request.use((config: AxiosRequestConfig) => {
        // 全局请求拦截
        // 自定义请求拦截 业务头，权限啥的塞这哟
        if (businessConfig?.interceptorsRequest) {
            config = businessConfig.interceptorsRequest(config)
        }

        return config
    })
    /**
     * 响应拦截 如果被拦截了 就reject啦
     */
    server.interceptors.response.use((response: AxiosResponse) => {
        // 全局响应拦截器
        const { status } = response
        let message = ''
        // http异常
        if (status < 200 && status >= 300) {
            message = NETWORK_STATUS_MAP?.[status] || `其他连接错误 -- ${status}`
            // ```````这里应该有个msg弹出提示
            return Promise.reject(message)
        }
        if (businessConfig?.interceptorsResponse) {
            const { flag, msg } = businessConfig.interceptorsResponse(response)
            if (!flag) {
                // ````````这里应该有个msg弹出提示
                return Promise.reject(msg)
            }
        }
        return Promise.resolve(response.data)
    }, (err) => {
        // `````````这里应该有个msg弹出提示
        return Promise.reject(err)
    })
    return server
}
export default useServer
```

## 拓展API
封装post，get等基础请求，当需要进行传不同数据类型的请求可能会用到它。
- 入参
  - axios实例
- 返回
  - post,get.....

```js
import { AxiosInstance } from "axios"

const useApi = (server: AxiosInstance) => {
    /**
     * @description: 平平无奇get
     * @param {string} url
     * @param {object} params
     * @return {Promise}
     */
    function get(url: string, params: { [index: string]: any } = {}) {
        return server.get(url, {
            params,
        })
    }
    /**
 * @description: 平平无奇post
 * @param {string} url
 * @param {object} data
 * @return {Promise}
 */
    function post(url: string, data: { [index: string]: any } = {}) {
        return server.post(url, {
            data
        })
    }
    /**
     * @description: post formdata数据 传对象啊 自动转formdata啦 我也不知道为什么功能相似的接口有的要用json有的要用formdata
     * @param {string} url
     * @param {object} data
     * @return {*}
     */
    function postFormData(url: string, data: { [index: string]: any } = {}) {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return server.post(url, {
            data,
            headers: { "Content-Type": 'multipart/form-data', }
        })
    }
    // ········其他什么传参格式不同啦，接受格式不同啦的全塞这
    return {
        post, get, postFormData
    }
}

export default useApi
```
## 基础使用
```js
import useServer from "@/libs/axios";
import useApi from "@/libs/axios/useApi";

const server = useServer({
    baseURL: '',
    timeout: 6000
})
const { post, get } = useApi(server)

export {
    post, get
}
```

## 取消请求的拓展
- 当有重复url请求时，取消上一个请求~简单整一个，按需细化~
- 可以用在useServer的拦截里，也可以用在useApi的具体请求中~
```js
import axios from "axios"

export default () => {
    const cancelRequestMap: Map<string, () => void> = new Map();

    function getCancelToken(url: string) {
        if (cancelRequestMap.has(url)) {
            // 重复了 取消上一个请求
            const cancelFn = cancelRequestMap.get(url)
            cancelFn && cancelFn()
            cancelRequestMap.delete(url)
            // 再插入新的请求
            return pushCancel(url)
        }
        return pushCancel(url)
    }
    function pushCancel(url: string) {
        const cancelToken = new axios.CancelToken(c => {
            cancelRequestMap.set(url, c)
        })
        return cancelToken
    }
    function delCancel(url: string) {
        cancelRequestMap.delete(url)
    }
    return {
        getCancelToken, delCancel
    }
}
```