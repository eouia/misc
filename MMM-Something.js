Module.register("MMM-Something", {
  /* 모듈 초기화에 필요한 내용들 */
  defaults: { // config.js에서 사용자가 새로 덮어 쓰지 않는 한, 모듈에서 사용하게 될 디폴트 값들을 Object 형태로 정의합니다.
    foo: 123,
    bar: 456,
  },
  
  /**
   * 모듈이 사용할 CSS 파일들을 배열로 정의합니다. 외부 URL도 OK.
   * 해당 파일들은 <link rel="stylesheet" href="some_style.css"> 형태로 <head>에 추가됩니다.
   * @returns {string[]}
   */
  getStyles: function () {
    return ["MMM-Something.css"] 
  },
  
  /**
   * 혹시 모듈에서 다른 JS 스크립트 파일(commonJS 형식)을 로딩하는 게 필요하면 사용합니다.
   * 해당 파일들은 <link rel="script" src="some_script.js"> 형태로 <head>에 추가됩니다.
   * @returns {string[]}
   */
  getScripts: function () { 
    return ["some_script.js"] 
  },
  
  /**
   * 모듈이 실행될 때 1회 호출됩니다. 여기에서 모듈의 초기화 작업 등을 해주면 편리합니다.
   * @returns {undefined}
   */
  start: function() {
    this.foo = this.config.foo
    this.bar = this.config.bar
    this.result = 0
    console.log(this.config) // this.config에 defaults에서 정의된 값과 config.js에서 사용자가 지정한 값들의 merging된 결과가 들어 있습니다.
    this.sendSocketNotification("INIT_VALUE", data) // .sendSocketNotification(notification, payload)는 모듈로부터 node_helper.js에게 데이터나 메시지를 전달하기 위한 멤버함수입니다.
    this.result = 0 //
  },
  
  /**
   * 화면의 모듈 position 위치에 뭔가 그려야 할 때, 그려질 내용을 기술합니다. 리턴값은 DOM형태여야 합니다.
   * @returns {HTMLElement}
   */
  getDOM: function() {
    let wrapper = document.createElement("div")
    wrapper.innerHTML = `foo: ${this.config.foo}, bar: ${this.config.bar}, result: ${this.result}`
    return wrapper
  },

  /**
   * 다른 "모듈" 혹은 MM Framework로 부터 메시지와 데이터를 받았을 때 호출됩니다.
   * @param {string} notification 메시지
   * @param {*} payload 값
   * @param {object} sender 노티피케여션을 보낸 모듈, null인 경우에는 MM Framework에서 보낸 것. 
   * @returns {undefined}
   */
  notificationReceived: function (notification, payload, sender) {
    if (notification === "TELL_ME_YOUR_RESULT") { // 어떤 모듈이 TELL_ME_YOUR_RESULT라는 메시지를 보냈을 때
      // do something
      console.log("TELL_ME_YOUR_RESULT received, so I will broadcast my result to other modules")
      this.sendNotification("CURRENT_RESULT", this.result)  // .sendNotification(notification, payload)는 다른 "모듈"에게 메시지와 데이터를 보낼 때 사용합니다.
    }

    // notification은 broadcasting형태라서 모든 모듈이 동시에 같은 notification을 받습니다. 따라서, sender를 보고 누가 보낸 것인지 확인하는 게 필요합니다.
  },

  /**
   * `node_helper.js`로부터 메시지와 데이터를 받았을 때 호출됩니다.
   * 모듈간 notification과, node_helper와의 socketNotication을 혼동하지 마세요.
   * @param {*} notification 
   * @param {*} payload 
   * @returns {undefined}
   */
  socketNotificationReceived: function (notification, payload) {
    if (notification === "CALCULATE_RESULT") { // node_helper.js로부터 CALCULATE_RESULT라는 메시지를 받았을 때
      this.result = payload
      this.updateDOM() // 모듈의 화면 출력값을 갱신할 필요가 있을 때 호출합니다. 그러면 .getDOM()의 결과가 화면에 그려지게 됩니다.
    }
  }
    
   // 뭐, 대략 이 정도가 모듈의 기본 구조입니다.
})
