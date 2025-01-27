import { NForm, NFormItem, NInput, NButton, NImage, NCheckbox } from 'naive-ui'

import { setStorage } from '@/utils'
import { useI18n, useAppRoot } from '@/hooks'
import { APP_CATCH_KEY } from '@/app-config'
import { setVariable, getVariableToRefs } from '@/global-variable'
import { useSigningActions } from '@/store'

import type { FormInst } from 'naive-ui'
import {
  Login,
  GetCaptchaId,
  GetCaptchaImageUrl,
  GetCurrentUser,
} from '@/api/base/base'
import { MD5 } from 'crypto-js'

import './index.scss'

export default defineComponent({
  name: 'RSigning',
  setup() {
    const loginFormRef = ref<FormInst>()

    const { t } = useI18n()
    const { signing } = useSigningActions()
    const { getRootPath } = useAppRoot()
    const globalSpinning = getVariableToRefs('globalSpinning')

    const useSigningForm = () => ({
      name: 'admin',
      pwd: 'abc-123',
      rememberMe: false,
      captcha: '',
    })

    // 验证码ID
    const captchaId = ref<string>()

    // reload Flag
    const reloadFlag = ref<0 | 1>(0)

    const captchaImageUrl = ref<string>()

    const router = useRouter()

    const signingForm = ref(useSigningForm())

    const rules = {
      name: {
        required: true,
        message: t('views.login.index.NamePlaceholder'),
        trigger: ['blur', 'input'],
      },
      pwd: {
        required: true,
        message: t('views.login.index.PasswordPlaceholder'),
        trigger: ['blur', 'input'],
      },
      captcha: {
        required: true,
        message: t('views.login.index.CaptchaPlaceholder'),
        trigger: ['blur', 'input'],
      },
    }

    // reLoad captcha
    const reLoadCaptcha = async () => {
      if (captchaId.value) {
        if (reloadFlag.value === 0) {
          reloadFlag.value = 1
        } else {
          reloadFlag.value = 0
          // 获取验证码
          const getCaptchaIdData = await GetCaptchaId()

          if (getCaptchaIdData.success) {
            captchaId.value = getCaptchaIdData.data!.captcha_id
          }

          if (!captchaId.value) {
            window.$message.error('获取验证码失败')
            return
          }
        }
      } else {
        // 获取验证码
        const getCaptchaIdData = await GetCaptchaId()

        if (getCaptchaIdData.success) {
          captchaId.value = getCaptchaIdData.data!.captcha_id
        }

        if (!captchaId.value) {
          window.$message.error('获取验证码失败')
          return
        }
      }

      // 获取验证码图片
      captchaImageUrl.value = await GetCaptchaImageUrl({
        id: captchaId.value,
        reload: reloadFlag.value,
      })
    }

    onMounted(async () => {
      await reLoadCaptcha()
    })

    /** 普通登陆形式 */
    const handleLogin = () => {
      loginFormRef.value?.validate((valid) => {
        if (!valid) {
          setVariable('globalSpinning', true)

          // try {
          Login({
            username: signingForm.value.name,
            password: MD5(signingForm.value.pwd).toString(),
            captcha_id: captchaId.value,
            captcha_code: signingForm.value.captcha,
          })
            .then((res) => {
              // console.log(res)

              res.data?.access_token &&
                setStorage(APP_CATCH_KEY.token, res.data?.access_token)

              GetCurrentUser()
                .then((res) => {
                  console.log(res)
                  // res.data && setStorage(APP_CATCH_KEY.signing, res.data)
                  window.$message.success(`欢迎${res.data?.name}登陆~`)
                  router.push(getRootPath.value)
                })
                .catch(() => {
                  window.$message.error('获取用户信息失败')
                })

              // res.data?. && setStorage(APP_CATCH_KEY.token, res.data?.token)

              // setStorage(APP_CATCH_KEY.token, 'tokenValue')
            })
            .catch(async (err) => {
              if (err.error?.detail) {
                window.$message.error(err.error?.detail)
              } else {
                window.$message.error(t('common.ReqError'))
              }
              console.log(err)

              reloadFlag.value = 1
              await reLoadCaptcha()
            })

          setVariable('globalSpinning', false)
          // } catch (error) {
          //   console.log(error)
          // }

          //   signing(signingForm.value)
          //     .then((res) => {
          //       if (res.code === 0) {
          //         setTimeout(() => {
          //           setVariable('globalSpinning', false)
          //           window.$message.success(`欢迎${signingForm.value.name}登陆~`)
          //           setStorage(APP_CATCH_KEY.token, 'tokenValue')
          //           setStorage(APP_CATCH_KEY.signing, res.data)
          //           router.push(getRootPath.value)
          //         }, 2 * 1000)
          //       }
          //     })
          //     .catch(() => {
          //       window.$message.error('不可以这样哟, 不可以哟')
          //     })
        }
      })
    }

    return {
      reLoadCaptcha,
      signingForm,
      loginFormRef,
      handleLogin,
      captchaId,
      captchaImageUrl,
      rules,
      globalSpinning,
    }
  },
  render() {
    const { $t, globalSpinning } = this

    return (
      <NForm model={this.signingForm} ref="loginFormRef" rules={this.rules}>
        <NFormItem label={$t('views.login.index.Name')} path="name">
          <NInput
            v-model:value={this.signingForm.name}
            placeholder={$t('views.login.index.NamePlaceholder')}
          />
        </NFormItem>
        <NFormItem label={$t('views.login.index.Password')} path="pwd">
          <NInput
            v-model:value={this.signingForm.pwd}
            type="password"
            showPasswordOn="click"
            placeholder={$t('views.login.index.PasswordPlaceholder')}
          />
        </NFormItem>

        {/* 验证码  */}

        <NFormItem
          v-show={this.captchaId}
          label={$t('views.login.index.Captcha')}
          path="captcha"
        >
          <NInput
            v-model:value={this.signingForm.captcha}
            placeholder={$t('views.login.index.CaptchaPlaceholder')}
          />
          <div
            onClick={this.reLoadCaptcha}
            class="captcha"
            // style={{
            //   display: 'flex',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            //   marginLeft: '12px',
            //   cursor: 'pointer',
            // }}
          >
            <NImage
              src={this.captchaImageUrl}
              class="captcha img"
              // style={{
              //   backgroundColor: '#fff',
              //   border: '1px solid #ccc',
              // }}
              preview-disabled
              onError={() => {
                this.captchaImageUrl = ''
                window.$message.error('获取验证码失败')
              }}
              width={80}
              lazy
            />
          </div>
        </NFormItem>

        <NButton
          style={['width: 100%', 'margin-to: 18px']}
          type="primary"
          onClick={this.handleLogin.bind(this)}
          loading={globalSpinning}
        >
          {$t('views.login.index.Login')}
        </NButton>
        <NCheckbox
          style={['margin-top: 18px']}
          v-model:checked={this.signingForm.rememberMe}
        >
          {$t('views.login.index.RememberMe')}
        </NCheckbox>
      </NForm>
    )
  },
})
