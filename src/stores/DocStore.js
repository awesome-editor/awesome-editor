/*eslint no-use-before-define: 0*/
//import marmottajax from 'dimitrinicolas/marmottajax';
import {Kefir} from 'kefir'
import uuid from 'uuid'

import {cast} from '../util/Utils'
import DocData from '../types/DocData'
import kefirEmitter from '../util/kefirEmitter'


const docAction = kefirEmitter()

/**
 * payload:
 * - action.doc - new doc. uuid optional
 */
const createDocActionStream = docAction
  .filter(action => action.actionType === 'create')
  .map(action => cast(action.doc, DocData))
  .map(doc => docs => {

    docs[doc.uuid] = doc;

    return docs;
  });

/**
 * payload:
 * - action.doc - must contain the uuid but partial props ok
 */
const updateDocActionStream = docAction
  .filter(action => action.actionType === 'update')
  .map(action => docs => {

    Object.assign(docs[action.doc.uuid], action.doc)

    return docs
  });

// TODO rest of CRUD

/**
 * payload:
 * - uuid (for doc)
 * - tag
 *
 * If tag already exists, it won't add it again
 */
const addTagToDocActionStream = docAction
  .filter(action => action.actionType === 'add-tag')
  .map(action => docs => {

    const doc = docs[action.uuid]
    const newTag = action.tag

    if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

      doc.tags.push(newTag)
    }

    return docs
  })


const docsObservable = Kefir.merge([
  createDocActionStream,
  updateDocActionStream,
  addTagToDocActionStream
])
  .scan((prevDocs, modificationFunc) => modificationFunc(prevDocs), {});


export default {

  /**
   * Returns a stream that fires with the new doc and then ends
   *
   * @param doc
   * @returns {*}
   */
  createDoc: function(doc) {

    doc = doc || {}

    docAction.emit({
      actionType: 'create',
      doc: Object.assign(doc, {uuid: uuid.v4()})
    });

    return this.docObservable(doc.uuid).filter(doc => doc).take(1)
  },

  updateDoc: function(doc) {

    if (!doc.uuid) {
      throw new Error('#updateDoc needs a uuid')
    }

    docAction.emit({
      actionType: 'update',
      doc
    })

    return this.docObservable(doc.uuid).take(1)
  },

  addTagToDoc: function(docUuid, tag) {

    if (!docUuid || !tag) {
      return new Error('#addTagToDoc needs uuid and tag')
    }

    docAction.emit({
      actionType: 'add-tag',
      uuid: docUuid,
      tag
    })

    return this.docTagsObservable(docUuid).take(1)
  },

  /**
   * This will probably be deprecated since it doesn't make sense to store all docs in memory
   */
  docsObservable,

  docObservable: uuid =>
    docsObservable
      .map(docs => docs[uuid])
      .filter(doc => doc),

  docTagsObservable: uuid =>
    docsObservable
      .map(docs => docs[uuid])
      .filter(doc => doc)
      .map(doc => doc.tags)
}
