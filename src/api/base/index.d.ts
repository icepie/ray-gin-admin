type loginReq = {
  captcha_code?: string
  captcha_id?: string
  username: string
  password: string
}

type loginTokenResp = {
  access_token: string
  expires_at: number
  token_type: string
}

type captchaIdResp = {
  captcha_id: string
}

type captchaImgReq = {
  id: string
  reload: 1 | 0
}
