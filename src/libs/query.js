export default {
  getCurrentArgs:()=>{
    var url = window.location.href
    var getQuery = url.split('?')[1]
    if(getQuery){
      const al = getQuery.split('&');
      const res = {}
      for ( const el of al){
        const sp = el.split('='); res[decodeURI(sp[0])]=decodeURI(sp[1]);
      }
      return res
      
    }
    return null;
  },
  buildArgs:(o)=>{
    if(o)
      return '?'+Object.keys(o).map(k=>encodeURI(k)+"="+encodeURI(o[k])).join("&")
    return ''
  }
}