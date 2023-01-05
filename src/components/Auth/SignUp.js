import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';
import Button from '../ui/Button';
import Input from '../ui/Input';

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
  .signin-link {
    margin-top: 10px;
    text-align: center;
  }
`;

const SignUp = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitSignUpHandler = async (e) => {
    e.preventDefault();
    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    try {
      const response = await axios({
        url: 'http://localhost:8080/users/create',
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
      <header>회원가입</header>
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
        <Button type="submit" onClick={submitSignUpHandler}>
          회원가입
        </Button>
      </form>
      <div className="signin-link">
        이미 가입한 회원이신가요?<Link to="/auth/signin">로그인</Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
