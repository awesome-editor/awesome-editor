import {Channels} from '../constants/Constants'
import {AppActionTypes} from './AppConstants'
//import {cast} from '../../util/Utils'
//import uuid from 'uuid'


export function showDocPreview(uuid) {

  return {
    channel: Channels.docs,
    actionType: AppActionTypes.showDocPreview,
    payload: uuid
  }
}
