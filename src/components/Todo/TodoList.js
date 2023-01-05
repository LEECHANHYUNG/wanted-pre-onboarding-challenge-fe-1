import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';
import Button from '../ui/Button';
import Todo from './Todo';

const Wrapper = styled.section`
  position: relative;
  top: 300px;
  width: 500px;
  background: #bbb;
  margin: auto;
  padding: 1rem 5rem;
  height: 70vh;
  overflow-y: scroll;
  .no-list-message {
    margin-top: 50px;
    text-align: center;
    font-weight: 800;
  }
  button {
    position: absolute;
    top: -20px;
    right: 80px;
    z-index: 10;
    margin-top: 50px;
    width: 40%;
  }
`;
const TodoList = () => {
  const authCtx = useContext(AuthContext);

  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const getTodoListHandler = async () => {
      try {
        const response = await axios({
          url: 'http://localhost:8080/todos',
          headers: { Authorization: authCtx.token },
        });
        if (response.status === 200) {
          console.log(response);
          setTodoList(response.data.data);
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        setTodoList(error.response);
      }
    };
    getTodoListHandler();
  }, []);
  return (
    <Wrapper>
      <h1>나의 TodoList</h1>
      <main>
        {todoList ? (
          todoList.map((elem) => <Todo info={elem} key={elem.id} />)
        ) : (
          <p className="no-list-message">등록된 Todo가 없습니다.</p>
        )}
      </main>
      <Button>Todo 추가</Button>
    </Wrapper>
  );
};

export default TodoList;
