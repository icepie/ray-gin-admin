/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-06-05
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

/** vue3 项目里建议直接用 vueuse useStorage 方法 */

import type { CacheType } from '@/types/modules/utils'

/**
 *
 * @param key 需要设置的key
 * @param value 需要缓存的值
 */
export const setCache = <T = unknown>(
  key: string,
  value: T,
  type: CacheType = 'sessionStorage',
) => {
  const waitCacheValue = JSON.stringify(value)

  type === 'localStorage'
    ? window.localStorage.setItem(key, waitCacheValue)
    : window.sessionStorage.setItem(key, waitCacheValue)
}

/**
 *
 * @param key 需要获取目标缓存的key
 * @returns 获取缓存值
 */
export const getCache = <T>(
  key: string,
  type: CacheType = 'sessionStorage',
): T | null => {
  const data =
    type === 'localStorage'
      ? window.localStorage.getItem(key)
      : window.sessionStorage.getItem(key)

  return Object.is(data, null) ? null : JSON.parse(data as string)
}

/**
 *
 * @param key 需要删除的缓存值key
 *
 * key:
 *   - all: 删除所有缓存值
 *   - all-sessionStorage: 删除所有 sessionStorage 缓存值
 *   - all-localStorage: 删除所有 localStorage 缓存值
 */
export const removeCache = (
  key: string | 'all' | 'all-sessionStorage' | 'all-localStorage',
  type: CacheType = 'sessionStorage',
) => {
  switch (key) {
    case 'all':
      window.window.localStorage.clear()
      window.sessionStorage.clear()

      break

    case 'all-sessionStorage':
      window.sessionStorage.clear()

      break

    case 'all-localStorage':
      window.localStorage.clear()

      break

    default:
      type === 'localStorage'
        ? window.localStorage.removeItem(key)
        : window.sessionStorage.removeItem(key)
  }
}
