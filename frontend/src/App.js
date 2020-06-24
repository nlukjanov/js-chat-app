import React from 'react';
import { Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TopBar from './TopBar';
import { createBrowserHistory } from 'history';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ChatRoomPage from './ChatRoomPage';

const history = createBrowserHistory();

const App = () => {
  return (
    <div className='App'>
      <Router history={history}>
        <TopBar />
        <Route path='/' exact component={HomePage} />
        <Route path='/chatroom' exact component={ChatRoomPage} />
      </Router>
    </div>
  );
};

export default App;