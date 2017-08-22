import fetch from 'dva/fetch';

const queryString = require('query-string');


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 || response.status === 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(path, params = {}, options) {
  const parmsStr = queryString.stringify(params)
  // if (parmsStr !== '') {
  //   path = path + '?' + parmsStr
  // }
  parmsStr !== ''? path = path + '?' + parmsStr : null

  return fetch(path, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}


export function post(path, params = {}, options) {
  const parmsStr = queryString.stringify(params)
  // if (parmsStr !== '') {
  //   path = path + '?' + parmsStr
  // }
  parmsStr !== ''? path = path + '?' + parmsStr : null

  return fetch(path, {
    method: 'post',
    body: parmsStr,
    credentials: 'include',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
