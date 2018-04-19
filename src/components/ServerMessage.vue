<!--NavbarComponent.vue-->
<template>
  <div >

    <div id="messageListDiv" ref="messageListDiv"/>
    <div v-for="(m,i) in messageList" :key='i'>{{m.text}}</div>

  </div>
</template>

<script>
import socketCluster from 'socketcluster-client'
const options = {
  path: '/api/ws',
  port: 4000,
  hostname: '127.0.0.1',
  autoConnect: true,
  secure: false,
  rejectUnauthorized: false,
  connectTimeout: 10000, // milliseconds
  ackTimeout: 10000, // milliseconds
  channelPrefix: null,
  disconnectOnUnload: true,
  multiplex: true,
  autoReconnectOptions: {
    initialDelay: 10000, // milliseconds
    randomness: 10000, // milliseconds
    multiplier: 1.5, // decimal
    maxDelay: 60000 // milliseconds
  },
  authEngine: null,
  codecEngine: null,
  subscriptionRetryOptions: {},
  query: {
    // yourparam: 'hello'
  }
}
var socket
function initSocket (__self) {
  var _self = __self || this
  // Initiate the connection to the server
  console.log('init ', socketCluster)
  socket = socketCluster.connect(options)
  function sendMsg () {
    var msg = 'sampleMessage'
    console.log('sending custom msg : ', msg)
    socket.emit('sampleClientEvent', {message: msg})
  }
  socket.on('error', function (err) {
    console.error('Socket error - ' + err)
  })

  socket.on('connect', function () {
    console.log('CONNECTED')
    sendMsg()
  })
  socket.on('rand', function (data) {
    // console.log('RANDOM STREAM: ' + data.rand)
    _self.messageList.push({time: new Date(), text: data.rand})
  })

  var sampleChannel = socket.subscribe('sample')

  sampleChannel.on('subscribeFail', function (err) {
    console.log('Failed to subscribe to the sample channel due to error: ' + err)
  })

  sampleChannel.watch(function (msg) {
    console.log('Sample channel message:', msg)
    _self.messageList.push({time: new Date(), text: msg})
  })
}

function checkExpired () {
  var s = this
  // console.log(s);
  if (s.messageList) {
    var cd = new Date()
    var toRm = []
    for (const i in s.messageList) {
      // console.log(s.messageList)
      var m = s.messageList[i]
      if (cd - m.time > 1000) {
        toRm.push(i)
        // console.log('esp', m)
      }
    }
    for (const i in toRm) {
      s.messageList.splice(toRm[i], 1)
    }
  } else if (s.interval) {
    clearInterval(s.interval)
    s.interval = null
  }
}

// import axios from 'axios';
export default {
  name: 'servermessage',
  components: {},
  data () {
    return {
      messageList: []
    }
  },
  methods: {

  },
  mounted () {
    this.interval = null
    if (!socket || socket.state === socket.CLOSED)initSocket(this)
  },
  destroyed () {
    console.log('disconnect socket')
    socket.disconnect()
    socket.destroy()
    if (this.interval != null) { clearInterval(this.interval); this.interval = null }
  },
  updated () {
    if (this.interval === null) {
      console.log('upmp')
      this.interval = window.setInterval(checkExpired.bind(this), 300)
    }
  }

}
</script>

<style scoped>
#message{
  display: flex;
  flex-direction: column;
  height: 50vh;

}
</style>
