import {Channels} from '../constants/Constants'
import {AppActionTypes} from './AppConstants'
//import {cast} from '../../util/Utils'
//import uuid from 'uuid'


export function showDocEditor(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.switchMainWindow,
    payload: {
      mainWindow: 'DocEditor',
      currentDocUuid: uuid
    }
  }
}

export function showDocList() {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.switchMainWindow,
    payload: {
      mainWindow: 'DocList'
    }
  }
}

export function setCurrentDoc(uuid) {

  return {
    channel: Channels.app,
    actionType: AppActionTypes.setCurrentDoc,
    payload: uuid
  }
}
