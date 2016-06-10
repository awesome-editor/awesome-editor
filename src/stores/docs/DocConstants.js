import createTypes from 'rflux/internal/createTypes'

export const DocActions = createTypes([
  'createDoc',
  'upsertDoc',
  'setDocs',
  'addTagToDoc'
])
