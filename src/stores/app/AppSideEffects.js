import {put, listen} from 'rflux/Saga'

import {Channels} from '../constants/Constants'

import {AppActions, AppSideEffects} from './AppConstants'
import {systemShowDocEditor} from './AppActions'

import {createDoc} from '../docs/DocActions'


/**
 * 1. The listener is backwards---it's *before* the put.
 *    This is how streams work. You need to setup the listener before kicking off the action that fires the event
 * 2. docs call #systemBroadcastNewDocUuid directly. Alternative, docs could have just broadcast a general message.
 *    The downside with the latter approach is that it encourages indirect relationships...which gets bad really fast.
 */
export function systemCreateDoc() {

  listen(Channels.app, AppActions.systemBroadcastNewDocUuid)
    .take(1)
    .onValue(uuid => put(systemShowDocEditor(uuid)))

  put(createDoc())
}
