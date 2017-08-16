import request from '../utils/request'
import pathToRegexp from 'path-to-regexp';


function getProductList({pathname,query}) {
  return request('http://devd.alliancetime.com/rest/categories/'+ pathname);
}



export default {
  namespace: 'productList',
  state: {
    productList:{}
  },
  reducers: {
    get(state, { payload }) {
      return payload
    },
  },
  effects: {
    *fetchProductList({ payload }, { call, put }) {
      const { data } = yield call(getProductList, payload);
      yield put({ type: 'get', payload: data });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // Once visit page, subscribe the fetch with top category data.
      return history.listen(({ pathname, query }) => {
        const match = pathToRegexp('/category/:id').exec(pathname);        
        if (match)
          dispatch({ type: 'fetchProductList', payload: {pathname: match[1],query: query} });
      });
    },
  },
};
