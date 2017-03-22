import React, { Component, PropTypes } from 'react'
import { Container, Hero, HeroBody, Title, Subtitle, Image, Columns, Column, Box, LevelLeft, Section, Heading } from 're-bulma'
import reactKeydown from 'react-keydown'
import clone from 'lodash.clonedeep'
import 'whatwg-fetch'
import 'tracking'
import 'bulma/css/bulma.css'
import { Webcam, dimensions, RecentCardList, Menu, SmartCard, Clock, Register, Footer } from './components/'
import cardTemplateList from './config/cardTemplate'
import regisData from './data/RegisData.json'

import './data/face-min'
import './App.css'
import { defaultStyle, styleForMacbook, style, webfont, macbookWidth } from './config/style'


import brand from './img/textOnly.svg'
import mascot from './img/mascot.svg'
import imgCamera from './img/camera.png'


class App extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
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
        school: '',
        position: '',
        student: '',
        address: '',
        mobile: '',
        interest: [],
        note: '',
        email: '',
      },
      trackingTask: null,
      registerIsOpen: false,
      registerMode: false,
      isLoading: 'off',
    }
    this.capture = this.capture.bind(this)
    this.onImgLoad = this.onImgLoad.bind(this)
    this.setPersonInfo = this.setPersonInfo.bind(this)
    this.clearPersonInfo = this.clearPersonInfo.bind(this)
    this.drawPersonInfo = this.drawPersonInfo.bind(this)
    this.drawCardTemplate = this.drawCardTemplate.bind(this)
    this.setTrackingTask = this.setTrackingTask.bind(this)
    this.handleRegisterClose = this.handleRegisterClose.bind(this)
    this.handleRegisterOpen = this.handleRegisterOpen.bind(this)
    this.handleTrackerStart = this.handleTrackerStart.bind(this)
    this.handleTrackerStop = this.handleTrackerStop.bind(this)
    this.sendData = this.sendData.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.handleUnzoom = this.handleUnzoom.bind(this)
  }
  componentDidMount() {
    this.setCardTemplate(0)
    this.handleTrackerStart()
  }
  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 13) {
      // Enter key
      if (this.state.registerIsOpen === false) {
        this.capture()
      }
    } else if (keydown.event && keydown.event.which === 39) {
      // Left key
      this.handleNextCard()
    } else if (keydown.event && keydown.event.which === 37) {
      // Right key
      this.handlePreviusCard()
    }
  }
  componentWillUnmount() {
    this.state.trackingTask.stop()
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
    const currentCardTemplate = clone(cardTemplateList[index])
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
    const result = this.searchRegisterData(firstnameTH, lastnameTH) || {}
    this.setState({
      personInfo: {
        firstnameTH,
        lastnameTH,
        firstnameEN,
        lastnameEN,
        citizenId,
        memberId: result.code || '',
        memberType: result.type || '',
        school: result.school || '',
        position: result.position || '',
        address: result.address || '',
        mobile: '',
        student: '',
        interest: [],
        note: '',
        email: '',
      },
    }, () => {
      this.drawCardTemplate()
    })
  }
  handleTrackerStart() {
    const self = this
    const video = this.elementVideo
    const tracker = new window.tracking.ObjectTracker(['face'])
    tracker.setEdgesDensity(0.1)
    tracker.setInitialScale(4)
    tracker.setStepSize(2)
    const trackingTask = window.tracking.track(video, tracker, { camera: true })
    tracker.on('track', (event) => {
      if (event.data.length !== 0) {
        const max = event.data.reduce((a, b) => (a.width > b.width ? a : b))
        self.setState({ currentFaceDetection: max })
        const context = self.elementTempVideo.getContext('2d')
        context.clearRect(0, 0, self.state.imageSize.width, self.state.imageSize.height)
        context.drawImage(video, 0, 0, self.state.videoSize.width, self.state.videoSize.height, 0, 0, self.state.imageSize.width, self.state.imageSize.height)
        self.drawCardTemplate()
      }
    })
    this.setTrackingTask(trackingTask)
  }
  handleTrackerStop() {
    this.state.trackingTask.stop() // If you wan't to stop tracking
  }
  searchRegisterData(firstname, lastname) {
    const result = regisData.find(user => ((user.firstname.indexOf(firstname) !== -1) && (user.lastname.indexOf(lastname) !== -1)))
    return result
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
        school: '',
        position: '',
        student: '',
        address: '',
        mobile: '',
        interest: [],
        note: '',
        email: '',
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
    if (index >= cardTemplateList.length) {
      index = 0
    }
    this.setCardTemplate(index)
  }
  handlePreviusCard() {
    let index = this.state.index
    index -= 1
    if (index < 0) {
      index = cardTemplateList.length - 1
    }
    this.setCardTemplate(index)
  }
  capture() {
    this.handleTrackerStop()
    const cardGenerateList = this.state.cardGenerateList
    if (cardGenerateList.length >= 6) {
      cardGenerateList.splice(5, 1) // delete card over length
    }
    const cardGenerate = {
      date: new Date(),
      ...this.state.personInfo,
      canvas: this.elementCardTemplate,
      imgPath: this.elementCardTemplate.toDataURL('image/jpeg'),
      blob: this.dataURItoBlob(this.elementCardTemplate.toDataURL('image/jpeg')),
      blobUser: this.dataURItoBlob(this.elementTempVideo.toDataURL('image/jpeg')),
    }
    cardGenerateList.unshift(cardGenerate)
    if (this.state.registerMode === false) {
      this.sendData(cardGenerate)
      this.setState({ cardGenerateList })
    } else {
      this.setState({ cardGenerateList, registerIsOpen: true })
    }
  }
  sendData(objectData) {
    // this.setState({ isLoading: 'loading' })
    const data = new FormData()
    const tempObjectData = clone(objectData)
    delete tempObjectData.canvas // fixbug
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
    // .then((response) => {
    //   if (response.status >= 200 && response.status < 300) {
    //     return response
    //   }
    //   const error = new Error(response.statusText)
    //   error.response = response
    //   throw error
    // })
    // .then(response => response.json())
    // .then((data) => {
    //   this.setState({ isLoading: 'success' })
    //   console.log('request succeeded with JSON response', data)
    // }).catch((error) => {
    //   this.setState({ isLoading: 'fail' })
    //   console.log('request failed', error)
    // })
    this.handleRegisterClose()
  }
  handleRegisterClose() {
    this.handleTrackerStart()
    this.setState({ registerIsOpen: false })
  }
  handleRegisterOpen() {
    this.capture()
  }
  handleZoom() {
    this.handleTrackerStop()
    return true
  }
  handleUnzoom() {
    this.handleTrackerStart()
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
        {/* <Loading mode={this.state.isLoading} /> */}
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
                  <Title size="is1" style={defaultStyle.headerStyle}>ระบบทำบัตรที่เร็วที่สุดในประเทศ !!</Title>
                </Column>
              </Columns>
              <Columns isMultiline>
                <Column size="is6" style={style}>
                  <Image src={imgCamera} alt="Camera" className="App-camera" style={{ marginBottom: '5px', zIndex: 10 }} />
                  <Webcam audio={false} width={defaultStyle.cameraSize.width} height={defaultStyle.cameraSize.height} style={webcamStyle} />
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
                  <div className="checkbox" style={{marginBottom: '0.0em'}}>
                      <label style={{fontSize: "1.5em"}}>
                          <input type="checkbox" onChange={() => { this.setState({ registerMode: !this.state.registerMode }) }} checked={this.state.registerMode} />
                          <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                      </label>
                      <Register isOpen={this.state.registerIsOpen} open={this.handleRegisterOpen} close={this.handleRegisterClose} sendData={this.sendData} data={this.state.cardGenerateList} />
                  </div>
                </Column>
              </Columns>
              <Columns>
                <Column size="is12" style={style}>
                  <Box>
                    <LevelLeft>
                      <Subtitle size="is3" style={webfont}>รายการบัตรล่าสุด <Clock format="HH:mm:ss" /></Subtitle>
                    </LevelLeft>
                    <RecentCardList cards={this.state.cardGenerateList} zoom={this.handleZoom} unzoom={this.handleUnzoom} />
                  </Box>
                </Column>
              </Columns>
            </Container>
          </HeroBody>
          {Footer}
        </Hero>
      </div>
    )
  }
}

App.propTypes = {
  containerWidth: PropTypes.number,
}

export default reactKeydown(dimensions()(App))
