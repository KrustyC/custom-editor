import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import Resizer from './Resizer'

const Img = styled.img`
  ${({ focus }) =>
    focus &&
    css`
      border: 3px inset red;
    `}
`;

const Tooltip = styled.div`
  ${({ position: { left, bottom } }) => css`
    position: absolute;
    z-index: 10000;
    left: ${left}px;
    bottom: ${bottom}px;
  `}
`;

const Button = styled.button`
  z-index: 10000;
  width: 20px;
  height: 30px;
  background: green;
`;

const ImageTooltip = React.forwardRef(
  ({ position, onRemoveStyle, onAlignLeft, onAlignCenter, onAlignRight }, ref) => (
    <Tooltip position={position} ref={ref}>
      <Button onClick={onRemoveStyle}>X</Button>
      <Button onClick={onAlignLeft}>L</Button>
      <Button onClick={onAlignCenter}>C</Button>
      <Button onClick={onAlignRight}>R</Button>
    </Tooltip>
  )
);

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      style: {
        float: "left"
      }
    };

    this.domNode = document.getElementById("draft-align-tooltip");

    if (!this.domNode) {
      this.domNode = document.createElement("div");
      this.domNode.setAttribute("id", "draft-align-tooltip");
      document.body.appendChild(this.domNode);
    }

    this.imageRef = React.createRef();
    this.tooltipRef = React.createRef();
  }

  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    const { focus } = this.state;
    if (
      this.imageRef.current.contains(e.target) ||
      (focus && this.tooltipRef.current.contains(e.target))
    ) {
      // Clicking inside the component, so no action needs to be done
      return null;
    }
    return this.setState({ focus: false });
  };

  onFocus = () => this.setState({ focus: true });

  onRemoveStyle = () => this.setState({ style: null, focus: false });
  onAlignLeft = () => this.setState({ style: { float: "left" }, focus: false });
  onAlignCenter = () => this.setState({
    style: { 
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
    },
    focus: false
  });
  onAlignRight = () =>
    this.setState({ style: { float: "right" }, focus: false });

  getTooltipPosition = () => {
    const dimension = this.imageRef.current.getBoundingClientRect();

    const bottom = window.innerHeight - dimension.top - window.scrollY;
    const left = dimension.left + dimension.width / 2 - 30;

    return { bottom, left };
  };

  render() {
    const { focus, style } = this.state;
    const { alt, block, contentState } = this.props;
    const { src } = contentState.getEntity(block.getEntityAt(0)).getData();
    console.log('render')
    return (
      <Fragment>
        {focus &&
          ReactDOM.createPortal(
            <ImageTooltip
              ref={this.tooltipRef}
              position={this.getTooltipPosition()}
              onRemoveStyle={this.onRemoveStyle}
              onAlignLeft={this.onAlignLeft}
              onAlignCenter={this.onAlignCenter}
              onAlignRight={this.onAlignRight}
            />,
            this.domNode
          )}
        <Resizer>
          {({ width, height }) => (
            <Img
              ref={this.imageRef}
              src={src}
              width="100"
              height="100"
              alt={alt}
              tabIndex="0"
              style={{
                ...style,
                width,
                height
              }}
              focus={focus}
              onDoubleClick={this.onFocus}
            />
          )}
        </Resizer>
      </Fragment>
    );
  }
}
