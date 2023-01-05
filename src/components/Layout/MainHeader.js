import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../store/auth-context';

const Header = styled.header`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 80px;
  background: #046afe;
  color: #fff;
  .left {
    float: left;
    margin-left: 20px;
  }
  .right {
    float: right;
  }
  .right ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
    line-height: 80px;
    margin: 0;
    width: 150px;
  }
  .right ul li {
    cursor: pointer;
  }
  .right ul li a,
  .left a {
    color: #fff;
    text-decoration: none;
  }
`;

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Header>
      <div className="left">
        <Link to="/">
          <h1>wanted-pre-onboarding-challenge-fe-1</h1>
        </Link>
      </div>
      <div className="right">
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth/signin">로그인</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/auth/signup">회원가입</Link>
            </li>
          )}
          {isLoggedIn && (
            <li onClick={authCtx.logout}>
              <Link to="/auth/signin">로그아웃</Link>
            </li>
          )}
        </ul>
      </div>
    </Header>
  );
};

export default MainHeader;
