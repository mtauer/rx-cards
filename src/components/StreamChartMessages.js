import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class StreamChartMessages extends PureComponent {
  render() {
    const { height, messages } = this.props;
    const paddingTop = 14;
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
            height={height - paddingTop}
            x={xPos}
            y={paddingTop}
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
  messages: PropTypes.array.isRequired,
};
StreamChartMessages.propTypes = propTypes;

export default StreamChartMessages;
