import React from 'react'
import mascot from '../../img/mascot.svg'
import brand from '../../img/textOnly.svg'
import './styles.css'

const BurgerMenu = require('react-burger-menu').elastic

const Menu = () => (
  <BurgerMenu id="elastic" pageWrapId={'page-wrap'} outerContainerId={'root'} right>
    <h2 key="0">
      <span>
        <img src={mascot} alt="Logo" /><br />
        <img src={brand} alt="NextSchool" className="App-brand" />
      </span>
    </h2>
    <a key="1" href=""><i className="fa fa-fw fa-database" /><span>Data Management</span></a>
    <a key="2" href=""><i className="fa fa-fw fa-map-marker" /><span>Location</span></a>
    <a key="3" href=""><i className="fa fa-fw fa-mortar-board" /><span>Study</span></a>
    <a key="4" href=""><i className="fa fa-fw fa-picture-o" /><span>Collections</span></a>
    <a key="5" href=""><i className="fa fa-fw fa-money" /><span>Credits</span></a>
  </BurgerMenu>
)

export default Menu
