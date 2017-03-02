import React, { Component, PropTypes } from 'react'
import moment from 'moment'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { currentTime: new Date() }
  }
  componentDidMount() {
    this.timerId = setInterval(() => this.updateTime(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  updateTime() {
    this.setState({ currentTime: new Date() })
  }
  render() {
    return (
      <span>
        { moment(this.state.currentTime).format(this.props.format) }
      </span>
    )
  }
}

Clock.propTypes = {
  format: PropTypes.string.isRequired,
}
export default Clock
