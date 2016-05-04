import createTypes from '../../rflux/support/createTypes'

export const DocActionTypes = createTypes([
  'createDoc',
  'upsertDoc',
  'addTagToDocResult',
  'setDocs'
])

export const DocSideEffectTypes = createTypes([
  'addTagToDoc'
])
