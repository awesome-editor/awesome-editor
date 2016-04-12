/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {Channels} from '../constants/Constants'
import {DocActionTypes} from './DocConstants'
import createReducers from '../../app/createReducers'
import {stateWithSideEffects} from '../sideeffects/StateWithSideEffects'


const initialState = {
  newDocUuid: null,
  currentDocUuid: null
}

/**
 * Supports partial doc updates
 *
 * @param docs
 * @param doc
 * @returns new docs
 * @private
 */
function upsertDoc(docs, doc) {

  const curDoc = docs[doc.uuid] || {}
  const newDoc = {...curDoc, ...doc}
  const newDocEntry = {[doc.uuid]: newDoc}
  const newDocs = {...docs, ...newDocEntry}

  return stateWithSideEffects(newDocs, upsert(newDoc))
}

/**
 * Create the doc and tell the world about it
 *
 * @param docs
 * @param doc
 * @returns {*}
 * @private
 */
function createDoc(docs, doc) {

  const upsert = upsertDoc(docs, doc)
  const newDocUuid = stateWithSideEffects({newDocUuid: doc.uuid})

  // adds newDocUuid property to doc state
  return upsert.combine(newDocUuid)
}

function setCurrentDoc(docs, currentDocUuid) {

  return stateWithSideEffects({...docs, ...{currentDocUuid}})
}

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
function addTagToDoc(docs, payload) {

  const doc = docs[payload.uuid]
  const newTag = payload.tag

  if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

    const newDoc = {...doc, tags: doc.tags.concat([newTag])}

    return upsertDoc(docs, newDoc)
  }

  return stateWithSideEffects(docs)
}

export const docs = createReducers(Channels.docs, DocActionTypes, {upsertDoc, createDoc, setCurrentDoc, addTagToDoc})
