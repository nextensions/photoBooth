import React, { Component, PropTypes } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, LevelLeft, Section, Button, Heading } from 're-bulma'
import ReactKeydown from 'react-keydown'
import 'whatwg-fetch'
import 'tracking'

import Dimensions from './components/Dimensions'
import Webcam from './components/Webcam'
import RecentCardList from './components/RecentCardList'
import Menu from './components/Menu/'

import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import cardUdon from './img/card_template/udon.png'
import cardUbon from './img/card_template/ubon.jpg'
import cardSaat from './img/card_template/SAAT.png'
import imgCamera from './img/camera.png'
import './data/face.js'
import './App.css'
import { defaultStyle, styleForMacbook, style, webfont, macbookWidth } from './config/style'

class App extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      cardData: [
        {
          name: 'ส.บ.ม.ท.',
          src: cardSaat,
          captureSize: { width: 115, height: (115 / 3) * 4 },
          capturePosition: { x: 12, y: 67 },
        },
        {
          name: 'โรงเรียนอุบล',
          src: cardUbon,
          captureSize: { width: 98, height: (98 / 3) * 4 },
          capturePosition: { x: 15, y: 83 },
        },
        {
          name: 'โรงเรียนอุดร',
          src: cardUdon,
          captureSize: { width: 90, height: 120 },
          capturePosition: { x: 17, y: 86 },
        },
      ],
      currentCardData: cardUbon,
      faceList: [],
      cardGenerateList: [],
      current: {},
      videoSize: {
        width: 640,
        height: 480,
      },
      imageSize: {
        width: 320,
        height: 240,
      },
      cardTeamplteSize: {
        width: 1,
        height: 1,
      },
      // cardSize: {
      //   width: 400,
      //   height: 251,
      // },
      cardSize: {
        width: 952,
        height: 597,
      },
      captureSize: { width: 0, height: 0 },
      capturePosition: { x: 0, y: 0 },
    }
  }
  componentDidMount() {
    this.setCard(0)
    const self = this
    const video = document.getElementById('video')
    const tracker = new window.tracking.ObjectTracker(['face'])
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    tracker.setEdgesDensity(0.01)
    window.tracking.track(video, tracker, { camera: true })
    tracker.on('track', (event) => {
      if (event.data.length !== 0) {
        self.setState({ faceList: event.data })
        const max = event.data.reduce((a, b) => (a.width > b.width ? a : b))
        self.setState({ current: max })
        const context = self.refs.tempVideo.getContext('2d')
        context.clearRect(0, 0, self.state.imageSize.width, self.state.imageSize.height)
        context.drawImage(video,
          0,
          0,
          self.state.videoSize.width,
          self.state.videoSize.height,
          0,
          0,
          self.state.imageSize.width,
          self.state.imageSize.height
        )
      }
    })
  }
  componentDidUpdate() {
    const context = this.refs.cardTemplate.getContext('2d')
    context.clearRect(0, 0, this.state.cardSize.width, this.state.cardSize.height)
    // Add Card
    context.drawImage(this.refs.template, 0, 0, this.state.cardTeamplteSize.width, this.state.cardTeamplteSize.height, 0, 0, this.state.cardSize.width, this.state.cardSize.height)
    // Add Background
    context.beginPath()
    context.rect(this.state.capturePosition.x, this.state.capturePosition.y, this.state.captureSize.width, this.state.captureSize.height)
    context.fillStyle = 'white'
    context.fill()
    context.drawImage(
      this.refs.tempVideo,
      this.state.current.x - ((this.state.current.width * 20) / 100),
      this.state.current.y - ((this.state.current.width * 30) / 100),
      this.state.current.width + ((this.state.current.width * 40) / 100),
      ((this.state.current.height + ((this.state.current.width * 40) / 100)) / 3) * 4,
      this.state.capturePosition.x,
      this.state.capturePosition.y,
      this.state.captureSize.width,
      this.state.captureSize.height
    )
  }
  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 13) {
      this.capture()
    } else if (keydown.event && keydown.event.which === 39) {
      this.handleNextCard()
    } else if (keydown.event && keydown.event.which === 37) {
      this.handlePreviusCard()
    }
  }
  onImgLoad({ target: img }) {
    this.setState({
      cardTeamplteSize: {
        width: img.offsetWidth,
        height: img.offsetHeight,
      },
    })
  }
  setCard(index) {
    const rawWidth = 400
    const rawHeight = 251
    const cardWidthRatio = this.state.cardSize.width / rawWidth
    const cardHeightRatio = this.state.cardSize.height / rawHeight
    const tempwidth = this.state.cardData[index].captureSize.width * cardWidthRatio
    const tempheight = this.state.cardData[index].captureSize.height * cardHeightRatio
    const tempX = this.state.cardData[index].capturePosition.x * cardWidthRatio
    const tempY = this.state.cardData[index].capturePosition.y * cardHeightRatio
    const captureSize = {
      width: tempwidth,
      height: tempheight,
    }
    const capturePosition = {
      x: tempX,
      y: tempY,
    }
    this.setState({
      index,
      currentCardData: this.state.cardData[index].src,
      captureSize,
      capturePosition,
    })
  }
  dataURItoBlob(dataURI) {
    let byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = unescape(dataURI.split(',')[1])
    }
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
  }
  handleNextCard() {
    let index = this.state.index
    index += 1
    if (index >= this.state.cardData.length) {
      index = 0
    }
    this.setCard(index)
  }
  handlePreviusCard() {
    let index = this.state.index
    index -= 1
    if (index < 0) {
      index = this.state.cardData.length - 1
    }
    this.setCard(index)
  }
  capture() {
    const cardGenerateList = this.state.cardGenerateList
    cardGenerateList.unshift({
      canvas: this.refs.cardTemplate,
      imgPath: this.refs.cardTemplate.toDataURL('image/jpeg'),
    })
    const data = new FormData()
    const blob = this.dataURItoBlob(this.refs.cardTemplate.toDataURL('image/jpeg'))
    data.append('name', 'ทดสอบๆ')
    data.append('lastname', 'นาม')
    data.append('file', blob)
    fetch('http://localhost:3030/upload', {
      method: 'POST',
      header: {
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    })
    this.setState({ cardGenerateList })
  }
  render() {
    const FaceList = this.state.faceList.map((item, key) => (
      <div key={key}>All:{JSON.stringify(item)}</div>
    ))
    if (this.props.containerWidth === macbookWidth) {
      defaultStyle.cameraSize = styleForMacbook.cameraSize
      defaultStyle.cameraPosition = styleForMacbook.cameraPosition
      defaultStyle.headerStyle = { display: 'none' }
      defaultStyle.cardMarginTop = styleForMacbook.cardMarginTop
      defaultStyle.mascotHeight = styleForMacbook.mascotHeight
      defaultStyle.brandWidth = styleForMacbook.brandWidth
    }
    const webcamStyle = {
      position: 'absolute',
      top: defaultStyle.cameraPosition.top,
      left: defaultStyle.cameraPosition.left,
    }
    return (
      <div className="App" id="page-wrap">
        <Menu />
        <Hero size="isFullheight">
          <Section className="App-heroSection" style={{ padding: '20px' }}>
            <Container isFluid>
              <Heading>
                <img src={mascot} alt="Mascot" className="App-logo" style={{ height: defaultStyle.mascotHeight }} /> <br />
                <img src={brand} alt="NextSchool" className="App-brand" style={{ width: defaultStyle.brandWidth }} />
              </Heading>
            </Container>
          </Section>
          <HeroBody style={{ padding: '40px 20px 0' }}>
            <Container hasTextCentered isFluid>
              <Columns style={defaultStyle.headerStyle}>
                <Column size="is12" style={style}>
                  <Title size="is1" style={defaultStyle.headerStyle}>ถ่ายรูปทำบัตรด่วน!</Title>
                </Column>
              </Columns>
              <Columns isMultiline>
                <Column size="is6" style={style}>
                  <Image src={imgCamera} alt="Camera" className="App-camera" style={{ marginBottom: '5px', zIndex: 10 }} />
                  <Webcam audio={false} width={defaultStyle.cameraSize.width} height={defaultStyle.cameraSize.height} className="webcam" style={webcamStyle} />
                  <video className="webcam" id="video" width={this.state.imageSize.width} style={{ visibility: 'hidden', position: 'fixed' }} height={this.state.imageSize.height} preload autoPlay loop muted />
                  <canvas ref="tempVideo" width={this.state.imageSize.width} style={{ display: 'none' }} height={this.state.imageSize.height} />
                  <img src={this.state.currentCardData} onLoad={this.onImgLoad.bind(this)} ref="template" style={{ visibility: 'hidden', position: 'fixed', left: 0, top: 0 }} alt=""/>
                  { FaceList }
                </Column>
                <Column size="is6" style={style} is-fullheight>
                  <Hero>
                    <HeroBody style={{ padding: '40px 20px 0' }}>
                      <Container>
                        { /* <Image src="assets/img/card_saat.png" alt="Card" style={{ marginTop: defaultStyle.cardMarginTop, marginBottom: '5px' }} ration="is4By3" className="App-card" /> */ }
                        <canvas className="App-card" ref="cardTemplate" width={this.state.cardSize.width} height={this.state.cardSize.height} style={{ marginTop: defaultStyle.cardMarginTop, marginBottom: '5px' }} />
                      </Container>
                    </HeroBody>
                  </Hero>
                </Column>
                <Column size="is12" style={style}>
                  <Button icon="fa fa-camera" buttonStyle="isOutlined" color="isDanger" onClick={this.capture.bind(this)}>ถ่ายรูป</Button>
                </Column>
              </Columns>
              <Columns>
                <Column size="is12" style={style}>
                  <Box>
                    <LevelLeft>
                      <Subtitle size="is3" style={webfont}>รายการบัตรล่าสุด</Subtitle>
                    </LevelLeft>
                    <RecentCardList cards={this.state.cardGenerateList} />
                  </Box>
                </Column>
              </Columns>
            </Container>
          </HeroBody>
          <HeroFoot>
            <Container>
              <Content>
                <p style={{ textAlign: 'center', padding: '10px' }}>
                  made with <Icon icon="fa fa-heart" size="isSmall" style={{ color: 'red' }} /> by <a href="http://www.nextgensoft.co.th">Nextgensoft</a>
                </p>
              </Content>
            </Container>
          </HeroFoot>
        </Hero>
      </div>
    )
  }
}

App.propTypes = {
  containerWidth: PropTypes.number,
}

export default ReactKeydown(Dimensions()(App))
