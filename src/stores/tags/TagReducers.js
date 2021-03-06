import {state} from 'rflux'

import {storageUpdateTag, storageCreateTag} from '../storage/StorageSagaActionFunctions'


export const initialState = {
  tags: {}
}

export function upsertTag(tagState, tag) {

  const tags = tagState.tags
  const cur = tags[tag.uuid] || {}
  const newTag = {...cur, ...tag}
  const newTagEntry = {[tag.uuid]: newTag}
  const newTags = {tags: {...tags, ...newTagEntry}}

  return state({...tagState, ...newTags}).addSideEffects(storageUpdateTag(newTag))
}

export function createTagResult(tagState, tag, result) {

  const create = storageCreateTag(tag)
  const broadcast = result(tag)

  return upsertTag(tagState, tag).addSideEffects(create, broadcast)
}

/**
 * You probably don't ever want to call this directly
 *
 * @param {*} tagState
 * @param {*} tags
 * @returns {*} tag state
 */
export function setTags(tagState, tags) {

  return {...tagState, tags: {...tags}}
}

