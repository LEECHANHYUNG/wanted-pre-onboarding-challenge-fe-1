import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';
import Button from '../ui/Button';
import Todo from './Todo';
import TodoListForm from './TodoListForm';

const Wrapper = styled.section`
  position: relative;
  top: 300px;
  width: 1000px;
  background: #bbb;
  margin: auto;
  padding: 1rem 5rem;
  height: 60vh;
  .list {
    width: 500px;
    display: inline-block;
  }
  .list main {
    height: 50vh;
    overflow-y: scroll;
  }
  .no-list-message {
    margin-top: 50px;
    text-align: center;
    font-weight: 800;
  }
`;
const TodoList = () => {
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const showNewTodoListForm = () => {
    setShowForm(true);
  };
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getTodoListHandler = async () => {
      try {
        const response = await axios({
          url: 'http://localhost:8080/todos',
          headers: { Authorization: authCtx.token },
        });
        if (response.status === 200) {
          setTodoList(response.data.data);
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        setTodoList(error.response);
      }
    };
    getTodoListHandler();
  }, [newTodo, authCtx.token]);

  return (
    <Wrapper>
      <div className="list">
        <h1>나의 TodoList</h1>
        <main>
          {todoList ? (
            todoList.map((elem) => (
              <Todo
                info={elem}
                key={elem.id}
                setSelectedTodo={setSelectedTodo}
              />
            ))
          ) : (
            <p className="no-list-message">등록된 Todo가 없습니다.</p>
          )}
        </main>
        <Button onClick={showNewTodoListForm}>Todo 추가</Button>
      </div>
      {showForm && (
        <TodoListForm
          token={authCtx.token}
          setShowForm={setShowForm}
          setNewTodo={setNewTodo}
        />
      )}
      {selectedTodo && <TodoDetail />}
    </Wrapper>
  );
};

export default TodoList;
