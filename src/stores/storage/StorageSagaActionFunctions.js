import {Channels} from '../constants/Constants'
import {StorageSagas} from './StorageContants'


export function storageCreateDoc(doc) {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageCreateDoc,
    payload: doc
  }
}

export function storageCreateTag(tag) {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageCreateTag,
    payload: tag
  }
}

export function storageUpdateDoc(doc) {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageUpdateDoc,
    payload: doc
  }
}

export function storageUpdateTag(tag) {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageUpdateTag,
    payload: tag
  }
}

export function storageLoadDocs() {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageLoadDocs
  }
}

export function storageLoadTags() {

  return {
    channel: Channels.storageSagas,
    actionType: StorageSagas.storageLoadTags
  }
}

