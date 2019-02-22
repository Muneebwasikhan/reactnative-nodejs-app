exports = module.exports = function(app, mongoose) {
  require("./users")(app, mongoose)
  require("./updateData")(app, mongoose)
  require("./service")(app, mongoose)
  require("./chat")(app,mongoose)
}
