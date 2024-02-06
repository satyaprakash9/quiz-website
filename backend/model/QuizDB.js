const mongoose = require('mongoose');
const schema = mongoose.Schema({
    ques: Array,
    ans: Array,
    options: Array,
    choice: Array,
    title: String,
    description: String
});
const quiz = mongoose.model('quizzes', schema);
module.exports = quiz;