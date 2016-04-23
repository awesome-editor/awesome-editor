export function appMainWindowObservable(appObservable) {

  return appObservable.map(state => state.mainWindow)
}

export function appCurrentDocUuidObservable(appObservable) {

  return appObservable.map(state => state.currentDocUuid)
}

