import React from 'react'
import { Container, Content, HeroFoot, Icon } from 're-bulma'

const Footer = () => (
  <HeroFoot>
    <Container>
      <Content>
        <p style={{ textAlign: 'center', padding: '10px' }}>
          made with <Icon icon="fa fa-heart" size="isSmall" style={{ color: 'red' }} /> by <a href="http://www.nextgensoft.co.th">Nextgensoft</a>
        </p>
      </Content>
    </Container>
  </HeroFoot>
)

export default Footer
