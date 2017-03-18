import React, { Component, PropTypes } from 'react'
import { Container } from 're-bulma'
import clone from 'lodash.clonedeep'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        firstnameTH: '',
        lastnameTH: '',
        firstnameEN: '',
        lastnameEN: '',
        citizenId: '',
        memberId: '',
        memberType: '',
        school: '',
        position: '',
        student: '',
        address: '',
        mobile: '',
        interest: [],
        note: '',
      },
      beforeIsOpen: false,
    }
    this.handleRegis = this.handleRegis.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleRegisEnter = this.handleRegisEnter.bind(this)
  }
  componentWillReceiveProps() {
    this.flow = [
      this.elementFirstnameTH,
      this.elementLastnameTH,
      this.elementPosition,
      this.elementSchool,
      this.elementAddress,
      this.elementStudent,
      this.elementMobile,
    ]
    if (this.props.data && this.props.data[0]) {
      this.setState({ data: clone(this.props.data[0]) })
    }
    this.setState({ beforeIsOpen: this.props.isOpen })
    if (this.props.isOpen === true && this.state.beforeIsOpen === false) {
      const self = this
      setTimeout(() => {
        const temp = self.flow.find(value => (!value.value))
        if (temp) temp.focus()
      }, 0)
    }
  }
  handleRegis() {
    if (this.state.data) this.props.sendData(this.state.data)
  }
  handleInputChange(event) {
    const target = event.target
    const name = target.name
    const data = this.state.data
    if (target.type === 'checkbox' && event.target.checked) {
      data[name].push(+event.target.value)
    } else if (target.type === 'checkbox') {
      const index = data[name].indexOf(+event.target.value)
      data[name].splice(index, 1)
    } else {
      const value = target.type === 'checkbox' ? target.checked : target.value
      data[name] = value
    }
    this.setState({ data })
  }
  handleRegisEnter(event) {
    if (event.key === 'Enter') {
      // this.handleRegis()
    }
  }
  handleKeyPress(value, event) {
    if (event.key === 'Enter' && event.target.value) {
      this[value].focus()
    } else if (event.key === 'Escape') {
      this.props.close()
    }
  }
  render() {
    return (
      <div>
        <a className="button is-danger is-outlined" onClick={() => this.props.open()}>
          <span className="icon is-small">
            <i className="fa fa-camera"></i>
          </span>
          <span>ลงทะเบียน</span>
        </a>
        <div className={this.props.isOpen ? 'modal is-active' : 'modal'}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">ลงทะเบียน</p>
              <button className="delete" onClick={() => this.props.close()}></button>
            </header>
            <section className="modal-card-body">
              <Container style={{ textAlign: 'left' }}>
                <div className="columns">
                  <div className="column">
                    <label className="label">ชื่อ</label>
                    <p className="control">
                      <input ref={(e) => { this.elementFirstnameTH = e }} onKeyUp={event => this.handleKeyPress('elementLastnameTH', event)} className="input" type="text" name="firstnameTH" value={this.state.data.firstnameTH} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">นามสกุล</label>
                    <p className="control">
                      <input ref={(e) => { this.elementLastnameTH = e }} onKeyUp={event => this.handleKeyPress('elementPosition', event)} className="input" type="text" name="lastnameTH" value={this.state.data.lastnameTH} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
                <label className="label">ตำแหน่ง</label>
                <p className="control">
                  <input ref={(e) => { this.elementPosition = e }} onKeyUp={event => this.handleKeyPress('elementSchool', event)} className="input" type="text" name="position" value={this.state.data.position} onChange={this.handleInputChange} />
                </p>
                <div className="columns">
                  <div className="column">
                    <label className="label">โรงเรียน</label>
                    <p className="control">
                      <input ref={(e) => { this.elementSchool = e }} onKeyUp={event => this.handleKeyPress('elementAddress', event)} className="input" type="text" name="school" value={this.state.data.school} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">ที่อยู่ (จังหวัด, อำเภอ)</label>
                    <p className="control">
                      <input ref={(e) => { this.elementAddress = e }} onKeyUp={event => this.handleKeyPress('elementStudent', event)} className="input" type="text" name="address" value={this.state.data.address} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <label className="label">จำนวนนักเรียน</label>
                    <p className="control">
                      <input ref={(e) => { this.elementStudent = e }} onKeyUp={event => this.handleKeyPress('elementMobile', event)} className="input" type="text" name="student" value={this.state.data.student} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">เบอร์ติดต่อ</label>
                    <p className="control">
                      <input ref={(e) => { this.elementMobile = e }} onKeyUp={event => this.handleKeyPress('elementNote', event)} className="input" type="text" name="mobile" value={this.state.data.mobile} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
                <label className="label">สนใจเกี่ยวกับ</label>
                <div className="columns">
                  <div className="column">
                    <div className="checkbox">
                        <label style={{fontSize: "1.0em"}}>
                          <input type="checkbox" value={1} name="interest" checked={(this.state.data.interest.indexOf(1) >= 0)} onChange={this.handleInputChange} />
                          <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                          ระบบดูแลนักเรียน NextSchool
                        </label>
                    </div>
                  </div>
                  <div className="column">
                    <div className="checkbox">
                        <label style={{fontSize: "1.0em"}}>
                          <input type="checkbox" value={2} name="interest" checked={(this.state.data.interest.indexOf(2) >= 0)} onChange={this.handleInputChange} />
                          <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                          ระบบโรงอาหาร
                        </label>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <div className="checkbox">
                        <label style={{fontSize: "1.0em"}}>
                          <input type="checkbox" value={3} name="interest" checked={(this.state.data.interest.indexOf(3) >= 0)} onChange={this.handleInputChange} />
                          <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                          ระบบสแกนรายวิชา
                        </label>
                    </div>
                  </div>
                  <div className="column">
                    <div className="checkbox">
                        <label style={{fontSize: "1.0em"}}>
                          <input type="checkbox" value={4} name="interest" checked={(this.state.data.interest.indexOf(4) >= 0)} onChange={this.handleInputChange} />
                          <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                          บัตรนักเรียน
                        </label>
                    </div>
                  </div>
                </div>
                <label className="label">เพิ่มเติม</label>
                <p className="control">
                  <textarea ref={(e) => { this.elementNote = e }} onKeyUp={event => this.handleRegisEnter(event)} className="textarea" placeholder="Textarea" name="note" value={this.state.data.note} onChange={this.handleInputChange} ></textarea>
                </p>
              </Container>
            </section>
            <footer className="modal-card-foot">
              <a className="button is-success" onClick={() => this.handleRegis()}>ลงทะเบียน</a>
              <a className="button" onClick={() => this.props.close()}>ยกเลิก</a>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  sendData: PropTypes.func.isRequired,
  data: PropTypes.array,
}

export default Register
