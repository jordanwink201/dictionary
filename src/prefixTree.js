function Trie(){
  this.root = new this.Node("", "");
  this.counter = 0;
}

Trie.prototype = {
  insert : function(word){ 
    this.validate(word);
    word = word.toLowerCase();
    var current = this.root;
    var char;
    for(var i = 0; i < word.length; i++){
      char = word.charAt(i);
      if (current.children[char] === undefined) {
        current.children[char] = new this.Node(char, word.slice(0,i+1));
      }
      current = current.children[char];
    }
    current.isWord = true;
  },
  // Check to see if the Trie contains the actual word or not
  // Returns a true or false, if the actual word has been found
  contains : function(word){
    this.validate(word);
    word = word.toLowerCase();
    var current = this.root;
    var char;
    for(var i = 0; i < word.length; i++){
      char = word.charAt(i);
      if (current.children[char] === undefined) {
        return false;
      }
      current = current.children[char];
    }
    return current.isWord;
  },
  autocomplete : function(characters) {
    this.validate(characters);
    characters = characters.toLowerCase();
    var current = this.root;
    var char;
    for(var i = 0; i < characters.length; i++){
      char = characters.charAt(i);
      if (current.children[char] === undefined) {
        return null;
      }
      current = current.children[char];
    }
    return this.depthFirstWordSearch(current);
  },
  //returns an array with all the words which are descendant to the given node
  depthFirstWordSearch : function(node){
    var words = [];
    function depthFirstRec(node){
      if(node.isWord){
        words.push(node.word);
      }
      for(var char in node.children){
        depthFirstRec(node.children[char]);
      }
    }
    depthFirstRec(node);
    return words;
  },
  validate : function(word){
    if(word === undefined)
      console.log("input was undefined");
    if(word === null)
      console.log("input was null");
    if(typeof word !== "string" && !(word instanceof String))
      console.log("input wasn´t a string");
    if(word.length <= 0)
      console.log("length of string was smaller or equal to zero");
  },
  Node : function(char, word){
    this.char = char;
    this.children = {};
    this.isWord = false;
    this.word = word;
  }
};