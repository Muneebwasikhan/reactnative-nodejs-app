exports = module.exports = function (app, mongoose) {
  require("./users")(app, mongoose)
  require("./updateData")(app, mongoose)
  require("./services")(app, mongoose)
  require("./chat")(app, mongoose)
  require("./adminAuth")(app, mongoose)
  require("./adminUser")(app, mongoose)
}