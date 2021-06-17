function findAccountById (accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName (accounts) {
  return accounts.sort((a,b)=>
  a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1:1);
 
}

function getTotalNumberOfBorrows (account, books) {
  return books.reduce((acc,book)=> 
  acc += book.borrows.filter((borrow) =>
  borrow.id === account.id).length,0);
}

function getBooksPossessedByAccount (account, books, authors) {
   return books.filter((book)=> {
     const recent = book.borrows[0];
     return !recent.returned && recent.id === account.id;
}).map((book)=>{
  const author = authors.find((author)=> author.id === book.authorId)
  return {...book,author}
})
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
