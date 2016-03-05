export function cast(obj, Class) {

  return obj instanceof Class ? obj : new Class(obj)
}

export function bindToInstance(instance, ...functions) {

  functions.forEach(func => instance[func] = instance[func].bind(instance))
}

export function isObservable(obj) {

  return obj && obj._source && obj._name
}
