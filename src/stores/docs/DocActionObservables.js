import _ from 'lodash'


export function currentDocUuidObservable(docsObservable) {

  return docsObservable
    .map(docState => docState.currentDocUuid)
    .filter(uuid => uuid)
}

export function currentDocObservable(docsObservable) {

  return docsObservable
    .map(docState => docState.docs[docState.currentDocUuid])
    .filter(doc => doc)
}

export function currentDocMinusTagsObservable(docsObservable) {

  return currentDocObservable(docsObservable)
      .map(doc => _.pick(doc, 'uuid', 'title', 'subtitle', 'content'))
}

export function currentDocTagsObservable(docsObservable) {

  return currentDocObservable(docsObservable)
      .map(doc => doc.tags)
}

export function newDocUuidObservable(docsObservable) {

  return docsObservable
    .filter(docState => docState.newDocUuid)
    .map(docs => docs.newDocUuid)
    .skipDuplicates()
}
