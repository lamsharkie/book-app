DROP TABLE IF EXISTS books;

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  authors VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  imageurl VARCHAR(255),
  description text(255),
  bookshelf VARCHAR(255)
);

INSERT INTO books(authors, title, isbn, imageurl, description, bookshelf) VALUES('John Grisham','The Firm', '', 'https://books.google.com/books/content?id=qFV6Th-pDiYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Mitch McDeere, a Harvard Law graduate, becomes suspicious of his Memphis tax firm when mysterious deaths, obsessive office security, and the Chicago mob figure into its operations', 'crime dramas');

INSERT INTO books(authors, title, isbn, imageurl, description, bookshelf) VALUES('John Grisham','The Firm', '', 'https://books.google.com/books/content?id=qFV6Th-pDiYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Mitch McDeere, a Harvard Law graduate, becomes suspicious of his Memphis tax firm when mysterious deaths, obsessive office security, and the Chicago mob figure into its operations', 'crime dramas');

SELECT * FROM books;