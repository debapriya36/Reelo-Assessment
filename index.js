const fs = require('fs');

class QuestionPaperGenerator {

    constructor(questionStorePath) {
        this.questionStorePath = questionStorePath;
        this.questions = JSON.parse(fs.readFileSync(this.questionStorePath));
    }


    filterQuestionsByDifficulty(difficulty) {
        return this.questions.filter(question => question.difficulty === difficulty);
    }


    generate(totalMarks = 100, distribution = { Easy: 25, Medium: 45, Hard: 30 }, topic = "") {
        const questionPaper = [];

        for (const [difficulty, percentage] of Object.entries(distribution)) {
            const difficultyWiseQuestions = this.filterQuestionsByDifficulty(difficulty);
            const difficultyBasedMarks = (totalMarks * percentage) / 100;
            let marks = 0;
            difficultyWiseQuestions.map((question) => {
                if (marks + question.marks <= difficultyBasedMarks && (topic === "" || (topic !== "" && question.topic === topic))) {
                    marks += question.marks;
                    questionPaper.push(question);
                }
            });
        }
        return questionPaper;
    }

}

//********************** Usage example ***************************************/
const questionPaperGenerator = new QuestionPaperGenerator('questionStore.json');
const questionPaper = questionPaperGenerator.generate(80, { Easy: 20, Medium: 30, Hard: 50 });
console.log(questionPaper); // For example purpose only


module.exports = questionPaperGenerator;