/*eslint no-use-before-define: 0*/
import uuid from 'uuid'
import DocData from '../types/DocData'
import {cast} from '../util/Utils'
import AppDispatcher from '../appstate/AppDispatcher'


/**
 * Supports partial doc updates
 *
 * @param docs
 * @param doc
 * @returns {{newDocEntry: {}}}
 * @private
 */
function _upsertDoc(docs, doc) {

  const curDoc = docs[doc.uuid] || {}
  const newDocEntry = {[doc.uuid]: Object.assign({}, curDoc, doc)}

  return {...docs, ...newDocEntry}
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

  return docs
}

function docs(docs = {}, action) {

  if (action.channel === 'docs') {

    switch (action.actionType) {
      case 'create' :
        return _upsertDoc(docs, action.payload)
      case 'update' :
        return _upsertDoc(docs, action.payload)
      case 'add-tag' :
        return _addTagToDoc(docs, action.payload)
    }
  }

  return docs
}

export default {

  actions: {
    createDoc(doc) {

      const newDoc = {...cast(doc, DocData), uuid: uuid.v4()}

      AppDispatcher.emit({
        channel: 'docs',
        actionType: 'create',
        payload: newDoc
      })

      return newDoc.uuid;
    },

    updateDoc(doc) {

      AppDispatcher.emit({
        channel: 'docs',
        actionType: 'update',
        payload: doc
      })
    }
  },

  reducers: {
    _upsertDoc,
    _addTagToDoc,
    docs
  },

  observables: {
    docObservable(docsObservable) {

      return docUuid =>
        docsObservable
          .filter(docs => docs[docUuid])
          .map(docs => docs[docUuid])
    },

    docTagsObservable(docsObservable) {

      return docUuid =>
        docsObservable
          .filter(docs => docs[docUuid])
          .map(docs => docs[docUuid].tags)
    }
  }
}
