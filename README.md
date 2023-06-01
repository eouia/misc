# misc

MagicMirror 구조 간단 설명;

- MM 모듈은 Frontend Browser (일반적으로 Chromium) 상에서 돌아가는 JavaScript 코드
- 일반적으로 `MMM-Something` 같은 식으로 이름 짓지만 꼭 그래야 하는 건 아닙니다.
- 크게 보면 MM 프레임워크는 웹서버-싱글페이지웹앱 구조라고 생각하시면 됩니다.
- MM에서 돌아가는 모듈(이하 MMM)은 보통 다음과 같은 구조로 되어 있습니다.

```
- modules/MMM-Something
  - MMM-Something.js
  - MMM-Something.css
  - node_helper.js
```

- `MMM-Something.js` : `MagicMirror Module`이라고 불리는 필수 파일입니다. MM 프레임워크에서 로딩되어 사용자의 화면(브라우저) 상에서 실행됩니다.
- `node_helper.js` : MMM이 브라우저 위에서 실행되다보니, 브라우저의 한계를 벗어나는 작업은 못합니다. 예를 들어 연결된 센서값을 읽는다든지. 이럴 때 별개로 백엔드서버상에서 해당 작업을 하고 그 결과를 프론트엔드 모듈에게 보내주는 nodeJS 프로그램입니다.
- `MMM-Something.css` : 해당 모듈의 CSS 파일입니다.



MM의 CSS는 다음과 같은 적용 순서를 가집니다.
- main.css
- 각 module의 CSS
- custom.css

위에서 아래 순서로 로딩되기 때문에 같은 우선순위를 가지는 CSS 셀렉터는 아래쪽걸로 override됩니다.


