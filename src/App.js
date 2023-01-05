import { Route, Switch } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
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
      <Route path="/">
        <TodoMain />
      </Route>
    </Switch>
  );
}

export default App;
