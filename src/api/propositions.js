const PropositionsMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}


class PropositionsAPI{
  constructor(){
    importAll(require.context('@/md/propositions/', true, /\.md$/),this.mdObjs={})
    const numInTitle =/(\d+)(.*)$/i;
    this.tags = {}
    for(var kk in this.mdObjs){
      const k = this.mdObjs[kk].title;
      const o = this.mdObjs[kk];
      const matches = k.match(numInTitle)
      
      if(!matches || matches.length!=3){
        console.warn('can\'t parse proposition title' ,k,matches)
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
      // console.log(k,this.mdObjs[k].parsedTitle)
    }
  }
  getPropositions(){return this.mdObjs}
  getFirstId(){return 1}
  getPropositionFromId(id){
    for(var k in this.mdObjs){
      const kk=this.mdObjs[k]
      if(kk.number==id) {
        return kk
      }
    }
  }

  getAllTags(){return this.tags;}

  getAllPropositionsForTagName(tag){
    const res = []
    for(var k in this.mdObjs){
      const kk=this.mdObjs[k]
    // console.log(tag,kk.tags,kk.tags.indexOf(tag)>=0)
    if(kk.tags.indexOf(tag)>=0) {
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