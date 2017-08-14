import request from '../utils/request'


function getProductList(payload) {
  return request('/api/categories/'+ payload.split('/category/')[1]);
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
        if (pathname.indexOf('/category/') === 0)
          dispatch({ type: 'fetchProductList', payload: pathname });
      });
    },
  },
};
