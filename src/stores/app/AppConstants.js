import keyMirror from 'keymirror'

export const AppActions = keyMirror({
  systemSwitchMainWindow: true,
  systemSetCurrentDocUuid: true,
  systemBroadcastNewDocUuid: true
})

export const AppSideEffects = keyMirror({
  systemCreateDoc: true
})
