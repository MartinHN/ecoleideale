
class ForumAPI {
  constructor () {
    this.url = 'http://127.0.0.1:3000/api/forum'
  }
  emitCmd (path, args, cb,err) {
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
    var r = xhr.responseText
      var res = (r && r[0]==='{')? JSON.parse(r):r;
      // console.log(obj)
      cb(res)
    }
    const errf = err || function(e){console.error('forum api error',e)}
    xhr.onerror = (e)=>{errf(e)}
    xhr.ontimeout=(e)=>{errf(e)}
    xhr.send()
  }


  init () {

  }

  close () {

  }
}

const forumAPI = new ForumAPI()

export default forumAPI
