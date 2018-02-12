const mongoose = require('mongoose');
const { Schema } = mongoose;

// const val = new Schema({
//   first: {
//     type: Schema.Types.ObjectId,
//     ref: "First"
//   }
// });

const questionSchema = new Schema({
  category: String,
  order: Number,
  question: {
    type: String,
    required: true
  },
  answer: String,
  one: String,
  two: String,
  three: String,
});

module.exports = mongoose.model('First', questionSchema)


// const mainSchema = new Schema({
//   Title: {
//     First: {
//       question: String,
//       answer: String,
//       one: String,
//       two: String,
//       three: String
//     }
//     // ,
//     // 2: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 3: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 4: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 5: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 6: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 7: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 8: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 9: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // },
//     // 10: {
//     //   question: String,
//     //   answer: String,
//     //   1: String,
//     //   2: String,
//     //   3: String
//     // }
//   }
//   // whenever a schema gets saved to the DB if we look up the _user property we'll see an ID assigned to the _user which will be the ID of whoever owns this record
//   // ref is.. the reference that were making ID to belongs to the 'User' collection
// });

// load to mongoose library
// mongoose.model('questions', questionSchema);

// file is in server.js