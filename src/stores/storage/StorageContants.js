import createTypes from 'rflux/support/createTypes'

export const StorageSideEffectTypes = createTypes([
  'storageCreateDoc',
  'storageCreateTag',
  'storageUpdateDoc',
  'storageUpdateTag',
  'storageLoadDocs',
  'storageLoadTags'
])
