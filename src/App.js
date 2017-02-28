import React, { Component, PropTypes } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, LevelLeft, Section, Button, Heading } from 're-bulma'
import reactKeydown from 'react-keydown'
import clone from 'lodash.clonedeep'
import 'whatwg-fetch'
import 'tracking'

import dimensions from './components/Dimensions'
import RecentCardList from './components/RecentCardList'
import Menu from './components/Menu/'
import SmartCard from './components/SmartCard'

import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import cardUdon from './img/card_template/udon.png'
import cardUbon from './img/card_template/ubon.jpg'
import cardSaat from './img/card_template/SAAT.png'
import imgCamera from './img/camera.png'
import './data/face.js'
import './App.css'
import { defaultStyle, styleForMacbook, style, webfont, macbookWidth } from './config/style'

const templateList = [
  {
    name: 'ส.บ.ม.ท.',
    src: cardSaat,
    captureSize: { width: 115, height: (115 / 3) * 4 },
    capturePosition: { x: 12, y: 67 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
  {
    name: 'โรงเรียนอุบล',
    src: cardUbon,
    captureSize: { width: 98, height: (98 / 3) * 4 },
    capturePosition: { x: 15, y: 83 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
  {
    name: 'โรงเรียนอุดร',
    src: cardUdon,
    captureSize: { width: 90, height: 120 },
    capturePosition: { x: 17, y: 86 },
    personInfoPosition: {
      nameTH: { x: 430, y: 242 },
      nameEN: { x: 430, y: 305 },
      citizenId: { x: 585, y: 368 },
      memberId: { x: 475, y: 430 },
      memberType: { x: 810, y: 430 },
      issueDate: { x: 20, y: 20 },
    },
  },
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      cardTemplateList: templateList,
      currentCardTemplate: null,
      cardGenerateList: [],
      currentFaceDetection: {},
      videoSize: {
        width: 640,
        height: 480,
      },
      imageSize: {
        width: 320,
        height: 240,
      },
      cardTeamplateSize: {
        width: 1,
        height: 1,
      },
      cardSize: {
        width: 952,
        height: 597,
      },
      personInfo: {
        firstnameTH: '',
        lastnameTH: '',
        firstnameEN: '',
        lastnameEN: '',
        citizenId: '',
        memberId: '',
        memberType: '',
      },
      trackingTask: null,
    }
    this.capture = this.capture.bind(this)
    this.onImgLoad = this.onImgLoad.bind(this)
    this.setPersonInfo = this.setPersonInfo.bind(this)
    this.clearPersonInfo = this.clearPersonInfo.bind(this)
    this.drawPersonInfo = this.drawPersonInfo.bind(this)
    this.drawCardTemplate = this.drawCardTemplate.bind(this)
    this.setTrackingTask = this.setTrackingTask.bind(this)
  }
  componentDidMount() {
    this.setCardTemplate(0)
    const self = this
    const video = this.elementVideo
    const tracker = new window.tracking.ObjectTracker(['face'])
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    // tracker.setEdgesDensity(0.01)
    tracker.setEdgesDensity(0.1)
    const trackingTask = window.tracking.track(video, tracker, { camera: true })
    tracker.on('track', (event) => {
      const contextShow = self.elementShowVideo.getContext('2d')
      contextShow.drawImage(video, 0, 0, this.state.videoSize.width, this.state.videoSize.height, 0, 0, self.elementShowVideo.width, self.elementShowVideo.height)
      if (event.data.length !== 0) {
        const max = event.data.reduce((a, b) => (a.width > b.width ? a : b))
        self.setState({ currentFaceDetection: max })
        const context = self.elementTempVideo.getContext('2d')
        context.clearRect(0, 0, self.state.imageSize.width, self.state.imageSize.height)
        context.drawImage(video, 0, 0, self.state.videoSize.width, self.state.videoSize.height, 0, 0, self.state.imageSize.width, self.state.imageSize.height)
        this.drawCardTemplate()
      }
    })
    this.setTrackingTask(trackingTask)
    // this.state.trackingTask.stop() // If you wan't to stop tracking
  }
  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 13) {
      // Enter key
      this.capture()
    } else if (keydown.event && keydown.event.which === 39) {
      // Left key
      this.handleNextCard()
    } else if (keydown.event && keydown.event.which === 37) {
      // Right key
      this.handlePreviusCard()
    }
  }
  onImgLoad({ target: img }) {
    this.setState({
      cardTeamplateSize: {
        width: img.offsetWidth,
        height: img.offsetHeight,
      },
    }, () => {
      this.drawCardTemplate()
    })
  }
  setTrackingTask(trackingTask) {
    this.setState({
      trackingTask,
    })
  }
  setCardTemplate(index) {
    const rawWidth = 400
    const rawHeight = 251
    const currentCardTemplate = clone(this.state.cardTemplateList[index])
    const cardWidthRatio = this.state.cardSize.width / rawWidth
    const cardHeightRatio = this.state.cardSize.height / rawHeight
    currentCardTemplate.captureSize.width *= cardWidthRatio
    currentCardTemplate.captureSize.height *= cardHeightRatio
    currentCardTemplate.capturePosition.x *= cardWidthRatio
    currentCardTemplate.capturePosition.y *= cardHeightRatio
    this.setState({
      index,
      currentCardTemplate,
    })
  }
  setPersonInfo(firstnameTH, lastnameTH, firstnameEN, lastnameEN, citizenId) {
    this.setState({
      personInfo: {
        firstnameTH,
        lastnameTH,
        firstnameEN,
        lastnameEN,
        citizenId,
        memberId: '99999',
        memberType: 'Normal',
      },
    }, () => {
      this.drawCardTemplate()
    })
  }
  drawCardTemplate() {
    const context = this.elementCardTemplate.getContext('2d')
    context.clearRect(0, 0, this.state.cardSize.width, this.state.cardSize.height)
    // Add Card
    context.drawImage(this.elementRawTemplate, 0, 0, this.state.cardTeamplateSize.width, this.state.cardTeamplateSize.height, 0, 0, this.state.cardSize.width, this.state.cardSize.height)
    // Add Background
    context.beginPath()
    context.rect(this.state.currentCardTemplate.capturePosition.x, this.state.currentCardTemplate.capturePosition.y, this.state.currentCardTemplate.captureSize.width, this.state.currentCardTemplate.captureSize.height)
    context.fillStyle = 'white'
    context.fill()
    context.drawImage(
      this.elementTempVideo,
      this.state.currentFaceDetection.x - ((this.state.currentFaceDetection.width * 20) / 100),
      this.state.currentFaceDetection.y - ((this.state.currentFaceDetection.width * 30) / 100),
      this.state.currentFaceDetection.width + ((this.state.currentFaceDetection.width * 40) / 100),
      ((this.state.currentFaceDetection.height + ((this.state.currentFaceDetection.width * 40) / 100)) / 3) * 4,
      this.state.currentCardTemplate.capturePosition.x,
      this.state.currentCardTemplate.capturePosition.y,
      this.state.currentCardTemplate.captureSize.width,
      this.state.currentCardTemplate.captureSize.height
    )
    this.drawPersonInfo(context)
  }
  drawPersonInfo(context) {
    const tempContext = context
    // console.log("test")
    tempContext.font = '48px THSarabunNewBold'
    tempContext.fillStyle = '#000000'
    tempContext.fillText(`${this.state.personInfo.firstnameTH} ${this.state.personInfo.lastnameTH}`, this.state.currentCardTemplate.personInfoPosition.nameTH.x, this.state.currentCardTemplate.personInfoPosition.nameTH.y)
    tempContext.fillText(`${this.state.personInfo.firstnameEN} ${this.state.personInfo.lastnameEN}`, this.state.currentCardTemplate.personInfoPosition.nameEN.x, this.state.currentCardTemplate.personInfoPosition.nameEN.y)
    tempContext.fillText(this.state.personInfo.citizenId, this.state.currentCardTemplate.personInfoPosition.citizenId.x, this.state.currentCardTemplate.personInfoPosition.citizenId.y)
    tempContext.fillText(this.state.personInfo.memberId, this.state.currentCardTemplate.personInfoPosition.memberId.x, this.state.currentCardTemplate.personInfoPosition.memberId.y)
    tempContext.fillText(this.state.personInfo.memberType, this.state.currentCardTemplate.personInfoPosition.memberType.x, this.state.currentCardTemplate.personInfoPosition.memberType.y)
  }
  clearPersonInfo() {
    this.setState({
      personInfo: {
        firstnameTH: '',
        lastnameTH: '',
        firstnameEN: '',
        lastnameEN: '',
        citizenId: '',
        memberId: '',
        memberType: '',
      },
    }, () => {
      this.drawCardTemplate()
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
    if (index >= this.state.cardTemplateList.length) {
      index = 0
    }
    this.setCardTemplate(index)
  }
  handlePreviusCard() {
    let index = this.state.index
    index -= 1
    if (index < 0) {
      index = this.state.cardTemplateList.length - 1
    }
    this.setCardTemplate(index)
  }
  capture() {
    const cardGenerateList = this.state.cardGenerateList
    if (cardGenerateList.length >= 6) {
      cardGenerateList.splice(5, 1) // delete card over length
    }
    const cardGenerate = {
      date: new Date(),
      name: 'ทดสอบชื่อ',
      lastname: 'ทดสอบนามสกุล',
      canvas: this.elementCardTemplate,
      imgPath: this.elementCardTemplate.toDataURL('image/jpeg'),
      blob: this.dataURItoBlob(this.elementCardTemplate.toDataURL('image/jpeg')),
    }
    cardGenerateList.unshift(cardGenerate)
    this.sendData(cardGenerate)
    this.setState({ cardGenerateList })
  }
  sendData(objectData) {
    const data = new FormData()
    const tempObjectData = clone(objectData)
    delete tempObjectData.imgPath // fixbug
    Object.keys(tempObjectData).forEach((key) => {
      if (tempObjectData && Object.prototype.hasOwnProperty.call(tempObjectData, key)) {
        data.append(key, tempObjectData[key])
      }
    })
    fetch('http://localhost:3030/upload', {
      method: 'POST',
      header: { 'Access-Control-Allow-Origin': '*' },
      body: data,
    })
  }
  render() {
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
                  <canvas ref={(element) => { this.elementShowVideo = element }} className="webcam" style={webcamStyle} width={defaultStyle.cameraSize.width} height={defaultStyle.cameraSize.height} />
                  <video ref={(element) => { this.elementVideo = element }} width={this.state.imageSize.width} height={this.state.imageSize.height} style={{ visibility: 'hidden', position: 'fixed', left: 0, top: 0 }} preload autoPlay loop muted />
                  <canvas ref={(element) => { this.elementTempVideo = element }} width={this.state.imageSize.width} height={this.state.imageSize.height} style={{ visibility: 'hidden', position: 'fixed', left: 0, top: 0 }} />
                  <img src={this.state.currentCardTemplate ? this.state.currentCardTemplate.src : ''} onLoad={this.onImgLoad} ref={(element) => { this.elementRawTemplate = element }} style={{ visibility: 'hidden', position: 'fixed', left: 0, top: 0 }} alt="" />
                </Column>
                <Column size="is6" style={style} is-fullheight>
                  <Hero>
                    <HeroBody style={{ padding: '40px 20px 0' }}>
                      <Container>
                        <canvas
                          className="App-card"
                          ref={(element) => { this.elementCardTemplate = element }}
                          width={this.state.cardSize.width}
                          height={this.state.cardSize.height}
                          style={{ marginTop: defaultStyle.cardMarginTop, marginBottom: '5px' }}
                        />
                      </Container>
                    </HeroBody>
                  </Hero>
                </Column>
                <Column size="is12" style={style}>
                  <SmartCard setPersonInfo={this.setPersonInfo} clearPersonInfo={this.clearPersonInfo} />
                  <Button icon="fa fa-camera" buttonStyle="isOutlined" color="isDanger" onClick={this.capture}>ถ่ายรูป</Button>
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

export default reactKeydown(dimensions()(App))
