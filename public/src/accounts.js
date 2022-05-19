const { findAuthorById } = require("./books");
// this is to use a helper function from ./books.js

function findAccountById(accounts, ID) {
  let found = accounts.find((account) => account.id === ID);
  // iterate through accounts to access each account, check if the iterated account's ID is identical to the entered parameter ID.
  return found;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort(
    (accA, accB) =>
      // sort through the accounts to return the same list but ordered by last name
      accA.name.last.toUpperCase() > accB.name.last.toUpperCase() ? 1 : -1
    // accA.name.last to get each accounts last name, change everything to the same case (lower or upper)
    // as long as each last name is in the same case - they can be sorted fairly
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  // declare return variable
  for (let i = 0; i < books.length; i++) {
    // iterate through books to access each individual book
    let book = books[i];
    let bookB = books[i].borrows;
    // declared 2 variables to ease future syntax

    total = bookB.reduce((acc, indStat) => {
      // iterate through the books[book].borrows array to access each individual borrow log
      return indStat.id === account.id ? (total += 1) : (total += 0);
      // if each borrow's id (person who borrowed) if equal to account id - up count by 1, if not - no changes
    }, 0);
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let desBooks = [];
  // declare return variable
  desBooks = books.filter((book) => {
    // iterate through books to access each individual book
    let borrowedBooks = book.borrows;
    // declared variable to ease future syntax
    return borrowedBooks.some(
      (borrow) => borrow.returned == false && borrow.id === account.id
    );
    // .some to iterate through each borrow log to check if the book is in the persons possesion
  });

  desBooks = desBooks.map((book) => {
    let author = findAuthorById(authors, book.authorId);
    // use a helper function from ./books.js to find author by ID, using the parameters from this function

    let result = { ...book, author };
    // declared the result variable to return and update the value of desBooks
    return result;
  });
  return desBooks;
  // return the initial (changed) variable
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
