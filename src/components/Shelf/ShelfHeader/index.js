import React from 'react';
import PropTypes from 'prop-types';

import Sort from '../Sort';

const ShelfHeader = (props) => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span>{props.productsLength} ürün bulundu.</span>
      </small>
      <Sort />
    </div>
  );
};

ShelfHeader.propTypes = {
  productsLength: PropTypes.number.isRequired,
};

export default ShelfHeader;
