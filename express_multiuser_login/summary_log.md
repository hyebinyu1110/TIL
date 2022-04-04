WEB6 Multi User on Passport - 2. 수업의목적
- 

WEB6 Multi User on Passport - 4.1. 회원 정보 저장
- lowdb 를 degrade해서 사용할 수 밖에  없었음


WEB6 Multi User on Passport - 4.2. 회원정보저장
- 비밀번호는 평문으로 저장하면 안됨. 반드시 암호화해서 서비스의 관리자인 우리조차도 원래 암호가 뭔지 알수 없도록 해야함. 아니면 범죄성이 있다. 

- 추가적으로 할 일
- 이미 그런 사용자가 있는지 없는지 체크, 있다면 거절해야 한다.  (그때는 이메일로 검색해보면 된다)
- pwd, pwd2 2개의 값을 받는데, 2개의 값이 없다면, 조건문을 통해 그런 값이 없습니다. 오류를 뿜어주고, 끝내줘야 한다. 
- email, password, nickname이 입력되지 않았다면 오류를 적고, 끊어줘야 한다.


WEB6 Multi User on Passport - 5. 세션 스토어에 저장 
- register 성공한 후, 사용자에게 직접 로그인을 하라고도 할 수 있고, 아니면 로그인을 그 자리에서 시켜줄수도 있다.  회원가입한 후, 바로 로그인하는것을 시도함. 

- 에러 
- db.json 파일에 register 정보가 저장이 안되고, login 이 안됨


- Error: Failed to deserialize user out of session
