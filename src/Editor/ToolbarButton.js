import React, { Component } from "react";
import { Button } from "./style";

export default class ToolbarButton extends Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    const { active } = this.props

    return (
      <Button active={active} onMouseDown={this.onToggle}>
        {this.props.label}
      </Button>
    );
  }
}
