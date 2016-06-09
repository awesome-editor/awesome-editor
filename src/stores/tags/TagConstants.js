import createTypes from 'rflux/support/createTypes'


export const TagActions = createTypes([
  'createTagResult',
  'upsertTag',
  'setTags'
])

export const TagSagas = createTypes([
  'lookupTag'
])
