/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {withSideEffects} from '../../app/StateWithSideEffects'


export const initialState = {
  newDocUuid: null,
  currentDocUuid: null,
  doclistSelectedIndex: 0,
  docs: {},
  doclist: []
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

export function setCurrentDoc(docState, currentDocUuid) {

  return withSideEffects({...docState, currentDocUuid})
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

  return withSideEffects(docState)
}

export function docListSelect(docState, payload) {

  const doclistSelectedIndex = payload

  return withSideEffects({...docState, doclistSelectedIndex})
}
