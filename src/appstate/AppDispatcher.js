import kefirEmitter from '../util/kefirEmitter'

/**
 * Use one global stream.
 * The advantage is easy undo, debugging, saving app state
 */
export default kefirEmitter()