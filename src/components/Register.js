import React, { Component, PropTypes } from 'react'
import { Container, Button } from 're-bulma'

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
        address: '',
        mobile: '',
        interest: '',
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
    if (this.props.data && this.props.data[0]) {
      this.setState({ data: this.props.data[0] })
    }
    this.setState({ beforeIsOpen: this.props.isOpen })
    if (this.props.isOpen === true && this.state.beforeIsOpen === false) {
      const self = this
      setTimeout(() => {
        self.elementFirstnameTH.focus()
      }, 0)
    }
  }
  handleRegis() {
    if (this.state.data) this.props.sendData(this.state.data)
    this.props.close()
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const data = this.state.data
    data[name] = value
    this.setState({ data })
  }
  handleRegisEnter(event) {
    if (event.key === 'Enter') {
      this.handleRegis()
    }
  }
  handleKeyPress(value, event) {
    if (event.key === 'Enter') {
      this[value].focus()
    }
  }
  render() {
    return (
      <div>
        <Button buttonStyle="isOutlined" color="isDanger" icon="fa fa-camera" onClick={() => this.props.open()}>ลงทะเบียน</Button>
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
                      <input ref={(e) => { this.elementFirstnameTH = e }} onKeyPress={event => this.handleKeyPress('elementLastnameTH', event)} className="input" type="text" name="firstnameTH" value={this.state.data.firstnameTH} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">นามสกุล</label>
                    <p className="control">
                      <input ref={(e) => { this.elementLastnameTH = e }} onKeyPress={event => this.handleKeyPress('elementPosition', event)} className="input" type="text" name="lastnameTH" value={this.state.data.lastnameTH} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
                <label className="label">ตำแหน่ง</label>
                <p className="control">
                  <input ref={(e) => { this.elementPosition = e }} onKeyPress={event => this.handleKeyPress('elementSchool', event)} className="input" type="text" name="position" value={this.state.data.position} onChange={this.handleInputChange} />
                </p>
                <div className="columns">
                  <div className="column">
                    <label className="label">โรงเรียน</label>
                    <p className="control">
                      <input ref={(e) => { this.elementSchool = e }} onKeyPress={event => this.handleKeyPress('elementAddress', event)} className="input" type="text" name="school" value={this.state.data.school} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">ที่อยู่ (จังหวัด, อำเภอ)</label>
                    <p className="control">
                      <input ref={(e) => { this.elementAddress = e }} onKeyPress={event => this.handleKeyPress('elementStudent', event)} className="input" type="text" name="address" value={this.state.data.address} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <label className="label">จำนวนนักเรียน</label>
                    <p className="control">
                      <input ref={(e) => { this.elementStudent = e }} onKeyPress={event => this.handleKeyPress('elementMobile', event)} className="input" type="text" name="student" value={this.state.data.student} onChange={this.handleInputChange} />
                    </p>
                  </div>
                  <div className="column">
                    <label className="label">เบอร์ติดต่อ</label>
                    <p className="control">
                      <input ref={(e) => { this.elementMobile = e }} onKeyPress={event => this.handleRegisEnter(event)} className="input" type="text" name="mobile" value={this.state.data.mobile} onChange={this.handleInputChange} />
                    </p>
                  </div>
                </div>
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
