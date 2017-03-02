import React, { PropTypes } from 'react'
import { Columns, Column } from 're-bulma'
import moment from 'moment'
import ImageZoom from 'react-medium-image-zoom'

const style = { padding: '10px' }

const RecentCard = ({ image, date }) => (
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
    <div>{ moment(date).format('HH:mm:ss') }</div>
  </Column>
)

RecentCard.propTypes = {
  image: PropTypes.string,
  date: PropTypes.instanceOf(Date),
}

const RecentCardList = ({ cards }) => (
  <Columns>
    { cards.map((card, index) => <RecentCard key={index} image={card.imgPath} date={card.date} />) }
  </Columns>
)

RecentCardList.propTypes = {
  cards: PropTypes.arrayOf(React.PropTypes.object),
}

export default RecentCardList
