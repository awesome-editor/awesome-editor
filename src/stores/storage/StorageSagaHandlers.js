import Kefir from 'kefir'

import {setDocs} from '../docs/DocActionFunctions'
import {setTags} from '../tags/TagActionFunctions'


export default function({put, call}) {
  const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))
  const getItem = key => JSON.parse(localStorage.getItem(key))

  const sagas = {
    _storageLoadDoc(uuid) {

      return call(getItem, `doc${uuid}`)
    },

    _storageLoadTag(uuid) {

      return call(getItem, `tag${uuid}`)
    },

    storageUpdateDoc(doc) {

      return call(setItem, `doc${doc.uuid}`, doc)
    },

    storageUpdateTag(tag) {

      return call(setItem, `tag${tag.uuid}`, tag)
    },

    storageCreateDoc(doc) {

      return call(getItem, 'docList')
        .map(docList => docList || [])
        .map(docList => docList.concat([doc.uuid]))
        .flatMap(docList => call(setItem, 'docList', docList))
        .flatMap(() => sagas.storageUpdateDoc(doc))
    },

    storageCreateTag(tag) {

      return call(getItem, 'tagList')
        .map(list => list || [])
        .map(list => list.concat([tag.uuid]))
        .flatMap(list => call(setItem, 'tagList', list))
        .flatMap(() => sagas.storageUpdateTag(tag))
    },

// TODO most of this code duplication can be removed

    storageLoadDocs() {

      return call(getItem, 'docList')
        .map(list => list || [])
        .map(list => list.map(doc => sagas._storageLoadDoc(doc)))
        .flatMap(docs =>
          Kefir.merge(docs)
            .scan((docs, doc) => ({...docs, [doc.uuid]: doc}), {})
            .last())
        .flatMap(docs => put(setDocs(docs)))
    },

    storageLoadTags() {

      return call(getItem, 'tagList')
        .map(list => list || [])
        .map(list => list.map(tag => sagas._storageLoadTag(tag)))
        .flatMap(tags =>
          Kefir.merge(tags)
            .scan((tags, tag) => ({...tags, [tag.uuid]: tag}), {})
            .last())
        .flatMap(tags => put(setTags(tags)))
    }
  }

  return sagas;
}
