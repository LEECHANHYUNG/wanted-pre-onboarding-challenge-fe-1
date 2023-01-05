import axios from 'axios';
import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';
const Wrapper = styled.section`
  position: relative;
  display: block;
  width: 400px;
  float: right;
  h1 {
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
  }
  textarea {
    width: 400px;
    height: 800px;
    resize: none;
  }
  .btn {
    display: flex;
  }
`;
const UpdateTodoForm = ({
  token,
  setUpdateTodo,
  setSelectedTodo,
  selectedTodo,
}) => {
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const cancelUpdateTodoHandler = () => {
    setUpdateTodo(null);
    setSelectedTodo(selectedTodo);
  };
  console.log(selectedTodo);
  const updateTodoHandler = async (e) => {
    e.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredContent = contentInputRef.current.value;
    try {
      const response = await axios({
        url: `http://localhost:8080/todos/${selectedTodo.id}`,
        headers: { Authorization: token },
        method: 'put',
        data: { title: enteredTitle, content: enteredContent },
      });
      if (response.status === 200) {
        alert('수정 완료');
        setUpdateTodo(null);
        setSelectedTodo(selectedTodo.id);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(error.response.data.details);
    }
  };
  return (
    <Wrapper>
      <h1>Todo 추가</h1>
      <form>
        <Input
          type="text"
          name="title"
          ref={titleInputRef}
          defaultValue={selectedTodo.title}
        />
        <textarea
          type="text"
          name="content"
          ref={contentInputRef}
          defaultValue={selectedTodo.content}
        />
        <div className="btn">
          <Button type="submit" onClick={updateTodoHandler}>
            수정
          </Button>
          <Button type="button" onClick={cancelUpdateTodoHandler}>
            취소
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateTodoForm;
