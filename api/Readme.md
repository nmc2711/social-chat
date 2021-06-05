# Yes Talk : Backend

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

> public
