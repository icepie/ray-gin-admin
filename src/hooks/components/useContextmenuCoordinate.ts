/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-12-01
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import { useEventListener, onClickOutside } from '@vueuse/core'

import type { BasicTarget } from '@/types'
import type {
  MaybeElementRef,
  MaybeElement,
  MaybeRefOrGetter,
} from '@vueuse/core'

/**
 *
 * @param target 绑定元素
 *
 * 右键点击元素时，获取鼠标坐标。该方法结合 NDropdown 组件使用，可以实现右键菜单功能
 *
 * @example
 * const target = ref<HTMLElement | null>(null)
 * const { x, y, show, stop } = useContextmenuCoordinate(target)
 *
 * 如果需要手动停止右键菜单，可以调用 stop 方法
 * stop()
 *
 * <NDropdown show={show} x={x} y={y} trigger="manual" placement="bottom-start" />
 */
export const useContextmenuCoordinate = (
  target: BasicTarget,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>,
) => {
  const x = ref(0) // 鼠标 x 坐标
  const y = ref(0) // 鼠标 y 坐标
  const show = ref(false) // 是否显示右键菜单

  /**
   *
   * @param evt 鼠标事件
   *
   * 鼠标右键点击事件，并且阻止默认事件
   * 设置坐标后激活右键菜单
   */
  const bindContextMenuEvent = (evt: Event) => {
    evt.preventDefault()

    show.value = false

    nextTick().then(() => {
      const { clientX, clientY } = evt as MouseEvent

      x.value = clientX
      y.value = clientY
      show.value = true
    })
  }

  /**
   *
   * 点击元素外部时，隐藏右键菜单
   */
  onClickOutside(target as MaybeElementRef<MaybeElement>, () => {
    show.value = false
  })

  /**
   *
   * 为传递 ref dom 绑定右键菜单事件
   */
  const cleanupContextmenu = useEventListener(
    target,
    'contextmenu',
    bindContextMenuEvent,
    options,
  )
  /**
   *
   * 为传递 ref dom 绑定点击事件
   */
  const cleanupClick = useEventListener(target, 'click', () => {
    show.value = false
  })

  /**
   *
   * 注销绑定的右键菜单事件、点击事件
   * 仅注销该方法绑定的事件
   */
  const stop = () => {
    cleanupContextmenu()
    cleanupClick()
  }

  return {
    stop,
    x: readonly(x),
    y: readonly(y),
    show: readonly(show),
  }
}

export type UseContextmenuCoordinateReturnType = ReturnType<
  typeof useContextmenuCoordinate
>
