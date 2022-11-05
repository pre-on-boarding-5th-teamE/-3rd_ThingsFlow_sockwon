## 요구사항 & 분석(model, api 중심으로)

### 스펙 분류 및 분석

| ID | 요구사항 | 세부내용 | 비고 |
| --- | --- | --- | --- |
| 1 | 게시글 작성 | 제목과 본문 | 제목: 20자, 이모지 |
|  |  |  | 본문: 200자, 이모지 |
| 2 | 게시글 작성 | 비밀번호 | 회원가입 없이 게시글 비밀번호가 일치하면 수정 / 삭제 가능 |
|  |  |  | DB에 암호화 형태로 저장 |
|  |  |  | 6자 이상, 숫자 1개 이상 반드시 포함 |
| 3 | 게시글 읽기 | 리스트 가져오기 | 모든 사용자는 한 페이지 내에서 모든 게시글을 최신 글 순서로 확인 가능함 |
| 4 | 게시글 작성 | 날씨  | 게시글에 실시간 날씨가 반영됨. 외부 API.  |
|  |  |  | https://www.weatherapi.com 사용 추천 |
- 이모지 작성:
    - mysql 에 이모지 입력이 잘 안되는 문제 존재-utf8mb4 로 바꿔주면 된다. [링크](https://jungeunpyun.tistory.com/77)
    - 다른 특이사항 없음
- 게시글 각각에 비밀번호가 필요하다. 비밀번호는 정규표현식으로 검사. 그 후에 암호화하여 저장. 암호화는 bcrypt 가 적절할듯.
- 게시글 읽기는 페이지네이션 없이 모든 리스트를 한번에 읽는다. order by 로 정렬해야 한다. id 순서로 정렬해도 충분할 듯
- 날씨 api 는 클라이언트의 ip 주소가 필요하다. 클라이언트 ip 주소는 ****request-ip**** 모듈로 얻을 수 있다. ********npm 에서 손쉽게 설치 및 사용 가능.
- 날씨는 외부 api 를 써야 하는 만큼 axios 사용 필요함.
- 필요한 모듈: cors, morgan, request-ip, mysql, bcrypt, typeORM, axios

### 모델 및 API

- Model: Posts
    - 제목: max_length 20
    - 본문: max_length 200
    - 비밀번호: 암호화-비밀번호  U D
    - 날씨: 외부 api 사용
- API: Posts
    
    
    | ID | METHOD | URL | 내용 | 작업 분량(단위: 시간) | 예외처리 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | POST | api/v1/posts | C: 게시글 작성 | 3 | 제목과 본문 글자수 / 비밀번호 형식 / 필수요소 체크 |
    | 2 | GET | api/v1/posts/<id> | R: 상세읽기 | 1 | 404 |
    | 3 | GET | api/v1/posts | R: 리스트 가져오기 | 1 |  |
    | 4 | PATCH | api/v1/posts/<id> | U: 게시글 수정 | 1 | 403, 404 |
    | 5 | DELETE | api/v1/posts/<id> | D: 게시글 삭제 | 1 | 403, 404 |
    | 총계 |  |  |  | 7(7시간 걸렸음) | 완료 |
- 테스트케이스
    
    
    | ID | 분류 | 테스트항목 | 결과 |
    | --- | --- | --- | --- |
    | 1 | C: 게시글 작성 | 201 | p |
    | 2 |  | 400-제목:20자 넘김 | p |
    | 3 |  | 400-본문:200자 넘김 | p |
    | 4 |  | 400-비밀번호 | p |
    | 5 | R: 상세읽기 | 200 | p |
    | 6 |  | 404: 없는 게시글 | p |
    | 7 | R: 리스트 가져오기 | 200 | p |
    | 8 | U: 게시글 수정 | 201 | p |
    | 9 |  | 403: 권한없음 | p |
    | 10 |  | 404: 없는 게시글 | p |
    | 11 | D: 게시글 삭제 | 204 | p |
    | 12 |  | 403: 권한없음 | p |
    | 13 |  | 404: 없는 게시글 | p |
    | 14 | 날씨 api | 200 | p |
- 테스트 결과
    - 테스트값
        
        ![스크린샷 2022-11-05 오후 12.58.54.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd3224fe-0dba-4127-8d6e-084895648d94/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.58.54.jpg)
        
    - 테스트 커버리지
        
        ![스크린샷 2022-11-05 오후 12.58.11.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4310556f-ac08-49af-9b02-66b0f8a90957/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.58.11.jpg)
        

### ERD

![스크린샷 2022-11-04 오전 11.53.59.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08f6fea3-e904-4b7c-a293-cab3a2f6fe35/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.53.59.jpg)

---

## 개발조건

- 프레임 워크: express
- DBMS: mySQL
- API 스펙 정리 필수(프론트 엔드 개발자가 스펙만으로 충분히 개발 가능해야 한다.)
- TypeScript(환경 설정에 실패해서 순수 express 로 작업함)
- typeORM

---

## 평가항목

1. 일정준수
2. RESTAPI서버기본구현능력
3. 관계형데이터베이스활용능력
4. API정상동작여부
5. 정확한 예외처리
6. Node.js기본특성이해및활용능력
7. 선택한프레임워크에대한이해및활용능력

---

## API 명세
  [API 명세 노션 페이지](https://www.notion.so/299292e01e1a472aa84fd6b2402cc2eb?v=73f7fa437614408aad5a8eb635bf26a3)
