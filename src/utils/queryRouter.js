import { browserHistory } from 'react-router';
import { routerRedux } from 'dva/router';
const queryString = require('query-string');

/**
 * @param {Object} query
 */
export const addQuery = (query) => {
    const location = window.location;
    location.search= queryString.stringify( Object.assign(queryString.parse(location.search), query));
    browserHistory.push(location);
};

/**
 * @param {...String} queryNames
 */
export const removeQuery = (...queryNames) => {
    const location = Object.assign({},
        browserHistory.getCurrentLocation());
    queryNames.forEach(q => delete location.query[q]);
    browserHistory.push(location);
};