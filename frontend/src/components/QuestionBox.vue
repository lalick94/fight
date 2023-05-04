<template>
    <div class="comic-field">
      <div class="comic-box">
        <div class="icon-field">
          <i v-if="detail" class="fa fa-info-circle" aria-hidden="true"></i>
          <i v-if="task" class="fa fa-question-circle" aria-hidden="true"></i>
        </div>
        <div class="questions">
          <slot></slot>
        </div>


<!--          <span class="pbar">{{ progress }}%</span>
                <div class="shell">
                  <div class="bar" :style="{ width: progress + '%' }">
                  </div>
                </div>-->
      </div>
    </div>
</template>
<script>

export default {
  components: {},
  props: {
    detail: Boolean,
    task: Boolean,
    quizQuestions: Array,
    quiz: Boolean,
    comicQuestions: Array,
    comic: Boolean,
    progress: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      progress: 5,
    };
  },
  computed: {

  },
  methods: {

    },
    makeProgress() {
      if(this.progress < 100) {
        this.progress += 5;
      }
    }


}
</script>
<style scoped>
.comic-field{
  text-align: center;
  padding-top: 10px;
  margin-bottom: 30px;
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

p{
  padding-top: 60px;
  font-size: 30px;
  font-family: Arial;
  color: #0B3A19;
}
.comic-box {
  margin: auto;
  /*width: 97%;*/
  width:80%;
  border: 5px solid #0B3A19;
  padding: 10px;
  background-color: white;
  height: auto;
  border-radius:10px;
  position: relative;
  height: 770px;
}
a { text-decoration: none; }
.fa-info-circle{
  font-size:56px;
  color: #ff6961;
}
.fa-question-circle{
  font-size:56px;
  color: #ff6961;
}

.icon-field{
  padding: 10px;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 20px;
  top: -20px;
}

@media screen and (max-width: 1400px) {
  .comic-field {
     padding-top: 50px;
    }
  .comic-box {
    /*height: 800px;*/
    width: 95%;
  }
  .fa-info-circle{
    font-size:41px;
  }
  .fa-question-circle{
    font-size:41px;
  }
  }
@media screen and (max-width: 1200px){
  .comic-box{
    height: 550px;
  }
}
@media screen and (max-width: 896px) {
  .icon-field{
    padding: 13px;
  }
  .fa-info-circle{
    font-size:45px;
  }
  .fa-question-circle{
    font-size:45px;
  }
  .comic-field{
    padding-top: 25px;
  }
  .comic-box{
    height: 925px;
  }
  p{
    font-size: 22px;
  }

}
@media screen and (max-width: 770px){
  .comic-box{
height: 790px;
  }
}

@media screen and (max-width: 414px) {
 .icon-field{
   padding: 13px;
 }
  .fa-info-circle{
    font-size:40px;
  }
  .fa-question-circle{
    font-size:40px;
  }
  .comic-field{
    padding-top: 25px;
    padding-bottom: 25px;
  }
  .comic-box{
    height: 730px;
  }

}

@media screen and (max-width: 375px) {
  .comic-box{
    height: 558px;
  }

}

@media screen and (max-width: 360px) {
  .comic-box{
    height: 540px;
  }
}



</style>