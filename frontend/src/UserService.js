import axios from 'axios';

class UserService {
    static login(req) {
        return new Promise ((resolve,reject) => {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/user/login`, req).then((res) => {
                const data = res.data;
                resolve(
                    data
                );
            })
                .catch((err)=> {
                    reject(err);
                })

        });
    }
    static getScore() {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise ((resolve,reject) => {
            axios.get(`${process.env.VUE_APP_BACKEND_URL}/user/score`, {
                headers: {
                    token
                }
            }).then((res) => {
                const data = res.data;
                resolve(
                    data
                );
            })
                .catch((err)=> {
                    reject(err);
                })

        });
    }
    static logout(req) {
        const {token} = JSON.parse(localStorage.getItem("token"));
        return new Promise ((resolve,reject) => {
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/user/logout`, req, {
                headers: {
                    token
                }
            }).then((res) => {
                const data = res.data;
                resolve(
                    data
                );
            })
                .catch((err)=> {
                    reject(err);
                })

        });
    }
}

export default UserService;