import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StreamChart from '../../components/StreamChart';
import OperatorCard from './OperatorCard';
import { STREAM_TYPE_INPUT, STREAM_TYPE_OUTPUT, setOperatorOptions } from './redux';

class StreamEditPage extends Component {
  render() {
    const { operatorsArray, streams, streamsMessages, onOperatorOptionsChange } = this.props;

    return (
      <div className="content-wrapper">
        <PageHeaderContainer>
          <PageHeaderTitle>
            Detect multiple clicks
          </PageHeaderTitle>
          <PageHeaderDescription>
            The input stream is a stream of mouse click events. Change the due
            time of the debounceTime operator to configure the click speed.
          </PageHeaderDescription>
        </PageHeaderContainer>
        <OperatorsWrapper>
          {operatorsArray.map(renderOperatorContainer)}
        </OperatorsWrapper>
      </div>
    );

    function renderOperatorContainer(operator, index) {
      const inputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_INPUT)
        .map(renderStream);
      const outputStreams = operator.ioStreams
        .filter(s => s.type === STREAM_TYPE_OUTPUT)
        .map(renderStream);
      return (
        <OperatorContainer key={operator.id}>
          <OperatorIndex>
            {index + 1}
          </OperatorIndex>
          <OperatorInputStreamsWrapper>
            {inputStreams}
          </OperatorInputStreamsWrapper>
          <OperatorCard
            operator={operator}
            onOptionsChange={options => onOperatorOptionsChange(operator, options)}
          />
          {outputStreams}
        </OperatorContainer>
      );
    }

    function renderStream(streamDesc) {
      const stream = streams[streamDesc.streamId];
      const messages = streamsMessages[streamDesc.streamId] || [];
      return (
        <StreamChart
          key={stream.id}
          title={stream.title}
          messages={messages}
        />
      );
    }
  }
}

const propTypes = {
  operatorsArray: PropTypes.array.isRequired,
  streams: PropTypes.object.isRequired,
  streamsMessages: PropTypes.object.isRequired,
  onOperatorOptionsChange: PropTypes.func.isRequired,
};
StreamEditPage.propTypes = propTypes;

const PageHeaderContainer = styled.div`
  padding: 30px 0;
`;
const PageHeaderTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 400;
  line-height: 5.6rem;
  margin: 0;
  padding: 2px 0;
`;
const PageHeaderDescription = styled.p`
  color: #808080;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.8rem;
  margin: 0;
  padding: 2px 0;
`;

const OperatorsWrapper = styled.div`
  display: flex;
  left: 0;
  overflow-y: auto;
  position: absolute;
  right: 0;
`;
const OperatorContainer = styled.div`
  background-color: #282c34;
  border-right: 1px solid #181a1f;
  padding: 0 0 40px 0;

  &:last-child {
    border-right: 0;
  }
`;
const OperatorIndex = styled.p`
  color: #4b5365;
  font-size: 1.6rem;
  line-height: 1.8rem;
  margin: 0;
  padding: 16px 60px 14px 60px;
`;
const OperatorInputStreamsWrapper = styled.div`
  min-height: 218px;
`;

const mapStateToProps = (state) => {
  const { operators, operatorsOrder, streams, streamsMessages } = state.streamEdit;
  return {
    operatorsArray: operatorsOrder.map(id => operators[id]),
    streams,
    streamsMessages,
  };
};
const mapDispatchToProps = dispatch => ({
  onOperatorOptionsChange: (operator, options) => {
    dispatch(setOperatorOptions(operator.id, options));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StreamEditPage);
