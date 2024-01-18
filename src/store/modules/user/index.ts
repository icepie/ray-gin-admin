export const piniaUserStore = defineStore('user', () => {
  const state = reactive({
    userInfo: {} as UserInfo,
    token: '',
  })

  const setUserInfo = (userInfo: UserInfo) => {
    state.userInfo = userInfo
  }

  const setToken = (token: string) => {
    state.token = token
  }

  const logout = () => {
    state.userInfo = {} as UserInfo
    state.token = ''
  }

  const refreshUserInfo = (userInfo: UserInfo) => {
    state.userInfo = userInfo
  }

  return {
    state,
    setUserInfo,
    setToken,
    logout,
    refreshUserInfo,
  }
})
