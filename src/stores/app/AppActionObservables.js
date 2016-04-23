export function appMainWindowObservable(appObservable) {

  return appObservable.map(state => state.mainWindow).skipDuplicates()
}

export function appCurrentDocUuidObservable(appObservable) {

  return appObservable.map(state => state.currentDocUuid).skipDuplicates()
}

