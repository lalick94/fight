<template>
<div class="test">
  <div id="login" style="text-align: center;">
 <div class="login-field">
    <div class="user-input">
      <div class="col">
        <p><b>Username:</b></p>
      <input class="l-input" v-model="username" placeholder="" />
      </div>
      <div class="col" style="padding-top: 20px;">
      <p style="padding-right: 20px;"><b>Password:</b></p>
      <input class="l-input" v-model="password" placeholder="" />
      <div style="padding-top: 20px;">
      </div>
        <button id="myButton" class="blogin" @click="login">Login</button>
      </div>
    </div>
    </div>
    <div id="error">
      <Error
          v-show="isErrorVisible"
          @close="closeError"
      ></Error>
    </div>
  </div>
</div>
</template>
<script >
import Error from '@/components/Error.vue';
import UserService from "@/UserService";

export default {
  name: 'Login',
  components: {
Error
  },
  data() {
    return {
      username: '',
      password: '',
      isErrorVisible:  false,
    };
  },
  methods: {
    async login() {
      try {
        const token = await UserService.login({
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', JSON.stringify(token));
        await this.$router.push({
          path:'/menu',
          params: {

          },
          query: {
          }
        });
      } catch(err){
        this.isErrorVisible=true;
      }
    },
    showError() {
      this.isErrorVisible = true;
    },
    closeError() {
      this.isErrorVisible = false;
    },
  }
}
</script>
<style scoped>
.test{
  width: 100%;
  height: 100vh;
}
#login {
  background-image: url('../../public/images/assets/login.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  -webkit-background-size: cover;
  background-size: cover;
  height:100%;
  width:100%;
  margin: 0 auto;
}

.login-field{
  padding-top: 200px;
  padding-left: 90px;
}

.user-input{
  margin: 0 auto;
  width: 400px;
  box-shadow: 1px 1px 2px black, 0 0 25px grey, 0 0 5px black;
  padding: 40px;
  border-radius:10px;
}
p{
  color: black;
}

input{
  width: 250px;
  height: 35px;
  background-color: #E8E8E8;
  border: 4px solid black;
}
.l-input{
  border-radius:10px;

}
button{
  background-color:black;
  border: none;
  color: lightyellow;
  padding: 7px 24px;;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight : bold;
  margin: 4px 2px;
  cursor: pointer;
  font-family: Arial;

}
.blogin {
  border-radius: 4px;
}
p{
  display: inline-block;
  width: 150px;
  text-align: right;
  padding-right: 20px;
  font-size: 20px;
  font-family: Arial
}
@media (max-width: 896px) {
  #login {
    background-image: url('../../public/images/assets/loginIPadthirdfourthGen.PNG');
    width: 820px;

  }
  .login-field{
    padding-top: 400px;
    padding-left: 20px;
  }
}
@media (max-width: 768px) {
  #login {
    height: 1060px;

  }
  .login-field{
    padding-top: 390px;
    padding-left: 20px;
  }
}
@media (max-width: 414px) {
  #login {
    height: 896px;
    width: 100%;
  }
  .login-field{
    padding-top: 165px;
    padding-left: 0px;
  }
  .user-input{
    width: 335px;
    padding: 26px;

  }

}
@media (max-width: 414px) {
  #login {
    background-image: url('../../public/images/assets/loginIPhoneXR-XSMax.PNG');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center top;
    height: 896px;
    width: 414px;
  }
  .login-field{
    padding-top: 69px;
    padding-left: 0px;
  }
  .login-field{
    padding-top: 288px;
    padding-left: 0px;
  }
  .user-input{
    width: 290px;
    padding: 19px;
  }
  input{
    width: 209px;
    height: 35px;
  }
}
@media (max-width: 375px) {
  #login {
    background-image: url('../../public/images/assets/loginX.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center top;
    height: 667px;
    width: 375px;
  }
  .login-field{
    padding-top: 69px;
    padding-left: 0px;
  }
  .user-input{
    width: 290px;
    padding: 19px;
  }
  input{
    width: 209px;
    height: 35px;
  }
}
@media (max-width: 360px) {
  #login {
    height: 740px;
    width: 360px;
  }
  .login-field {
    padding-top: 140px;
    padding-left: 0px;
  }
}
</style>

