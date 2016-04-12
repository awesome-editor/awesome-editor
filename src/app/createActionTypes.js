export default function createActionTypes(actions) {

  actions = actions || []
  actions = Array.isArray(actions) ? actions : [actions]

  return actions.reduce((total, arg) => Object.assign(total, {[arg]: arg}), {})
}
