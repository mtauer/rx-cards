/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';

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
    const { width, height } = this.props;
    select(node)
      .append('rect')
      .attr('class', 'background')
      .attr('height', `${height}px`)
      .attr('width', `${width}px`)
      .attr('x', '0px')
      .attr('y', '0px')
      .attr('fill', '#f0f0f0');
  }

  updateObservableChart() {
    const node = this.node;
    const barWidth = 4;

    // create a rect for new messages
    select(node)
      .selectAll('.message')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('class', 'message')
      .attr('height', this.props.height)
      .attr('width', `${barWidth}px`)
      .attr('y', '0px');

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
};
ObservableChart.propTypes = propTypes;

export default ObservableChart;
