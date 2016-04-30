/**
 * This file exists to remove cyclic dependencies.
 *
 * Alternatively, a more complicated solution is to use a bus
 * to pass registration messages.
 *
 * This simple solution works as long as you register modules first,
 * followed by booting up the app.
 *
 * @type {Array}
 */
export const reducers = []
export const storeFactories = []
export const sideEffectHandlers = []
