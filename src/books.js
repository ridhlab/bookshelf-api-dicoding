const books = [];

const BooksService = {
    addBooks: (dataBook) => {
        books.push(dataBook);
    },
    getAllbooks: () => {
        return books;
    },
    getBookById: (id) => {
        return books.find((book) => book.id === id);
    },
    updateBookById: (id, newData) => {
        const indexBook = books.findIndex((book) => book.id === id);
        books[indexBook] = { ...books[indexBook], ...newData };
    },
    deleteBook: (id) => {
        const indexBook = books.findIndex((book) => book.id === id);
        books.splice(indexBook, 1);
    },
};

module.exports = { books, BooksService };
