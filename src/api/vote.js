import Req from "./requestBase"

const cfg = require('./config')

class VoteAPI  extends Req{
  constructor(){
    super('/api/vote');
  }

  sendVote(voteId,vote,cb,err){
    const formData = {id:voteId,rate:vote.rate,remarks:vote.remarks}
    this.postForm('/doVote',formData,(resp)=>{
      if( resp && resp.success){
        const u = resp.user;
        cb()
      }
      else{
        err(resp)
      }

    },err)
  }


}
const voteAPI = new  VoteAPI()

export default voteAPI