const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  
  /**
   * nodeHelper가 처음 실행될 때 호출됨. 여기서 적당히 초기화를 해주면 됩니다.
   * 주의할 건, nodeHelper는 모듈과는 별개로 실행되기 때문에 config값 등을 공유하거나 하지 않습니다.
   * 모듈과 데이터를 주고 받으려면 양쪽에서 각각 `this.sendSocketNotification`과 `socketNotificationReceived`를 사용해야 합니다.
   * 또한 외부의 다른 MM 모듈과는 고립되어 있으므로 자신의 MM모듈과만 통신할 수 있습니다. 
   * 다른 nodeHelper나 외부의 다른 프로세스와는 통신하려면 별도로 구현해야 합니다.
   */
  start: function() {
    this.config = {}
    this.timer = null
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "INIT_VALUE") { // MMM-Something 모듈에서 보낸 "INIT_VALUE" 메시지
      this.config = payload
      if (this.timer) {
        let counter = 0
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          let result = this.config.foo + this.config.bar + counter++
          this.sendSocketNotification("CALCULATE_RESULT", result) // MMM-Something 모듈에 "UPDATE_VALUE" 메시지와 계산결과를 1초마다 보냄.
        }, 1000)
      }
    }
  }

})
