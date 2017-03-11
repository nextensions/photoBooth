import React, { Component } from 'react'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import { TransitionMotion, spring, presets } from 'react-motion'
import moment from 'moment'
require('moment/locale/th')
import { Title, Columns, Column, Notification } from 're-bulma'
import { webfont, avatar } from '../../../config/style'

const uri = process.env.REACT_APP_SOCKET_URI
const socket = io.connect(uri, { secure: true })
const schoolId = 132

const ClockDetail = ({ clock }) => {
  const clockTime = moment(clock.time).locale('th')

  return (
    <Notification style={{ margin: 15 }}>
      <Columns>
        <Column size="is4">
          <img src={`https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 80) + 1}.jpg`} style={avatar} alt={`${clock.firstname} ${clock.lastname}`} />
        </Column>
        <Column size="is6" style={{ textAlign: 'left', paddingTop: 20 }}>
          <Title size="is1" style={{ ...webfont, fontSize: '62px' }}>{clock.firstname} {clock.lastname}</Title>
          <Title size="is2" style={{ ...webfont, fontSize: '52px', marginBottom: 0 }}>{clock.classInfo.replace('ม.', 'มัธยมศึกษาปีที่ ')}</Title>
          <Title size="is2" style={{ ...webfont, fontSize: '52px' }}>รหัส {clock.code}</Title>
        </Column>
        <Column size="is2" style={{ paddingTop: 20 }}>
          <Notification color="isWarning"><Title size="is4" style={{ ...webfont, fontSize: '30px' }}>{clockTime.format('เวลา HH:mm:ss')}</Title></Notification>
          <Notification color="isPrimary" style={{ marginTop: 15 }}><Title size="is4" style={{ ...webfont, fontSize: '30px' }}>{clockTime.fromNow()}</Title></Notification>
        </Column>
      </Columns>
    </Notification>
  )
}

class ClockList extends Component {

  getDefaultStyles(list) {
    return list.map((clock, index) => ({ ...clock, key: `k${index}`, style: { height: 0, opacity: 0 } }))
  }

  getStyles() {
    return {
      opacity: spring(1, presets.gentle),
    }
  }

  willEnter() {
    return {
      height: 0,
      opacity: 0,
    }
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    }
  }

  getListStyle(list) {
    return list.map((clock, index) => ({ key: `k${index}`, style: this.getStyles(), data: clock }))
  }

  render() {
    const { list } = this.props

    if (list.length)
      return (
        <TransitionMotion
          defaultStyles={this.getDefaultStyles(list)}
          styles={this.getListStyle(list)}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
        {int =>
          <div>
            {int.map(({ key, style, data }) =>
              <div key={`k${key}`} style={style}>
                <ClockDetail key={key} clock={data} />
              </div>
            )}
          </div>
        }
        </TransitionMotion>
      )

    return <div />
  }
}

class Realtime extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      clock: [],
    }
    this.handleMessage = this.handleMessage.bind(this)
    socket.on(`clock-${schoolId}`, msg => this.handleMessage(msg))
  }

  handleMessage(msg) {
    const clockInfo = { ...msg, time: Date.now() }
    this.setState({
      clock: [clockInfo, ...this.state.clock],
    })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>Realtime Clockin</h1>
        <ClockList list={this.state.clock} />
      </div>
    )
  }
}

class RealtimePage extends Component {

  componentDidMount() {
    socket.emit('subscribe', { topic: `clock-${schoolId}` })
  }

  render() {
    return (
      <SocketProvider socket={socket}>
        <Realtime />
      </SocketProvider>
    )
  }
}
export default RealtimePage
