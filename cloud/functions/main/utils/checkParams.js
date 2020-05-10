const checkParams = (obj, keys) => {
  return keys.every((key) => (obj || {})[key] !== undefined);
};

module.exports = checkParams;
