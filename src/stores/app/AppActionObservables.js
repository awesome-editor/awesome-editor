export function appMainWindowObservable(appObservable) {

  return appObservable.filter(state => state).map(state => state.mainWindow)
}

export function appCurrentDocUuidObservable(appObservable) {

  return appObservable.filter(state => state).map(state => state.currentDocUuid)
}

