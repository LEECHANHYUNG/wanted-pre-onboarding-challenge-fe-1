import axios from 'axios';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import Input from '../UI/Input';
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
interface Todo {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface TodoProps {
  token: string;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setNewTodo: Dispatch<SetStateAction<Todo | undefined>>;
}
const TodoListForm = ({ token, setShowForm, setNewTodo }: TodoProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const addNewTodoHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (titleInputRef.current && contentInputRef.current) {
      const enteredTitle = titleInputRef.current.value;
      const enteredContent = contentInputRef.current.value;
      try {
        const response = await axios({
          url: 'http://localhost:8080/todos',
          headers: { Authorization: token },
          method: 'post',
          data: { title: enteredTitle, content: enteredContent },
        });
        if (response.status === 200) {
          alert('등록 완료');
          console.log(response.data.data);
          setNewTodo(response.data.data);

          setShowForm(false);
        } else {
          throw new Error(response.data);
        }
      } catch (error: any) {
        alert(error.response.data.details);
      }
    }
  };
  const cancelUpdateTodoHandler = () => {
    setShowForm(false);
  };
  return (
    <Wrapper>
      <h1>Todo 추가</h1>
      <form>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          name="title"
          ref={titleInputRef}
        />
        <textarea
          placeholder="내용을 입력해주세요"
          name="content"
          ref={contentInputRef}
        />
        <div className="btn">
          <Button
            type="submit"
            onClick={(e: any) => {
              addNewTodoHandler(e);
            }}
            id={undefined}
            disabled={undefined}
            value={undefined}
          >
            추가
          </Button>
          <Button
            type="button"
            onClick={cancelUpdateTodoHandler}
            id={undefined}
            disabled={undefined}
            value={undefined}
          >
            취소
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default TodoListForm;
