import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import StreamChart from '../../components/StreamChart';
import OperatorCard from './OperatorCard';
import { STREAM_TYPE_INPUT, STREAM_TYPE_OUTPUT } from './redux';

import './StreamEditPage.css';

class StreamEditPage extends Component {
  render() {
    const { operatorsArray, streams, streamsMessages } = this.props;
    const operatorContainers = operatorsArray.map(renderOperatorContainer);

    return (
      <div className="content-wrapper">
        <h1>StreamEditPage</h1>
        <div className="operators">
          {operatorContainers}
        </div>
      </div>
    );

    function renderOperatorContainer(operator) {
      const inputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_INPUT)
        .map(renderStream);
      const outputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_OUTPUT)
        .map(renderStream);
      return (
        <div key={operator.id} className="operator-container">
          <div className="operator__input-streams">
            {inputStreams}
          </div>
          <OperatorCard type={operator.type} />
          {outputStreams}
        </div>
      );
    }

    function renderStream(streamDesc) {
      const stream = streams[streamDesc.streamId];
      const messages = streamsMessages[streamDesc.streamId] || [];
      return (
        <StreamChart
          key={stream.id}
          messages={messages}
          label={stream.title}
        />
      );
    }
  }
}

const propTypes = {
  operatorsArray: PropTypes.array.isRequired,
  streams: PropTypes.object.isRequired,
  streamsMessages: PropTypes.object.isRequired,
};
StreamEditPage.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { operators, streams, streamsMessages } = state.streamEdit;
  return {
    operatorsArray: _.values(operators),
    streams,
    streamsMessages,
  };
};

export default connect(mapStateToProps)(StreamEditPage);
