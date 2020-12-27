class Trie {
  constructor() {
    this.root = Object.create(null)
    this.$ = Symbol('$')
  }
  insert(word){
    let node = this.root
    let $  = this.$
    for (let c of word) {
      if(!node[c])
        node[c] = Object.create(null)
      node  = node[c]
    }
    if(!($ in node))
      node[$] = 0
    node[$]++
  }
  most(){
    let max = 0,maxWord;
    let $  = this.$
    const visit = (node,word)=>{
      if(node[$] && node[$]> max){
        max = node[$]
        maxWord = word
      }
      for(let p in node){
        visit(node[p],word + p)
      }
    }
    visit(this.root,'')
    console.log(max,maxWord);
  }
}

function randomWord(length){
  let s = ''
  for (let index = 0; index < length; index++) {
    s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
  }
  return s
}


const trie = new Trie()


for (let index = 0; index < 100000; index++) {
    trie.insert(randomWord(4)) 
}