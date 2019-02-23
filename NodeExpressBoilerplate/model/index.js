exports = module.exports = function (app, mongoose) {
  require("./user")(app, mongoose)
  require("./services")(app, mongoose)
  require("./chat")(app, mongoose)
  require("./messages")(app, mongoose)
  require("./category")(app, mongoose)
}