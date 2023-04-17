<template>
  <div id="quiz">
    <Header></Header>
  <router-link :to="{name: 'menu'}">
    <div class="menu-header">
    <i class="fa fa-arrow-left" aria-hidden="true" @click="pageDecrease()" id="quiz_menu">Menu</i>
    </div>
    </router-link>
<!--    <span class="q_counter">Question {{page + 1}} Counter {{quizQuestions[page]?.counter}}</span>-->
    <QuestionBox :detail="quizQuestions[page]?.counter == 1 || quizQuestions[page]?.counter == 2|| quizQuestions[page]?.counter == 4" :task="quizQuestions[page]?.counter == 3">
      <Questions>
        <div class="questions-container" style="margin: 0 auto;">
          <div class="col"
               v-for="(question, index) in quizQuestions"
               v-bind:item="question"
               v-bind:index="index"
               v-bind:key="'question'+ page + index"
          >
            <div v-if="index === page">
              <div v-if="question.type === 'MC'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4" v-html="question.explanation"></p>
                <p  class="ins" style="text-align: left;" v-if="question.counter === 2" v-html="question.instruction"></p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz_mc">
                <p  class="mc-text" style="text-align: left;" v-if="question.counter === 3" v-html="question.question"></p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz">
                <ul class="answer-list" style="text-align: left" v-if="question.counter === 3">
                  <li
                     v-bind:class="getClass(answer)"
                     v-for="(answer, idx) in question.answers"
                     v-bind:item="answer"
                     v-bind:index="idx"
                     v-bind:key="'answer'+ page + idx"
                     @click="checkAnswer(answer)"
                   ><i class='fas fa-check icon' v-if="answer.correct"></i>
                    <i class='fa fa-times icon'  v-if="!answer.correct && answer.correct !== undefined"></i>
                    <i class='fas fa-circle icon' v-if="answer.correct === undefined"></i>
                    {{ answer.answer }}
                  </li>
                </ul>
              </div>
              <div v-if="question.type === 'ALARM'">

                <p class="text" style="text-align: left;" v-if="question.counter === 1">
                  <span>{{ question.info }}</span>
                </p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2" v-html="question.instruction"></p>
<!--                <img class="image_quiz_uhr_dragdrop"  v-bind:src="`images/assets/uhr_${question.dependingCustomAnswer}.png`" v-if="question.counter === 2 && question.dependingCustomAnswer" />-->
                <div class="drag-rucksack">
                  <img class="image_quiz_uhr_dragdrop"  v-bind:src="`images/assets/uhr_${question.customAnswer}.png`" v-if="question.customAnswer" />
                <img class="image_quiz_uhr_dragdrop" v-bind:src="`images/assets/${question.question_image}_${dragDropImgIndex}.png`" v-if="question.question_image && question.counter === 3 && !question.customAnswer" @click="answerAlarm($event)" >
               </div>
                <div v-if="question.counter === 3" class="drag-drop">
                  <div class="drag-drop-alarm">
                    <input class="alarm_input" type="text" v-model="question.customAnswer">
                  </div>
                </div>
              </div>
              <div v-if="question.type === 'ALARM_DRAG_DROP'">
                  <div class="answer-list-alarm-drag" style="text-align: center" v-if="question.counter === 3">
                    <div v-for="(answer, idx) in question.answers" v-bind:key="idx"  >
                      <div v-if=" idx === selection2CurrentIdx" style="display: table; margin-left:auto;
    margin-right:auto;">
                        <div style="min-width: 37px;">
                          <i class="fa fa-arrow-left" id="alarm-arrow-left" aria-hidden="true" v-if="idx === selection2CurrentIdx && idx !== 0" @click="changeSelection2Image(idx - 1)" style="display: table-cell;"></i>
                        </div>
                        <div  style="display: table-cell;" class="flip-container-alarm" :class="{ selected: answer.selected }"   @click="cardSelected(answer)">
                          {{answer.answer}}
                        </div>
                        <div style="min-width: 37px;">
                          <i class="fa fa-arrow-right" id="alarm-arrow-right" aria-hidden="true" v-if="idx === selection2CurrentIdx && idx < question.answers.length - 1" @click="changeSelection2Image(idx + 1)" style="display: table-cell;"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2" v-html="question.instruction"></p>
                <img class="image_quiz_uhr_dragdrop"  v-bind:src="`images/assets/uhr_${question.dependingCustomAnswer}.png`" v-if="question.counter === 2 && question.dependingCustomAnswer" />
                <img v-bind:src="`images/assets/${question.instruction_image}_${dragDropImgIndex}.png`" v-if="question.instruction_image && question.counter === 2" class="image_quiz_i_dragdrop">
                <div class="drag-rucksack-alarm">
                <img class="image_quiz_q_dragdrop_rucksack_alarm" v-bind:src="`images/assets/rucksack.png`" v-if="question.counter === 3" @click="answerDragDropAlarm()" >
                </div>
              </div>
              <div v-if="question.type === 'DRAG_DROP'">
                    <div v-if="question.counter === 3 && question.question" class="drag-drop">
                      <div class="drag-drop">
                        <div class="drag_answers"
                             v-for="(answer, idx) in question.answers"
                             v-bind:item="answer"
                             v-bind:index="idx"
                             v-bind:key="'answer'+ page + idx" >
                          <div class="answers-box">
                            {{question.question}}
                          </div>
                        </div>
                      </div>
                    </div>

                <p  class="text" style="text-align: left;" v-if="question.counter === 1" v-html="question.info"></p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2" v-html="question.instruction"></p>
               <div class="drag-rucksack-instr" v-if="question.instruction_image && question.counter === 2">
                <img class="image_quiz_q_dragdrop" v-bind:src="`images/assets/${question.instruction_image.replace('$', dragDropImgIndex)}`" v-if="question.instruction_image && question.counter === 2" >
                  <img class="image_quiz_q_dragdrop_rucksack" v-bind:src="`images/assets/rucksack.png`" v-if="question.instruction_image && question.counter === 2">
                </div>
                <div class="drag-rucksack">
                  <img class="image_quiz_q_dragdrop" v-bind:src="`images/assets/${question.question_image}_${dragDropImgIndex}.png`" v-if="question.question_image && question.counter === 3" @click="answerDragDrop(true)" >
                  <img class="image_quiz_q_dragdrop_rucksack" v-bind:src="`images/assets/rucksack.png`" v-if="question.question_image !== 'uhr' && question.question_image && question.counter === 3" @click="answerDragDrop(false)" >
                </div>
              </div>
              <div v-if="question.type === 'SELECTION'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz">
                <div class="answer-list-selection" style="text-align: center" v-if="question.counter === 3">
                  <div v-for="(answer, idx) in question.answers" v-bind:key="idx" class="flip-container" :class="{ selected: answer.selected }" @click="cardSelected(answer)">
                    <div>
                      <div class="front border rounded shadow" :class="quizType === 'COMIC' ? 'custom_front' : ''" v-if="answer.image"  style="margin-right: 50px;">
                        <img class="img_selection" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div class="front rounded" id="answer_selection_containter" v-if="answer.answer !== 'dummy'">
                        <div class="answer_selection" >{{answer.answer}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="question.type === 'SELECTION_2'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz1_selection2_instr">
                <p  class="text_selection" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz">
                <div class="answer-list-selection_2" style="text-align: center" v-if="question.counter === 3">
                  <div v-for="(answer, idx) in question.answers" v-bind:key="idx" class="flip-container" :class="{ selected: answer.selected }" @click="cardSelected(answer)">
                    <div v-if="selectionDesktop">
                      <div class="front border rounded shadow" :class="quizType === 'COMIC' ? 'custom_front' : ''" v-if="answer.image">
                        <img class="img_selection" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div class="front rounded" id="answer_selection_containter" v-if="answer.answer !== 'dummy'">
                        <div class="answer_selection" >{{answer.answer}}</div>
                      </div>
                    </div>
                    <div v-if="!selectionDesktop && answer.image && idx === selection2CurrentIdx" style="display: table; margin-left:auto;
    margin-right:auto;">
                      <div style="min-width: 37px;">
                        <i class="fa fa-arrow-left" id="selection-arrow-left" aria-hidden="true" v-if="answer.image && idx === selection2CurrentIdx && idx !== 0" @click="changeSelection2Image(idx - 1)" style="display: table-cell;"></i>
                      </div>
                      <div class="front border rounded shadow" :class="quizType === 'COMIC' ? 'custom_front_2' : ''" style="display: table-cell;" >
                        <img class="img_selection_2" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img_2' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div style="min-width: 37px;">
                      <i class="fa fa-arrow-right" id="selection-arrow-right" aria-hidden="true" v-if="answer.image && idx === selection2CurrentIdx && idx < question.answers.length - 1" @click="changeSelection2Image(idx + 1)" style="display: table-cell;"></i>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
              <div v-if="question.type === 'INPUT_FIELD'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }} <p>{{question.dependingCustomAnswer}}</p></p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz1_input">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz">
                <div class="answer-list-input" style="display:flex;flex-direction: column;margin: 0 auto;" v-if="question.counter === 3">
                  <div><textarea v-model="question.customAnswer"  id="name" name="name" class="feedback-field" placeholder="Schreib hier etwas..."></textarea> </div>
                <div class="but_input">  <button class="button button1" v-if="question.counter === 3">Abschicken </button> </div>
                </div>
              </div>
              <div style="display:flex; flex-direction: column;" v-if="question.type === 'SLIDER'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz">
                <p  class="text" style="text-align: left; flex: 1 0 100%;" v-if="question.counter === 3">{{ question.question}}</p>
                <div class="answer-list" v-if="question.counter === 3">
                  <div>
                  <input type="range" step="1" min="1" max="10" v-model="question.customAnswer" class="slider" id="myRange" style="">
                  </div>
                </div>
                <div class="image_quiz_slider" v-if="question.left_slider && question.counter === 3" id="toptext">
                  <p style="padding-left: 10px;width:50%;text-align:left;">{{question.left_slider}}</p>
                  <p style="padding-right: 10px;width:50%;text-align: right;">{{question.right_slider}}</p>
                </div>
                <div class="image_quiz_slider" v-if="question.question_image && question.counter === 3" >
                  <img v-bind:src="`images/assets/${quizQuestions.find(q => q.id === question.dependingQuestionId).question_image}`" v-if="question.dependingCustomAnswer" v-bind:height="50 * question.dependingCustomAnswer" v-bind:width="20 * question.dependingCustomAnswer" class="image_quiz_slider_init">
                  <img v-bind:src="`images/assets/${question.question_image}`" v-bind:height="25 * question.customAnswer + 10" v-bind:width="10 * question.customAnswer + 10" class="image_quiz_slider_dynamic">

                </div>
              </div>
            </div>
          </div>
          <div class="progress-bar-field">
            <div class="left-arrow">
              <i class="fa fa-arrow-left" id="arrow-left" aria-hidden="true" @click="pageDecrease()" v-if="page > 0 || quizQuestions[page]?.counter > 1"></i>
            </div>
            <div class="progress-bar">
              <span class="pbar"> <b>{{ `${Math.round(progress / (100 / (quizQuestions.length - 1))).toFixed(0)} / ${quizQuestions.length - 1}` }}</b></span>
              <div class="shell">
                <div class="bar" :style="{ width: progress + '%' }">
                </div>
              </div>
            </div>
            <div class="right-arrow">
              <i class="fa fa-arrow-right" id="arrow-right" aria-hidden="true" @click="pageIncrease()" v-if="!(quizQuestions.length - 1 === page && quizQuestions[page]?.counter === quizQuestions[page]?.subpages)"></i>
            </div>
          </div>
        </div>
      </Questions>
    </QuestionBox>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import QuestionBox from "@/components/QuestionBox";
import QuestionService from "@/QuestionService";
import AnswersService from "@/AnswersService";

export default {
  components: {QuestionBox, Header},
  data() {
    return {
      quizQuestions: [],
      page: 0,
      progress:0,
      dragDropImgIndex: 1,
      dragDropPage: 0,
      selectedDragDropElement: {},
      dragDropShowAll: true,
      selectionDesktop: true,
      clockVisible: false,
      selection2CurrentIdx: 0,
    };
  },
  async mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize();
    console.log("mounted");
    try {
      console.log(this.$route);
      this.quizQuestions = await QuestionService.getQuizQuestions(this.$route.name.toUpperCase());
      this.quizQuestions = this.quizQuestions.map(q => {
        let count = 3, start = 1;
        if(!q.info){
          start++;
        }
        if(!q.instruction){
          start++;
        }
        if(q.explanation){
          count++;
        }
        console.log(count + " " + start);
        return {
          ...q,
          subpages: count,
          isAnswered: false,
          customAnswer: q.type === 'SLIDER' ? 4 : undefined,
          counter: start,
          start
        };
      });
    } catch(err) {
      console.log("Error getting questions");
    }
  },
  methods:{
    changeSelection2Image(idx) {
      this.selection2CurrentIdx = idx;
    },
    showClock() {
      this.clockVisible = true;
    },
    answerAlarm(e) {
      console.log("ALARM");
      console.log(e);
      var X = (e.pageX - e.target.offsetLeft);
      var Y = (e.pageY - e.target.offsetTop);
      console.log(X + " " + Y);
    },
    answerDragDrop(answer) {
      if(answer) {
        this.dragDropImgIndex = 2;
      }
      this.quizQuestions[this.page].customAnswer = answer;
      new Promise(resolve => {
        setTimeout(resolve, 500);
      }).then(() =>  {
        this.pageIncrease();
        this.dragDropImgIndex = 1;
      });
    },
    answerDragDropAlarm() {
      if(this.quizQuestions[this.page].answers.filter(s => s.selected).length < 3) {
        this.quizQuestions[this.page].answers[this.selection2CurrentIdx].selected = true;
      }
    },
    cardSelected(card){
      this.quizQuestions[this.page].answers.forEach(a => a.selected = false);
      card.selected = true;
    },
    selectDragDropAnswer(answer) {
      if(this.dragDropShowAll){
        return;
      }
      console.log("Answer selected");
      this.dragDropImgIndex = 2;
      new Promise(resolve => {
        setTimeout(resolve, 500);
      }).then(() => this.dragDropImgIndex = 1);
      answer.clicked = answer.clicked === undefined ? true : !answer.clicked;
    },
    dragDropNext() {
      this.dragDropPage++;
    },
    dragDropPrevious() {
      this.dragDropPage--;
    },
    onResize() {
      if (window.innerWidth < 500) {
        this.dragDropShowAll = false;
      } else {
        this.dragDropShowAll = true;
      }
      if(window.innerWidth < 1500){
        this.selectionDesktop = false;
      } else {
        this.selectionDesktop = true;
      }
    },
    dragOverImg(event) {

      event.preventDefault();
      this.dragDropImgIndex = 2;
    },
    dropAnswer(event){
      event.preventDefault();
      this.dragDropImgIndex = 1;
      this.quizQuestions[this.page].answers.forEach(a => {
        if(a.id === this.selectedDragDropElement.id){
          a.clicked = true;
        }
      });
    },
    async pageIncrease(){
      if((this.quizQuestions[this.page].type === 'SLIDER' || this.quizQuestions[this.page].type === 'INPUT_FIELD'
          || this.quizQuestions[this.page].type === 'ALARM') && this.quizQuestions[this.page].counter === 3){
        if(this.quizQuestions[this.page] && this.quizQuestions[this.page].answers.length) {
          await this.checkAnswer({
            id: this.quizQuestions[this.page].answers[0].id,
          });
        }
      }
      if(this.quizQuestions[this.page].type === 'DRAG_DROP' && this.quizQuestions[this.page].counter === 3){
        await this.checkAnswer(this.quizQuestions[this.page].answers[0]);
      }
      if((this.quizQuestions[this.page].type === 'ALARM_DRAG_DROP' || this.quizQuestions[this.page].type === 'SELECTION' || this.quizQuestions[this.page].type === 'SELECTION_2' )&& this.quizQuestions[this.page].counter === 3){
        if(this.quizQuestions[this.page].answers && this.quizQuestions[this.page].answers.length && this.quizQuestions[this.page].answers.some(a => a.selected)) {
          await this.checkAnswer(this.quizQuestions[this.page].answers.filter(a => a.selected)[0]);
        }
      }
      if(this.quizQuestions[this.page].counter !== this.quizQuestions[this.page].subpages){
        this.quizQuestions[this.page].counter++;
      } else {
        this.page++;
        this.selection2CurrentIdx = 0;
        if(this.quizQuestions[this.page].dependingQuestionId){
          this.quizQuestions[this.page].dependingCustomAnswer = await this.getCustomAnswer(this.quizQuestions[this.page].dependingQuestionId);
          console.log(this.quizQuestions[this.page]);
        }
      }
    },
    pageDecrease(){
      if(this.quizQuestions[this.page].start < this.quizQuestions[this.page].counter){
        this.quizQuestions[this.page].counter--;
      } else {
        if(this.page > 0) {
          this.page--;
          this.quizQuestions[this.page].counter = this.quizQuestions[this.page].subpages;
        }
      }
    },
    async getCustomAnswer(questionId) {
      const customAnswer = await QuestionService.getCustomAnswer(questionId);
      console.log(customAnswer);
      return customAnswer.userAnswer;
    },
    async checkAnswer(answer) {
      if(this.quizQuestions[this.page].isAnswered){
        return;
      }
      const res = await AnswersService.getQuizAnswers({
        answerId: answer.id,
        questionId: this.quizQuestions[this.page].id,
        customAnswer: ["SLIDER", "INPUT_FIELD", "DRAG_DROP", "ALARM"].includes(this.quizQuestions[this.page].type) ? this.quizQuestions[this.page].customAnswer : undefined,
      });
      if(res.result){
        // alert("Answer correct!");
      } else {
       // alert("Answer not correct");
      }
      if(this.quizQuestions[this.page].type === 'MC'){
        this.quizQuestions[this.page].isAnswered = true;
        this.quizQuestions[this.page].answers.forEach(a => {
          if (res.answers.some(ca => ca === a.id)) {
            a.correct = true;
          } else if (a.id === answer.id) {
            a.correct = false;
          } else {
            a.correct = undefined;
          }
        });
        if(res.result){
          this.progress += 100 / (this.quizQuestions.length - 1);
        }
      } else if(this.quizQuestions[this.page].type === 'INPUT_FIELD') {
        if(answer.id && this.quizQuestions[this.page].customAnswer) {
          this.progress += 100 / (this.quizQuestions.length - 1);
        }
      } else if(answer.id || this.quizQuestions[this.page].customAnswer) {
        this.progress += 100 / (this.quizQuestions.length - 1);
      }
    },
    getClass(answer){
      if(answer.correct){
        return "Answer__correct";
      }
      if(answer.correct === false){
        return "Answer__wrong";
      }
      return "Answer";
    }
  }
}
</script>
<style scoped>

input[type=text] {
  border: 2px solid red;
  border-radius: 4px;
}
.drag-rucksack{
  padding-top: 70px;
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  margin: auto;
}
.drag-rucksack-instr{
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  margin: auto;
}
.drag-rucksack-alarm{
  padding-top: 70px;
  max-width: 550px;
  margin: auto;
}
.drag-drop-alarm{
  margin: 0 auto;
}
#quiz_menu{
  font-size: 25px;
  color: #ff6961;
  padding-right: 100px;
}
.slider:hover {
  opacity: 1;
}

.menu-header{
  text-align: right;
}
.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.button1 {
  background-color: #84d084;
  width: 145px !important;
}
.but_input{
  width: 145px;
  margin: 0 auto;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
.q_counter{
  padding-left: 175px;
}
::placeholder {
  color: lightgrey;
  padding: 5%;
}
.answer-list-selection{
  padding-left: 160px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.answer-list-selection_2{
  padding-left: 160px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.answer-list-alarm-drag{
  padding-top: 40px;
  display: flex;
  justify-content: center;
}
.flip-container{
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
  cursor: pointer;
}
.flip-container{
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
  cursor: pointer;
}
.flip-container .img_selection{
  min-height: 120px;
}
.answer_selection{
  width: 168px;
  height: 128px;
  padding-top: 40px;
  font-weight: bold;
}
.img_selection {
  width: 335px;
  height: 465px;
}

.memory-img{
  width: 128px;
  height: 128px;
}

.flip-container .answer_selection{
  min-height: 70px;
  border: 3px solid darkgray;
  margin: 10px;
  border-radius:10px;
}

.custom_front {
  margin: 50px;
}
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  transition: 0.6s;
  transform-style: preserve-3d;
}

.flip-container-alarm .selected{
  border: 5px solid #ff6961;
}

.flip-container-alarm .selected {
  width: 100%;
  border-radius: 4px;
  font-size: 40px;
  padding: 5px;
  border: 3px solid #ff6961;
}
.flip-container-alarm{
  width: 100%;
  border: 4px solid black;
  border-radius: 4px;
  font-size: 40px;
  padding: 5px;
}
.flip-container-alarm.selected {
  border: 5px solid #ff6961;
}

.flip-container.selected .answer_selection{
  width: 210px;
  height: 160px;
  padding-top: 60px;
  border: 3px solid #ff6961;
}
.flip-container.selected .img_selection_2{
  border: 5px solid #ff6961;
}

.flip-container.selected .answer_selection_2{
  width: 210px;
  height: 160px;
  padding-top: 60px;
  border: 3px solid #ff6961;
}
.back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  position: absolute;
}


.flip-container.flipped .back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);
}
.flip-container.flipped .front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.flip-container.selected .img_selection{
  border: 5px solid #ff6961;
}
.flip-container.selected .answer_selection{
  width: 210px;
  height: 160px;
  padding-top: 60px;
  border: 3px solid #ff6961;
}
.flip-container.selected .img_selection_2{
  border: 5px solid #ff6961;
}
.shell {
  height: 15px;
  /*border: 1px solid #DEDEDE;*/
  background-color: #DEDEDE;
  text-align: left;
  margin: 0 auto;
  width: 100%;
}

.feedback-field{
  height: 300px;
  width: 60%;
  box-sizing: border-box;
  border: 3px solid #ff6961;
  border-radius:10px;
}
.answers-box{
  width: 100% ;
  border: 4px solid black;
  border-radius: 4px;
  font-size: 40px;
  padding: 5px;
}

.drag-drop {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
}
.test{
  width: 100% ;
  display: flex;
  flex-direction: column;
  width:200px ;
}
ul {
  list-style: none;
}
.Answer {
  padding-left: 70px;
  padding-bottom: 50px;
  font-size:30px;
  color: black;
}
.drag_answers {
  padding-left: 20px;
  padding-top: 20px;
  font-size:30px;
  color: black;
}
.Answer__correct {
  color: green;
  font-size: 30px;
  font-family: Arial;
  padding-left: 70px;
  padding-bottom: 30px;
}
.image_quiz_slider {
  display: flex;
  padding-top: 20px;
}
.image_quiz{
  height: 400px;
  width: 500px;
}
.image_quiz1_input{
  height: 400px;
  width: 500px;
}
.image_quiz_mc{
  height: 390px;
  width: 300px;
}
.icon {
  display: inline-block;
  margin-left: -1.3em; /* same as padding-left set on li */
  width: 1.3em; /* same as padding-left set on li */
}
.Answer__wrong {
  color: red;
  font-size: 30px;
  font-family: Arial;
  padding-left: 70px;
  padding-bottom: 30px;
}
#quiz {
  background-color:#84d084;
  background-size:cover;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: scroll;
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
  font-size: 30px;
  font-family: Arial;
  color:black;
}
.text{
  /*padding: 50px;*/
  color: black;
  margin: auto;
  padding: 60px 40px;
  text-align: center;
}
.text_selection{
  color: black;
  margin: auto;
  padding-top: 60px;
  padding-left: 40px;
  text-align: center;
}
.mc-text{
  color: black;
  margin: auto;
  padding: 60px 40px;
  text-align: center;
}
a { text-decoration: none; }

.progress-bar-field{
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.progress-bar {
  width: 95%;
  display: flex;
  flex-direction: row;
}
#arrow-left{
  padding-left: 20px;
  color: #0B3A19;
  font-size: 40px;
  text-align: left;
  padding-bottom: 10px;

}
#arrow-right{
  display: inline-block;
  padding-right: 40px;
  color: #0B3A19;
  font-size: 40px;
  text-align: right;
  padding-left: 10px;
  padding-bottom: 10px;
}
#selection-arrow-left{
  padding-left: 10px;
  color: #0B3A19;
  font-size: 20px;
  text-align: left;
  padding-bottom: 10px;
}
#selection-arrow-right{
  display: inline-block;
  padding-right: 40px;
  color: #0B3A19;
  font-size: 20px;
  text-align: right;
  padding-left: 10px;
  padding-bottom: 10px;
}
#alarm-arrow-left{
  padding-left: 10px;
  color: #0B3A19;
  font-size: 20px;
  text-align: left;
  padding-bottom: 10px;
}
#alarm-arrow-right{
  display: inline-block;
  color: #0B3A19;
  font-size: 20px;
  text-align: right;
  padding-left: 10px;
  padding-bottom: 10px;
}
.progress-bar-field{

  position: absolute;
  bottom: 10px;

}
.answer-list{
  padding: 10px;
}

.answer-image-memory {
  width: 32px;
  height: 32px;
}

.shell {
  height: 15px;
  /*border: 1px solid #DEDEDE;*/
  background-color: #DEDEDE;
  text-align: left;
  margin: 0 auto;
  width: 100%;
}

.bar {
  background: #ff6961;
  height: 15px;
  width: 15px;
}
.pbar{
  float: right;
  padding: 4px 5px;
  color: #ff6961;
  font-size: 0.7em
}
img{
  padding: 5px;
  background: transparent;
}
.image_quiz_selection{
  height: 350px;
  width: 550px;
}
.image_quiz_q_dragdrop{
  height: 250px;
  width: 300px;
  margin: auto;
}
.image_quiz_q_dragdrop_rucksack{
  height: 250px;
  width: 270px;
  margin: auto;
}
.image_quiz_q_dragdrop_rucksack_alarm{
  height: 250px;
  width: 270px;
  margin: auto;
}
.image_quiz_alarm_dragdrop{
  height: 250px;
  width: 200px;
}
.image_quiz_uhr_dragdrop{
  height: 350px;
  width: 260px;
  padding-top: 30px;
  margin: auto;
}

.alarm_input{
  width: 257px;
  height: 40px;
}
.image_quiz_i_dragdrop{
  height: 350px;
  width: 500px;
}
.ins{
  padding-top: 70px;
  padding-left: 20px;
}
#quiz_menu{
  padding-right:75px;
}
.image_quiz1_selection2_instr{
  height: 350px;
  width: 500px;
}
@media screen and (max-width: 1200px){
  .text{
    font-size: 20px;
  }
  .text_selection {
    font-size: 20px;
  }

  .mc-text{
    font-size: 20px;
  }
  .ins{
  font-size: 20px;
  }
  .Answer{
    font-size: 20px;
  }
  .Answer__correct{
    font-size: 20px;
  }
  .Answer__wrong{
    font-size: 20px;
  }
}
@media screen and (max-width: 912px) {
  #arrow-left{
    font-size:26px;
    padding-left: 0px;

  }
  #arrow-right{
    font-size:26px;
  }
  .text{
    font-size: 22px;
    padding: 50px 10px;
  }
  .text_selection {
    font-size: 22px;
    padding: 50px 10px;
  }
  .mc-text{
    font-size: 22px;
    padding: 50px 10px;
  }
  .ins{
    padding-top: 50px;
    padding-left: 10px;
  }
  .Answer{
    font-size: 22px;
    padding-left: 29px;
    padding-bottom: 30px;
  }
  .Answer__correct{
    font-size: 22px;
    padding-left: 29px;
    padding-bottom: 30px;
  }
  .Answer__wrong{
    font-size: 22px;
    padding-left: 29px;
    padding-bottom: 30px;
  }
  .feedback-field{
    width: 100%;
  }
  #quiz_menu{
    padding-right: 24px;
    margin-top: 5px;
    font-size: 30px;
  }
  .menu-header{
    text-align: left !important;
    padding-left: 25px;
    padding-top:30px;
  }
  .ins{
    font-size: 22px;
  }
  .image_quiz_mc{
    padding-top: 50px;
    width: 300px;
    height: 425px;
  }

}
@media only screen and (max-width: 820px) {
  .image_quiz1_selection2_instr {
    height: 384px;
    width: 540px;
  }
  .image_quiz1_input{
    height: 410px;
    width: 545px;
  }
}
@media only screen and (max-width: 700px) {

  .menu-header{
    text-align: left !important;
    padding-left: 20px;
  }
}
@media screen and (max-width: 600px) {

  p{
    font-size: 16px;
  }
  .img_selection {
    width: 238px;
    height: 299px;
  }
  .img_selection_2 {
    width: 238px;
    height: 299px;
  }
  .answer-list-selection {
    padding-left: 60px;
  }
  .answer-list-selection_2 {
    padding-left: 60px;
  }
  .answer-list-alarm-drag{
    padding-left: 60px;
  }
  .image_quiz_i_dragdrop{
    height: 150px;
    width: 235px;
  }

  .image_quiz{
    height: 300px;
    width: 250px;
  }
  .image_quiz_selection{
    height: 272px;
    width: 322px;
  }
  .text{
    font-size: 16px;
    padding: 50px 10px;
  }
  .text_selection{
    font-size: 16px;
    padding: 50px 10px;
  }
  .mc-text{
    font-size: 16px;
    padding: 50px 10px;
  }
  .ins{
    font-size: 16px;
    padding-top: 50px;
    padding-left: 10px;
  }
  .Answer{
    font-size: 16px;
    padding-left: 15px;
    padding-bottom: 30px;
  }
  .Answer__correct{
    font-size: 16px;
    padding-left: 15px;
    padding-bottom: 30px;
  }
  .Answer__wrong{
    font-size: 16px;
    padding-left: 20px;
    padding-bottom: 30px;
  }
  /*img{
    height: 367px;
    width: 300px;
  }*/
  icon-field{
    top: -17px;
  }
  .feedback-field{
    width: 100%;
  }

  .q_counter{
    padding-left: 10px;
  }
  #quiz_menu{
    padding-right: 24px;
    font-size: 23px;
    padding-top: 0px;
  }
  .progress-bar{
   width: 90%;
  }
  .image_quiz_slider{
    height: 100px;
    width: 100px;
  }
}
@media screen and (max-width: 500px) {

  .answer-list-selection_2{
    display: block;
    padding-left: 0px;
    padding-top: 0px;
    margin: 0 auto;
    height: 254px;
  }
  .answer-list-alarm-drag{
    display: block;
    padding-left: 0px;
    margin: 0 auto;
  }
  .img_selection_2 {
    width: 257px;
    height: 425px;
  }
  .ins {
    font-size: 16px;
  }
  .text {
    font-size: 16px;
    padding: 37px 10px;
  }
  .text_selection{
    font-size: 16px;
    padding: 37px 10px;
  }
  .mc-text{
    font-size: 16px;
    padding: 37px 10px;
  }
  .Answer {
    font-size: 16px;
  }
  .Answer__correct {
    font-size: 16px;
  }
  .Answer__wrong {
    font-size: 16px;

  }
  .answers-box{
    font-size: 25px;
  }
  .drag-drop{
    padding-top: 10px;
  }
  .drag_answers{
    padding-left: 0px;
    padding-top: 20px;
  }
  .drag-rucksack{
    max-width: 330px;
    padding-top: 70px;
  }
  .drag-rucksack-instr{
    max-width: 330px;
    padding-top: 20px;
  }
  .image_quiz_q_dragdrop{
    height: 130px;
    width: 150px;
  }
  .image_quiz_q_dragdrop_rucksack{
    height: 130px;
    width: 170px;
    margin-left: 0px;
  }
  .image_quiz_alarm_dragdrop{
    height: 130px;
    width: 115px;
  }
  .image_quiz1_selection2_instr{
    height: 290px;
    width: 402px;
  }
  .image_quiz_uhr_dragdrop{
    height: 320px;
    width: 245px;
  }
  .alarm_input {
    width: 200px;
  }
}
@media screen and (max-width: 414px) {
  .image_quiz_mc{
    height: 265px;
    width: 200px;
    padding-top: 25px;
  }
  .image_quiz1_input{
    height: 225px;
    width: 292px;
  }
}
@media screen and (max-width: 393px) {
 .ins{
   font-size: 13px;
 }
.Answer{
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 30px;
}
.Answer__correct{
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 30px;
}
.Answer__wrong{
  font-size: 13px;
  padding-left: 20px;
  padding-bottom: 30px;
}
  .feedback-field{
    height: 250px;
  }
  .text{
    padding-top: 50px;
    padding-left: 10px;
    padding-bottom: 10px;
    font-size: 13px;
  }
  .text_selection{
    padding-top: 50px;
    padding-left: 10px;
    padding-bottom: 15px;
    font-size: 13px;
  }
  .mc-text{
    font-size: 13px;
    padding-top: 50px;
    padding-left: 10px;
    padding-bottom: 20px;
  }
  .answers-box{
    font-size: 20px;
  }
  .image_quiz_q_dragdrop{
    height: 123px;
    width: 141px;
  }
  .image_quiz_q_dragdrop_rucksack{
    height: 123px;
    width: 155px;
  }
  .image_quiz_q_dragdrop_rucksack_alarm{
    height: 170px;
    width: 194px;

  }
  .flip-container-alarm{
    font-size: 30px;
  }
  .drag-drop{
    padding-top: 10px;
  }
  .drag_answers{
    padding-left: 0px;
    padding-top: 20px;
  }
  .drag-rucksack{
    max-width: 288px;
    padding-top: 70px;
  }
  .drag-rucksack-instr{
    max-width: 288px;
    padding-top: 20px;
  }
  .image_quiz1_selection2_instr{
    height: 245px;
    width: 335px;
    padding-top: 20px;
  }
  .image_quiz1_input{
    height: 210px;
    width: 265px;
  }
}
@media screen and (max-width: 375px) {
  .image_quiz_mc{
    height: 210px;
    width: 175px;
    padding-top: 0px;
  }
  .image_quiz1_selection2_instr{
    height: 235px;
    width: 335px;
    padding-top: 10px;
  }
  .image_quiz_uhr_dragdrop{
    height: 238px;
    width: 185px;
  }
 .alarm_input{
   width: 212px;
 }
 .img_selection_2{
   width: 200px;
   height: 284px;
 }
}
@media screen and (max-width: 360px) {
  .img_selection_2 {
    width: 235px;
    height: 340px;
  }
}
</style>                                                                                                                                                                                                                                                                                                                            