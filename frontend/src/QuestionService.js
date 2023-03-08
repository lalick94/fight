import axios from 'axios';

class QuestionService {
    static getQuizQuestions(category) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/quiz/category/${category}`, {
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
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/quiz/customAnswer?questionId=${questionId}`, {
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