import React, { Component } from 'react'

export default class Resizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 100,
      height: 300
    }

    this.resizerRef = React.createRef()
  }

  componentWillMount() {
    document.addEventListener("mousemove", this.doDrag, false);
    document.addEventListener("mouseup", this.stopDrag, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.doDrag, false);
    document.removeEventListener("mouseup", this.stopDrag, false);
  }

  doDrag = (e) => {
    if (!this.resizerRef.current.contains(e.target)) {
      return null
    }
    
    return this.setState(({ width }) => ({ width: width + 1 }))
  }

  stopDrag = () => {
    console.log('dragging')
  }

  render() {
    const { width, height } = this.state
    return (
      <span ref={this.resizerRef}>
        {this.props.children({ width, height })}
      </span>
    )
  }
}