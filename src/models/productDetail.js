import request from '../utils/request'
import pathToRegexp from 'path-to-regexp';

function getProductDetail({id, query}) {
  return request('http://devd.alliancetime.com/rest/products/'+id);
}

function getPrice({id, query}){
  return request('http://devd.alliancetime.com/rest/price/'+id);
}

export default {
  namespace: 'productDetail',
  state: {
    productDetail: {},
    price:{}
  },
  reducers: {
    get(state, { payload }) {
      return payload
    },
  },
  effects: {
    *fetchProductDetail({ payload }, { call, put }) {
      const product  = yield call(getProductDetail, payload);
      const price  = yield call(getPrice, payload);
      
      yield put({ type: 'get', payload: {productDetail:product.data,price: price.data} });
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/products/:id').exec(pathname);        
        if (match)
           dispatch({ type: 'fetchProductDetail', payload: {id: match[1],query: query} });
      });
    },
  },
};
