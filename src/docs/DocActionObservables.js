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

export function newDocUuidObservable(docsObservable) {

  return docsObservable
    .filter(docs => docs.newUuid)
    .map(docs => docs.newUuid)
    .skipDuplicates()
}
