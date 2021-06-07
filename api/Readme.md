# Yes Talk : Backend

git push heroku main

### DB : MONGO DB

### SV : EXPRESS NODE

#### dotenv

`1* dotenv`는 환경변수를 .env파일에 저장하고 process.env로 로드하는 의존성 모듈이다. <br />
dotenv를 사용하는 이유는 우리가 개발을 하는 과정에서 서버주소, 고유 API KEY 값 등 필요한 정보들을 저장을 하게 된다. 그리고 이러한 정보들은<br />
민감한 정보임과 동시에 보안이 이루어져야 하는 정보들이다. 만약 이러한 정보들이 오픈소스(깃허브)에 공개될 경우,<br />
해킹을 당하거나 보안적인 면에서 위험할 수 있다.<br />

#### helmet

`2* helmet`은 Express.js 사용시 Http 헤더 설정을 자동으로 바꾸어주어 잘 알려진 몇가지 앱의 취약성으로 부터 앱을 보호 할 수 있는 패키지이다.<br />

#### multer

`4* multer`는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js 의 미들웨어 입니다. <br />

#### bcrpyt

`5* bcrpyt`는 npm에 등록되어있는 암호화 모듈입니다. 이 모듈을 이용하면 아주 쉽게 패스워드의 hash값을 구하고 비교할 수 있습니다.

### \*\*디렉터리 구조

> models

- Users : 유저 데이터 스키마
- Posts : 게시물 데이터 스키마
- Messages : 채팅 메시지 데이터 스키마
- Conversation : 유저리스트 조회 스키마

> routes

- auth :
  회원가입 api
  로그인 api
- users :
  비밀번호/아이디 변경 api
  회원탈퇴 api
  유저정보 조회 api
  친구정보 조회 api
  팔로우/언팔로우 api
- posts :
  게시글 쓰기 api
  게시글 삭제 api
  게시글 좋아요/해제 api
  게시글 조회 api
  연관 게시글 조회(내꺼포함) api
  특정 유저 게시글 조회 api
- conversation :
  채팅방 개설 api
  특정 유저 채팅방 조회 api
  특정 채팅방 연결 api
- messages :
  채팅 메세지 전송 api
  채팅 메세지 조회 api

> public

- images/ 홈페이지 기본 이미지 및 업로드 이미지 디렉터리

> index

- 서버 및 디비 기동 및 라우트 연결
