type loginReq = {
  captcha_code?: string
  captcha_id?: string
  username: string
  password: string
}

type loginResp = {
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

type UserInfo = {
  created_at: string
  updated_at?: string
  email?: string
  username: string
  id: string
  name?: string
  phone?: string
  remark?: string
  roles: roleInfo[] | null
  status: UserStatus
}

enum UserStatus {
  Activated = 'activated',
  Disabled = 'disabled',
}

type roleInfo = {
  created_at: string
  updated_at?: string
  id: string
  name: string
  remark: string
}
