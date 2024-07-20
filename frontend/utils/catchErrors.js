// utils/catchErrors.js

/**
 * Function to catch errors during asynchronous operations.
 * @param {Error} error The error object that was caught.
 * @param {Function} setError Function to set the error message in state.
 */
function catchErrors(error, setError) {
    let errorMsg;

    if (error.response) {
        // The request was made and the server responded with a status code
        // that is not in the range of 2xx
        errorMsg = error.response.data;
        console.error("Error response", errorMsg);

        // For example, getting the actual error message if it is sent from a backend API
        if (error.response.data.error) {
            errorMsg = error.response.data.error;
        }
    } else if (error.request) {
        // The request was made but no response was received
        errorMsg = error.request;
        console.error("Error request", errorMsg);
    } else {
        // Something happened in setting up the request and triggered an Error
        errorMsg = error.message;
        console.error("Error message", errorMsg);
    }

    setError(errorMsg);
}

export default catchErrors;
