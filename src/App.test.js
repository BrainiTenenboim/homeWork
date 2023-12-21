import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UsersTable from '../src/components/UsersTable';
import UserPosts from '../src/components/UserPosts';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UsersTable} />
        <Route path="/user/:userId/posts" component={UserPosts} />
      </Switch>
    </Router>
  );
}

export default App;
