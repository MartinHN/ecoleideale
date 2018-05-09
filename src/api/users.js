import Req from "./requestBase"


class UsersAPI extends Req{
  constructor(){
    super('/api/user')
  }

  isConnectedToServer(success,err){
    this.get("/ping", null,success,err);
  }

  tryToLogin(formData,cb,err){
    this.postForm('/',formData,(resp)=>{
      if( resp && resp.success){
        const u = resp.user;
        cb({name:u.username,mail:u.email})
      }
      else{
        err(resp)
      }

    },err)
  }

  registerUser(formData,cb,err){
    err = err || console.error
    this.postForm('/',formData,(resp)=>{
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