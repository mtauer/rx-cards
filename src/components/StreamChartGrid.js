import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class StreamChartGrid extends PureComponent {
  render() {
    const { width, height, legendHeight } = this.props;
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
          height={height - legendHeight}
          x={0}
          y={legendHeight}
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  legendHeight: PropTypes.number.isRequired,
};
StreamChartGrid.propTypes = propTypes;

export default StreamChartGrid;
