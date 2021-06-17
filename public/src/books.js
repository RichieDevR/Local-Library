
/* using the find method to output author whos id is equal to the id paramater
passed into the function*/
function findAuthorById(authors, id) {
    return authors.find((author) => author.id === id)
}

/*does the same as above using the books array instead
and this time matching the id parameter in this case of a book
to the matching id key:value pair in the books array*/
function findBookById(books, id){
    return books.find((book)=> book.id === id)
    
}

function partitionBooksByBorrowedStatus(books) {
  //filter all objects that have not been returned 
  let filterA = books.filter((book)=>!book.borrows[0].returned);
  //filter all items that have been returned
  let filterB = books.filter((book)=>book.borrows[0].returned);
  //set answer to empty array
  let answer = [];
  /*push both filters to answer so that books borrowed not yet 
  returned appear first and books returned 
  appear second and then return*/
  answer.push(filterA);
  answer.push(filterB);
  return answer;


}

function getBorrowersForBook(book, accounts) {
 //mapping borrows array in the books array by 
 //taking all account id's and
 //comparing them to id's within the borrows array and then 
 //setting that equal to a variable which is then updated with the returned 
 //array we just found, we then return borrowers variable sliced by the first 10 
 //of the array
  const borrowers = book.borrows.map((borrow)=>{
    const account = accounts.find((account)=>account.id === borrow.id);
    account.returned = borrow.returned;
    return account;
  });
 
  
  return borrowers.slice(0,10);



}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
