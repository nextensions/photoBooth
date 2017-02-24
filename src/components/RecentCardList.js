import React, { PropTypes } from 'react'
import { Columns, Column } from 're-bulma'
import ImageZoom from 'react-medium-image-zoom'

const style = { padding: '10px' }

const RecentCard = ({ image }) => (
  <Column size="is2" style={style}>
    <ImageZoom
      image={{
        src: image,
        alt: 'GCard',
        className: 'App-cardThumbs',
        style: { width: '50em', marginBottom: '5px' },
      }}
      zoomImage={{
        src: image,
        alt: 'GCard',
        className: 'App-cardThumbs',
      }}
    />
  </Column>
)

RecentCard.propTypes = {
  image: PropTypes.string,
}

const RecentCardList = ({ cards }) => (
  <Columns>
    { cards.map((card, index) => <RecentCard key={index} image={card.imgPath} />) }
  </Columns>
)

RecentCardList.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.object),
}

export default RecentCardList
