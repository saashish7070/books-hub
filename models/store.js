const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
 storeName: {type: String, required: true},
 ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
 location: {type: String, required: true},
 range: {type: String, require: true},
 about: {type: String},
 status: {type: String},
 rate: {type: Number,default: 0},
 storePicture: {type:String},
 contact: {type: Number, required: true},   
 websiteUrl:{type: String}, 
 booksId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
 date: {type: Date},
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
