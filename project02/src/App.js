import React from 'react';
import './App.css';
import {
  BrowserRouter
  // , Router
  , Route, Switch
} from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import Home from './components/Home';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { List } from "./components/List";
// import { createBrowserHistory } from "history";

const App = () => {

  // const hist = createBrowserHistory();

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Router history={hist}> */}
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/list" component={List} />

          </Switch>
          {/* </Router> */}
        </AuthProvider>
      </BrowserRouter>
    </>
    // <div>
    //   <p>Hello React.</p>
    // </div>
  );

};

export default App;