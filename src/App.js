import React, { Component, PropTypes } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Title, Subtitle, Icon, Image, Columns, Column, Box, LevelLeft, Section, Button, Heading } from 're-bulma'
import Webcam from 'react-webcam'

import mascot from './img/mascot.svg'
import brand from './img/textOnly.svg'
import Menu from './Menu'
import RecentCardList from './RecentCardList'
import './App.css'

const style = { padding: '10px' }
const webfont = { fontFamily: 'THSarabunNewBold', fontWeight: 'normal', letterSpacing: -1 }
const title = { fontFamily: 'THSarabunNewBold', fontWeight: 'normal', letterSpacing: -1, fontSize: '85px' }

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: [
        { imgPath: 'assets/img/card.png' },
        { imgPath: 'assets/img/card.png' },
        { imgPath: 'assets/img/card.png' },
        { imgPath: 'assets/img/card.png' },
        { imgPath: 'assets/img/card.png' },
        { imgPath: 'assets/img/card.png' },
      ],
    }
  }

  render() {
    return (
      <div className="App" id="page-wrap">
        <Menu />
        <Hero size="isFullheight">
          <Section className="App-heroSection" style={{ padding: '20px' }}>
            <Container isFluid>
              <Heading>
                <img src={mascot} alt="Logo" className="App-logo" /> <br />
                <img src={brand} alt="NextSchool" className="App-brand" />
              </Heading>
            </Container>
          </Section>
          <HeroBody>
            <Container hasTextCentered isFluid>
              <Columns>
                <Column size="is12" style={style}>
                  <Title size="is1" style={title}>ถ่ายรูปทำบัตรด่วน!</Title>
                </Column>
              </Columns>
              <Columns isMultiline>
                <Column size="is6" style={style}>
                  <Image src="assets/img/camera.png" alt="Camera" className="App-camera" style={{ marginBottom: '5px', zIndex: 10 }} />
                  <Webcam audio={false} width="480" height="360" className="webcam" />
                </Column>
                <Column size="is6" style={style} is-fullheight>
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

RecentCardList.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.object),
}
export default App
