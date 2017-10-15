import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class StreamChartMessages extends PureComponent {
  render() {
    const { height, data } = this.props;
    const paddingTop = 14;
    const barWidth = 3;
    return (
      <g>
        {renderMessages()}
      </g>
    );

    function renderMessages() {
      /* eslint-disable react/no-array-index-key */
      return data.map((d, i) => {
        const xPos = d.frame - (barWidth / 2);
        return (
          <rect
            key={`data-${i}`}
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
  data: PropTypes.array.isRequired,
};
StreamChartMessages.propTypes = propTypes;

export default StreamChartMessages;
