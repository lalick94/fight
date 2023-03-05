import axios from 'axios';

class UserService {
    static login(req) {
        return new Promise ((resolve,reject) => {
            axios.post('http://localhost:3000/user/login', req).then((res) => {
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
            axios.get('http://localhost:3000/user/score', {
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
            axios.post('http://localhost:3000/user/logout', req, {
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