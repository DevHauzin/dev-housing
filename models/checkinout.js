var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkInOutSchema = new Schema ({
checkIn: [
  {
    date: {type: Date, required: true},
    user: {Schema.Types.ObjectId, ref: 'Users'},
    unit: {type: String, required: true},
    room: {type: String, required: true},
    campus: {type: String, required: true}
  }
],
checkOut: [
  {
    date: {type: Date, required: true},
    length: {type: Number, required: true, default: 15},
    user: {Schema.Types.ObjectId, ref: 'Users'},
    unit: {type: String, required: true},
    room: {type: String, required: true},
    campus: {type: String, required: true}
  }
]

})

module.exports = mongoose.model('CheckInOut', checkInOutSchema)
