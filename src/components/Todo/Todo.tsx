import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
interface TodoListItem {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface TodoProps {
  info: TodoListItem;
  setSelectedTodoId: Dispatch<SetStateAction<null | number>>;
  setUpdateTodo: Dispatch<SetStateAction<null | TodoListItem>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}
const Wrapper = styled.div`
  position: relative;
  width: 90%;
  border: 1px solid #111;
  border-radius: 6px;
  margin: 10px 0px;
  cursor: pointer;

  .date {
    position: absolute;
    width: 50%;
    font-size: 15px;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: space-around;
  }
`;
const Todo = ({
  info,
  setSelectedTodoId,
  setUpdateTodo,
  setShowForm,
}: TodoProps) => {
  return (
    <Wrapper
      onClick={() => {
        setSelectedTodoId(info.id);
        setUpdateTodo(null);
        setShowForm(false);
      }}
    >
      <h1 className="title">{info.title.slice(0, 10)}</h1>

      <div className="date">
        <div>
          <div className="description">작성일</div>
          <div className="create-date">{info.createdAt.slice(0, 10)}</div>
        </div>
        <div>
          <div className="description">수정일</div>
          <div className="update-date">{info.updatedAt.slice(0, 10)}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Todo;
