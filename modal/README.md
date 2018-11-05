# Modal

Components:

* `Modal`: modal which slides in from the right side of the screen

Example(s):

```javascript
import React, { Component } from 'react'
import { Modal, Container } from '...'

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    const { show } = this.state
    this.setState({ show: !show })
  }

  render() {
    const { show } = this.state
    return (
      <Modal show={show} toggle={this.toggle}>
        <Container>
          <h1>This is my modal</h1>
          <p>This is some text</p>
        </Container>
      </Modal>
    )
  }
}
```
