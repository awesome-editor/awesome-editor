import Kefir from 'kefir'

import {put, call} from '../../rflux/Saga'

import {setDocs} from '../docs/DocActions'
import {setTags} from '../tags/TagActions'

const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const getItem = key => JSON.parse(localStorage.getItem(key))


export function storageUpdateDoc(doc) {

  return call(setItem, `doc${doc.uuid}`, doc)
}

export function storageUpdateTag(tag) {

  return call(setItem, `tag${tag.uuid}`, tag)
}

function _storageLoadDoc(uuid) {

  return call(getItem, `doc${uuid}`)
}

function _storageLoadTag(uuid) {

  return call(getItem, `tag${uuid}`)
}

export function storageCreateDoc(doc) {

  return call(getItem, 'docList')
    .map(docList => docList || [])
    .map(docList => docList.concat([doc.uuid]))
    .flatMap(docList => call(setItem, 'docList', docList))
    .flatMap(() => storageUpdateDoc(doc))
    .onValue(() => undefined)
}

export function storageCreateTag(tag) {

  return call(getItem, 'tagList')
    .map(list => list || [])
    .map(list => list.concat([tag.uuid]))
    .flatMap(list => call(setItem, 'tagList', list))
    .flatMap(() => storageUpdateTag(tag))
    .onValue(() => undefined)
}

// TODO most of this code duplication can be removed

export function storageLoadDocs() {

  return call(getItem, 'docList')
    .map(list => list || [])
    .map(list => list.map(doc => _storageLoadDoc(doc)))
    .flatMap(docs => Kefir.merge(docs))
    .scan((docs, doc) => ({...docs, [doc.uuid]: doc}), {})
    .last()
    .onValue(docs => put(setDocs(docs)))
}

export function storageLoadTags() {

  return call(getItem, 'tagList')
    .map(list => list || [])
    .map(list => list.map(tag => _storageLoadTag(tag)))
    .flatMap(tags => Kefir.merge(tags))
    .scan((tags, tag) => ({...tags, [tag.uuid]: tag}), {})
    .last()
    .onValue(tags => put(setTags(tags)))
}
