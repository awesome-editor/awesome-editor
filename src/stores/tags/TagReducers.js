import {storageUpdateTag, storageCreateTag} from '../storage/StorageActions'
import {addSideEffects, sideEffects} from 'rflux/StateWithSideEffects'


export const initialState = {
  tags: {}
}

export function upsertTag(tagState, tag) {

  const tags = tagState.tags
  const cur = tags[tag.uuid] || {}
  const newTag = {...cur, ...tag}
  const newTagEntry = {[tag.uuid]: newTag}
  const newTags = {tags: {...tags, ...newTagEntry}}

  return addSideEffects(
    {...tagState, ...newTags},
    storageUpdateTag(newTag)
  )
}

export function createTagResult(tagState, tag, result) {

  const create = sideEffects(storageCreateTag(tag))
  const broadcast = sideEffects(result(tag))

  return upsertTag(tagState, tag)
    .combine(create)
    .combine(broadcast)
}

/**
 * You probably don't ever want to call this directly
 *
 * @param tagState
 * @param tag
 */
export function setTags(tagState, tags) {

  return {...tagState, tags: {...tags}}
}

