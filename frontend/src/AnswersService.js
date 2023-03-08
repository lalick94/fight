import axios from 'axios';

class AnswersService {
    static getQuizAnswers(req) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/quiz/check`, req, {
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/comic/check`, req).then((res) => {
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/ausfuellen/check`, req).then((res) => {
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/erinnerungalarm/check`, req).then((res) => {
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/zuzuordnen1/check`, req).then((res) => {
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
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/zuzuordnen2/check`, req).then((res) => {
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