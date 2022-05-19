function getTotalBooksCount(books) {
  return books.length;
}
// since books is an array of objects, with each individual object being one book - the length of the array is the amount.

function getTotalAccountsCount(accounts) {
  return accounts.length;
}
// authors is also an array, so same logic applies.

function getBooksBorrowedCount(books) {
  return books.reduce((result, book) => {
    // we want to iterate through all of the books and accumulate a sum, therefore we use reduce.
    for (let i = 0; i < book.borrows.length; i++) {
      // with the help of .reduce, we can access each book's keys.
      // since books[book].borrows is an array with objects, we need to iterate through this array to access each object.
      if (book.borrows[i].returned === false) {
        // if the book is currently borrowed - it won't be returned, so we put that as our conditional statement.
        result += 1;
        // we add +1 to the accumulated count.
      }
    }
    return result;
    // return result for the .reduce arrow function
  }, 0);
}

function getMostCommonGenres(books) {
  let countGenres = books.reduce((total, book) => {
    // we use .reduce in order to get access to each individual book object and accumulate the total count of genres
    let valueFind = total.find((indKey) => book.genre === indKey.name);
    // use .find to find if the genre is identical to the name key that we declare later in order to NOT repeat
    if (valueFind) {
      valueFind.count++;
      // if previously declared valueFind has a value of that genre, we increase the count by one
    } else {
      total.push({ name: book.genre, count: 1 });
      // if not - we add that value
    }
    let list = total.sort((a, b) => (a.count < b.count ? 1 : -1));
    // .sort to sort in popularity, using the count as a parameter
    return list;
    // return the value of countGenres
  }, []);

  return countGenres.splice(0, 5);
  // limit the return array to 5
}

function getMostPopularBooks(books) {
  let mostPopularBooks = [];
  // declare an enmpty return array
  for (let i = 0; i < books.length; i++) {
    // iterate through the books array to access each book individually
    let book = books[i];
    let bookB = books[i].borrows;
    // declared 2 variables to ease future syntax
    if (bookB) {
      mostPopularBooks.push({ name: book.title, count: bookB.length });
      //Count is equal to the length of the borrows array
      // if book[i].borrows has a value - the empty array gets the desired output pushed into it.
      let list = mostPopularBooks.sort((a, b) => (a.count < b.count ? 1 : -1));
      // sort the return array by popularity
    }
  }
  return mostPopularBooks.splice(0, 5);
  // limit the output array to 5
}

function getMostPopularAuthors(books, authors) {
  let mostPopularAuthors = [];
  // declare an enmpty return array
  for (let i = 0; i < books.length; i++) {
    // iterate through the books array to access each book individually
    let book = books[i];
    let bookB = books[i].borrows;
    let authorCount = 0;
    // declared 2 variables to ease future syntax and declared an author count to track their popularity

    for (let j = 0; j < authors.length; j++) {
      // start a second iteration, this time through authors to get access to each individual author
      let author = authors[j];
      let authorID = authors[j].id;
      // declared 2 variables to ease future syntax
      if (authorID === book.authorId) {
        // if the author is the one who wrote the book
        authorCount += bookB.length;
        // add the length of books[book].borrows (amount of borrows) to this specific author's count
        let currentAuthorName = `${author.name.first} ${author.name.last}`;
        // declared the name of the author to ease syntax for later, used a template literal to combine two variables into 1 string
        mostPopularAuthors.push({
          name: currentAuthorName,
          count: authorCount,
        });
        // push the desired format object into the initially declared array
      }
    }
  }
  let list = mostPopularAuthors.sort((a, b) => (a.count < b.count ? 1 : -1));
  // once all of the iterations are complete, sort the list by popularity (count)
  return mostPopularAuthors.splice(0, 5);
  // limit the return array to 5 objects
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
