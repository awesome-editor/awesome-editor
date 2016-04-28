import Kefir from 'kefir'

import {put, call} from '../../rflux/Saga'

import {Channels} from '../constants/Constants'
import registerSideEffects from '../../rflux/registerSideEffects'

import {StorageSideEffectTypes} from './StorageContants'
import {setDocs} from '../docs/DocActions'

const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))
const getItem = key => JSON.parse(localStorage.getItem(key))


export function storageUpdateDoc(AppState, doc) {

  return call(setItem, `doc${doc.uuid}`, doc)
}

export function storageLoadDoc(AppState, uuid) {

  return call(getItem, `doc${uuid}`)
}

export function storageCreateDoc(AppState, doc) {

  return call(getItem, 'docList')
    .map(docList => docList || [])
    .map(docList => docList.concat([doc.uuid]))
    .flatMap(docList => call(setItem, 'docList', docList))
    .flatMap(() => storageUpdateDoc(AppState, doc))
    .onValue(() => undefined)
}

export function storageLoadDocs(AppState) {

  return call(getItem, 'docList')
    .map(docList => docList.map(doc => storageLoadDoc(AppState, doc)))
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
  {sideEffectHandlers: {storageCreateDoc, storageUpdateDoc, storageLoadDoc, storageLoadDocs}}
)

