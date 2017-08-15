import request from '../utils/request'

function getTopNavigation(payload) {
  // return request('/api/categories');
  return request('http://devd.alliancetime.com/rest/categories');
  
}




export default {
  namespace: 'category',
  state: { 
    category: {},
    // productList:{}
 },
  reducers: {
    get(state, { payload }) {
      return payload
    },

  },
  effects: {
    *fetchTopNavigation({ payload }, { call, put }) {
      const { data } = yield call(getTopNavigation, payload);
      yield put({ type: 'get', payload: data });
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      // Once visit page, subscribe the fetch with top category data.
      return history.listen(({ pathname, query }) => {
        dispatch({ type: 'fetchTopNavigation', payload: pathname });
        // if (pathname.indexof('/category/') === 0)
        //   dispatch({ type: 'fetchProductList', payload: pathname });
      });
    },
  },

};
