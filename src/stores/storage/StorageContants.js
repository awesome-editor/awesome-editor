import keyMirror from 'keymirror'

export const StorageSagas = keyMirror({
  'storageCreateDoc': true,
  'storageCreateTag': true,
  'storageUpdateDoc': true,
  'storageUpdateTag': true,
  'storageLoadDocs': true,
  'storageLoadTags': true
})
