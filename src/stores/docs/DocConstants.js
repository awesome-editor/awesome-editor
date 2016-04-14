import createActionTypes from '../../app/createActionTypes'

export const DocActionTypes = createActionTypes([
  'upsertDoc',
  'createDoc',
  'setCurrentDoc',
  'addTagToDoc',
  'docListSelect'
])
