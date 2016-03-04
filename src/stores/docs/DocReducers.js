/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {Channels, ActionTypes} from '../constants/Constants'
import {DocActionTypes} from './DocConstants'
import {stateWithSideEffects} from '../../app/SideEffects'


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
function _upsertDoc(docs, doc) {

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
function _createDoc(docs, doc) {

  const upsert = _upsertDoc(docs, doc)
  const newDocUuid = stateWithSideEffects({newDocUuid: doc.uuid})

  // adds newDocUuid property to doc state
  return upsert.combine(newDocUuid)
}

function _setCurrentDoc(docs, currentDocUuid) {

  return stateWithSideEffects({...docs, ...{currentDocUuid}})
}

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
function _addTagToDoc(docs, payload) {

  const doc = docs[payload.uuid]
  const newTag = payload.tag

  if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

    const newDoc = {...doc, tags: doc.tags.concat([newTag])}

    return _upsertDoc(docs, newDoc)
  }

  return stateWithSideEffects(docs)
}

export function docs(docs = initialState, action) {

  if (action.channel === Channels.docs) {

    switch (action.actionType) {
      case ActionTypes.create:
        return _createDoc(docs, action.payload)
      case ActionTypes.update:
        return _upsertDoc(docs, action.payload)
      case DocActionTypes.addTag:
        return _addTagToDoc(docs, action.payload)
      case DocActionTypes.setCurrentDoc:
        return _setCurrentDoc(docs, action.payload)
      default:
        throw new Error(`${action.actionType} not supported`)
    }
  }

  return stateWithSideEffects(docs)
}

