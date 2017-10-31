import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StreamChartGrid from './StreamChartGrid';
import StreamChartMessages from './StreamChartMessages';
import StreamChartTimeMarker from './StreamChartTimeMarker';

const chartWidth = 300;
const chartHeight = 40;
const chartLegendHeight = 14;

class StreamChart extends PureComponent {
  render() {
    const { title, messages, selected } = this.props;
    return (
      <StreamContainer selected={selected}>
        <StreamTitle>{title}</StreamTitle>
        <StreamChartWrapper>
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
        </StreamChartWrapper>
      </StreamContainer>
    );
  }
}

const propTypes = {
  title: PropTypes.string,
  messages: PropTypes.array.isRequired,
  selected: PropTypes.bool,
};
const defaultProps = {
  title: '',
  selected: false,
};
StreamChart.propTypes = propTypes;
StreamChart.defaultProps = defaultProps;

const StreamContainer = styled.div`
  background-color: ${props => (props.selected ? '#2c313a' : '#282c34')};
  padding: 8px 60px;
`;
const StreamTitle = styled.h3`
  color: #6b727e;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.8rem;
  margin: 0;
  padding: 8px 0;
`;
const StreamChartWrapper = styled.div`
  padding: 8px 0;
`;

export default StreamChart;
