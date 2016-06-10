import createTypes from 'rflux/internal/createTypes'

export const StorageSagas = createTypes([
  'storageCreateDoc',
  'storageCreateTag',
  'storageUpdateDoc',
  'storageUpdateTag',
  'storageLoadDocs',
  'storageLoadTags'
])
