exports = module.exports = function (app, mongoose) {
  require("./User")(app, mongoose)
  require("./services")(app, mongoose)
  require("./chat")(app, mongoose)
  require("./messages")(app, mongoose)
}