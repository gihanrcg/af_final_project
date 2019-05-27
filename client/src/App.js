import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import './App.css';


import Login from './gihan/components/Login/Login';
import Header from './gihan/components/header/Header';
import HomePage from './pages/HomePage';
import CreateUser from './gihan/components/createUser/CreateUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" render={() => (
          <HomePage />
        )} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
