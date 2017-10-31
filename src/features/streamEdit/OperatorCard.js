import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class OperationCard extends Component {
  render() {
    const { operator, onOptionsChange } = this.props;
    return (
      <OperatorWrapper>
        <OperatorContainer>
          <OperatorTitle>
            {operator.type}
          </OperatorTitle>
          {this.renderOptionsInput(operator, onOptionsChange)}
        </OperatorContainer>
      </OperatorWrapper>
    );
  }

  renderOptionsInput(operator, onOptionsChange) {
    switch (operator.type) {
      case 'debounceTime': {
        return (
          <OperatorInput>
            <OperatorInputLabel>
              dueTime in ms
            </OperatorInputLabel>
            <OperatorInputNumber
              value={operator.options.dueTime}
              onChange={onChangeForNumber('dueTime', validatePositiveNumber)}
              onKeyDown={onKeyDownForNumber('dueTime', validatePositiveNumber)}
            />
          </OperatorInput>
        );
      }
      case 'map': {
        return (
          <OperatorInput>
            <OperatorInputFunction>
              {'array => array.length'}
            </OperatorInputFunction>
          </OperatorInput>
        );
      }
      default: {
        return null;
      }
    }

    function onChangeForNumber(optionKey, validateFunc) {
      return (e) => {
        onOptionsChange({ [optionKey]: validateFunc(Number(e.target.value)) });
      };
    }

    function onKeyDownForNumber(optionKey, valideFunc) {
      return (e) => {
        let delta = 0;
        if (e.keyCode === 38) { delta = e.shiftKey ? 10 : 1; }
        if (e.keyCode === 40) { delta = e.shiftKey ? -10 : -1; }
        onOptionsChange({ [optionKey]: valideFunc(Number(e.target.value) + delta) });
      };
    }

    function validatePositiveNumber(value) {
      return Math.max(value, 0);
    }
  }
}

const propTypes = {
  operator: PropTypes.object.isRequired,
  onOptionsChange: PropTypes.func,
};
const defaultProps = {
  onOptionsChange: () => {},
};
OperationCard.propTypes = propTypes;
OperationCard.defaultProps = defaultProps;

const OperatorWrapper = styled.div`
  padding: 24px 60px;
`;
const OperatorContainer = styled.div`
  border-bottom: 1px solid #353b45;
  border-top: 1px solid #353b45;
  box-sizing: border-box;
  min-height: 123px;
  padding: 8px 0;
`;
const OperatorTitle = styled.h3`
  color: #8f96a6;
  font-size: 2.6rem;
  font-weight: 400;
  line-height: 2.9rem;
  margin: 0;
  padding: 2px 0;
`;
const OperatorInput = styled.div`
  padding: 2px 0;
`;
const OperatorInputLabel = styled.p`
  color: #6b727e;
  font-size: 1.4rem;
  line-height: 1.6rem;
  margin: 0;
  padding: 7px 0;
`;
const OperatorInputNumber = styled.input`
  background-color: #353b45;
  border: 1px solid #353b45;
  border-radius: 3px;
  color: #abb2c0;
  font-size: 1.6rem;
  line-height: 1.8rem;
  outline: 0;
  padding: 8px 12px;
  width: 80px;

  &:focus {
    border-color: #4a90e2;
    color: #dddddd;
  }
`;
const OperatorInputFunction = styled.div`
  color: #abb2c0;
  display: block;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.6rem;
  padding: 8px 0;
`;

export default OperationCard;
