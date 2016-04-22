/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {addSideEffects, sideEffects} from '../../app/StateWithSideEffects'
import {systemBroadcastNewDocUuid} from '../app/AppActions'


export const initialState = {
  docListSelectedIndex: 0,
  docs: {}
}

/**
 * Supports partial doc updates
 *
 * @param docState
 * @param doc
 * @returns new docs
 * @private
 */
export function upsertDoc(docState, doc) {

  const docs = docState.docs
  const curDoc = docs[doc.uuid] || {}
  const newDoc = {...curDoc, ...doc}
  const newDocEntry = {[doc.uuid]: newDoc}
  const newDocs = {docs: {...docs, ...newDocEntry}}

  return addSideEffects({...docState, ...newDocs}, upsert(newDoc))
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

  const broadcast = sideEffects(systemBroadcastNewDocUuid(doc.uuid))

  return upsertDoc(docState, doc).combine(broadcast)
}

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
export function addTagToDoc(docState, payload) {

  const docs = docState.docs
  const doc = docs[payload.uuid]
  const newTag = payload.tag

  if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

    const newDoc = {...doc, tags: doc.tags.concat([newTag])}

    return upsertDoc(docState, newDoc)
  }

  return docState
}

export function docListSelect(docState, {docListSelectedIndex, uuid}) {

  return addSideEffects({...docState, docListSelectedIndex})//, showDocPreview(uuid))
}
