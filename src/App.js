import React, { Component, PropTypes } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, LevelLeft, Section, Button, Heading } from 're-bulma'

import Dimensions from './components/Dimensions'
import Webcam from './components/Webcam'
import RecentCardList from './components/RecentCardList'
import Menu from './components/Menu/'
import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import './App.css'
import { defaultStyle, styleForMacbook, style, webfont, macbookWidth } from './config/style'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [
        { imgPath: 'assets/img/card_saat.png' },
        { imgPath: 'assets/img/card_saat.png' },
        { imgPath: 'assets/img/card_saat.png' },
        { imgPath: 'assets/img/card_saat.png' },
        { imgPath: 'assets/img/card_saat.png' },
        { imgPath: 'assets/img/card_saat.png' },
      ],
    }
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
                  <Image src="assets/img/camera.png" alt="Camera" className="App-camera" style={{ marginBottom: '5px', zIndex: 10 }} />
                  <Webcam audio={false} width={defaultStyle.cameraSize.width} height={defaultStyle.cameraSize.height} className="webcam" style={webcamStyle} />
                </Column>
                <Column size="is6" style={style} is-fullheight>
                  <Hero>
                    <HeroBody style={{ padding: '40px 20px 0' }}>
                      <Container>
                        <Image src="assets/img/card_saat.png" alt="Card" style={{ marginTop: defaultStyle.cardMarginTop, marginBottom: '5px' }} ration="is4By3" className="App-card" />
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
                    <RecentCardList cards={this.state.cards} />
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

export default Dimensions()(App)
