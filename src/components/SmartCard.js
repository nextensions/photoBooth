import React, { Component, PropTypes } from 'react'

class SmartCard extends Component {
  constructor() {
    super()
    this.pluginLoaded = this.pluginLoaded.bind(this)
    this.addEvent = this.addEvent.bind(this)
    this.cardPresent = this.cardPresent.bind(this)
    this.cardRemoved = this.cardRemoved.bind(this)
    this.initCard = this.initCard.bind(this)
  }
  componentDidMount() {
    this.pluginLoaded()
  }
  addEvent(obj, name, func) {
    if (obj.attachEvent) {
      obj.attachEvent(`on${name}`, func)
    } else {
      obj.addEventListener(name, func, false)
    }
  }
  pluginLoaded() {
    const webcard = document.getElementById('webcard')
    this.addEvent(webcard, 'cardpresent', this.cardPresent)
    this.addEvent(webcard, 'cardremoved', this.cardRemoved)
    try {
      for (let i = 0; i < webcard.readers.length; i += 1) {
        const rdr = document.createElement('h3')
        rdr.textContent = webcard.readers[i].name
        rdr.id = webcard.readers[i].name.replace(/\s/g, '').toLowerCase()
      }
    } catch (e) {
      console.log(e)
    }
  }
  cardPresent(reader) {
    const that = this
    setTimeout(() => that.initCard(reader), 10)
  }
  cardRemoved() {
    this.props.clearPersonInfo()
    // if card remove
  }
  hex2string(hexx) {
    let tempHexx = hexx
    if (tempHexx.length > 4) tempHexx = tempHexx.slice(0, -4)
    const patt = /^[a-zA-Z0-9&@.$%\-,():`# \/]+$/
    const hex = tempHexx.toString()
    let str = ''
    let tmp = ''
    for (let i = 0; i < hex.length; i += 2) {
      tmp = String.fromCharCode(parseInt(hex.substr(i, 2), 16))
      if (!tmp.match(patt)) {
        tmp = String.fromCharCode(parseInt(hex.substr(i, 2), 16) + 3424)
      }
      str += tmp
    }
    str = str.replace(/#/g, ' ')
    return str
  }
  initCard(reader) {
    try {
      const person = {}
      let apdu
      let resp
      let tmp = ''
      reader.connect(1) // 1-Exclusive, 2-Shared
      apdu = '00A4040008A000000054480001' // select before everything, don't remove
      reader.transcieve(apdu)

      // Citizen ID
      apdu = '80B0000402000D'
      resp = reader.transcieve(apdu)
      person.citizenId = this.hex2string(resp)

      // Person Info
      apdu = '80B000110200D1'
      resp = reader.transcieve(apdu)
      tmp = this.hex2string(resp)
      tmp = tmp.split(' ') // split data info
      tmp = tmp.filter(v => v !== '') // filter null
      person.titleTH = tmp[0]
      person.firstnameTH = tmp[1]
      person.lastnameTH = tmp[2]
      person.titleEN = tmp[3]
      person.firstnameEN = tmp[4]
      person.lastnameEN = tmp[5]
      person.dob = tmp[6].slice(0, -1)
      person.gender = tmp[6].slice(-1)

      // Address
      apdu = '80B01579020064'
      resp = reader.transcieve(apdu)
      tmp = this.hex2string(resp)
      tmp = tmp.split(' ') // split data info
      tmp = tmp.filter(v => v !== '') // filter null

      // ISSUE
      apdu = '80B00167020012'
      resp = reader.transcieve(apdu)
      tmp = this.hex2string(resp)
      if (tmp.length >= 16) {
        person.issueAll = tmp.slice(0, 8)
        person.expire = tmp.slice(8, 16)
      }
      this.props.setPersonInfo(person.firstnameTH, person.lastnameTH, person.firstnameEN, person.lastnameEN, person.citizenId)
    } catch (e) {
      this.props.setPersonInfo('เสียบบัตรไม่แน่นกรุณาเสียบใหม่!!', '', 'เสียบบัตรไม่แน่นกรุณาเสียบใหม่!!', '', '')
      console.log(e)
    } finally {
      reader.disconnect()
    }
  }
  render() {
    return (
      <div>
        <object id="webcard" type="application/x-webcard" width="0" height="0">
          <param name="onload" value="pluginLoaded" />
        </object>
      </div>
    )
  }
}

SmartCard.propTypes = {
  setPersonInfo: PropTypes.func.isRequired,
  clearPersonInfo: PropTypes.func.isRequired,
}
export default SmartCard
