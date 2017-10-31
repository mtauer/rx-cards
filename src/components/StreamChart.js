import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StreamChartGrid from './StreamChartGrid';
import StreamChartMessages from './StreamChartMessages';
import StreamChartTimeMarker from './StreamChartTimeMarker';

import './StreamChart.css';

const chartWidth = 300;
const chartHeight = 40;
const chartLegendHeight = 14;

class StreamChart extends PureComponent {
  render() {
    const { label, messages } = this.props;
    return (
      <div className="observable-chart-container">
        <h3 className="observable-chart__label">{label}</h3>
        <div className="observable-chart">
          <svg width={chartWidth} height={chartHeight}>
            <StreamChartGrid
              width={chartWidth}
              height={chartHeight}
              legendHeight={chartLegendHeight}
            />
            <StreamChartMessages
              width={chartWidth}
              height={chartHeight}
              legendHeight={chartLegendHeight}
              messages={messages}
            />
            <StreamChartTimeMarker
              width={chartWidth}
              height={chartHeight}
              legendHeight={chartLegendHeight}
            />
          </svg>
        </div>
      </div>
    );
  }
}

const propTypes = {
  messages: PropTypes.array.isRequired,
  label: PropTypes.string,
};
const defaultProps = {
  label: '',
};
StreamChart.propTypes = propTypes;
StreamChart.defaultProps = defaultProps;

export default StreamChart;
