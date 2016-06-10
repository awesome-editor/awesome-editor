import createTypes from 'rflux/internal/createTypes'

export const AppActions = createTypes([
  'systemSwitchMainWindow',
  'systemSetCurrentDocUuid',
  'systemBroadcastNewDocUuid'
])

export const AppSideEffects = createTypes([
  'systemCreateDoc'
])
