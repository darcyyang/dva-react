import { post } from '../utils/request';
import pathToRegexp from 'path-to-regexp';
const queryString = require('query-string');

function login(params) {
  const postParams = queryString.stringify(params);

  return post('/api/users/login', params);
}

function logout(params) {
  // const postParams = queryString.stringify(params);

  return post('/api/users/logout');
}


export default {
  namespace: 'users',
  state: {
    users: {}
  },
  reducers: {
    get(state, {payload}) {
      return payload
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload);
      yield put({ type: 'get', payload: data });
    },
    *logout({ payload }, { call, put }) {
      const { data } = yield call(logout, payload);
      yield put({ type: 'get', payload: data });
    }
  },
subscriptions: {
  setup({ dispatch, history }) {
    // Once visit page, subscribe the fetch with top category data.
    return history.listen(({ pathname, query }) => {

    });
  },
},
};
