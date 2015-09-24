var trie = new Trie();

// Insert all of the words from the dictionary
for (var key in dictionary) {
  trie.insert(key);
}

var searchResultsContainer = $('.panel-footer').hide();
var inputBar = $('input');
var $listContainer = $('<ul></ul>');
var characters = '';
var submitButton = $('.btn');
var definition;

inputBar.on('input', function(e){
  clear();
  characters = $(this).val();
  if (characters === '') {
    searchResultsContainer.hide();
  }
  var autocompleted = trie.autocomplete(characters);
  autoCompleteDropDown(autocompleted);
});

submitButton.on('click', function(){
  if (inputBar.val() !== '') {
    getAndShowDefinition(inputBar.val());
  }
});

function autoCompleteDropDown (list){
  if (list === null) {
    searchResultsContainer.hide();
  } else {
    clear();

    var length;
    if (list.length >= 5) {
      length = 5;
    } else {
      length = list.length;
    }

    for (var i = 0; i < length; i++) {
      var $listItem = $('<li class="listItem"></li>');   
      $listItem.text(list[i]); 
      $listItem.appendTo($listContainer);
    }

    $listContainer.appendTo(searchResultsContainer);
    searchResultsContainer.show();
  }
} 

function clear(){
  $listContainer.empty();
}

function getAndShowDefinition (word) {
  // go through the dictionary and search by key
  for (var key in dictionary){
    if (key === word.toUpperCase()) {
      definition = dictionary[key];
    }
  }
  clear();
  var $definition = $('<li class="definition"></li>');   
  $definition.text(definition); 
  $definition.appendTo($listContainer);
}

// get the list item that was clicked
// set the input bar to have the text of the list item that was clicked
// fire the lookup definition button 
$('.panel-footer').on('click', '.listItem', function(e) {  
  var searchElem = $(this).text();
  inputBar.val(searchElem);  
  clear();
  getAndShowDefinition(searchElem);
});


