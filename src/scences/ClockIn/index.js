import React, { Component } from 'react'
import { Container, Content, Hero, HeroBody, HeroFoot, Icon, Columns, Column, Section, Heading } from 're-bulma'

import RealtimePage from './components/Realtime'
import mascot from '../../img/mascot.svg'
import brand from '../../img/textOnly.svg'
import { defaultStyle } from '../../config/style'

class ClockIn extends Component {

  render() {
    return (
      <div className="App">
        <Hero size="isFullheight">
          <Section className="App-heroSection" style={{ padding: '20px' }}>
            <Container isFluid>
              <Heading>
                <img src={mascot} alt="Mascot" className="App-logo" style={{ height: defaultStyle.mascotHeight }} /> <br />
                <img src={brand} alt="NextSchool" className="App-brand" style={{ width: defaultStyle.brandWidth }} />
              </Heading>
            </Container>
          </Section>
          <HeroBody style={{ padding: '40px 20px 0', alignItems: 'flex-start', maxHeight: '2385px', overflow: 'hidden' }}>
            <Container isFluid>
              <Columns>
                <Column>
                  <RealtimePage />
                </Column>
              </Columns>
            </Container>
          </HeroBody>
          <HeroFoot className="stickyFooter">
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

export default ClockIn