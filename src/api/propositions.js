const PropositionsMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}


class PropositionsAPI{
  constructor(){
    importAll(require.context('@/md/propositions/', true, /\.md$/),this.mdObjs={})
    const numInTitle =/(\d+)(.*)\.md$/i;
    this.tags = {}
    for(var k in this.mdObjs){
      const o = this.mdObjs[k];

      const matches = k.match(numInTitle)
      
      if(matches.length!=3){
        console.warn('can\'t parse proposition filename' ,k,matches)
      }
      const num = parseInt(matches[1],10);
      this.mdObjs[k].number=num;
      this.mdObjs[k].parsedTitle = matches[2].replace(/-|\./g,' ').trim() 
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
      if(kk.number==id) return kk
    }
  }
  getAllTags(){
    return this.tags;
  }

}

const propositionsAPI = new PropositionsAPI()

export default propositionsAPI;