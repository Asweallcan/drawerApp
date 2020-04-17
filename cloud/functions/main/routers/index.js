const controllers = require("../controllers");

module.exports = function (app) {
  app.use("test", controllers.test)
}