const createResponse = (status, message, data = null, errors = null) => {
    return {
        status,
        message,
        data,
        errors,
    };
};

module.exports = createResponse;