/*This is a helper function used to sort Objects by values which i am using 
in the get most common genres function*/
function sortObjectByValues (obj) {
  const keys = Object.keys (obj);
  return keys.sort ((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}


/*returning the length of the books array 
to represent the total number of books*/
function getTotalBooksCount (books) {
  return books.length;
}
/*same as above only using the accounts array in this case*/
function getTotalAccountsCount (accounts) {
  return accounts.length;
}

/* using the filter method to return any books that have not been returned
then counting the length of the return value can also be completed using
destructuring to represent the books array by its values 
Ex: 'return books.filter(({borrows}) => !borrows[0].returned).length;*/ 
function getBooksBorrowedCount (books) {
  return books.filter(book => !book.borrows[0].returned).length;
}

function getMostCommonGenres (books) {
  //reducing the books array of objects to an object containing a genre
  //and the number of times that genre appears within the books array
  const count = books.reduce ((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

//sorting the new object count
  const sorted = sortObjectByValues (count);
  //using map to create an array of objects that contains the top 5 genres 
  //each being an object containing the genre as a value of a key 
  //called "name" and the key count set to have a value equal to the toal number of times
  //that genre appears 
  return sorted.map (name => ({name, count: count[name]})).slice (0, 5);
}





function getMostPopularBooks (books) {
  /*using map to create an array of objects 
  containing the book title and the number of times it was borrowed
  (in other words borrows.length) 
  also using destructuring to call the title key value and borrows array 
  from books*/
  const mapArr = books.map(({title, borrows}) => ({
    name: title,
    count: borrows.length,
  }));

  //sorting mapArr from highest to lowest

  const sortArr = mapArr.sort((book1, book2) => book2.count - book1.count);
//returning first 5 items in the new sortArr array 
  return sortArr.slice(0, 5);
}

function getMostPopularAuthors (books, authors) {
  /*using reduce to create an object containing the authorId as a key with 
  a value set to an array containing the length of the borrows array 
  for each time a book appears in the books array*/

  const count = books.reduce((acc, {authorId, borrows}) => {
    /*code below says if authorId appears in the accumulator then
    push the length of that objects borrow array into the accumulator.*/ 
    /*if its only seen once then set accumulator(authorId) 
    equal to the length of the lone borrows array */
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc
  }, {});
  /*loop through count and use reduce to output the value of each key 
  within the count object created above*/  
  for (let id in count) {
    const sum = count[id].reduce((acc,b) =>acc+b);
    count[id] = sum;
  }
  //sort count
  const sorted = sortObjectByValues(count)
  /*use map to set every name object within the objects inside
  of the authors array = only to those that match the authorId within the 
  objects contained by the books array then create a new object containing 
  the name object from the matching authors and a new key value pair containing the 
  number of times that author appears*/
  let arr = sorted.map((authorId) => {
    const {name:{first, last}} = authors.find(({id}) => id === Number(authorId));
      let name = `${first} ${last}`;
    return {name, count:count[authorId]}
  }).slice(0,5);
  /*the slice method in this case outputs every object in the new array 
  from the index [0] to index [5] and the whole thing is returned below*/
  return arr;

}




module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
