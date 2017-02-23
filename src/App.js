import React, { Component } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, Heading, LevelLeft, Section, Button } from 're-bulma'
import keydown from 'react-keydown';
import Webcam from 'react-webcam'
import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import template from './template/udon.png'
import 'tracking';
import './data/face.js';
import './App.css'

const style = { padding: '10px' }
const webfont = { fontFamily: 'THSarabunNewBold', fontWeight: 'normal', letterSpacing: -1 }

class App extends Component {
  constructor() {
    super();
    this.state = {
      faceList: [],
      current: {},
      videoSize: {
        width:640,
        height:480,
      },
      imageSize: {
        width:320,
        height:240,
      },
      cardSize: {
        width:400,
        height:251,
      },
      captureSize: {
        width:90,
        height:120
      },
      capturePosition: {
        x:17,
        y:86
      }
    };
  }
  componentDidMount() {
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
    console.log(new Date, "update")
    let context = this.refs.canvas.getContext('2d');
    context.clearRect(0, 0, this.state.cardSize.width, this.state.cardSize.height);
    // Add Card
    context.drawImage(this.refs.template, 0, 0, this.state.cardSize.width, this.state.cardSize.height, 0, 0, this.state.cardSize.width, this.state.cardSize.height);
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
      console.log(keydown.event.which);
    }
  }
  render() {
    let FaceList = this.state.faceList.map((item,key) => {
      return <div key={key}>All:{JSON.stringify(item)}</div>
    })
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
                  <img src={template} onLoad={this.onImgLoad} ref="template" style={{display:"none"}} width={this.state.imageSize.width} height={this.state.imageSize.height} alt=""/>
                  { FaceList }
                  <div>Max:{JSON.stringify(this.state.current)}</div>
                </Column>
                <Column size="is5" style={style} is-fullheight>
                  <Hero>
                    <HeroBody>
                      <Container>
                        <canvas className="App-card" ref="canvas" width={this.state.cardSize.width} height={this.state.cardSize.height} style={{ marginBottom: '5px' }}></canvas>
                      </Container>
                    </HeroBody>
                  </Hero>
                </Column>
                <Column size="is12" style={style}>
                  <Button icon="fa fa-camera" buttonStyle="isOutlined" color="isDanger">ถ่ายรูป</Button>
                </Column>
              </Columns>
              <Columns>
                <Column size="is12" style={style}>
                  <Box>
                    <LevelLeft>
                      <Subtitle size="is3" style={webfont}>รายการบัตรล่าสุด</Subtitle>
                    </LevelLeft>
                    <Columns>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
                      <Column size="is2" style={style}>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-cardThumbs" />
                      </Column>
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
