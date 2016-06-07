import {Channels} from '../constants/Constants'
import {DocActionTypes, DocSideEffectTypes} from './DocConstants'
import {cast} from '../../util/Utils'
import DocData from './DocData'
import uuid from 'uuid'


export function createDoc(doc) {

  const newDoc = {...cast(doc, DocData), uuid: uuid.v4()}

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.createDoc,
    payload: newDoc
  }
}

export function upsertDoc(doc) {

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.upsertDoc,
    payload: doc
  }
}

export function setDocs(docs) {

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.setDocs,
    payload: docs
  }
}

export function addTagToDocResult(tag, docUuid) {

  return {
    channel: Channels.docs,
    actionType: DocActionTypes.addTagToDocResult,
    payload: {tag, docUuid}
  }
}

export function addTagToDoc(tag, docUuid) {

  return {
    channel: Channels.docSideEffects,
    actionType: DocSideEffectTypes.addTagToDoc,
    payload: {tag, docUuid}
  }
}
