import {Channels} from '../constants/Constants'
import {DocActionTypes} from './DocConstants'
import {cast} from '../../util/Utils'
import DocData from './DocData'
import uuid from 'uuid'
import {assert} from '../../util/Utils'


export function createDoc(doc) {

  const newDoc = {...cast(doc, DocData), uuid: uuid.v4()}

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.createDoc,
    payload: newDoc
  }
}

export function updateDoc(doc) {

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.upsertDoc,
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

export function docListSelect(docInfo) {

  assert(docInfo.doclistSelectedIndex, 'Need selected index')
  assert(docInfo.uuid, 'Need uuid')

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.docListSelect,
    payload: docInfo
  }
}
