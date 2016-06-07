import createTypes from 'rflux/support/createTypes'

export const AppActions = createTypes([
  'systemSwitchMainWindow',
  'systemSetCurrentDocUuid',
  'systemBroadcastNewDocUuid'
])

export const AppSideEffects = createTypes([
  'systemCreateDoc'
])
