import {Channels} from '../constants/Constants'
import {AppSideEffects} from './AppConstants'

export function systemCreateDoc() {

  return {
    channel: Channels.appSagas,
    actionType: AppSideEffects.systemCreateDoc
  }
}
