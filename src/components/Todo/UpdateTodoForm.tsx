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
interface TodoListItem {
  title: string;
  content: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
interface TodoProps {
  token: string;
  selectedTodo: TodoListItem;
  setSelectedTodoId: Dispatch<SetStateAction<number | null>>;
  setUpdateTodo: Dispatch<SetStateAction<TodoListItem | null>>;
}
const UpdateTodoForm = ({
  token,
  setUpdateTodo,
  setSelectedTodoId,
  selectedTodo,
}: TodoProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const cancelUpdateTodoHandler = () => {
    setUpdateTodo(null);
    setSelectedTodoId(selectedTodo.id);
  };
  const updateTodoHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (titleInputRef.current && contentInputRef.current) {
      const enteredTitle: string = titleInputRef.current.value;
      const enteredContent: string = contentInputRef.current.value;
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
          setSelectedTodoId(selectedTodo.id);
        } else {
          throw new Error(response.data);
        }
      } catch (error: any) {
        alert(error.response.data.details);
      }
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
          placeholder={selectedTodo.title}
        />
        <textarea
          name="content"
          ref={contentInputRef}
          defaultValue={selectedTodo.content}
        />
        <div className="btn">
          <Button
            type="submit"
            onClick={updateTodoHandler}
            id={undefined}
            disabled={undefined}
            value={undefined}
          >
            수정
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

export default UpdateTodoForm;
