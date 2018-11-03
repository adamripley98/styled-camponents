import React from 'react'
import styled from 'styled-components'

import HoverNotice from './HoverNotice'
import { Row, Col } from '../../components'
import { STAR_GRASS } from '../../styles/colors'
import rightChevron from '../../assets/Icons/right_chevron.svg'
import leftChevron from '../../assets/Icons/left_chevron.svg'

const HEIGHT = '56vh';

const Image = styled.div`
  width: ${props => props.width || '100%'};
  height: ${HEIGHT};
  box-sizing: border-box;
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Absolute = styled.div`
  position: absolute;
  width: ${props => props.width || '100%'};
  height: ${HEIGHT};
  z-index: -1;
`

const Line = styled.div`
  display: inline-block;
  height: ${HEIGHT};
  width: 4px;
  background: ${STAR_GRASS};
`

const Circle = styled.div`
  position: absolute;
  width: 2.08333333333vw;
  height: 2.08333333333vw;
  border-radius: 50%;
  background: ${STAR_GRASS};
  top: 28vh;
  transform: translate(calc(-50% + 2px), -50%);
  text-align: center;
`

const Chevron = styled.img`
  width: 0.26041666666vw;
  display: inline-block;
  margin: 0.78125vw 0.13020833333vw;
`

export class ReviewImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
      percent: 0.5,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  componentDidMount() {
    // When the screen resizes, we need a new measurement for the width of the
    // review image. This will de done on the next mouse move event
    // NOTE arrow function necessary to maintain access to "this"
    window.onresize = () => {
      this.setState({
        start: undefined,
        end: undefined,
        percent: 0.5,
      })
    }
  }

  handleMouseEnter() {
    this.setState({ hovering: true })
  }

  handleMouseLeave() {
    this.setState({ hovering: false })
  }

  handleMouseMove(event) {
    const pos = event.screenX

    // Memoize start and end of the wrapper image div
    // Querying this info from the event every time is computationally costly
    let { start, end } = this.state

    if (!start || !end) {
      const boundingRect = event.target.getBoundingClientRect()
      start = boundingRect.left;
      end = boundingRect.right;
      this.setState({ start, end })
    }

    const percent = (pos - start) / (end - start)

    if (percent >= 0 && percent <= 1) {
      this.setState({ percent })
    }
  }

  render() {
    const { image, smileBefore, smileAfter, width } = this.props
    const { hovering, percent } = this.state

    if (!hovering) {
      return (
        <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <Image backgroundImage={image} alt="Reviewer image" />
          <HoverNotice />
        </div>
      )
    }

    return (
      <Row
        onMouseMove={this.handleMouseMove}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref="wrapper"
      >
        <div style={{
          width: `${percent * 100}%`,
          overflowX: 'hidden',
        }}>
          <Image width={width} backgroundImage={smileBefore} alt="Before" />
        </div>

        <Line>
          <Circle>
            <Chevron src={leftChevron} alt="move left" />
            <Chevron src={rightChevron} alt="move right" />
          </Circle>
        </Line>

        <Absolute>
          <Image width={width} backgroundImage={smileAfter} alt="After" />
        </Absolute>
      </Row>
    )
  }
}
