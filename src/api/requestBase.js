const cfg = require('./config')
class Request{
  constructor(domain){
    this.url = cfg.serverURL+domain
  }

 emitCmd(type,path,args,headers,data,cb,err){

    var xhr = new XMLHttpRequest()
    headers = headers || {}
    err = err || console.error

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
    xhr.withCredentials=true;
    headers['Access-Control-Allow-Credentials']=true
    // headers['Access-Control-Allow-Origin']='*'
    for( var h in headers){
      xhr.setRequestHeader(h,headers[h])
    }
    xhr.send(data)
  }

  get(path, args, cb,err){
    this.emitCmd('GET',path,args,null,null,cb,err)
  }

  postForm(path, data, cb,err){
    const urlEncodedDataPairs = [];
    for( var name in data){
      urlEncodedDataPairs.push(encodeURIComponent(name)+ '=' + encodeURIComponent(data[name]))
    }
     const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g,'+')

    this.emitCmd('POST',path,null,{'Content-Type':"application/x-www-form-urlencoded"},urlEncodedData,cb,err)
  }

  post(path, data, cb,err){
    this.emitCmd('GET',path,null,null,data,cb,err)
  }
}

export default Request;
