export default function createTypes(actions) {

  actions = actions || []
  actions = Array.isArray(actions) ? actions : [actions]

  return actions.reduce((total, arg) => Object.assign(total, {[arg]: arg}), {})
}
