exports = module.exports = function(app, mongoose) {
  // 'use strict';a

  var Schema = mongoose.Schema

  var Services = new Schema({
    title: {
      type: String
    },
    imageUrl: {
      type: String
    },
    user_id: {
      type: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    discription: {
      type: String
    },
    amount: {
      type: String
    },
    category: {
      type: String
    }
  })

  app.db.model("Services", Services)
}
