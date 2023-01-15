import React from 'react';

import { Route, Switch } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import TodoList from './components/Todo/TodoList';
import TodoMain from './components/Todo/TodoMain';

function App() {
  return (
    <Switch>
      <Route path="/auth/signin">
        <SignIn />
      </Route>
      <Route path="/auth/signup">
        <SignUp />
      </Route>
      <Route path="/todo">
        <TodoList />
      </Route>
      <Route path="/">
        <TodoMain />
      </Route>
    </Switch>
  );
}

export default App;
