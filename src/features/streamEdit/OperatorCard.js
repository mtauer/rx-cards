import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './OperationCard.css';

class OperationCard extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="operation-card-wrapper">
        <div className="operation-card">
          <h2 className="operation-card__title">{title}</h2>
        </div>
      </div>
    );
  }
}

const propTypes = {
  title: PropTypes.string.isRequired,
};
OperationCard.propTypes = propTypes;

export default OperationCard;
