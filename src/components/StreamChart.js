import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StreamChartGrid from './StreamChartGrid';
import StreamChartMessages from './StreamChartMessages';
import StreamChartTimeMarker from './StreamChartTimeMarker';

import './StreamChart.css';

const CHART_WIDTH = 300;
const CHART_HEIGHT = 40;
const CHART_LEGEND_HEIGHT = 14;

class StreamChart extends PureComponent {
  render() {
    const { label, messages } = this.props;
    return (
      <div className="observable-chart-container">
        <h3 className="observable-chart__label">{label}</h3>
        <div className="observable-chart">
          <svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            <StreamChartGrid
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              legendHeight={CHART_LEGEND_HEIGHT}
            />
            <StreamChartMessages
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              legendHeight={CHART_LEGEND_HEIGHT}
              messages={messages}
            />
            <StreamChartTimeMarker
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              legendHeight={CHART_LEGEND_HEIGHT}
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
