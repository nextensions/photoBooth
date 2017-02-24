import React, { Component } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, Heading, LevelLeft, Section, Button } from 're-bulma'
import keydown from 'react-keydown';
import Webcam from 'react-webcam'
import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import cardUdon from './template/udon.png'
import cardUbon from './template/ubon.jpg'
import cardSaat from './template/SAAT.png'
import 'whatwg-fetch';
import 'tracking';
import './data/face.js';
import './App.css'

const style = { padding: '10px' }
const webfont = { fontFamily: 'THSarabunNewBold', fontWeight: 'normal', letterSpacing: -1 }

class App extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      cardData: [
        {
          name: 'ส.บ.ม.ท.',
          src: cardSaat,
          captureSize: { width: 115, height: (115 / 3) * 4 },
          capturePosition:  { x: 12, y: 67 },
        },
        {
          name: 'โรงเรียนอุบล',
          src: cardUbon,
          captureSize: { width: 98, height: (98 / 3) * 4 },
          capturePosition:  { x: 15, y: 83 },
        },
        {
          name: 'โรงเรียนอุดร',
          src: cardUdon,
          captureSize: { width: 90, height: 120 },
          capturePosition:  { x: 17, y: 86 },
        },
      ],
      currentCardData: cardUbon,
      faceList: [],
      cardGenerateList: [],
      current: {},
      videoSize: {
        width:640,
        height:480,
      },
      imageSize: {
        width:320,
        height:240,
      },
      cardTeamplteSize: {
        width:1,
        height:1,
      },
      cardSize: {
        width:400,
        height:251,
      },
      captureSize: { width: 0, height: 0 },
      capturePosition:  { x: 0, y: 0 },
    };
  }
  componentDidMount() {
    this.setCard(0);
    var self = this;
    var video = document.getElementById('video');
    var tracker = new window.tracking.ObjectTracker(['face']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.01);
    window.tracking.track(video, tracker, { camera: true });
    tracker.on('track', function(event) {
      if (event.data.length !== 0) {

        self.setState({faceList:event.data});
        let max = event.data.reduce(function (a, b) { return a.width > b.width ? a : b; });
        self.setState({current:max});
        let video = document.getElementById('video');
        let context = self.refs.tempVideo.getContext('2d');
        context.clearRect(0, 0, self.state.imageSize.width, self.state.imageSize.height);
        context.drawImage(video, 0, 0, self.state.videoSize.width, self.state.videoSize.height, 0, 0, self.state.imageSize.width, self.state.imageSize.height);
      }
    });
  }
  componentDidUpdate() {
    let context = this.refs.cardTemplate.getContext('2d');
    context.clearRect(0, 0, this.state.cardSize.width, this.state.cardSize.height);
    // Add Card
    context.drawImage(this.refs.template, 0, 0, this.state.cardTeamplteSize.width, this.state.cardTeamplteSize.height, 0, 0, this.state.cardSize.width, this.state.cardSize.height);
    // Add Background
    context.beginPath();
    context.rect(this.state.capturePosition.x, this.state.capturePosition.y, this.state.captureSize.width, this.state.captureSize.height);
    context.fillStyle = "white";
    context.fill();
    context.drawImage(
      this.refs.tempVideo,
      this.state.current.x - (this.state.current.width * 20 / 100),
      this.state.current.y - (this.state.current.width * 30 / 100),
      this.state.current.width + (this.state.current.width * 40 / 100),
      ((this.state.current.height + (this.state.current.width * 40 / 100)) / 3) * 4,
      this.state.capturePosition.x,
      this.state.capturePosition.y,
      this.state.captureSize.width,
      this.state.captureSize.height
    );
  }
  componentWillReceiveProps({ keydown }) {
    if (keydown.event && keydown.event.which === 13) {
      //on Enter
      this.capture()
    } else if (keydown.event && keydown.event.which === 39) {
      this.handleNextCard()
    } else if (keydown.event && keydown.event.which === 37) {
      this.handlePreviusCard()
    }
  }
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }
  setCard(index) {
    let rawWidth = 400;
    let rawHeight = 251;
    let cardWidthRatio = this.state.cardSize.width / rawWidth;
    let cardHeightRatio = this.state.cardSize.height / rawHeight;
    let tempwidth = this.state.cardData[index].captureSize.width * cardWidthRatio;
    let tempheight = this.state.cardData[index].captureSize.height * cardHeightRatio;
    let tempX = this.state.cardData[index].capturePosition.x * cardWidthRatio;
    let tempY = this.state.cardData[index].capturePosition.y * cardHeightRatio;
    let captureSize = {
      width:tempwidth,
      height:tempheight,
    }
    let capturePosition = {
      x: tempX,
      y: tempY,
    }
    this.setState({
      index: index,
      currentCardData: this.state.cardData[index].src,
      captureSize: captureSize,
      capturePosition: capturePosition,
    })
  }
  handleNextCard() {
    let index = this.state.index;
    index++;
    if (index >= this.state.cardData.length) {
      index = 0;
    }
    this.setCard(index);
  }
  handlePreviusCard() {
    let index = this.state.index;
    index--;
    if (index < 0) {
      index = this.state.cardData.length - 1;
    }
    this.setCard(index);
  }
  capture() {
    let cardGenerateList = this.state.cardGenerateList;
    cardGenerateList.push({
      canvas:this.refs.cardTemplate,
      src:this.refs.cardTemplate.toDataURL('image/jpeg')
    });
    var data = new FormData()
    var blob = this.dataURItoBlob(this.refs.cardTemplate.toDataURL('image/jpeg'));
    data.append('name', 'ทดสอบๆ')
    data.append('lastname', 'นาม')
    data.append('file', blob)
    fetch('http://localhost:3030/upload', {
      method: 'POST',
      body: data
    })
    this.setState({cardGenerateList:cardGenerateList});
  }
  onImgLoad({target:img}) {
    this.setState({
      cardTeamplteSize:{
        width:img.offsetWidth,
        height:img.offsetHeight,
      }
    })
  }
  render() {
    let FaceList = this.state.faceList.map((item,key) => {
      return <div key={key}>All:{JSON.stringify(item)}</div>
    })
    let CardList = this.state.cardGenerateList.slice(0).reverse().map((item,key) => {
      return <Column size="is2" style={style} key={key}>
        <Image src={item.src} alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
      </Column>
    }, this)
    return (
      <div className="App">
        <Hero size="isFullheight">
          <Section className="App-heroSection">
            <Container>
              <Heading>
                <img src={mascot} alt="Logo" className="App-logo" />
                <br />
                <img src={brand} alt="NextSchool" className="App-brand" />
              </Heading>
            </Container>
          </Section>
          <HeroBody>
            <Container hasTextCentered isFluid>
              <Columns>
                <Column size="is12" style={style}>
                  <Title size="is1" style={webfont}>ถ่ายรูปทำบัตรด่วน!</Title>
                </Column>
              </Columns>
              <Columns isMultiline>
                <Column size="is1" style={style}>&nbsp;</Column>
                <Column size="is5" style={style}>
                  <Image src="assets/img/camera.png" alt="Camera" style={{ marginBottom: '5px', zIndex: 9999 }} />
                  <Webcam audio={false} width="240" height="180" className="webcam" />
                  <video className="webcam" id="video" width={this.state.imageSize.width} style={{visibility:"hidden"}} height={this.state.imageSize.height} preload autoPlay loop muted></video>
                  <canvas ref="tempVideo" width={this.state.imageSize.width} style={{display:"none"}} height={this.state.imageSize.height}/>
                  <img src={this.state.currentCardData} onLoad={this.onImgLoad.bind(this)} ref="template" style={{visibility:"hidden",position: "fixed",left:0,top:0}}/>
                  { FaceList }
                  <div>Max:{JSON.stringify(this.state.current)}</div>
                </Column>
                <Column size="is5" style={style} is-fullheight>
                  <Hero>
                    <HeroBody>
                      <Container>
                        <span style={ webfont }>นายสุทิน</span>
                        <canvas className="App-card" ref="cardTemplate" width={this.state.cardSize.width} height={this.state.cardSize.height} style={{ marginBottom: '5px' }}></canvas>
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
                    <Columns>
                    { CardList }
                    </Columns>
                  </Box>
                </Column>
              </Columns>
            </Container>
          </HeroBody>
          <HeroFoot>
            <Container>
              <Content>
                <p style={{ textAlign: 'center' }}>
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
export default keydown(App)
