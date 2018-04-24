import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../login';
import List from '../list';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/list" component={List} />
    </main>
  </div>
);

export default App;
