import { NForm, NFormItem, NInput, NButton, NImage } from 'naive-ui'

import { setStorage } from '@/utils'
import { useI18n } from '@/hooks/web'
import { APP_CATCH_KEY } from '@/app-config/appConfig'
import { setVariable, getVariableToRefs } from '@/global-variable'
import { useSigningActions } from '@/store'
import { useAppRoot } from '@/hooks/template'

import type { FormInst } from 'naive-ui'
import { getCaptchaId, getCaptchaImageUrl } from '@/api/base/base'

export default defineComponent({
  name: 'RSigning',
  setup() {
    const loginFormRef = ref<FormInst>()

    const { t } = useI18n()
    const { signing } = useSigningActions()
    const { getRootPath } = useAppRoot()
    const globalSpinning = getVariableToRefs('globalSpinning')

    const useSigningForm = () => ({
      name: 'Ray Admin',
      pwd: '123456',
      captcha: '',
    })

    // 验证码ID
    const captchaId = ref<string>()

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

    onMounted(async () => {
      // 获取验证码
      const getCaptchaIdData = await getCaptchaId()

      if (getCaptchaIdData.success) {
        captchaId.value = getCaptchaIdData.data!.captcha_id
      }

      if (!captchaId.value) {
        window.$message.error('获取验证码失败')
        return
      }

      // 获取验证码图片
      captchaImageUrl.value = await getCaptchaImageUrl({
        id: captchaId.value,
        reload: 0,
      })
    })

    /** 普通登陆形式 */
    const handleLogin = () => {
      loginFormRef.value?.validate((valid) => {
        if (!valid) {
          setVariable('globalSpinning', true)

          signing(signingForm.value)
            .then((res) => {
              if (res.code === 0) {
                setTimeout(() => {
                  setVariable('globalSpinning', false)

                  window.$message.success(`欢迎${signingForm.value.name}登陆~`)

                  setStorage(APP_CATCH_KEY.token, 'tokenValue')
                  setStorage(APP_CATCH_KEY.signing, res.data)

                  router.push(getRootPath.value)
                }, 2 * 1000)
              }
            })
            .catch(() => {
              window.$message.error('不可以这样哟, 不可以哟')
            })
        }
      })
    }

    return {
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
          v-if={this.captchaId}
          label={$t('views.login.index.Captcha')}
          path="captcha"
        >
          <NInput
            v-model:value={this.signingForm.captcha}
            placeholder={$t('views.login.index.CaptchaPlaceholder')}
          />

          <NImage
            src={this.captchaImageUrl}
            // style="background-color: #fff; margin-left: 10px"
            style={[
              'background-color: #fff',
              'margin-left: 10px',
              'cursor: pointer',
            ]}
            width={90}
            lazy
          />
        </NFormItem>

        <NButton
          style={['width: 100%', 'margin-to: 18px']}
          type="primary"
          onClick={this.handleLogin.bind(this)}
          loading={globalSpinning}
        >
          {$t('views.login.index.Login')}
        </NButton>
      </NForm>
    )
  },
})
