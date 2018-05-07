export default {
  getCurrentArgs:()=>{
    var url = window.location.pathname
    var getQuery = url.split('?')[1]
    if(getQuery){
      return getQuery.split('&')
      .map(el=>{return {[el[0]]:el[1]}}) 
    }
    return null;
  },
  buildArgsFromObj:(o)=>{
    if(o)
      return '?'+Object.keys(o).map(k=>k+"="+o[k]).join("&")
    return ''
  }
}