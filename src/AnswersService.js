import axios from 'axios';

class AnswersService {
    static getQuizAnswers(req) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/quiz/check', req, {
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
    static getComicAnswers(req) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:3000/comic/check', req).then((res) => {
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
    static getAusfuellenAnswers(req) {
        return new Promise((resolve, reject) => {
            axios.post('http://10.0.0.197:3000/ausfuellen/check', req).then((res) => {
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
    static getErinnerungAlarmAnswers(req) {
        return new Promise((resolve, reject) => {
            axios.post('http://10.0.0.197:3000/erinnerungalarm/check', req).then((res) => {
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
    static getZuzuordnen1Answers(req) {
        return new Promise((resolve, reject) => {
            axios.post('http://10.0.0.197:3000/zuzuordnen1/check', req).then((res) => {
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
    static getZuzuordnen2Answers(req) {
        return new Promise((resolve, reject) => {
            axios.post('http://10.0.0.197:3000/zuzuordnen2/check', req).then((res) => {
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
export default AnswersService;