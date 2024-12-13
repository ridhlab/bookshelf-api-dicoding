const Handler = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: Handler.createBook,
    },
    {
        method: "GET",
        path: "/books",
        handler: Handler.getAllBooks,
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: Handler.getBookById,
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: Handler.editBookById,
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: Handler.deleteBookById,
    },
];

module.exports = routes;
