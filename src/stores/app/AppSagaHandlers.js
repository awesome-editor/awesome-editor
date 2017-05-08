import {Channels} from '../constants/Constants'

import {createDoc} from '../docs/DocActionFunctions'

import {AppActions} from './AppConstants'
import {systemSwitchMainWindow} from './AppActionFunctions'
import {sagas} from '../index'


const {put, listen} = sagas

/**
 * docs call #systemBroadcastNewDocUuid directly. Alternative, docs could have just broadcast a general message.
 * The downside with the latter approach is that it encourages indirect relationships...which gets bad really fast.
 */
export function systemCreateDoc() {

  return put(createDoc())
    .flatMap(() => listen(Channels.app, AppActions.systemBroadcastNewDocUuid))
    .map(uuid => put(systemSwitchMainWindow('DocEditor', uuid)))
}
