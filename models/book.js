const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  categories: {type: String},
  price: { type: Number, required: true },
  newPrice: { type: Number },
  bookPicture: { type: String, required: true },
  status: { type: String, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User' },
  bookStore: { type: Schema.Types.ObjectId, ref: 'Store' },
  checkout: { type: Boolean, default: false },
  soldOut: { type: Boolean, default: false },
  stock : {type: Boolean, default: true},
  timeStamp: { type: Date },
});

// bookSchema.pre('save', async function (next) {
//   if (this.isModified('booked') && this.booked) {
//     this.timeStamp = new Date();
//     const fifteenMinutes = 15 * 60 *60 * 1000; // 15 minutes in milliseconds

//     await new Promise((resolve) => setTimeout(resolve, fifteenMinutes));

//     if (!this.checkout) {
//       this.booked = false;
//       this.timeStamp = undefined;
//       this.buyerId = null;
//       await this.save(); // Save the updated document
//     }
//   }
//   next();
// });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
