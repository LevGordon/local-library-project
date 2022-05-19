function findAuthorById(authors, ID) {
  return authors.find((author) => author.id === ID);
  // iterate through authors to access each author individually, check if their id is the one a user is looking for
}

function findBookById(books, ID) {
  return books.find((book) => book.id === ID);
  // iterate through books to access each book individually, check if their id is the one a user is looking for
}

function partitionBooksByBorrowedStatus(books) {
  let returned = books.filter((book) => book.borrows[0].returned);
  // iterate though books to access each book individually, filter all of the books that have been returned
  // we know a book is returned by the first set of data of books[book].borrows.returned equalling to true
  let checkedOut = books.filter((book) => book.borrows[0].returned === false);
  // iterate though books to access each book individually, filter all of the books that have NOT been returned
  // we know a book is returned by the first set of data of books[book].borrows.returned equalling to false
  return [checkedOut, returned];
  // return an array with the checked out and returned in the desired order
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  // declare the return array
  for (let i = 0; i < book.borrows.length; i++) {
    // iterate though book.borrows to access each "transaction / borrow log"
    let transaction = book.borrows[i];
    // declared variable to ease future syntax
    let borrowerAcc = accounts.find((account) => transaction.id === account.id);
    // .find to iterate through the accounts to access each individual account
    // find the account by checking if their ID equals to the one in the transaction
    borrowerAcc.returned = transaction.returned;
    // change the value of .returned in the borrowers account
    if (result.length < 10) {
      result.push(borrowerAcc);
      // push the borrower account into the return array
      // if statement limits the length of the array to 10 (could be done with .splice(0,10) in the return statement)
    }
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
