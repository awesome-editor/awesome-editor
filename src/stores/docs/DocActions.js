import {Channels, ActionTypes} from '../constants/Constants'
import {DocActionTypes} from './DocConstants'
import {cast} from '../../util/Utils'
import DocData from './DocData'
import uuid from 'uuid'


export function createDoc(doc) {

  const newDoc = {...cast(doc, DocData), uuid: uuid.v4()}

  return {
    channel: Channels.docs,
    actionType: ActionTypes.create,
    payload: newDoc
  }
}

export function updateDoc(doc) {

  return {
    channel: Channels.docs,
    actionType: ActionTypes.update,
    payload: doc
  }
}

export function setCurrentDoc(uuid) {

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.setCurrentDoc,
    payload: uuid
  }
}
