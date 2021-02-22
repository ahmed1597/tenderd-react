import React, { useEffect, useState } from 'react';
import './App.css';
import './firebase/config';
import firebase from 'firebase/app';
import { Route , Switch , BrowserRouter , Redirect } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Companies from './pages/Companies';
import Company from './pages/Company';
import Companyedit from './pages/Companyedit';
import { UserProvider } from './firebase/UserProvider';

function App() {
  const [userLogged, SetUserLogged] = useState(false);

  useEffect(() => {
    const currUser = firebase.auth().onAuthStateChanged(async (user) => {
      if(user){
        SetUserLogged(true);
      }else{
        SetUserLogged(false);
      }
    });
  });
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <div className="ui grid container">
            <Switch>
              <Route exact path="/signup" render={() => {
                    return (
                      userLogged ?
                      <Redirect to="/dashboard" /> :
                      <Signup /> 
                    )
                }}/>
              <Route exact path="/login" render={() => {
                    return (
                      userLogged ?
                      <Redirect to="/dashboard" /> :
                      <Login /> 
                    )
                }}/>
              <Route exact path="/dashboard" render={() => {
                    return (
                      userLogged ?
                      <Dashboard /> :
                      <Redirect to="/login" />
                    )
                }}/>
                <Route exact path="/companies" render={() => {
                    return (
                      userLogged ?
                      <Companies /> :
                      <Redirect to="/login" />
                    )
                }}/>
                <Route exact path="/company/:id" render={() => {
                    return (
                      userLogged ?
                      <Company /> :
                      <Redirect to="/login" />
                    )
                }}/>
                <Route exact path="/company/edit/:id" render={() => {
                    return (
                      userLogged ?
                      <Companyedit /> :
                      <Redirect to="/login" />
                    )
                }}/>
              <Route exact path="/profile" render={() => {
                    return (
                      userLogged ?
                      <Profile /> :
                      <Redirect to="/login" />
                    )
                }}/>
              <Route
                exact
                path="/"
                render={() => {
                    return (
                      userLogged ?
                      <Redirect to="/dashboard" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
