/*eslint no-use-before-define: 0*/
import {state} from 'rflux/stores/StateWithSideEffects'

import {storageUpdateDoc, storageCreateDoc} from '../storage/StorageSagaActionFunctions'
import {systemBroadcastNewDocUuid} from '../app/AppActionFunctions'
import {createTagResult} from '../tags/TagActionFunctions'


const _docWithTag = (doc, tag) => ({...doc, tags: doc.tags.concat([tag])})

export const initialState = {
  docListSelectedIndex: 0,
  docs: {}
}

export function upsertDoc(docState, doc) {

  const docs = docState.docs
  const cur = docs[doc.uuid] || {}
  const newDoc = {...cur, ...doc}
  const newDocEntry = {[doc.uuid]: newDoc}
  const newDocs = {docs: {...docs, ...newDocEntry}}
  const storageUpdate = storageUpdateDoc(newDoc)

  return state({...docState, ...newDocs}).addSideEffects(storageUpdate)
}

/**
 * Create the doc and tell the world about it
 *
 * @param {*} docState
 * @param {DocData} doc
 * @returns {StateWithSideEffects} doc state
 */
export function createDoc(docState, doc) {

  const storageCreate = storageCreateDoc(doc)
  // TODO this can be replaced with #result
  const broadcast = systemBroadcastNewDocUuid(doc.uuid)

  return upsertDoc(docState, doc).addSideEffects(storageCreate, broadcast)
}

/**
 * The important thing is to always return a result;
 * otherwise the result observable won't work.
 *
 * If tag already exists, it won't add it again
 *
 * @param {*} docState
 * @param {{TagData, String}} tag, doc uuid
 * @param {Function} result
 * @returns {StateWithSideEffects} doc state
 */
export function addTagToDoc(docState, {tag, docUuid}, result) {

  const docs = docState.docs
  const doc = docs[docUuid]

  // if tag is brand new, add it to store and add it to doc
  if (!tag.uuid) {

    const createTagMessage = createTagResult(tag)
    const newDoc = _docWithTag(doc, tag)

    return upsertDoc(docState, newDoc).addSideEffects(createTagMessage, result(newDoc))
  }
  // else add tag to doc only if it's not already there
  else if (!doc.tags.find(_tag => _tag.uuid === tag.uuid)) {

    const newDoc = _docWithTag(doc, tag)

    return upsertDoc(docState, newDoc).addSideEffects(result(newDoc))
  }

  return state(docState).addSideEffects(result(doc))
}

/**
 * You probably don't ever want to call this directly
 *
 * @param {*} docState
 * @param {DocData} docs
 * @returns {StateWithSideEffects} doc state
 */
export function setDocs(docState, docs) {

  return {...docState, docs: {...docs}}
}
