/**
 *
 * @author Ray <https://github.com/XiaoDaiGua-Ray>
 *
 * @date 2023-08-30
 *
 * @workspace ray-template
 *
 * @remark 今天也是元气满满撸代码的一天
 */

import { NSpace, NCard, NButton } from 'naive-ui'
import RayQRcode from '@/components/RayQRCode/index'

import LOGO from '@/assets/images/ray.svg'

import type { QRCodeStatus, QRCodeInst } from '@/components/RayQRCode/index'

const RQRCode = defineComponent({
  name: 'RQRCode',
  setup() {
    const qrcodeText = ref('ray template yes')
    const qrcodeStatus = ref<QRCodeStatus | undefined>()
    const rayQRCodeRef = ref<QRCodeInst>()

    return {
      qrcodeText,
      qrcodeStatus,
      rayQRCodeRef,
    }
  },
  render() {
    return (
      <NSpace wrapItem={false}>
        <NCard>
          <h2>
            基于 awesome-qr 进行封装，支持 LOGO、gif、backgroundImage 等属性。
          </h2>
          <h2>该组件会自动监听文本内容变化，然后重新渲染（watchText）</h2>
          <h2>具体使用请参考 props 配置项</h2>
        </NCard>
        <NCard title="基础二维码">
          <NSpace>
            <RayQRcode text="ray template yes" />
            <RayQRcode text="ray template yes" logoImage={LOGO} />
          </NSpace>
        </NCard>
        <NCard title="状态二维码">
          <NSpace>
            <RayQRcode
              text="ray template yes"
              logoImage={LOGO}
              status="error"
              onReload={() => {
                window.$message.error('relod props')
              }}
            />
            <RayQRcode
              text="ray template yes"
              logoImage={LOGO}
              status="loading"
            />
          </NSpace>
        </NCard>
        <NCard title="监听内容变化">
          <NSpace vertical>
            <NSpace>
              <NButton
                onClick={() => {
                  this.qrcodeStatus = 'loading'

                  setTimeout(() => {
                    this.qrcodeText = 'text updated: ' + new Date().getTime()
                    this.qrcodeStatus = void 0
                  }, 1000)
                }}
              >
                更新二维码内容
              </NButton>
              <NButton
                onClick={() => {
                  this.rayQRCodeRef?.downloadQRCode()
                }}
              >
                下载二维码
              </NButton>
            </NSpace>
            <NSpace>
              <RayQRcode
                text={this.qrcodeText}
                status={this.qrcodeStatus}
                logoImage={LOGO}
                ref="rayQRCodeRef"
              />
              当前二维码内容：{this.qrcodeText}
            </NSpace>
          </NSpace>
        </NCard>
      </NSpace>
    )
  },
})

export default RQRCode