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
          <input
            value={operator.options.dueTime}
            onChange={e => onOptionsChange({ dueTime: Number(e.target.value) })}
            onKeyDown={onKeyDownHandlerForNumber('dueTime')}
          />
        );
      }
      case 'map': {
        return (
          <p>{'array => array.length'}</p>
        );
      }
      default: {
        return null;
      }
    }

    function onKeyDownHandlerForNumber(optionsKey) {
      return (e) => {
        let delta = 0;
        if (e.keyCode === 38) { delta = 1; }
        if (e.keyCode === 40) { delta = -1; }
        onOptionsChange({ [optionsKey]: Number(e.target.value) + delta });
      };
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
