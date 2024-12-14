const { BooksService } = require("./books");
const { generateResponse } = require("./helper");
const { nanoid } = require("nanoid");

const Handler = {
    createBook: (request, h) => {
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
        if (!name) {
            const response = h.response(
                generateResponse.fail({ message: "Gagal menambahkan buku. Mohon isi nama buku" })
            );
            response.code(400);
            return response;
        }
        if (readPage > pageCount) {
            const response = h.response(
                generateResponse.fail({
                    message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
                })
            );
            response.code(400);
            return response;
        }
        const createdAt = new Date().toISOString();
        const bookId = nanoid(16);
        const newBook = {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            id: bookId,
            finished: pageCount === readPage,
            insertedAt: createdAt,
            updatedAt: createdAt,
        };
        BooksService.addBooks(newBook);
        const isSuccess = BooksService.getBookById(bookId);
        if (!isSuccess) {
            const response = h.response(
                generateResponse.fail({
                    message: "Buku gagal ditambahkan",
                })
            );
            response.code(500);
            return response;
        }
        const response = h.response(
            generateResponse.success({
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId,
                },
            })
        );
        response.code(201);
        return response;
    },
    getAllBooks: (request, h) => {
        const { name, reading, finished } = request.query;
        let books = BooksService.getAllbooks();
        if (name) {
            books = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (reading !== undefined) {
            books = books.filter((book) => book.reading === !!parseInt(reading));
        }
        if (finished !== undefined) {
            console.log(books, "woy");
            books = books.filter((book) => book.finished === !!parseInt(finished));
        }
        const response = h.response(
            generateResponse.success({
                data: { books: books.map(({ id, name, publisher }) => ({ id, name, publisher })) },
            })
        );
        response.code(200);
        return response;
    },
    getBookById: (request, h) => {
        const { bookId } = request.params;
        const book = BooksService.getBookById(bookId);
        if (!book) {
            const response = h.response(generateResponse.fail({ message: "Buku tidak ditemukan" }));
            response.code(404);
            return response;
        }
        const response = h.response(generateResponse.success({ data: { book } }));
        response.code(200);
        return response;
    },
    editBookById: (request, h) => {
        const { bookId } = request.params;
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
        if (!name) {
            const response = h.response(
                generateResponse.fail({ message: "Gagal memperbarui buku. Mohon isi nama buku" })
            );
            response.code(400);
            return response;
        }
        if (readPage > pageCount) {
            const response = h.response(
                generateResponse.fail({
                    message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
                })
            );
            response.code(400);
            return response;
        }
        const book = BooksService.getBookById(bookId);
        if (!book) {
            const response = h.response(
                generateResponse.fail({
                    message: "Gagal memperbarui buku. Id tidak ditemukan",
                })
            );
            response.code(404);
            return response;
        }
        const newData = {
            ...book,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt: new Date().toISOString(),
        };
        BooksService.updateBookById(bookId, newData);
        const response = h.response(
            generateResponse.success({
                message: "Buku berhasil diperbarui",
            })
        );
        response.code(200);
        return response;
    },
    deleteBookById: (request, h) => {
        const { bookId } = request.params;
        const book = BooksService.getBookById(bookId);
        if (!book) {
            const response = h.response(
                generateResponse.fail({
                    message: "Buku gagal dihapus. Id tidak ditemukan",
                })
            );
            response.code(404);
            return response;
        }
        BooksService.deleteBook(bookId);
        const response = h.response(
            generateResponse.success({
                message: "Buku berhasil dihapus",
            })
        );
        response.code(200);
        return response;
    },
};

module.exports = Handler;
