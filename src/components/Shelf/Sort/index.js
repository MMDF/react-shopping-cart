import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateSort } from '../../../services/sort/actions';
import Selectbox from '../../Selectbox';

const sortBy = [
  { value: '', label: 'Seç' },
  { value: 'lowestprice', label: 'Azdan çoka' },
  { value: 'highestprice', label: 'Çoktan aza' },
];

const Sort = ({ updateSort, sort }) => (
  <div className="sort">
    Fiyat{' '}
    <Selectbox options={sortBy} handleOnChange={(value) => updateSort(value)} />{' '}
    sırala
  </div>
);

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sort: state.sort.type,
});

export default connect(mapStateToProps, { updateSort })(Sort);
