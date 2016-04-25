import createTypes from '../../app/support/createTypes'

export const AppActionTypes = createTypes([
  'systemSwitchMainWindow',
  'systemSetCurrentDocUuid',
  'systemBroadcastNewDocUuid'
])

export const AppSideEffectTypes = createTypes([
  'systemCreateDoc'
])
