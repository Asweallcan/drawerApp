module.exports = (ctx) => {
  const {
    _req: {
      event
    }
  } = ctx;
  const data = {
    ...event
  };
  delete data.$url;
  return data;
}