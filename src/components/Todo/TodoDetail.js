import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
const Wrapper = styled.section`
  position: relative;
  display: block;
  width: 400px;
  float: right;
  .description {
    font-size: 1.5rem;
    font-weight: 900;
    margin-top: 30px;
  }
  .data {
    word-break: break-all;
  }
  .date {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    position: absolute;
    bottom: -100px;
    width: 100%;
    display: flex;
  }
`;
const TodoDetail = ({
  selectedTodo,
  token,
  setSelectedTodo,
  setDeleteTodo,
  setUpdateTodo,
}) => {
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    const getTodoByIdHandler = async () => {
      try {
        const response = await axios({
          url: `http://localhost:8080/todos/${selectedTodo}`,
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setTodo(response.data.data);
        } else {
          throw new Error(response.data.data);
        }
      } catch (error) {
        alert(error.response.data);
      }
    };
    getTodoByIdHandler();
  }, [selectedTodo, token]);
  const showUpdateTodoFormHandler = () => {
    setUpdateTodo({ title: todo.title, content: todo.content, id: todo.id });
    setSelectedTodo(null);
  };
  const deleteTodoHandler = async () => {
    try {
      const response = await axios({
        url: `http://localhost:8080/todos/${todo.id}`,
        method: 'delete',
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        setTodo(null);
        alert('삭제 완료');
        setSelectedTodo(null);
        setDeleteTodo(todo.id);
      } else {
        throw new Error(response.data.data);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <Wrapper>
      <h1>Todo 상세</h1>
      {todo && (
        <main>
          <div className="date">
            <div className="create">
              <div className="description">작성일</div>
              <div className="create-date">{todo.createdAt.slice(0, 10)}</div>
            </div>
            <div className="update">
              <div className="description">수정일</div>
              <div className="update-date">{todo.updatedAt.slice(0, 10)}</div>
            </div>
          </div>
          <div className="title">
            <div className="description">title</div>
            <div className="data">{todo.title}</div>
          </div>
          <div className="content">
            <div className="description">content</div>
            <div className="data">{todo.content}</div>
          </div>
        </main>
      )}
      <div className="btn">
        <Button onClick={showUpdateTodoFormHandler}>수정</Button>
        <Button onClick={deleteTodoHandler}>삭제</Button>
      </div>
    </Wrapper>
  );
};

export default TodoDetail;
