import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import Input from '../UI/Input';

const Wrapper = styled.section`
  position: relative;
  top: 300px;
  margin: auto;
  width: 500px;
  height: 400px;
  header {
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 30px;
  }
  form {
    border: 1px solid #111;
    border-radius: 5px;
    padding-top: 30px;
    margin: auto;
  }

  form input,
  label {
    display: block;
    width: 80%;
    margin: auto;
  }
  form input {
    margin-bottom: 50px;
  }
  .signup-link {
    margin-top: 10px;
    text-align: center;
  }
`;

const SignIn = () => {
  const history = useHistory();
  const emailInputRef = useRef<any>();
  const passwordInputRef = useRef<any>();
  const authCtx = useContext(AuthContext);
  if (localStorage.getItem('token')) {
    history.replace('/');
  }
  const submitSignInHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const emailValue: string = emailInputRef.current.value;
    const passwordValue: string = passwordInputRef.current.value;
    try {
      const response = await axios({
        url: 'http://localhost:8080/users/login',
        method: 'post',
        data: {
          email: emailValue,
          password: passwordValue,
        },
      });
      if (response.status === 200) {
        alert(response.data.message);
        authCtx.login(response.data.token);
        localStorage.setItem('token', response.data.token);
        history.replace('/');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(error.response.data.details);
    }
  };
  return (
    <Wrapper>
      <header>로그인</header>
      <form>
        <label htmlFor="email">이메일</label>
        <Input
          type="email"
          placeholder="이메일 입력"
          name="email"
          ref={emailInputRef}
        />
        <label htmlFor="password">비밀번호</label>
        <Input
          type="password"
          placeholder="비밀번호 입력"
          name="password"
          ref={passwordInputRef}
        />
        <Button type="submit" onClick={submitSignInHandler}>
          로그인
        </Button>
      </form>
      <div className="signup-link">
        이메일이 없으신가요?<Link to="/auth/signup">회원가입</Link>
      </div>
    </Wrapper>
  );
};

export default SignIn;
