export function docObservable(docsObservable) {

  return uuid =>
    docsObservable
      .map(state => state.docs[uuid])
      .filter(doc => doc)
}

export function docMinusTagsObservable(docsObservable) {

  const doc = docObservable(docsObservable) // function with uuid as input

  return uuid => doc(uuid).map(doc => ({uuid: doc.uuid, title: doc.title, content: doc.content}))
}

export function docTagsObservable(docsObservable) {

  const doc = docObservable(docsObservable) // function with uuid as input

  return uuid => doc(uuid).map(doc => doc.tags)
}

/**
 * docList is currently computed from docs but that will change shortly
 * @param docsObservable
 */
export function docListObservable(docsObservable) {

  return docsObservable.map(docState =>
    Object.keys(docState.docs || {})
      .reduce((docList, uuid) => docList.concat([docState.docs[uuid]]), [])
      .sort((doc1, doc2) => doc1.title.localeCompare(doc2.title))
  )
}
