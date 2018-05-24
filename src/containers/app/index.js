import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../login';
import Repos from '../repos';
import Commits from '../commits';

import './app.css';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/repos" component={Repos} />
      <Route path="/:owner/:repo/commits" component={Commits}/>
    </main>
  </div>
);

export default App;
