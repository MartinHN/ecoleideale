const APIversion = [1, 0, 0]
const storage = require('localforage').createInstance({name: 'vote_session'})
import voteAPI from '@/api/vote'
import propositionAPI from '../api/propositions';

function arrayEq(a1,a2){
  return   a1.length==a2.length && a1.every((v,i)=> v === a2[i])
}

function erf(){
  debugger
  console.error(arguments)
}

class VoteSession{
  constructor () {
    this.url = ''
    this.inited = false
    this.isAuthorized=false
    this.votes = {}
  }


  init (cb) {
    if(this.inited){cb();}

    const that = this
    const initStorage = () => 
    {

      storage.setItem('APIversion', APIversion)
      this.votes={}
      storage.iterate(
        (v,k,i)=>{
          if(k.startsWith('a_')){
            this.votes[k.substr(2)] = v;
          }
        })
      .then(()=>{
        this.inited = true
        // TODO auth
        this.isAuthorized=true
        console.log('vote session inited')
        if(cb){cb()}
      })
      .catch(erf)
    }

    storage.getItem('APIversion')
    .then(v => { if (v[0] != APIversion[0]) { storage.clear(initStorage) }else{initStorage()} })
    .catch(initStorage)

  }


  startSession(type,cb,doNotOverride){

    if(doNotOverride && this.session && this.session.idList.length){return}
      this.session = {type,idx:-1,idList:[],votes:this.votes}
    if(type=='all'){
      const allprops = propositionAPI.getPropositions();
      this.session.idList = Object.keys(allprops).map(el=>{return allprops[el].number});
    }
    else {
      const tags = propositionAPI.getAllPropositionsForTagName(type)
      if( tags ){
        this.session.idList = tags.map(e=>e.number);
      }
      else{
        erf('tag not found for type ',type)
      }
    }
    if(this.session.idList){
      console.log('session inited for type',type)
    }
    if(cb){cb();}
  }

  isValid() {
    return this.inited && this.session && this.session.idList.length && this.isAuthorized;
  }
  invalidate(){
    this.session.idList = []
    this.session.idx = -1

  }

  hasEnded(){return this.session.idx>=this.session.idList.length;}
  checkVoteIntegrity(vote){
    // TODO
    return true;
  }
  checkIdIntegrity(id){return typeof id === 'number'}
  getCurrentVoteIdx(){
    if(this.isValid()) return this.session.idx;
    return -1;
  }
  getCurrentVoteId(){
    if(this.getCurrentVoteIdx()>=0 && this.getCurrentVoteIdx()<this.session.idList.length ){
      return this.session.idList[this.getCurrentVoteIdx()]
    }
    return undefined;
  }
  voteInSession(id,vote,cb,err){
    if(!this.session){console.error('no vote session ');return}
    if(this.checkIdIntegrity(id) && this.checkVoteIntegrity(vote)){
      this.votes[id] = vote;
      storage.setItem('a_'+id,vote).then(this.__sendVote(id,vote,cb,err)).catch()
    }
    else{
      erf("wrong "+(this.checkIdIntegrity(id)?"id":"vote"),id,vote)
    }
  }
  __sendVote(id,vote,cb,err){
    if(this.isAuthorized){
      console.log("voting" , vote)
      voteAPI.sendVote(id,vote,
        ()=>{if(cb)cb();},
        err)
    }
  }
  getLastVoteFromId(id){
    return new Promise((resolve,reject)=>{
      const vote = this.votes[id]
      if(vote) resolve(vote);
      else reject("not found")
    })
  }

  getNextVoteIdInSession(nextCb,endCb){
    if(!this.isValid() || !this.session || !this.session.idList){console.error('no vote or list in session ');return}
    this.session.idx++;
    if(this.hasEnded()){this.invalidate();endCb();}
    else{nextCb(this.session.idList[this.session.idx])}
  }


}

const voteSession = new VoteSession()

export default voteSession