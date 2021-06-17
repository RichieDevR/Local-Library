
function findAuthorById(authors, id) {
    return authors.find((author) => author.id === id)
}


function findBookById(books, id){
    return books.find((book)=> book.id === id)
    
}

function partitionBooksByBorrowedStatus(books) {
  let sort1 = books.filter((book)=>!book.borrows[0].returned);
  let sort2 = books.filter((book)=>book.borrows[0].returned);
  let answer = [];
  answer.push(sort1);
  answer.push(sort2);
  return answer;


}

function getBorrowersForBook(book, accounts) {
 
  const borrowers = book.borrows.map((borrow)=>{
    const account = accounts.find((account)=>account.id === borrow.id);
    account.returned = borrow.returned;
    return account;
  });
 
  
  return borrowers.slice(0,10);



}

function sortObjectByValues(obj){
        const keys = Object.keys(obj);
        return keys.sort((keyA,keyB) => {
          if(obj[keyA] > obj[keyB]){
              return -1;
            }else if(obj[keyB] > obj[keyA]){
            return 1;
              }else{
            return 0;
            }
        })}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
