function retreiveMeaning(word){
  var meaning;

  // go through the dictionary and search by key
  for (var key in dictionary){
    if (key === word.toUpperCase()) {
      meaning = dictionary[key];
    }
  }

  return meaning;
}