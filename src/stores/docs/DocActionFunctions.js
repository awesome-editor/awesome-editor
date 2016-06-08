import {Channels} from '../constants/Constants'
import {DocActions} from './DocConstants'
import {cast} from '../../util/Utils'
import DocData from './DocData'
import uuid from 'uuid'


export function createDoc(doc) {

  const newDoc = {...cast(doc, DocData), uuid: uuid.v4()}

  return {
    channel: Channels.docs,
    actionType: DocActions.createDoc,
    payload: newDoc
  }
}

export function upsertDoc(doc) {

  return {
    channel: Channels.docs,
    actionType: DocActions.upsertDoc,
    payload: doc
  }
}

export function setDocs(docs) {

  return {
    channel: Channels.docs,
    actionType: DocActions.setDocs,
    payload: docs
  }
}

export function addTagToDocResult(tag, docUuid) {

  return {
    channel: Channels.docs,
    actionType: DocActions.addTagToDocResult,
    payload: {tag, docUuid}
  }
}
