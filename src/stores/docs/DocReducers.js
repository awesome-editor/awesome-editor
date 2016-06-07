/*eslint no-use-before-define: 0*/
import {storageUpdateDoc, storageCreateDoc} from '../storage/StorageActions'
import {addSideEffects, sideEffects} from 'rflux/StateWithSideEffects'
import {systemBroadcastNewDocUuid} from '../app/AppActions'


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

  return addSideEffects({...docState, ...newDocs}, storageUpdateDoc(newDoc))
}

/**
 * Create the doc and tell the world about it
 *
 * @param docState
 * @param doc
 * @returns {*}
 * @private
 */
export function createDoc(docState, doc) {

  const create = sideEffects(storageCreateDoc(doc))
  const broadcast = sideEffects(systemBroadcastNewDocUuid(doc.uuid))

  return upsertDoc(docState, doc)
    .combine(create)
    .combine(broadcast)
}

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
export function addTagToDocResult(docState, {tag, docUuid}, result) {

  const docs = docState.docs
  const doc = docs[docUuid]

  if (!doc.tags.find(_tag => _tag.uuid === tag.uuid)) {

    const newDoc = {...doc, tags: doc.tags.concat([tag])}

    return upsertDoc(docState, newDoc).combine(sideEffects(result(newDoc)))
  }

  return addSideEffects(docState, result(doc))
}

/**
 * You probably don't ever want to call this directly
 *
 * @param docState
 * @param docs
 * @returns {{docs: {}}}
 */
export function setDocs(docState, docs) {

  return {...docState, docs: {...docs}}
}
