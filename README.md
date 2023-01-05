# wanted-pre-onboarding-challenge-fe-1
## Wanted Pre-onBoarding 과제
<bold>프리 온보딩 주소</bold>
<br/>
https://www.wanted.co.kr/events/pre_challenge_fe_5
## 과제 
<bold>과제 기간</bold>
<br/>
2023-01-05~2023-01-05
---
`인증`
- LocalStroage 저장 및 `React Context Hook` 사용 : 로그인 상태 확인
```import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('token');
  };
  const contextValue = {
    token: token,
    isLoggedIn: localStorage.getItem('token'),
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

![image](https://user-images.githubusercontent.com/71697577/210803519-c6a9b461-36e7-493f-8141-e415c3f91036.png)
-> todo List 페이지
---
![image](https://user-images.githubusercontent.com/71697577/210803927-83963e01-abf7-4d5d-90ea-97aec5d224ad.png)
-> todo 추가 페이지
![image](https://user-images.githubusercontent.com/71697577/210804050-47f82fdc-c396-4430-94a4-85d3209c9e05.png)
-> todo 상세 페이지
![image](https://user-images.githubusercontent.com/71697577/210804113-0fff1445-bc3c-4002-9331-ac3fdc36f972.png)
-> todo 업데이트 페이지
