var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TestSchema = new Schema({
    script: { type: String, default: '' },
    history: {
        createTime: { type: Date, default: new Date() },
        updateTime: { type: Date, default: new Date() }
    },
    status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Test', TestSchema);