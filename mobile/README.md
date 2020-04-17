# Todo List iOS


## 단계별 구현 내용

### 투두 리스트 보드 화면 구현

> [PR #18 [iOS] Todo List Board UI 구현][pr18]

* 스토리보드로 기본 UI 구성
* URLProtocolMock을 구현하여 네트워크 통신 시에 Mock Data가 돌아오도록 구현
* ViewModel과 DataSource 클래스 구현
* Mock Data 표시
* 뷰모델 테스트

Related issues: [#2][issue2], [#8][issue8], [#15][issue15] and [#22][issue22]

**실행 결과**

![result1](result1.png)

### 새 할일 카드 추가하기

> [PR #28 [iOS] 새로운 카드 추가 기능 구현][pr28]

* 스토리보드로 새 카드 추가 Form 구성
* 새 카드 추가 Form에 스크롤뷰를 적용하여 키보드에 반응하도록 구현
* 서버에 새 카드 추가 요청을 하고, ID를 반환받도록 구현
* 반환받은 ID와 제출된 정보로 새 카드 인스턴스를 만들고, 모델에 추가
* 테이블뷰를 전체 reload하지 않고, 뷰모델에서 카드 리스트의 변화를 알려서 테이블뷰의 insert된 행만 애니메이션으로 업데이트하도록 구현

Related issues: [#23][issue23], [#24][issue24], [#26][issue26], and [#34][issue34]

**실행 결과**

![result2](result2.png)

### 할 일 카드 삭제 및 이동 구현, Activities 화면 구현

> [PR #48 [iOS] 할 일 카드 삭제 및 이동 구현, Activities 화면 구현][pr48]

* 테이블뷰 스와이프 메뉴의 Delete 액션을 통해 카드 삭제 구현
* 카드 삭제 시 서버에게 응답을 받아서 삭제하도록 구현
* Drag/Drop 객체들과 카드 객체들 간 변환하는 유틸리티 구현
* Drag/Drop 델리게이트를 이용해 리스트 간 카드 이동 구현
* 같은 리스트 간 카드 이동 구현
* Drag session을 이용한 여러 개 카드 이동 구현
* 실제 서버와 연동
* Activities 화면 구현

Related issues: [#30][issue30], [#33][issue33], [#37][issue37], [#40][issue40], and [#44][issue44]

**실행 결과**

![result3](result3.png)



[pr18]: https://github.com/codesquad-member-2020/todo-4/pull/18
[pr28]: https://github.com/codesquad-member-2020/todo-4/pull/28
[pr48]: https://github.com/codesquad-member-2020/todo-4/pull/48

[issue2]: https://github.com/codesquad-member-2020/todo-4/issues/2
[issue8]: https://github.com/codesquad-member-2020/todo-4/issues/8
[issue15]: https://github.com/codesquad-member-2020/todo-4/issues/15
[issue22]: https://github.com/codesquad-member-2020/todo-4/issues/22

[issue23]: https://github.com/codesquad-member-2020/todo-4/issues/23
[issue24]: https://github.com/codesquad-member-2020/todo-4/issues/24
[issue26]: https://github.com/codesquad-member-2020/todo-4/issues/26
[issue34]: https://github.com/codesquad-member-2020/todo-4/issues/34

[issue30]: https://github.com/codesquad-member-2020/todo-4/issues/30
[issue33]: https://github.com/codesquad-member-2020/todo-4/issues/33
[issue37]: https://github.com/codesquad-member-2020/todo-4/issues/37
[issue40]: https://github.com/codesquad-member-2020/todo-4/issues/40
[issue44]: https://github.com/codesquad-member-2020/todo-4/issues/44
