export function docObservable(docsObservable) {

  return docUuid =>
    docsObservable
      .filter(docs => docs[docUuid])
      .map(docs => docs[docUuid])
}

export function docTagsObservable(docsObservable) {

  return docUuid =>
    docsObservable
      .filter(docs => docs[docUuid])
      .map(docs => docs[docUuid].tags)
}
