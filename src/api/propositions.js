const PropositionsMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}


class PropositionsAPI{
  constructor(){
    importAll(require.context('@/md/propositions/', true, /\.md$/),this.mdObjs={})
    const numInTitle =/(\d+)(.*)\.md$/i;

    for(var k in this.mdObjs){
      const matches = k.match(numInTitle)
      
      if(matches.length!=3){
        console.warn('can\'t parse proposition filename' ,k,matches)
      }
      const num = parseInt(matches[1],10);
      this.mdObjs[k].number=num;
      this.mdObjs[k].parsedTitle = matches[2].replace(/-|\./g,' ').trim() 
      // console.log(k,this.mdObjs[k].parsedTitle)
    }
  }
  getPropositions(){
    return this.mdObjs
  }
}

const propositionsAPI = new PropositionsAPI()

export default propositionsAPI;