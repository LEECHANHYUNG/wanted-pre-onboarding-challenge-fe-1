import React from 'react';
import styled from 'styled-components';
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
const Todo = ({ info, setSelectedTodo, setUpdateTodo, setShowForm }) => {
  return (
    <Wrapper
      onClick={() => {
        setSelectedTodo(info.id);
        setUpdateTodo(null);
        setShowForm(null);
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
