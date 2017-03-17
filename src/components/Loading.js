import React, { Component, PropTypes } from 'react'
import './Loading.css'

class Loading extends Component {
  render() {
    if (this.props.mode === 'loading') {
      return (
        <div id="container">
          <div id="content">
            <div className="loader" />
          </div>
        </div>
      )
    } else if (this.props.mode === 'success') {
      return (
        <div id="container">
          <div id="content">
            Success
          </div>
        </div>
      )
    } else if (this.props.mode === 'fail') {
      return (
        <div id="container">
          <div id="content">
            Fail
          </div>
        </div>
      )
    } else {
      return (<span />)
    }
  }
}

Loading.propTypes = {
  mode: PropTypes.string,
}
export default Loading
