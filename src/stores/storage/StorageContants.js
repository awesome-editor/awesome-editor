import createTypes from '../../rflux/support/createTypes'

export const StorageSideEffectTypes = createTypes([
  'storageCreateDoc',
  'storageUpdateDoc',
  'storageLoadDoc',
  'storageLoadDocs'
])
