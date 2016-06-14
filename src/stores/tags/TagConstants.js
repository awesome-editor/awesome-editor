import keyMirror from 'keymirror'


export const TagActions = keyMirror({
  createTagResult: true,
  upsertTag: true,
  setTags: true
})

export const TagSagas = keyMirror({
  lookupTag: true
})

