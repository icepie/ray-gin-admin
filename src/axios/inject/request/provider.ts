/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-06-06
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

/**
 *
 * 请求拦截器入口
 * 被注册方法执行时其实例能够保证获取到, 所以不需要做额外空判断
 * 在内部执行方法中, 已经做了边界处理
 *
 * 提供两个工具方法, 方便类型推导
 *
 * 其中 injectRequestCanceler requestErrorCanceler 方法为 axios request interceptor 方法
 */

import { axiosCanceler } from '@/axios/utils/interceptor'
import { appendRequestHeaders } from '@/axios/utils/axiosCopilot'
import { APP_CATCH_KEY } from '@/app-config'
import { getStorage } from '@/utils'

import type {
  RequestInterceptorConfig,
  FetchFunction,
  FetchErrorFunction,
} from '@/axios/types'
import type { Recordable } from '@/types'

/**
 *
 * 这里只是示例如何获取到系统缓存的 token 并且返回请求头 token 的 key 和 value
 * 尽可能的拆分每个拦截器的功能函数
 * 这是这个包存在的意义
 *
 * 当然你也可以根据 request instance 来特殊处理, 这里暂时不做演示
 */
const requestHeaderToken = (ins: RequestInterceptorConfig, mode: string) => {
  const token = getStorage<string>(APP_CATCH_KEY.token)

  if (ins.url) {
    // TODO: 根据 url 不同是否设置 token
  }

  return {
    key: 'Authorization',
    value: `Bearer ${token}`,
  }
}

/** 注入请求头信息 */
const injectRequestHeaders: FetchFunction = (ins, mode) => {
  if (ins.needAuth) {
    appendRequestHeaders(ins, [requestHeaderToken(ins, mode)])
  }

  // appendRequestHeaders(ins, [
  //   requestHeaderToken(ins, mode),
  //   {
  //     key: 'Demo-Header-Key',
  //     value: 'Demo Header Value',
  //   },
  // ])
}

/**
 *
 * @param ins 当前请求实例
 * @param mode 当前环境
 *
 * @description
 * 移除请求拦截器与注入请求拦截器。
 */
const injectRequestCanceler: FetchFunction = (ins, mode) => {
  axiosCanceler.removePendingRequest(ins) // 检查是否存在重复请求, 若存在则取消已发的请求
  axiosCanceler.addPendingRequest(ins) // 把当前的请求信息添加到 pendingRequest 表中
}

/**
 *
 * @param error 请求错误信息
 * @param mode 当前环境
 *
 * @description
 * 请求错误时候，移除请求拦截器。
 */
const requestErrorCanceler: FetchErrorFunction = (error, mode) => {
  axiosCanceler.removePendingRequest(error) // 移除请求拦截器
}

/**
 *
 * 注册请求拦截器
 * 请注意执行顺序
 */
export default {
  // 请求正常
  implementRequestInterceptorArray: [
    injectRequestHeaders,
    injectRequestCanceler,
  ],
  // 请求错误
  implementRequestInterceptorErrorArray: [requestErrorCanceler],
}
