import {Channels} from '../constants/Constants'
import {StorageSideEffectTypes} from './StorageContants'


export function storageCreateDoc(doc) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageCreateDoc,
    payload: doc
  }
}

export function storageUpdateDoc(doc) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageUpdateDoc,
    payload: doc
  }
}

export function storageLoadDocs() {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageLoadDocs
  }
}
