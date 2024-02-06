const express = require('express');
const app = express();
const mongoose = require('mongoose');
const quiz = require('./model/QuizDB');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const url = "mongodb://0.0.0.0:27017/projects";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((err) => {
        console.log('Error in connecting mongoose : ', err);
    });
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const quizzes = await quiz.find({_id: id});
    res.send(quizzes);
})
app.get('', async (req, res) => {
    try {
        const quizzes = await quiz.find();
        res.send(quizzes);
    } catch (error) {
        console.log('Error in finding the quizzes: ', error);
    }
});
app.post('', async (req, res) => {
    try {
        const newQuiz = new quiz(req.body);
        await newQuiz.save();
        res.send('success');
    } catch (error) {
        res.send('error');
    }
})
app.listen(4000, () => console.log('Server is listening at 4000...'));