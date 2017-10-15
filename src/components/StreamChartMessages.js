import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class StreamChartMessages extends PureComponent {
  render() {
    const { height, messages, legendHeight } = this.props;
    const barWidth = 3;
    return (
      <g>
        {renderMessages()}
      </g>
    );

    function renderMessages() {
      /* eslint-disable react/no-array-index-key */
      return messages.map((d, i) => {
        const xPos = d.frame - (barWidth / 2);
        return (
          <rect
            key={`message-${i}`}
            width={barWidth}
            height={height - legendHeight}
            x={xPos}
            y={legendHeight}
            fill="#4a90e2"
          />
        );
      });
      /* eslint-enable react/no-array-index-key */
    }
  }
}

const propTypes = {
  height: PropTypes.string.isRequired,
  legendHeight: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
};
StreamChartMessages.propTypes = propTypes;

export default StreamChartMessages;
