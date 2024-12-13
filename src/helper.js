const generateResponse = {
    success: ({ message, data }) => {
        return {
            status: "success",
            message,
            data,
        };
    },
    fail: ({ message }) => {
        return {
            status: "fail",
            message,
        };
    },
};

module.exports = { generateResponse };
