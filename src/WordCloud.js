import PropTypes from 'prop-types';
import cloud from 'd3-cloud';
import React, { Component } from 'react';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Tooltip, Popover } from 'antd';

import './WordCloud.css'

const fill = scaleOrdinal(schemeCategory10);

class WordCloud extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    font: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fontSizeMapper: PropTypes.func,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    width: PropTypes.number,
    onWordClick: PropTypes.func,
    onWordMouseOut: PropTypes.func,
    onWordMouseOver: PropTypes.func,
  };

  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    font: 'serif',
    rotate: 0,
    onWordClick: null,
    onWordMouseOver: null,
    onWordMouseOut: null,
  };

  state = {
    cloudDimensions: [],
    isProcessing: true
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    const {
      data,
      width,
      height,
      fontSizeMapper,
    } = this.props;

    this.wordCloud = cloud()
    .size([width, height])
    .words(data)
    .padding(10)
    .font('Impact')
    .fontSize(fontSizeMapper)
    .rotate(() => 0)
    .on('end', (cloudDimensions) => { this.setState({ cloudDimensions, isProcessing: false }); })
    .start();
  }

  render() {
    const {
      data,
      width,
      height,
      padding,
      font,
      fontSizeMapper,
      rotate,
      onWordClick,
      onWordMouseOver,
      onWordMouseOut,
    } = this.props;

    if (this.state.isProcessing) {
      return <span>Loading...</span>
    }

    return (
      <svg width={width} height={height}>
          <g transform={`translate(${width / 2},${height / 2})`}>
            {data.map((word, i) => {
              return (
                  <text
                    key={word.text}
                    style={{
                        fontSize: `${word.size}px`,
                        fontFamily: 'Impact',
                        fill: fill(i)
                    }}
                    textAnchor="middle"
                    transform={`translate(${word.x}, ${word.y})`}
                  >{word.text}</text>
              )
            }
                
            )}
          </g>
        </svg>
    )
  }
}

export default WordCloud;