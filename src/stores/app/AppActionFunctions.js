import {Channels} from '../constants/Constants'
import {AppActions} from './AppConstants'
import {assert} from '../../util/Utils'


export function systemSwitchMainWindow(window, uuid) {

  assert(window === 'DocEditor' || window === 'DocList', 'Passed wrong arg to #systemSwitchMainWindow')

  return {
    channel: Channels.app,
    actionType: AppActions.systemSwitchMainWindow,
    payload: {
      mainWindow: window,
      currentDocUuid: uuid
    }
  }
}

export function systemSetCurrentDocUuid(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActions.systemSetCurrentDocUuid,
    payload: uuid
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
