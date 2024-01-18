import { piniaUserStore } from '../modules/user'

export const useUserInfoGetters = () => {
  const variable = piniaUserStore()

  /**
   *
   * @remark 获取用户信息
   */

  // const getUserInfo = computed(() => variable.state.userInfo)

  // refreshUserInfo

  const getUserInfo = computed(() => variable.state.userInfo)

  const getToken = computed(() => variable.state.token)

  return {
    getUserInfo,
    getToken,
  }
}

export const useUserInfoActions = () => {
  const { setUserInfo, setToken, logout, refreshUserInfo } = piniaUserStore()

  return {
    setUserInfo,
    setToken,
    refreshUserInfo,
    logout,
  }
}
