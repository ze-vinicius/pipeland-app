export default {
  handleResponseError(error: any) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;

    const errorStatus = error.status || error.response.status;

    return {
      message: errorMessage,
      status: errorStatus,
    };
  },
};
