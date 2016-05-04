import {Channels} from '../constants/Constants'
import {StorageSideEffectTypes} from './StorageContants'


export function storageCreateDoc(doc) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageCreateDoc,
    payload: doc
  }
}

export function storageCreateTag(tag) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageCreateTag,
    payload: tag
  }
}

export function storageUpdateDoc(doc) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageUpdateDoc,
    payload: doc
  }
}

export function storageUpdateTag(tag) {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageUpdateTag,
    payload: tag
  }
}

export function storageLoadDocs() {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageLoadDocs
  }
}

export function storageLoadTags() {

  return {
    channel: Channels.storageSideEffects,
    actionType: StorageSideEffectTypes.storageLoadTags
  }
}

