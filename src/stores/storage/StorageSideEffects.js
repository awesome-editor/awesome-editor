import Kefir from 'kefir'

import {put, call} from '../../app/Saga'

import {Channels} from '../constants/Constants'
import registerSideEffects from '../../app/registerSideEffects'

import {StorageSideEffectTypes} from './StorageContants'
import {setDocs} from '../docs/DocActions'

const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const getItem = key => JSON.parse(localStorage.getItem(key))


export function storageUpdateDoc(doc) {

  return call(setItem, `doc${doc.uuid}`, doc)
}

export function storageLoadDoc(uuid) {

  return call(getItem, `doc${uuid}`)
}

export function storageCreateDoc(doc) {

  return call(getItem, 'docList')
    .map(docList => docList || [])
    .map(docList => docList.concat([doc.uuid]))
    .flatMap(docList => call(setItem, 'docList', docList))
    .flatMap(() => storageUpdateDoc(doc))
    .onValue(() => undefined)
}

export function storageLoadDocs() {

  return call(getItem, 'docList')
    .map(docList => docList.map(storageLoadDoc))
    .flatMap(docs => Kefir.merge(docs))
    .scan((docs, doc) => ({...docs, [doc.uuid]: doc}), {})
    .last()
    .onValue(docs => put(setDocs(docs)))
}

function upsertTag(tag) {

  localStorage.setItem(`tag${tag.uuid}`, tag)
  return Kefir.constant(tag)
}


registerSideEffects(
  Channels.storageSideEffects,
  StorageSideEffectTypes,
  {storageCreateDoc, storageUpdateDoc, storageLoadDoc, storageLoadDocs}
)

