import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Category from "./routes/Category.js";

import Navigations from "./routes/Navigations.js";

import Products from "./routes/Products.js";

import Users from "./routes/Users.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* Category Landing Page */}
      <Route path="/category(:filter)" component={Category} />
      {/* Product List Page */}
      <Route path="/category/(:filter)" component={Category} />
      <Route path="/navigations" component={Navigations} />
      <Route path="/products/(:filter)" component={Products} />
      <Route path="/users" component={Users} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
