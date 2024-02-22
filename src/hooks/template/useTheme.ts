/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-11-30
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import { useSettingActions, useSettingGetters } from '@/store'
import { useI18n } from '@/hooks'
import { APP_THEME } from '@/app-config'

const setThemeOverrides = (theme: boolean) => {
  const { getPrimaryColorOverride } = useSettingGetters()
  const { updateSettingState } = useSettingActions()

  updateSettingState(
    'primaryColorOverride',
    theme
      ? Object.assign(
          {},
          getPrimaryColorOverride.value,
          APP_THEME.appNaiveUIThemeOverrides.dark,
          APP_THEME.appNaiveUIThemeOverridesCommon.dark,
        )
      : Object.assign(
          {},
          getPrimaryColorOverride.value,
          APP_THEME.appNaiveUIThemeOverrides.light,
          APP_THEME.appNaiveUIThemeOverridesCommon.light,
        ),
  )
}

export const useTheme = () => {
  /**
   *
   * @description
   * 获取当前主题色与主题色描述
   * 并且描述会根据当前语言环境自动切换
   *
   * @example
   * getAppTheme() // { theme: true, themeLabel: '暗色' | 'Dark' }
   * getAppTheme() // { theme: false, themeLabel: '亮色' | 'Light' }
   */
  const getAppTheme = () => {
    const { getAppTheme } = useSettingGetters()
    const { t } = useI18n()

    return {
      theme: getAppTheme.value,
      themeLabel: getAppTheme.value
        ? t('headerSettingOptions.ThemeOptions.Dark')
        : t('headerSettingOptions.ThemeOptions.Light'),
    }
  }

  /**
   *
   * @description
   * 切换至暗色主题
   *
   * @example
   * changeDarkTheme()
   */
  const changeDarkTheme = () => {
    const { updateSettingState } = useSettingActions()

    updateSettingState('appTheme', true)
    setThemeOverrides(true)
  }

  /**
   *
   * @description
   * 切换至明色主题
   *
   * @example
   * changeLightTheme()
   */
  const changeLightTheme = () => {
    const { updateSettingState } = useSettingActions()

    updateSettingState('appTheme', false)
    setThemeOverrides(false)
  }

  /**
   *
   * @param theme 当前主题色
   *
   * @description
   * 当前主题有明暗两套
   *
   * @example
   * 假设当前主题为暗色主题
   * toggleTheme() // 切换至明色主题
   * 假设当前主题为明色主题
   * toggleTheme() // 切换至暗色主题
   */
  const toggleTheme = () => {
    const { theme } = getAppTheme()
    const { updateSettingState } = useSettingActions()

    updateSettingState('appTheme', !theme)
    setThemeOverrides(!theme)
  }

  return {
    changeDarkTheme,
    changeLightTheme,
    toggleTheme,
    getAppTheme,
  }
}

export type UseThemeReturnType = ReturnType<typeof useTheme>
