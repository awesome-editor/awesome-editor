import {put, listen, call} from '../../app/Saga'

import {Channels} from '../constants/Constants'
import registerSideEffects from '../../app/registerSideEffects'

import {StorageSideEffectTypes} from './StorageContants'


export function storageUpdateDoc(doc) {

  return call(localStorage.setItem, `doc${doc.uuid}`, doc)
}

export function storageLoadDoc(uuid) {

  return call(localStorage.getItem, `doc${uuid}`)
}

export function storageCreateDoc(doc) {

  return call(localStorage.getItem, 'docList')
    .map(docList => docList || [])
    .map(docList => docList.concat([doc.uuid]))
    .flatMap(docList => call(localStorage.setItem, 'docList', docList))
    .flatMap(() => storageUpdateDoc(doc))
}

export function storageLoadDocs() {

  return call(localStorage.getItem, 'docList')
    .flatMap(docList => docList.flatMap(storageLoadDoc))
    .onValue(docList => {

      console.log(docList)

    })
}

function upsertTag(tag) {

  localStorage.setItem(`tag${tag.uuid}`, tag)
  return Kefir.constant(tag)
}


registerSideEffects(
  Channels.storageSideEffects,
  StorageSideEffectTypes,
  {storageUpdateDoc, storageLoadDoc, storageLoadDocs}
)

