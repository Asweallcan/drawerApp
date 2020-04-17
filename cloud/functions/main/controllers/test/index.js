const cloud = require('wx-server-sdk')

module.exports = async function (ctx, next) {
  await next();

  console.log(ctx.req);

  ctx.body = {
    test: "asdasdasd",
    params: ctx._req.event.test
  }
}