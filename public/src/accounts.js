function findAccountById (accounts, id) {
  //use find to locate accounts that hjave an id key:value that matches
  //the id paramater and return it
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName (accounts) {
  //sorts accounts by last name in alphabetical order
  
  return accounts.sort((a,b)=>
  a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1:1);
 
}

function getTotalNumberOfBorrows (account, books) {
  //using reduce i am adding the result of a filter method to
  //that checks to see if the id in the borrows array of objects within the 
  //books array matches the id within the accounts array of objects adds 
  //them up and returns the total at the end using 
  
  return books.reduce((acc,book)=> 
  acc += book.borrows.filter((borrow) =>
  borrow.id === account.id).length,0);
}

function getBooksPossessedByAccount (account, books, authors) {
  //filtering books that have not been returned by 
  //those that have matching Id values
  let possess = books.filter((book)=> {
    const recent = book.borrows[0];
    return !recent.returned && recent.id === account.id;
})
/*map method is used below to find matching author id's setting 
them to a variable which is then returned along with the filtered 
array from above*/
let dad = possess.map((book)=>{
 const author = authors.find((author)=> author.id === book.authorId)
 return {...book,author}
})
console.log(dad)
return dad;

}







module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
