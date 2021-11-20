import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PrivateRoute from './utils/privateRoute';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import userAction from './redux/actions/userAction';

import './App.css';
import 'antd/dist/antd.css'

function App() {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.user.userDetail);

  const user = localStorage.getItem("user")
  if(user && !userDetail.username) {
    dispatch(userAction.setLoggedInUser(JSON.parse(user)))
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <PrivateRoute path= "/" exact>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
