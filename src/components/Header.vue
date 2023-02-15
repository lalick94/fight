<template>
  <div class="header">
    <i class='fas fa-align-justify' @click="showToolbar" ></i>
    <i class='fas fa-bell' @click="showAlert" :style="getColor"></i>
    <div id="modal">
      <Alert
          v-show="isAlertVisible"
          @close="closeAlert"
      ></Alert>
      <Toolbar
          v-show="isToolbarVisible"
          @close="closeToolbar"
      >
      </Toolbar>
    </div>
  </div>
    <div class="sign_out">
      <button class="sign_out_button" @click="logout"><b>Sign out</b></button>
    </div>
</template>
<script>
import Alert from '@/components/Alert.vue';
import Toolbar from '@/components/Toolbar.vue';
import UserService from "@/UserService";
export default {
  name: 'Header',
  components: {
 Alert,
    Toolbar
},
  props: {


  },
  data() {
    return {
      isHidden: false,
      newMessage: true,
      isAlertVisible: false,
      isToolbarVisible: false,
    };
  },
  computed: {
    getColor() {
      if(this.newMessage) {
        return {
          color: '#ff6961'
        }
      }
      return {
        color: '#0B3A19'
      }
    }
  },
  methods: {
    async logout() {
      try {
        const token = await UserService.logout({
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', JSON.stringify(token));
        await this.$router.push({
          path:'/',
          params: {

          },
          query: {
          }
        });
      } catch(err){
        this.isErrorVisible=true;
      }
    },
    showAlert() {
      this.isAlertVisible = true;
    },
    closeAlert() {
      this.isAlertVisible = false;
      this.newMessage=false;
    },
    showToolbar() {
      this.isToolbarVisible = true;
    },
    closeToolbar() {
      this.isToolbarVisible = false;
    },
  }}
</script>
<style>
.header{
  padding-top: 50px;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.fa-align-justify{
  font-size:56px;
  color: #0B3A19;
  padding-left: 40px;
  display: inline-block;
  flex: 1;

}
.fa-bell{
  font-size:56px;
  display: inline-block;
  padding-right: 40px;
}
i{
  pointer-events: all;
}
.sign_out{
  padding-right: 25px;
  padding-top: 20px;
  display: inline-block;
  flex: 1;
  float: right;

}
.sign_out_button{
  border: 2px solid #0B3A19;
  transition-duration: 0.4s;
  height: 35px;
  border-radius: 4px;
  background-color: #0B3A19; /* Green */
  color: #fde396;
}
/*.sign_out_button:hover {
  background-color: #fde396;
  color: #0B3A19;
}*/
@media screen and (max-width: 896px) {
  .sign_out{
   padding-right: 27px;
    padding-top: 20px;
  }
  .sign_out_button{
    height: 45px;
  }
}
@media screen and (max-width: 600px) {
  .fa-align-justify{
    font-size:36px;

  }
  .fa-bell{
    font-size:36px;
  }
  .sign_out{
    padding-right: 16px;
  }
  .sign_out_button {
    height: 35px;
  }
}
</style>