import React, { Component } from 'react'
// import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, LevelLeft, Section, Button, Heading } from 're-bulma'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'


// import mascot from './img/mascot.svg'
// import brand from './img/textOnly.svg'

import './Realtime.css'

const uri = process.env.REACT_APP_SOCKET_URI
const socket = io.connect(uri, { secure: true })
const schoolId = 132

const ClockDetail = ({ clockList }) => (
  <div>
    {clockList.map((clock, index) => <div key={index}>{clock.code}</div>)}
  </div>
)

class ClockList extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      clock: [],
    }
    this.handleMessage = this.handleMessage.bind(this)
    socket.on(`clock-${schoolId}`, msg => this.handleMessage(msg))
  }

  handleMessage(msg) {
    this.setState({
      clock: [msg, ...this.state.clock],
    })
    // console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>Realtime Clockin</h1>
        <ClockDetail clockList={this.state.clock} />
      </div>
    )
  }
}

class RealtimePage extends Component {

  componentDidMount() {
    socket.emit('subscribe', { topic: 'clock-132' })
  }

  render() {
    return (
      <SocketProvider socket={socket}>
        <ClockList />
      </SocketProvider>
    )
  }
}
export default RealtimePage
