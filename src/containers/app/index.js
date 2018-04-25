import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../login';
import Repos from '../repos';

import './app.css';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/repos" component={Repos} />
    </main>
  </div>
);

export default App;
