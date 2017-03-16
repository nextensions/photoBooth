import React, { Component } from 'react'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import { TransitionMotion, spring, presets } from 'react-motion'
import moment from 'moment'
import { Title, Columns, Column, Notification } from 're-bulma'
import { webfont } from '../../../config/style'
import './Realtime.css'

require('moment/locale/th')

const uri = process.env.REACT_APP_SOCKET_URI
const imgHost = process.env.REACT_APP_HOST_IMAGE_STUDENT
const socket = io.connect(uri, { secure: true })
const schoolId = process.env.REACT_APP_SCHOOL_ID

const ClockDetail = ({ clock, highlight }) => {
const clockTime = moment(clock.time).locale('th')
const firstItemStyle = highlight ? { borderColor: '#F15C27', border: '2px solid #F15C27' } : {}
const firstItemClassName = highlight ? 'firstItem ' : 'firstItem effect7'

  return (
    <Notification style={{ ...firstItemStyle, margin: 15 }} className={firstItemClassName}>
      <Columns>
        <Column size="is4">
          <div className="image-cropper">
            <img src={`${imgHost}${clock.image}`} className="rounded avatar" alt={`${clock.firstname} ${clock.lastname}`} />
          </div>
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

class ClockListWithMotion extends Component {

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
                <ClockDetail key={key} index={key} clock={data} />
              </div>
            )}
          </div>
        }
        </TransitionMotion>
      )

    return <div />
  }
}

const ClockList = ({ list }) => (
  <div>
    {list.map((clock, index) => <ClockDetail key={index} clock={clock} />)}
  </div>
)


class Realtime extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      clock: [],
      numClock: 0,
    }
    this.addClockItem = this.addClockItem.bind(this)
  }

  componentDidMount() {
    socket.on(`clock-${schoolId}`, msg => this.addClockItem(msg))
  }

  addClockItem(msg) {
    const clockInfo = { ...msg, time: Date.now() }
    const clockList = this.state.clock

    // if (this.state.clock.length >= 9) {
    //   clockList.splice(8)
    // }

    this.setState({
      clock: [...clockList, clockInfo],
    })
  }

  render() {
    const items = []
    console.log(this.state.clock.length)
    for (let index = 0; index < this.state.clock.length; index += 1) {
      items.unshift(<ClockDetail key={index} highlight={index === (this.state.clock.length - 1)} clock={this.state.clock[index]} />)
    }

    return (
      <div>{items}</div>
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
