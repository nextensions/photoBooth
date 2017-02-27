import React, { Component } from 'react'

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
    } finally {
    }
  }
  cardPresent(reader) {
    const that = this
    setTimeout(() => that.initCard(reader), 10)
  }
  cardRemoved(reader) {
  }
  hex2string(hexx) {
    if (hexx.length > 4) hexx = hexx.slice(0, -4);
    var hex = hexx.toString(); //force conversion
    var str = '';
    var tmp = '';
    var patt = /^[a-zA-Z0-9&@.$%\-,():;`# \/]+$/;
    for (var i = 0; i < hex.length; i += 2) {
      tmp = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      if (tmp.match(patt)) {} else {
        tmp = String.fromCharCode(parseInt(hex.substr(i, 2), 16) + 3424);
      }
      str += tmp;
    }

    str = str.replace(/#/g, ' ');

    return str;
  }
  initCard(reader) {
      reader.connect(1); // 1-Exclusive, 2-Shared
      console.log('ATR : ' + reader.atr);
      var cmd_select = '00A4040008A000000054480001'; // select before everything, don't remove
      reader.transcieve(cmd_select);

      // Citizen ID
      var apdu = '80B0000402000D';
      var resp = reader.transcieve(apdu);
      var citizen_id = this.hex2string(resp);
      console.log('CID : ' + citizen_id);


      // Person Info
      apdu = '80B000110200D1';
      resp = reader.transcieve(apdu);
      var info = this.hex2string(resp);
      console.log('INFO : ' + info);
      var tmp = info.split(' '); // split data info
      var person = {};
      tmp = tmp.filter(v => v != ''); // filter null
      person.title_th = tmp[0];
      person.firstname_th = tmp[1];
      person.lastname_th = tmp[2];
      person.title_en = tmp[3];
      person.firstname_en = tmp[4];
      person.lastname_en = tmp[5];
      person.dob = tmp[6].slice(0, -1);
      person.gender = tmp[6].slice(-1);
      console.log(person)
      // Cookies.set('data', person.firstname_th, { expires: 7 });

      // Address
      apdu = '80B01579020064';
      resp = reader.transcieve(apdu);
      var address = this.hex2string(resp);
      var tmp = address.split(' '); // split data info
      var address = {};
      tmp = tmp.filter(v => v != ''); // filter null
      console.log(tmp)
      console.log('ADDRESS : ', address)

      // ISSUE
      apdu = '80B00167020012';
      resp = reader.transcieve(apdu);
      var issueAll = this.hex2string(resp);
      console.log('ISSUE ALL : ', issueAll)
      if (issueAll.length >= 16) {
        var issue = issueAll.slice(0, 8);
        var expire = issueAll.slice(8, 16);
        console.log('ISSUE : ', issue)
        console.log('EXPIRE : ', expire)
      }


      reader.disconnect();
      }
    render() {
    return (
      <div>
        <object id="webcard" type="application/x-webcard" width="0" height="0">
            <param name="onload" value="pluginLoaded"/>
        </object>
      </div>
    )
  }
}

export default SmartCard
