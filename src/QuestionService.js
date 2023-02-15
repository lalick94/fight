import axios from 'axios';

class QuestionService {
    static getQuizQuestions(category) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/quiz/category/' + category, {
                headers: {
                    token
                }
            }).then((res) => {
                const data = res.data;
                resolve(
                    data
                );
            })
                .catch((err) => {
                    reject(err);
                })

        });
    }
    static getCustomAnswer(questionId) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/quiz/customAnswer?questionId=${questionId}`, {
                headers: {
                    token
                }
            }).then((res) => {
                const data = res.data;
                resolve(
                    data
                );
            })
                .catch((err) => {
                    reject(err);
                })

        });
    }
}


export default QuestionService;