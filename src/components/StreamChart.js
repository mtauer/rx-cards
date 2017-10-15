import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StreamChartGrid from './StreamChartGrid';
import StreamChartMessages from './StreamChartMessages';
import StreamChartTimeMarker from './StreamChartTimeMarker';

import './StreamChart.css';

class StreamChart extends PureComponent {
  render() {
    const { width, height, label, messages } = this.props;
    return (
      <div className="observable-chart-container">
        <h3 className="observable-chart__label">{label}</h3>
        <div className="observable-chart">
          <svg width={width} height={height}>
            <StreamChartGrid width={width} height={height} />
            <StreamChartMessages width={width} height={height} messages={messages} />
            <StreamChartTimeMarker width={width} height={height} />
          </svg>
        </div>
      </div>
    );
  }
}

const propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  label: PropTypes.string,
};
const defaultProps = {
  label: '',
};
StreamChart.propTypes = propTypes;
StreamChart.defaultProps = defaultProps;

export default StreamChart;
