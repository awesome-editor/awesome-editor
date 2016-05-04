import createTypes from '../../rflux/support/createTypes'


export const TagActionTypes = createTypes([
  'createTagResult',
  'upsertTag',
  'setTags'
])

export const TagSideEffectTypes = createTypes([
  'lookupTag'
])
