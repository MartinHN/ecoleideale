class UsersAPI{
  constructor(){
    this.url = 'http://127.0.0.1:3000/api/user'
  }



  emitCmd(type,path,args,headers,data,cb,err){
    var xhr = new XMLHttpRequest()
    var fullURL = this.url + path
    if ( args && (Object.keys(args).length === 0)) {
      fullURL += '?';
      const al = [];for (var a in args) {al.push(a + '=' + args[a])}
      fullURL+=al.join('&')
    }
    xhr.open(type, fullURL)
    xhr.onload =  ()=> {
      var r = xhr.responseText
      var res = (r && r[0]==='{')? JSON.parse(r):r;

      cb(res)
    }
    xhr.onerror = (e)=>{err(e)}
    xhr.ontimeout=(e)=>{err(e)}
    
    for( var h in headers){
      xhr.setRequestHeader(h,headers[h])
    }
    xhr.send(data)
  }
  get(path, args, cb,err){
    this.emitCmd('GET',path,args,null,null,cb,err)
  }
  post(path, data, cb,err){
    const urlEncodedDataPairs = [];
    for( var name in data){
      urlEncodedDataPairs.push(encodeURIComponent(name)+ '=' + encodeURIComponent(data[name]))
    }
     const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g,'+')

    this.emitCmd('POST',path,null,{'Content-Type':"application/x-www-form-urlencoded"},urlEncodedData,cb,err)
  }

  isConnectedToServer(success,err){
    this.get("/ping", null,success,err);
  }

  tryToLogin(formData,cb,err){
    this.post('/',formData,(resp)=>{
      if( resp && resp.success){
        const u = resp.user;
        cb({name:u.username,mail:u.email})
      }
      else{
        err(resp)
      }

    },err)
  }


}
const usersAPI = new  UsersAPI()

export default usersAPI