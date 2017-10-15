import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class StreamChartTimeMarker extends PureComponent {
  render() {
    const { height } = this.props;
    return (
      <rect
        width={1}
        height={height}
        x={0}
        y={0}
        fill="#d0021b"
      />
    );
  }
}

const propTypes = {
  height: PropTypes.number.isRequired,
};
StreamChartTimeMarker.propTypes = propTypes;

export default StreamChartTimeMarker;
