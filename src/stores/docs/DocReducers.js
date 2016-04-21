/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {withSideEffects} from '../../app/StateWithSideEffects'
import {showDocPreview} from '../app/AppActions'


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

  return withSideEffects({...docState, ...newDocs}, upsert(newDoc))
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

  const upsert = upsertDoc(docState, doc)
  const newDocUuid = withSideEffects({newDocUuid: doc.uuid})

  // adds newDocUuid property to doc state
  return upsert.combine(newDocUuid)
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

  return withSideEffects({...docState, docListSelectedIndex}, showDocPreview(uuid))
}
