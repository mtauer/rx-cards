import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './OperationCard.css';

class OperationCard extends Component {
  render() {
    const { operator, onOptionsChange } = this.props;
    return (
      <div className="operation-card-wrapper">
        <div className="operation-card">
          <h2 className="operation-card__title">{operator.type}</h2>
          {this.renderOptionsInput(operator, onOptionsChange)}
        </div>
      </div>
    );
  }

  renderOptionsInput(operator, onOptionsChange) {
    switch (operator.type) {
      case 'debounceTime': {
        return (
          <div className="number-input-container">
            <input
              className="number-input"
              value={operator.options.dueTime}
              onChange={onChangeForNumber('dueTime', validatePositiveNumber)}
              onKeyDown={onKeyDownForNumber('dueTime', validatePositiveNumber)}
            />
            <p className="number-input-unit">ms</p>
          </div>
        );
      }
      case 'map': {
        return (
          <div className="number-input-container">
            <p className="function-input">{'array => array.length'}</p>
          </div>
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

export default OperationCard;
