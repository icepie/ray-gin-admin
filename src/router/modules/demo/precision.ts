import { t } from '@/hooks/web/index'
import { LAYOUT } from '@/router/constant/index'

import type { AppRouteRecordRaw } from '@/router/type'

const precision: AppRouteRecordRaw = {
  path: '/precision',
  name: 'CalculatePrecision',
  component: () => import('@/views/demo/precision/index'),
  meta: {
    i18nKey: t('menu.CalculatePrecision'),
    icon: 'other',
    order: 2,
  },
}

export default precision
