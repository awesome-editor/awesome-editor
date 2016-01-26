import Kefir from 'kefir'
import uuid from 'uuid'

import kefirEmitter from '../util/kefirEmitter'
import TagData from '../types/TagData'


const tagAction = kefirEmitter()

const createTagActionStream = tagAction
  .filter(action => action.actionType === 'create')
  .map(() => new TagData())
  .map(tag => tags => {

    tag.uuid = uuid.v4()
    tags[tag.uuid] = tag;

    return tags;
  });

// TODO tag crud

const tagsObservable = Kefir.merge([
  createTagActionStream
])
  .scan((prevTags, modificationFunc) => modificationFunc(prevTags), {});


/**
 * Looks up tags that are similar
 * @param tagUuid
 */
function lookupTags(tagUuid) {

  return Kefir.constant([
    new TagData({uuid: uuid.v4(), name: 'foo', path: [{uuid: uuid.v4(), name: 'bar'}]}),
    new TagData({uuid: uuid.v4(), name: 'aha'})
  ])
}

export default {
  lookupTags
}
