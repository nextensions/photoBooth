import React, { Component } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, Heading, LevelLeft, Section, Button } from 're-bulma'
import Webcam from 'react-webcam'
import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import './App.css'

const style = { padding: '10px' }
const webfont = { fontFamily: 'THSarabunNewBold', fontWeight: 'normal', letterSpacing: -1 }

class App extends Component {
  render() {
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
                </Column>

                <Column size="is5" style={style} is-fullheight>
                  <Hero>
                    <HeroBody>
                      <Container>
                        <Image src="assets/img/card.png" alt="Card" style={{ marginBottom: '5px' }} ration="is4By3" className="App-card" />
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

export default App
