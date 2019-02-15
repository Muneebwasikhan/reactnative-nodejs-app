exports = module.exports = function (app, mongoose) {
    require('./user')(app, mongoose);
    require('./regStudents')(app, mongoose);
}