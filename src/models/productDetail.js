import request from '../utils/request'

function getProductDetail(payload) {
  return request('http://devd.alliancetime.com/rest'+payload);
}
export default {
  namespace: 'productDetail',
  state: {
    productDetail: {}
  },
  reducers: {
    get(state, { payload }) {
      return payload
    },
  },
  effects: {
    *fetchProductDetail({ payload }, { call, put }) {
      const {data}  = yield call(getProductDetail, payload);
      yield put({ type: 'get', payload: data });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.indexOf('/products/') === 0)
           dispatch({ type: 'fetchProductDetail', payload: pathname });
      });
    },
  },
};
