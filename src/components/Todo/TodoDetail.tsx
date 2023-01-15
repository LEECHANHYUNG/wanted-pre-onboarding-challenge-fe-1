import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
interface TodoListItem {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface TodoProps {
  selectedTodoId: number;
  token: string;
  setSelectedTodoId: Dispatch<SetStateAction<number | null>>;
  setUpdateTodo: Dispatch<SetStateAction<TodoListItem | null>>;
  setDeleteTodo: Dispatch<SetStateAction<number | null>>;
}
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
  selectedTodoId,
  token,
  setSelectedTodoId,
  setDeleteTodo,
  setUpdateTodo,
}: TodoProps) => {
  const [todo, setTodo] = useState<TodoListItem | null>(null);
  useEffect(() => {
    const getTodoByIdHandler = async () => {
      try {
        const response = await axios({
          url: `http://localhost:8080/todos/${selectedTodoId}`,
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setTodo(response.data.data);
        } else {
          throw new Error(response.data.data);
        }
      } catch (error: any) {
        alert(error.response.data);
      }
    };
    getTodoByIdHandler();
  }, [selectedTodoId, token]);
  const showUpdateTodoFormHandler = () => {
    if (todo) {
      setUpdateTodo({
        title: todo.title,
        content: todo.content,
        id: todo.id,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      });
    }
    setSelectedTodoId(null);
  };
  const deleteTodoHandler = async () => {
    if (todo) {
      try {
        const response = await axios({
          url: `http://localhost:8080/todos/${todo.id}`,
          method: 'delete',
          headers: { Authorization: token },
        });
        if (response.status === 200) {
          setTodo(null);
          alert('삭제 완료');
          setSelectedTodoId(null);
          setDeleteTodo(todo.id);
        } else {
          throw new Error(response.data.data);
        }
      } catch (error: any) {
        alert(error.response.data);
      }
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
        <Button
          onClick={showUpdateTodoFormHandler}
          type="button"
          id={undefined}
          disabled={undefined}
          value={undefined}
        >
          수정
        </Button>
        <Button
          type="button"
          id={undefined}
          disabled={undefined}
          value={undefined}
          onClick={deleteTodoHandler}
        >
          삭제
        </Button>
      </div>
    </Wrapper>
  );
};

export default TodoDetail;
