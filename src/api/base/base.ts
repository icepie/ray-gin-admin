import { request } from '@/axios'

/**
 *
 * @returns 登陆
 *
 * @medthod post
 */
export const Login = async (data: loginReq) => {
  return request<ResponseResult<loginResp>>({
    url: `http://www.singzer.cn:8040/api/v1/login`,
    method: 'post',
    data: data,
  })
}

/**
 *
 * @returns 获取验证码ID
 *
 * @medthod get
 */

export const GetCaptchaId = async () => {
  return request<ResponseResult<captchaIdResp>>({
    url: `http://www.singzer.cn:8040/api/v1/captcha/id`,
    method: 'get',
  })
}

export const GetCaptchaImageUrl = async (
  data: captchaImgReq,
): Promise<string> => {
  return `http://www.singzer.cn:8040/api/v1/captcha/image?id=${
    data.id
  }&reload=${data.reload}&ts=${new Date().getTime()}`
}

// /api/v1/current/user
export const GetCurrentUser = async () => {
  return request<ResponseResult<UserInfo>>({
    url: `http://www.singzer.cn:8040/api/v1/current/user`,
    method: 'get',
    needAuth: true,
  })
}
