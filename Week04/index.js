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
      console.log(this.root);
    }
    if(!($ in node))
      node[$] = 0

    node[$]++
  }
}


const trie = new Trie()
