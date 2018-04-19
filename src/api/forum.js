
class ForumAPI {
  constructor () {
    this.url = 'http://127.0.0.1:3000/api/forum'
  }
  emitCmd (path, args, cb) {
    var xhr = new XMLHttpRequest()
    var fullURL = this.url + path
    if (args) {
      var isStart = true
      for (var a in args) {
        if (isStart) { fullURL += '?'; isStart = false } else { fullURL += '&' }
        fullURL += a + '=' + args[a]
      }
    }
    xhr.open('GET', fullURL)
    xhr.onload = function () {
    // console.log(xhr.responseText)
      var obj = JSON.parse(xhr.responseText)
      // console.log(obj)
      cb(obj)
    }
    xhr.send()
  }

  init () {

  }

  close () {

  }
}

const forumAPI = new ForumAPI()

export default forumAPI
