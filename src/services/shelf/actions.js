import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';

import { productsAPI } from '../util';

let cache = undefined;

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  },
};

export const fetchProducts = (filters, sortBy, callback) => (dispatch) => {
  return (cache ? Promise.resolve({ data: cache }) : axios.get(productsAPI))
    .then((res) => {
      if (!cache) cache = res.data;
      let { products } = res.data;

      if (!!filters && filters.length > 0) {
        products = products.filter((p) =>
          filters
            .map(
              (fLabel) => p.labels.findIndex((label) => label === fLabel) !== -1
            )
            .reduce((acc, curr) => acc && curr, true)
        );
      }

      if (!!sortBy) {
        products = products.sort(compare[sortBy]);
      }

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    })
    .catch((err) => {
      console.log('Could not fetch products. Try again later.');
    });
};
