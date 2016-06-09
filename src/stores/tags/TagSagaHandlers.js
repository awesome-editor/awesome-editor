/**
 * For now search through every doc
 *
 * @param tag
 * @returns {*}
 */
export function lookupTag(tag, AppState, result) {

  // TODO So this is actually kinda bad because the internals of doc state leaked out
  return AppState.docsObservable
    .take(1)
    .map(docs => docs.docs)
    .map(docs => Object.keys(docs).reduce((matchingTags, docUuid) => {

      docs[docUuid].tags.forEach(_tag => {
        if (_tag.name.indexOf(tag) >= 0) {
          matchingTags[_tag.uuid] = _tag
        }
      })

      return matchingTags

    }, {}))
    .map(tagMap => Object.keys(tagMap).map(tagUuid => tagMap[tagUuid]))
    .onValue(tags => result(tags))
}
