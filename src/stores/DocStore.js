/*eslint no-use-before-define: 0*/
//import marmottajax from 'dimitrinicolas/marmottajax';
import {Kefir} from 'kefir'
import uuid from 'uuid'

import {cast} from '../util/Utils'
import DocData from '../types/DocData'
import AppDispatcher from '../appstate/AppDispatcher'


const docChannelObservable = AppDispatcher.filter(action => action.channel === 'doc')

/**
 * payload:
 * - action.doc - new doc. uuid optional
 */
const createDocActionObservable = docChannelObservable
  .filter(action => action.actionType === 'create')
  .map(action => cast(action.doc, DocData))
  .map(doc => docs => {

    docs.current = doc.uuid
    docs[doc.uuid] = doc;

    return docs;
  });

/**
 * payload:
 * - action.doc - must contain the uuid but partial props ok
 */
const updateDocActionObservable = docChannelObservable
  .filter(action => action.actionType === 'update')
  .map(action => docs => {

    const doc = action.doc

    docs.current = doc.uuid
    Object.assign(docs[doc.uuid], doc)

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
const addTagToDocActionObservable = docChannelObservable
  .filter(action => action.actionType === 'add-tag')
  .map(action => docs => {

    const doc = docs[action.uuid]
    const newTag = action.tag

    if (!doc.tags.find(tag => tag.uuid === newTag.uuid)) {

      docs.current = doc.uuid
      doc.tags.push(newTag)
    }

    return docs
  })


const docsObservable = Kefir.merge([
  createDocActionObservable,
  updateDocActionObservable,
  addTagToDocActionObservable
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

    AppDispatcher.emit({
      channel: 'doc',
      actionType: 'create',
      doc: Object.assign(doc, {uuid: uuid.v4()})
    });

    return this.docObservable(doc.uuid).filter(doc => doc).take(1)
  },

  updateDoc: function(doc) {

    if (!doc.uuid) {
      throw new Error('#updateDoc needs a uuid')
    }

    AppDispatcher.emit({
      channel: 'doc',
      actionType: 'update',
      doc
    })

    return this.docObservable(doc.uuid).take(1)
  },

  addTagToDoc: function(docUuid, tag) {

    if (!docUuid || !tag) {
      return new Error('#addTagToDoc needs uuid and tag')
    }

    AppDispatcher.emit({
      channel: 'doc',
      actionType: 'add-tag',
      uuid: docUuid,
      tag
    })

    return this.docTagsObservable(docUuid).take(1)
  },

  docsObservable,

  docObservable: uuid =>
    docsObservable
      .map(docs => docs[uuid])
      .filter(doc => doc),

  docTagsObservable: uuid =>
    docsObservable
      .map(docs => docs[uuid])
      .filter(doc => doc)
      .map(doc => doc.tags),

  latestUpdate: docsObservable.map(docs => docs.latestUpdate).filter(uuid => uuid)
}
