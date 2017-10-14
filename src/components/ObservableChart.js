/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import _ from 'lodash';

class ObservableChart extends Component {
  componentDidMount() {
    this.createObservableChart();
    this.updateObservableChart();
  }

  componentDidUpdate() {
    this.updateObservableChart();
  }

  createObservableChart() {
    const node = this.node;
    const { width, height, paddingTop } = this.props;
    select(node)
      .append('rect')
      .attr('class', 'background')
      .attr('height', `${height - paddingTop}px`)
      .attr('width', `${width}px`)
      .attr('x', '0px')
      .attr('y', `${paddingTop}px`)
      .attr('fill', '#ffffff');

    renderHorizontalLine(paddingTop);
    _.range(0, 6).forEach((i) => {
      renderVerticalLine(i * 60, 0, height);
      renderText(`${i * 200} ms`, (i * 60) - 2, 10);
    });

    function renderHorizontalLine(y) {
      select(node)
        .append('rect')
        .attr('class', 'grid__horizontal-line')
        .attr('height', 1)
        .attr('width', width)
        .attr('x', 0)
        .attr('y', y)
        .attr('fill', '#d9d9d9');
    }

    function renderVerticalLine(x, y, h) {
      select(node)
        .append('rect')
        .attr('class', 'grid__vertical-line')
        .attr('height', h)
        .attr('width', 1)
        .attr('x', x)
        .attr('y', y)
        .attr('fill', '#d9d9d9');
    }

    function renderText(str, x, y) {
      select(node)
        .append('text')
        .attr('class', 'grid__text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'end')
        .attr('fill', '#404040')
        .style('font-size', '11px')
        .text(str);
    }
  }

  updateObservableChart() {
    const { height, paddingTop } = this.props;
    const node = this.node;
    const barWidth = 3;

    // create a rect for new messages
    select(node)
      .selectAll('.message')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('class', 'message')
      .attr('height', height - paddingTop)
      .attr('width', barWidth)
      .attr('y', paddingTop)
      .attr('fill', '#4a90e2');

    // remove rect for disappeared messages
    select(node)
      .selectAll('.message')
      .data(this.props.data)
      .exit()
      .remove();

    // update rect for every message
    select(node)
      .selectAll('.message')
      .data(this.props.data)
      .attr('x', d => d.frame - (barWidth / 2));
  }

  render() {
    const { width, height } = this.props;
    return (
      <svg ref={(node) => { this.node = node; }} width={width} height={height} />
    );
  }
}

const propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  paddingTop: PropTypes.number,
};
const defaultProps = {
  paddingTop: 14,
};
ObservableChart.propTypes = propTypes;
ObservableChart.defaultProps = defaultProps;

export default ObservableChart;
