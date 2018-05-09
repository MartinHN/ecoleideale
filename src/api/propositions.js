const PropositionsMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}


class PropositionsAPI{
  constructor(){
    importAll(require.context('@/md/propositions/', true, /\.md$/),this.mdObjs={})
    const numInTitle =/(\d+)(.*)$/i;
    this.tags = {}
    this.allTag = {num:0,name:'tout'}
    for(var kk in this.mdObjs){
      const k = this.mdObjs[kk].title;
      const o = this.mdObjs[kk];
      const matches = k.match(numInTitle)
      
      if(!matches || matches.length!=3){
        console.error('can\'t parse proposition title' ,k,matches)
      }
      const num = parseInt(matches[1],10);
      o.number=num;
      o.parsedTitle = matches[2].replace(/-|\./g,' ').trim() 
      for(var t of o.tags){
        if(!(t in this.tags)){
          this.tags[t] = {num:0,name:t}
        }
        this.tags[t].num+=1;
      }
      this.allTag.num++;
      
      // console.log(k,this.mdObjs[k].parsedTitle)
    }
    this.tags[this.allTag.name] = this.allTag
  }
  getPropositions(){return this.mdObjs}
  isValidId(id){return typeof id==='number'}

  getPropositionFromId(id){
    return new Promise((resolve,reject)=>{
      if(!this.isValidId(id)){reject('id not valid '+ id)}
    for(var k in this.mdObjs){
      const kk=this.mdObjs[k]
      if(kk.number==id) {
        resolve(kk)
      }
    }
    reject('not found '+id)
  })
  }

  getAllTags(){return this.tags}

  getAllPropositionsForTagName(tag){
    const res = []
    for(var k in this.mdObjs){
      const kk=this.mdObjs[k]

      if(kk.tags.indexOf(tag)>=0 || tag==this.allTag.name) {
        res.push(kk)
      }
    }
    if(res===[]){
      console.warn('not found tag',tag)
    }
    return res
  }


}

const propositionsAPI = new PropositionsAPI()

export default propositionsAPI;