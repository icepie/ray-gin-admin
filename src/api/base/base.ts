import { request } from '@/axios'

/**
 *
 * @returns 登陆
 *
 * @medthod post
 */
export const Login = async (data: loginReq) => {
  return request<ResponseResult<loginReq>>({
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

export const getCaptchaId = async () => {
  return request<ResponseResult<captchaIdResp>>({
    url: `http://www.singzer.cn:8040/api/v1/captcha/id`,
    method: 'get',
  })
}

export const getCaptchaImageUrl = async (
  data: captchaImgReq,
): Promise<string> => {
  return `http://www.singzer.cn:8040/api/v1/captcha/image?id=${
    data.id
  }&reload=${data.reload}&ts=${new Date().getTime()}`
}
