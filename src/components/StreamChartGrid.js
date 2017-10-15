import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class StreamChartGrid extends PureComponent {
  render() {
    const { width, height } = this.props;
    const paddingTop = 14;
    return (
      <g>
        {renderBackground()}
        {renderGrid()}
      </g>
    );

    function renderBackground() {
      return (
        <rect
          width={width}
          height={height - paddingTop}
          x={0}
          y={paddingTop}
          fill="#ffffff"
        />
      );
    }

    function renderGrid() {
      return _.range(0, 6).map((i) => {
        const xPos = i * 60;
        const time = i * 200;
        const text = `${time} ms`;
        return [
          <rect
            key={`line-${time}`}
            width={1}
            height={height}
            x={xPos}
            y={0}
            fill="#d9d9d9"
          />,
          <text
            key={`text-${time}`}
            x={xPos - 2}
            y={10}
            textAnchor="end"
            fontSize={11}
            fill="#404040"
          >{text}</text>,
        ];
      });
    }
  }
}

const propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
StreamChartGrid.propTypes = propTypes;

export default StreamChartGrid;
