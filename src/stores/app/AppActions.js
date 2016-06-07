import {Channels} from '../constants/Constants'
import {AppActionTypes, AppSideEffectTypes} from './AppConstants'


export function systemSwitchMainWindow(payload) {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.systemSwitchMainWindow,
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
    actionType: AppActionTypes.systemSetCurrentDocUuid,
    payload: uuid
  }
}

export function systemCreateDoc() {

  return {
    channel: Channels.appSideEffects,
    actionType: AppSideEffectTypes.systemCreateDoc
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
    actionType: AppActionTypes.systemBroadcastNewDocUuid,
    payload: uuid
  }
}
