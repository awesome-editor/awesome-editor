import React from 'react'
import _ from 'lodash'

export default function createContainer(observableToProps = [], props = {}, containerProps = {}) {

  const {propTypes = {}, getInitialState = {}, getDefaultProps = _.noop} = containerProps

  return StatelessFunctionalContainer => React.createClass({

    propTypes: propTypes,

    getDefaultProps() {
      return getDefaultProps()
    },

    getInitialState() {
      return getInitialState()
    },

    componentWillMount() {

      const that = this

      that.unsub = observableToProps.map(
          obj => obj.observable._onValue(val => that.setState({[obj.property]: val}))
        ) || []
    },

    componentWillUnmount() {

      this.unsub.forEach(unsub => unsub())
    },

    render() {
      return <StatelessFunctionalContainer {...this.state} {...props} />
    }
  })
}
