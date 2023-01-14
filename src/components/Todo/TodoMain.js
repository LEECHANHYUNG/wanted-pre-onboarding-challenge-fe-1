import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
const Wrapper = styled.section`
  position: relative;
  top: 300px;
  width: 500px;
  margin: auto;
  h1 {
    text-align: center;
    font-size: 2rem;
  }
`;
const TodoMain = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const loginPageHandler = () => {
    history.push('/auth/signin');
  };
  const showListHandler = () => {
    history.push('/todo');
  };
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Wrapper>
      <h1>Todo List</h1>
      <main>
        {isLoggedIn && (
          <Button onClick={showListHandler}>나의 Todo List 바로가기</Button>
        )}
        {!isLoggedIn && (
          <Button onClick={loginPageHandler}>로그인 후 Todo List 작성</Button>
        )}
      </main>
    </Wrapper>
  );
};

export default TodoMain;
