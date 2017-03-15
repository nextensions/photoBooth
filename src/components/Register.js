import React, { Component, PropTypes } from 'react'
import { Button, Modal, Content } from 're-bulma'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleClose() {
    alert("close")
    this.setState({ isOpen: false })
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ isOpen: true })}>Open</Button>
        <Modal
          type="card"
          headerContent="Header Content"
          footerContent={<div style={{ padding: '20px' }} >footercontent</div>}
          isActive={this.state.isOpen}
          onCloseRequest={() => this.handleClose}
        >
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
          </Content>
        </Modal>
      </div>
    )
  }
}

export default Register
