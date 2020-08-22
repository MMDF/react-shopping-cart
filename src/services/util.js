export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'TRY':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

export const productsAPI = '/products.json';
// export const productsAPI = "http://localhost:8001/api/products";
