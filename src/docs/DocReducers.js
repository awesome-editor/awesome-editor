/*eslint no-use-before-define: 0*/
import {upsert} from '../persistence/PersistenceActions'
import {Channels, ActionTypes} from '../constants/Constants'
import {DocActionTypes} from './DocConstants'


function _withSideEffects(state, ...sideEffects) {

  sideEffects = sideEffects || []

  return {state, sideEffects}
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
  const newDoc = Object.assign({}, curDoc, doc)
  const newDocEntry = {[doc.uuid]: newDoc}

  return _withSideEffects({...docs, ...newDocEntry}, upsert(newDoc))
}

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
function _addTagToDoc(docs = {}, payload) {

  const doc = docs[payload.uuid]
  const newTag = payload.tag

  if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

    const newDoc = {...doc, tags: doc.tags.concat([newTag])}

    return _upsertDoc(docs, newDoc)
  }

  return _withSideEffects(docs)
}

export function docs(docs = {}, action) {

  if (action.channel === Channels.docs) {

    switch (action.actionType) {
      case ActionTypes.upsert:
        return _upsertDoc(docs, action.payload)
      case DocActionTypes.addTag:
        return _addTagToDoc(docs, action.payload)
    }
  }

  return _withSideEffects(docs)
}

