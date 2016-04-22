import {Channels} from '../constants/Constants'
import {AppActionTypes, AppSideEffectTypes} from './AppConstants'


export function systemShowDocEditor(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.systemSwitchMainWindow,
    payload: {
      mainWindow: 'DocEditor',
      currentDocUuid: uuid
    }
  }
}

export function systemShowDocList() {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.systemSwitchMainWindow,
    payload: {
      mainWindow: 'DocList'
    }
  }
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
    paylod: uuid
  }
}
