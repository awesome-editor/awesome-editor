import createTypes from 'rflux/internal/createTypes'


export const TagActions = createTypes([
  'createTagResult',
  'upsertTag',
  'setTags'
])

export const TagSagas = createTypes([
  'lookupTag'
])
