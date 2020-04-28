const response = ({ message = "", code = 0, data = null } = {}) => {
  return {
    message,
    code,
    data,
  };
};

response.Error = (message) => {
  return {
    message,
    code: -1,
    data: null,
  };
};

module.exports = response;
