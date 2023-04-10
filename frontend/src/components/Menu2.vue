<template>
  <div id="menu">
    <Header></Header>
    <div class="menufields">
      <div class="flex-container">
        <div class="box">
          <router-link :to="{name: 'question'}">
            <div class="quiz" onclick=""><p class="modalname"><b>Mein Körper</b></p></div>
          </router-link>
        </div>
        <div class="box">
          <router-link :to="{name: 'memory'}">
            <div class="quiz"><p class="modalname"><b>Body Memory</b></p></div>
          </router-link>
        </div>
        <div class="box">
          <router-link :to="{name: 'selbstdarstellungonline'}">
            <div class="quiz"><p class="selbst-modalname"><b>Selbstdarstellung online</b></p></div>
          </router-link>
        </div>
      </div>
      <div class="flex-container" id="flex2">
        <div class="box">
          <router-link :to="{name: 'uebungmittimer'}">
            <div class="quiz"><p class="modalname"><b>
              Körperhaltungen
            </b></p></div>
          </router-link>
        </div>
        <div class="box">
          <router-link :to="{name: 'genussmomente'}">
            <div class="quiz"><p class="modalname"><b>Genussmomente</b></p></div>
          </router-link>
        </div>
        <div class="box">
          <router-link :to="{name: 'kognitionen'}">
            <div class="quiz"><p class="modalname"><b>Kognitionen</b></p></div>
          </router-link>
        </div>
      </div>
        <div class="flex-container" id="flex3">
          <div class="box">
            <router-link :to="{name: 'sozialeunterstuetzung'}">
              <div class="quiz"><p class="modalname"><b>Soziale Unterstützung</b></p></div>
            </router-link>
          </div>
          <div class="box">
            <router-link :to="{name: 'erkennen'}">
              <div class="quiz"><p class="modalname"><b>Erkennen von & Umgang</b> <br><b> mit Emotionen</b></p></div>
            </router-link>
          </div>
          <div class="box">
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  components: {Header},
  props: {

  },
  data() {
    return {
      isHidden: false
    };
  },
  methods: {
  }}
</script>
<style scoped>
#menu {
  background-color:#84d084;
  background-size:cover;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: scroll;
}
#flex2{
  padding-top:80px;
}
#flex3{
  padding-top:80px;
  margin-bottom: 200px;
}
.menufields{
  text-align: center;
  padding-top: 120px;
}

button{
  background-color: #77dd77;
  border: none;
  color: white;
  padding: 7px 24px;;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight : bold;
  margin: 4px 2px;
  cursor: pointer;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  text-align: center;
}

.box{
  padding: 40px;
  flex: 20%;
  height:200px;

}
.modalname{
  padding-top: 60px;
  font-size: 30px;
  font-family: Arial;
  color: #0B3A19;
}
.selbst-modalname{
  padding-top: 60px;
  font-size: 30px;
  font-family: Arial;
  color: #0B3A19;
}
.quiz{
  height:200px;
  background-color:#fde396;
  padding: 20px;
  border:5px solid #0B3A19;
  border-radius:10px;
  box-shadow: 1px 1px 2px black, 0 0 25px green, 0 0 5px darkgreen;
}
.quiz:hover {
  background-color:  #F4D03F;
}
button{
  width: 500px;
}
a { text-decoration: none; }
/*.fa-align-justify {*/
/*  font-style: normal;*/
/*}*/
@media (max-width: 820px) {
  .flex-container {
    flex-direction: column;
  }
  .quiz{
    height:200px;
    padding: 20px;
  }
  .menufields{
    padding-top: 65px;
  }
  #flex2{
    padding-top: 0px;
  }
  #flex3{
    padding-top: 0px;
  }
}
@media (max-width: 414px) {
  .quiz{
    height:150px;
    padding: 0px;
  }
  .menufields{
    padding-top: 65px;
  }
  #flex2{
    padding-top: 0px;
  }
  #flex3{
    padding-top: 0px;
  }
  .modalname{
    padding-top: 50px;
  }
  .selbst-modalname{
    padding-top: 40px;
  }
}

</style>