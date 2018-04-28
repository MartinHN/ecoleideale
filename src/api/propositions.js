const PropositionsMdObj = {}
function importAll (r,obj) {r.keys().forEach(key => obj[key] = r(key))}


class PropositionsAPI{
  constructor(){
    importAll(require.context('@/md/propositions/', true, /\.md$/),this.mdObjs={})
    const numInTitle =/(\d+).*\.md$/i;
    for(var k in this.mdObjs){
      const num = parseInt(k.match(numInTitle));
      this.mdObjs[k].number=num;
    }
  }
  getPropositions(){
    return this.mdObjs
  }
}

const propositionsAPI = new PropositionsAPI()

export default propositionsAPI;