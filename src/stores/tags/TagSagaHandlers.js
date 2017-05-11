export default function({getState}) {
  return {
    /**
     * For now search through every doc
     *
     * @param tagName
     * @returns {*}
     */
    lookupTag(tagName) {

      return getState()
        .map(state => state.tags)
        .take(1)
        .map(tags => tags.tags)
        .map(tags => Object.keys(tags).reduce(
          (matchingTags, tagUuid) =>
            tags[tagUuid].name.indexOf(tagName) >= 0 ?
              Object.assign(matchingTags, {[tagUuid]: tags[tagUuid]}) :
              matchingTags,
          {}
        ))
        .map(tagMap => Object.keys(tagMap).map(tagUuid => tagMap[tagUuid]))
    }
  }
}
