<template>
  <!--  <div class="modal-backdrop">-->
  <div class="t-modal-mask">
    <div class="t-modal-wrapper">
      <div class="t-modal-container">
        <div class="t-modal-body">
          <slot name="t-body">
            <div style="text-align: center;" class="button-section" v-if="!isModuleClicked && !isUserInfoClicked">
              <div>
              <button class="toolbar-btn" @click="setUserInfoClicked()"><i class="fa fa-user-circle" aria-hidden="true"></i><h2>User information</h2></button>
              </div>
              <div style="padding-top: 50px;">
              <button class="toolbar-btn" @click="setModuleClicked()"><i class="fa fa-th-list" aria-hidden="true"></i><h2>Modul</h2></button>
              </div>
            </div>
            <div v-if="isModuleClicked">
              <div style="text-align: center;" class="button-section" >
                <div>
                  <router-link :to="{name: 'menu'}">
                  <button class="toolbar-btn" v-bind:style="isMenu ? '' : 'background-color: #fde396; border: #fde396;'"><h2 v-bind:style="isMenu ? '' : 'color: #686868;'">Grundmodul</h2></button>
                    </router-link>
                </div>
                <div style="padding-top: 50px;">
                  <router-link :to="{name: 'vertiefungsmenu'}">
                  <button class="toolbar-btn" @click="setModuleClicked()"  v-bind:style="isMenu2 ? '' : 'background-color: #fde396; border: #fde396;'"><h2 v-bind:style="isMenu2 ? '' : 'color: #686868;'">Vertiefungsmodul</h2></button>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-if="isUserInfoClicked">
              <div style="text-align: center;" class="button-section" >
            <div class="user_score"
                 v-for="(topLevel, index) in Object.entries(score).sort(([k, v]) => k[0].localeCompare(v[0]))"
                 v-bind:item="topLevel"
                 v-bind:index="index"
                 v-bind:key="'toplevel' + index">
              <h4 class="user_score_titel">{{ topLevel[0] }}: </h4>
              <ul style=" padding-left: 30px;">
                <li v-for="(secondLevel, index2) in Object.entries(topLevel[1])"
                    v-bind:item="secondLevel"
                    v-bind:index="index2"
                    v-bind:key="'secondLevel' + index2"
                  class="user_score_points" >{{ secondLevel[0] }} {{ secondLevel[1]}}</li>
              </ul>
            </div>
              </div>
            </div>
          </slot>
        </div>
        <div class="t-modal-footer">
          <slot name="t-footer">
            <i class="fa fa-times-circle"  aria-hidden="true" v-if="!isUserInfoClicked" @click="close"></i>
            <i class="fa fa-arrow-circle-left" aria-hidden="true" v-if="isUserInfoClicked" @click="setUserInfoClicked"></i>
<!--  <i class="fa fa-arrow-circle-left" aria-hidden="true" @click="close"></i>-->
          </slot>
        </div>
      </div>
      <!--      </div>-->
    </div>
  </div>
</template>

<script>

import UserService from "@/UserService";

export default {
  name: 'Toolbar',
  data() {
    return {
      isModuleClicked: false,
      isUserInfoClicked:false,
      isMenu: true,
      score: [],
      isMenu2: false,
    };
  },
  async mounted() {
    this.score = await UserService.getScore();
    console.log(Object.entries(this.score));
    console.log(this.$route);
    if(this.$route.name === 'menu') {
      this.isMenu = true;
      this.isMenu2=false;
    } else if(this.$route.name === 'vertiefungsmenu'){
      this.isMenu2 = true;
      this.isMenu=false;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    setModuleClicked() {
      console.log("test");
      this.isModuleClicked = !this.isModuleClicked;
    },
    setUserInfoClicked() {
      console.log("test");
      this.isUserInfoClicked = !this.isUserInfoClicked;
    }
  },
};
</script>

<style>
.user_score_titel{
  text-align: left;
  font-weight: bold;
  padding-left: 20px;
}
.user_score_points{
  text-align: left;
  font-weight: bold;
}
.user_score{
  color: wheat;
}
.t-modal-mask {
 position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 13%;
  background-color: transparent;
  /*background-color: rgba(0, 0, 0, 0.2);*/
  display: table;
  transition: opacity 0.3s ease;
  font-family: Arial;

}

.t-modal-wrapper {
  display: table-cell;
  vertical-align: middle;

}

.t-modal-container {
  width: 552px;
  height: 950px;
  background-color:  #0B3A19;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


/*
.t-modal-body {
  margin: 20px 0;
}
*/

.fa-times-circle{
  float: right;
  color: #fde396;
  font-size:36px
}
.fa-arrow-circle-left{
  float: right;
  color: #fde396;
  font-size:36px
}
.fa-user-circle{
  font-size:26px;
  color: #0B3A19;
}
.fa-th-list{
  font-size:26px;
  color: #0B3A19;
}
.t-modal-enter {
  opacity: 0;
}

.t-modal-leave-active {
  opacity: 0;
}

.t-modal-enter .t-modal-container,
.t-modal-leave-active .t-modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.t-modal-body{
  color: #0B3A19;
}
.t-modal-footer{
  position:fixed;
  bottom:40px;
  left:460px;
}
.toolbar-btn{
  background: #F4D03F;
  border:4px solid #F4D03F;
  border-radius: 10px;
  color:  #0B3A19;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer; /* Mouse pointer on hover */
  width: 400px;
}
.toolbar-btn:hover {
  background-color:  #fde396;
}
.button-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
}
.button-section button {
  width: 400px;
  margin: 0 auto;
}

@media screen and (max-width:2502px) {
  .t-modal-container {
    width: 570px;
    height: 1400px;
  }
  .button-section button{
    width: 330px;
  }
  .t-modal-footer{
    position:fixed;
    bottom:40px;
    left:480px;
  }

}
@media screen and (max-width:820px) {
  .t-modal-container {
    width: 570px;
    height: 1180px;

  }
  .button-section button{
    width: 330px;
  }
  .t-modal-footer{
    position:fixed;
    bottom:40px;
    left:480px;
  }
  .user_score_titel{
    font-size: 30px;
  }
.user_score_points{
  font-size: 20px;
}
}
@media screen and (max-width: 414px) {
  .t-modal-footer{
    left:310px;
    position:fixed;
    bottom:40px;
  }
  .t-modal-container {
    width: 395px;
    height: 898px;

  }
  .button-section button{
    width: 245px;
  }
  .user_score_titel{
    font-size: 25px;
  }
  .user_score_points{
    font-size: 15px;
  }
}
@media screen and (max-width: 360px) {
  .t-modal-container {
    width: 395px;
    height: 898px;

  }
  .button-section button{
    width: 245px;
  }
  .t-modal-footer{
    position:fixed;
    bottom:40px;
    left:290px;
  }
}

</style>

