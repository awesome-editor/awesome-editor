import {Channels} from '../constants/Constants'
import {AppActions, AppSideEffects} from './AppConstants'


export function systemSwitchMainWindow(payload) {

  return {
    channel: Channels.app,
    actionType: AppActions.systemSwitchMainWindow,
    payload
  }
}

export function systemShowDocEditor(uuid) {

  return systemSwitchMainWindow({
    mainWindow: 'DocEditor',
    currentDocUuid: uuid
  })
}

export function systemShowDocList() {

  return systemSwitchMainWindow({
    mainWindow: 'DocList'
  })
}

export function systemSetCurrentDocUuid(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActions.systemSetCurrentDocUuid,
    payload: uuid
  }
}

export function systemCreateDoc() {

  return {
    channel: Channels.appSideEffects,
    actionType: AppSideEffects.systemCreateDoc
  }
}

/**
 * Tell the App about the newly created doc
 *
 * @param uuid
 */
export function systemBroadcastNewDocUuid(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActions.systemBroadcastNewDocUuid,
    payload: uuid
  }
}
