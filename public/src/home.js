function getTotalBooksCount (books) {
  return books.length;
}

function getTotalAccountsCount (accounts) {
  return accounts.length;
}

function getBooksBorrowedCount (books) {
  return books.filter (book => !book.borrows[0].returned).length;
}

function getMostCommonGenres (books) {
  const count = books.reduce ((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sorted = sortObjectByValues (count);
  return sorted.map (name => ({name, count: count[name]})).slice (0, 5);
}

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

function getLength (item) {
  return item.length;
}

function getMostPopularBooks (books) {
  const mapArr = books.map(({title, borrows}) => ({
    name: title,
    count: borrows.length,
  }));

  const sortArr = mapArr.sort((book1, book2) => book2.count - book1.count);

  return sortArr.slice(0, 5);
}

function getMostPopularAuthors (books, authors) {
  const count = books.reduce((acc, {authorId, borrows}) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc
  }, {});
  for (let id in count) {
    const sum = count[id].reduce((acc,b) =>acc+b);
    count[id] = sum;
  }
  const sorted = sortObjectByValues(count)
  let arr = sorted.map((authorId) => {
    const {name:{first, last}} = authors.find(({id}) => id === Number(authorId));
      let name = `${first} ${last}`;
    return {name, count:count[authorId]}
  }).slice(0,5);
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
