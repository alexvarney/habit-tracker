import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './Store/store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './Components/Header'
import {loginWithToken} from './Store/Actions/auth'
import UserManager from './Components/auth/UserManager';
import AdminEditor from './Components/auth/AdminEditor';
import HabitDisplay from './Components/habits/HabitDisplay';

function App() {

  useEffect(()=>{
    store.dispatch(loginWithToken(localStorage.getItem('jwtToken')))
  },[])

  return (
    <BrowserRouter>
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="container">
        <Switch>
          <Route path="/user" component={UserManager} />
          <Route path="/admin" component={AdminEditor} />
          <Route path="/" component={HabitDisplay} />
        </Switch>
        </div>
      </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;