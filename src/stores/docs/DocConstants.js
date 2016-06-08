import createTypes from 'rflux/support/createTypes'

export const DocActions = createTypes([
  'createDoc',
  'upsertDoc',
  'addTagToDocResult',
  'setDocs'
])

export const DocSagas = createTypes([
  'addTagToDoc'
])
