import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './OperationCard.css';

class OperationCard extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className="operation-card-wrapper">
        <div className="operation-card">
          <h2 className="operation-card__title">{type}</h2>
        </div>
      </div>
    );
  }
}

const propTypes = {
  type: PropTypes.string.isRequired,
};
OperationCard.propTypes = propTypes;

export default OperationCard;
