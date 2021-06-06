# Yes Talk : Frontend client

### REACT CONTEXT REDUXREMATCH

## \*\* 디렉터리

> index.js : store , ctx provider 정의

> route.js : 코드스플릿팅 및 레이지 로딩을 통한 성능 개선과 라우트 통합 정리

> app.js : 스크롤 제어 , 컴포넌트 및 각 라우터 호출

// common

> scrollTop : 라우트 이동시 스크롤 탑유지 common fn (withRouter 로 히스토리 변화 감지후 스크롤탑 콜백)
> toast : 토스트 메세지 기능(class 객체형 토스트 매니저에서 생성된 토스트 돔에 destroy show render 를 컴포넌트 생명주기를 이용한 호출(디자인별케이스 진행중))

// util

> apiCall : 팬딩인 적은 put post delete 공통 api export

// pages => 페이지 컴포넌트들은 독립전인 core url

> register : 회원가입 컴포넌트 (시스템 validation 및 로그인페이지 연동)
> login : 로그인 컴포넌트 (시스템 validation 및 전역상태관리를 통한 로그인 완료 유저정보를 글로벌 저장)
> home : 고정 메뉴 및 피드 컨테이너
> profile : url param을 통한 유저 롤별 조회페이지
> messenger : 커스텀훅을 통한 index 사이드 이펙트 관리 , 채팅 상태관리 (채팅전체적인 소켓 연결 및 소켓 작용 및 클라이언트 채팅렌더 분기)
> errorPage : error 페이지 메인 링크 유도

// components

> share : 메인페이지/프로필페이지 게시물 등록 폼 기능 (파일업로드,파일미리보기,글쓰기,감정표현기능 및 부가 태그(준비중))
> topbar : 헤더 네비이게이션 (프로필페이지 링크, 검색(준비중), 알람(준비중), 리로드 기능)
> feed : 메인페이지 프로필페이지 게시글 리스트 (리스트 각 역활별 분기 표현)
> post : 피드 게시물 상세기능 (좋아요 토글 기능 , 프로필 링크, 답글(준비중))
> conversations: 메신저 기능 대화 유저리스트 (기존대화이력이 있는 유저와의 대화연결)
> chatOnlien : 접속유저와의 메신저 기능 대화 미대화 유저리스트(접속유저중 대화 이력이 없는 유저와의 대화연결 있다면 기존대화이력으로 넘김)
> message : 챗 메세지 렌더 컴포넌트(챗 돔)
> online : 메인페이지 접속중인 친구들 실시간 조회(준비중)
> sidebar : 컨텐츠 네비게이션 (각 컨텐츠 링크이동(준비중), 대화가능 친구(준비중))
> rightbar : 이벤트 네비게이션 (생일친구 조회 및 링크(준비중), 이벤트 링크(준비중), 접속중인 친구)
> closeFriend : 메인페이지 왼쪽 아티클 친구리스트 렌더 컴포넌트

// context
