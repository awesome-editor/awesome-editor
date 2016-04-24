import {stateWithSideEffects} from '../sideeffects/SideEffects'
import TagData from './TagData'

/**
 * Looks up tags that are similar
 * @param tagUuid
 */
function _lookupTag(tags, tagUuid) {

  const fakeMatches = [
    new TagData({uuid: uuid.v4(), name: 'foo', path: [{uuid: uuid.v4(), name: 'bar'}]}),
    new TagData({uuid: uuid.v4(), name: 'aha'})
  ]

  return stateWithSideEffects({...tags, ...{lookupTag: fakeMatches}})
}
