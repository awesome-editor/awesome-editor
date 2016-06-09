import createTypes from 'rflux/support/createTypes'

export const StorageSagas = createTypes([
  'storageCreateDoc',
  'storageCreateTag',
  'storageUpdateDoc',
  'storageUpdateTag',
  'storageLoadDocs',
  'storageLoadTags'
])
