class UsersAPI{
  constructor(){
    this.url = 'http://127.0.0.1:3000/api/user'
  }

  emitCmd(path, args, cb,err){
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
    xhr.onload =  ()=> {
      var r = xhr.responseText
      var res = (r && r[0]==='{')? JSON.parse(r):r;
      cb(res)
    }
    xhr.onerror = (e)=>{err(e)}
    xhr.ontimeout=(e)=>{err(e)}

    xhr.send()
    
  }

  isConnectedToServer(success,err){
    this.emitCmd("/ping", null,success,err);
  }


}
const usersAPI = new  UsersAPI()

export default usersAPI