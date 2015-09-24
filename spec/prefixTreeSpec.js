describe('prefixTree', function() {
  var trie;

  beforeEach(function() {
    trie = new Trie();
  });

  it('should have methods named "insert" and "contains"', function() {
    expect(trie.insert).to.be.a("function");
    expect(trie.contains).to.be.a("function");
    expect(trie.autocomplete).to.be.a("function");
  });

  it('should insert values at the correct location in the tree', function(){
    trie.insert('ted');
    trie.insert('tea');
    trie.insert('ten');
    trie.insert('i');
    expect(trie.root.children['t'].char).to.equal('t');
    expect(trie.root.children['t'].children['e'].char).to.equal('e');
    expect(trie.root.children['t'].children['e'].isWord).to.equal(false);
    expect(trie.root.children['i'].char).to.equal('i');
    expect(trie.root.children['i'].isWord).to.equal(true);
    expect(trie.root.children['k']).to.equal(undefined);
  });

  it('should have a working "contains" method', function(){
    trie.insert('ted');
    trie.insert('tea');
    trie.insert('ten');
    trie.insert('i');
    expect(trie.contains('ted')).to.equal(true);
    expect(trie.contains('tedi')).to.equal(false);
    expect(trie.contains('te')).to.equal(false);
  });

  it('should have a "word" on every node', function(){
    trie.insert('ted');
    trie.insert('tea');
    trie.insert('ten');
    trie.insert('i');
    expect(trie.root.children['t'].word).to.equal('t');
    expect(trie.root.children['t'].children['e'].children['a'].word).to.equal('tea');
    expect(trie.root.children['t'].children['e'].word).to.equal('te');
  });

  it('should return descendant words in the tree from autocomplete', function(){
    trie.insert('ted');
    trie.insert('tea');
    trie.insert('ten');
    trie.insert('to');
    console.log('autocomplete : ', trie.autocomplete('t'));
    expect(trie.autocomplete('t')).to.eql(['ted', 'tea', 'ten', 'to']);
  
  });

});

describe('prefixTree with dictionary', function() {
  var trie;

  before(function(){
    trie = new Trie();
    for(var key in dictionary){
      trie.insert(key);
    }
  });

  it('should have methods named "insert" and "contains"', function() {
    expect(trie.insert).to.be.a("function");
    expect(trie.contains).to.be.a("function");
  });

  it('should insert values at the correct location in the tree', function(){
    expect(trie.contains('rochet')).to.equal(true);
    expect(trie.contains('cxfcgvcbf')).to.equal(false);
  });

  it('should have a working "contains" method', function(){

  });

});

