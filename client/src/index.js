import React, { Suspense, useContext, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import './index.css';
import Login from './Login';
import LoggedIn from './LoggedIn';

import { FetchContext, FetchProvider } from './contextAPI/FetchContext';

const AuthenticatedRoute = ({ children, ...rest }) => {
  const { methods } = useContext(FetchContext);
  return (
    <Route
      {...rest}
      render={() =>
        methods.checkPermission() ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Töltés...</div>}>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <AuthenticatedRoute path="/loggedin" exact>
          <LoggedIn />
        </AuthenticatedRoute>
      </Switch>
    </Suspense>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FetchProvider>
        <AppRoutes />
      </FetchProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
