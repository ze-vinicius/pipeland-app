export default {
  generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },
  handleResponseError(error: any) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data.message
        : error.message;

    const errorStatus =
      error.status || (error.response && error.response.status) || 400;

    return {
      message: errorMessage,
      status: errorStatus,
    };
  },
};
