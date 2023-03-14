<template>
  <div id="quiz">
    <Header></Header>
    <router-link :to="{name: 'vertiefungsmenu'}">
      <div class="menu-header">
        <i class="fa fa-arrow-left" aria-hidden="true" @click="pageDecrease()" id="quiz_menu"><span class="menu_text">Menu</span></i>
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
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz2">
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
              <div v-if="question.type === 'DRAG_DROP'">
                <div v-if="question.counter === 3" class="drag-drop">
                  <div class="drag_answers"
                       v-for="(answer, idx) in question.answers"
                       v-bind:item="answer"
                       v-bind:index="idx"
                       v-bind:key="'answer'+ page + idx"
                       @click="checkAnswer(answer)" >
                    <div v-if="dragDropShowAll ? true : idx >= dragDropPage * 5 && idx < (dragDropPage * 5) + 5"
                         draggable="true"
                         class="answers-box"
                         v-bind:style="answer.clicked ? 'background-color: green;' : ''"
                         @click="selectDragDropAnswer(answer)" >
                      {{ answer.answer }}
                    </div>
                  </div>
                  <div class="drag_drop_controls">
                    <a @click="dragDropPrevious()">left</a>
                    <a @click="dragDropNext()">right</a>
                  </div>
                </div>
                <!--                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>-->
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.image}`" v-if="question.image && question.counter === 2" class="image_quiz2">
                <p style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.image}_${dragDropImgIndex}.jpeg`" v-if="question.image && question.counter === 3" @dragover="dragOverImg($event)" @drop="dropAnswer($event)" >
              </div>
              <div v-if="question.type === 'SELECTION_2'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2_selection2_instruction">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz">
                <div class="answer-list-selection-2" style="text-align: center" v-if="question.counter === 3">
                  <div v-for="(answer, idx) in question.answers" v-bind:key="idx" class="flip-container" :class="{ selected: answer.selected }" @click="cardSelected(answer)">
                    <div v-if="selectionDesktop">
                      <div class="front border rounded shadow" id="img_slc" :class="quizType === 'COMIC' ? 'custom_front' : ''" v-if="answer.image" >
                        <img class="img_selection" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div class="front rounded" id="answer_selection_containter" v-if="answer.answer !== 'dummy'">
                        <div class="answer_selection" >{{answer.answer}}</div>
                      </div>
                    </div>
                    <div v-if="!selectionDesktop && answer.image && idx === selection2CurrentIdx" style="display: table;" class="selectionDesktop">
                      <div style="min-width: 37px;">
                      <i class="fa fa-arrow-left" aria-hidden="true" v-if="answer.image && idx === selection2CurrentIdx && idx !== 0" @click="changeSelection2Image(idx - 1)" style="display: table-cell;"></i>
                      </div>
                      <div class="front border rounded shadow" :class="quizType === 'COMIC' ? 'custom_front_2' : ''" v-if="answer.image && idx === selection2CurrentIdx" style="display: table-cell;" >
                        <img class="img_selection_2" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img_2' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div style="min-width: 37px;">
                      <i class="fa fa-arrow-right" aria-hidden="true" v-if="answer.image && idx === selection2CurrentIdx && idx < question.answers.length - 1" @click="changeSelection2Image(idx + 1)" style="display: table-cell;"></i>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
              <div v-if="question.type === 'SELECTION'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2_selection_instruction">
                <p  class="text_selection" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz2">
                <div class="answer-list-selection" style="text-align: center" v-if="question.counter === 3">
                  <div v-for="(answer, idx) in question.answers" v-bind:key="idx" class="flip-container" :class="{ selected: answer.selected }" @click="cardSelected(answer)">
                    <div>
                      <div class="front border rounded shadow"  :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_front' : ''" v-if="answer.image">
                        <img class="img_selection" :class="quizType === 'SELBSTDARSTELLUNGONLINE' ? 'custom_img' : ''"  v-bind:src="`images/assets/${answer.image}`">
                      </div>
                      <div class="front rounded" id="answer_selection_containter" v-if="answer.answer !== 'dummy'">
                      <div class="answer_selection" >{{answer.answer}}</div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="question.type === 'INPUT_FIELD'">
                <div  class="text" style="text-align: left;" v-if="question.counter === 1"><p>{{ question.info }}</p> <p style="color: #ff6961;">{{question.dependingCustomAnswer.userAnswer}}</p></div>
                <p class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text_question_instruction" style="text-align: left;" v-if="question.counter === 2" v-html="question.instruction"></p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2_inputfield_instruction">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <div class="answer-list" style="text-align: center;" v-if="question.counter === 3">
                  <img v-if="question.dependingCustomAnswer && question.dependingCustomAnswer.image" v-bind:src="`images/assets/${question.dependingCustomAnswer.image}`" class="input-field-image">
                  <textarea v-model="question.customAnswer"  id="name" name="name" class="feedback-field" placeholder="Schreib hier etwas..."></textarea>
<!--                  <input  type="text" id="name" name="name" class="feedback-field" placeholder="Schreib hier etwas.."><br><br>-->
                </div>
            </div>
              <div v-if="question.type === 'SLIDER'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <div class="text" style="text-align: left;" v-if="question.counter === 3"><p>{{ question.question}}</p></div>
                <div class="answer-list" style="text-align: left" v-if="question.counter === 3">
                  <input type="range" min="1" max="100" class="slider" id="myRange" v-model="question.customAnswer">
                </div>
                <div class="image_quiz_slider" v-if=" question.counter === 3" id="toptext"><p style="padding-left: 10px;">{{question.left_slider}}</p>
<p style="color: #ff6961;">{{quizQuestions.find(q => q.id === question.dependingQuestionId).answers.find(a => a.selected).answer}}</p>  <p style="padding-right: 10px;">{{question.right_slider}}</p>
                </div>
              </div>
              <div v-if="question.type === 'FEEDBACK'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz2">
                <div class="answer-list" style="text-align: center" v-if="question.counter === 3">
                  <input type="text" id="fname" name="fname" class="feedback-field" placeholder="Schreib hier etwas.."><br><br>
                </div>
              </div>
              <div v-if="question.type === 'TIMER'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4" v-html="question.explanation"></p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <p  class="text" style="text-align: left;" v-if="question.counter === 3">{{ question.question}}</p>
                <p v-if="question.counter === 3" class="timer-counter">You have <span style="color:#ff6961; font-weight: bold;"> {{time}} </span> seconds</p>
                <img v-bind:src="`images/assets/${question.question_image}.png`" v-if="question.question_image && question.counter === 3" class="image_quiz2_timer">
              </div>
              <div v-if="question.type === 'MANDALA'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <div class="text" style="text-align: left;" v-if="question.counter === 3"><p>{{ question.question}}</p> <p>{{question.dependingCustomAnswer}}</p></div>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz2">
                <div class="answer-list" style="text-align: center" v-if="question.counter === 3">
                  <p>TODO: Mandala</p>
                </div>
              </div>
              <div v-if="question.type === 'MEMORY'">
                <p  class="text" style="text-align: left;" v-if="question.counter === 1">{{ question.info }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 4">{{ question.explanation }}</p>
                <p  class="text" style="text-align: left;" v-if="question.counter === 2">{{ question.instruction }}</p>
                <img v-bind:src="`images/assets/${question.instruction_image}`" v-if="question.instruction_image && question.counter === 2" class="image_quiz2">
                <div class="memory" style="text-align: left;" v-if="question.counter === 3"><p>{{ question.question}}</p> <p>{{question.dependingCustomAnswer}}</p></div>
                <img v-bind:src="`images/assets/${question.question_image}`" v-if="question.question_image && question.counter === 3" class="image_quiz2">
                <div class="answer-list-memory" v-if="question.counter === 3">
                  <div v-for="(answer, idx) in question.answers" v-bind:key="idx" class="flip-container" :class="{ flipped: answer.isFlipped }" @click="flipCard(answer)">
                      <div>
                        <div class="back border rounded shadow">
                          <img class="memory-img" v-bind:src="`images/assets/${answer.image}`">
                        </div>
                        <div class="front rounded border">
                          <img class="memory-img" v-bind:src="`images/assets/questionmark.png`">
                        </div>
                      </div>
                  </div>
                  <span class="memory_congr" v-if="question.answers.every(a => a.isMatch)"><b>Congratulation you found all cards</b></span>
                </div>
              </div>
            </div>
          </div>
          <div class="progress-bar-field">
            <div class="left-arrow">
              <i class="fa fa-arrow-left" aria-hidden="true" @click="pageDecrease()" v-if="page > 0 || quizQuestions[page]?.counter > 1"></i>
            </div>
            <div class="progress-bar">
              <span class="pbar"> <b>{{ `${Math.round(progress / (100 / (quizQuestions.length - 1))).toFixed(0)} / ${quizQuestions.length - 1}` }}</b></span>
              <div class="shell">
                <div class="bar" :style="{ width: progress + '%' }">
                </div>
              </div>
            </div>
            <div class="right-arrow">
              <i class="fa fa-arrow-right" aria-hidden="true" @click="pageIncrease()" v-if="!(quizQuestions.length - 1 === page && quizQuestions[page]?.counter === quizQuestions[page]?.subpages)"></i>
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
import _ from 'lodash';

export default {
  components: {QuestionBox, Header},
  data() {
    return {
      quizQuestions: [],
      page: 0,
      interval: '',
      progress:0,
      time: 20,
      dragDropImgIndex: 2,
      dragDropPage: 0,
      dragDropShowAll: true,
      quizType: '',
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
      this.quizType = this.$route.name.toUpperCase();
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
        const memoryAnswrs = q.answers.map(a => ({...a, isFlipped: false, isMatch: false}));
        return {
          ...q,
          subpages: count,
          counter: start,
          start,
          answers: q.type === 'MEMORY' ? _.shuffle([..._.cloneDeep(memoryAnswrs), ..._.cloneDeep(memoryAnswrs)]) : q.answers,
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
    getTimer(deadline) {
      const time = Date.parse(deadline) - Date.now();
      return {
        seconds: Math.floor((time / 1000) % 60),
      };
    },
    cardSelected(card){
      this.quizQuestions[this.page].answers.forEach(a => a.selected = false);
      card.selected = true;
    },
    flipCard(card){
      const flippedCards = [...this.quizQuestions[this.page].answers.filter(c => c.isFlipped && !c.isMatch)];
      if(flippedCards.length < 2) {
        card.isFlipped = true;
        flippedCards.push(card);
      }
      setTimeout(() => {
        console.log("Test");
        if (flippedCards.length >= 2) {
          if (flippedCards[0].id === flippedCards[1].id) {
            flippedCards[0].isMatch = true;
            flippedCards[1].isMatch = true;
          } else {
            flippedCards[0].isFlipped = false;
            flippedCards[1].isFlipped = false;
          }
        }
      }, 2000);
    },
    selectDragDropAnswer(answer) {
      if(this.dragDropShowAll){
        return;
      }
      console.log("Answer selected");
      this.dragDropImgIndex = 1;
      new Promise(resolve => {
        setTimeout(resolve, 2000);
      }).then(() => this.dragDropImgIndex = 2);
      answer.clicked = answer.clicked === undefined ? true : !answer.clicked;
    },
    dragDropNext() {
      this.dragDropPage++;
      console.log(this.dragDropPage);
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
      this.dragDropImgIndex = 1;
    },
    dropAnswer(event){
      event.preventDefault();
      console.log("test");
      this.dragDropImgIndex = 2;
    },
    async pageIncrease(){
      const question = this.quizQuestions[this.page];
      if((question.type === 'INPUT_FIELD' || question.type === 'SLIDER' || question.type === 'TIMER') && question.counter === 3){
        if(question.answers && question.answers.length) {
          await this.checkAnswer({
            id: question.answers[0].id,
          });
        }
      }
      if(this.quizQuestions[this.page].type === 'MEMORY') {
        if(this.quizQuestions[this.page].answers.every(a => a.isMatch)) {
          this.progress += 100 / (this.quizQuestions.length - 1);
        }
      }
      if(question.type === 'SELECTION' || question.type === 'SELECTION_2'  && question.counter === 3){
        if(question.answers && question.answers.length && question.answers.some(a => a.selected)) {
          await this.checkAnswer(question.answers.filter(a => a.selected)[0]);
        }
      }
      if(question.counter !== question.subpages){
        question.counter++;
        this.time = 20;
        clearInterval(this.interval);
        this.interval = setInterval(() => { if(this.time > 0) this.time-- }, 1000);
      } else {
        this.page++;
        if(this.quizQuestions[this.page].dependingQuestionId){
          this.quizQuestions[this.page].dependingCustomAnswer = await this.getCustomAnswer(this.quizQuestions[this.page].dependingQuestionId);
          console.log(this.quizQuestions[this.page]);
        }
      }
    },
    async getCustomAnswer(questionId) {
      const customAnswer = await QuestionService.getCustomAnswer(questionId);
      return customAnswer;
    },
    async pageDecrease(){
      if(this.quizQuestions[this.page].start < this.quizQuestions[this.page].counter){
        this.quizQuestions[this.page].counter--;
        this.time = 20;
        clearInterval(this.interval);
        this.interval = setInterval(() => { if(this.time > 0) this.time-- }, 1000);
      } else {
        if(this.page > 0) {
          this.page--;
          this.quizQuestions[this.page].counter = this.quizQuestions[this.page].subpages;
          if(this.quizQuestions[this.page].dependingQuestionId){
            this.quizQuestions[this.page].dependingCustomAnswer = await this.getCustomAnswer(this.quizQuestions[this.page].dependingQuestionId);
          }
        }
      }
    },
    async checkAnswer(answer) {
      const a = {
        answerId: answer.id,
        questionId: this.quizQuestions[this.page].id,
        customAnswer: this.quizQuestions[this.page].customAnswer,
      };
      const res = await AnswersService.getQuizAnswers(a);
      if(res.result){
        // alert("Answer correct!");
      } else {
        // alert("Answer not correct");
      }
      if(this.quizQuestions[this.page].answers && res.answers) {
        this.quizQuestions[this.page].answers.forEach(a => {
          if (res.answers.some(ca => ca === a.id)) {
            a.correct = true;
          } else if (a.id === answer.id) {
            a.correct = false;
          } else {
            a.correct = undefined;
          }
        });
      }
      if(this.quizQuestions[this.page].type === 'MC'){
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
#toptext {
  display: flex;
  justify-content: space-between;
}
#quiz_menu{
  font-size: 25px;
  color: #ff6961;
  padding-right: 75px;
}
.slidecontainer {
  width: 100%;
}
.slider:hover {
  opacity: 1;
}

.drag_drop_controls  {
  display: none;
}
.menu-header{
  text-align: right;
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
#img_slc{
  margin-left: 40px;
  margin-top: 30px;
}
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
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
.feedback-field{
  height: 300px;
  box-sizing: border-box;
  width: 60%;
  border: 3px solid #ff6961;
  border-radius:10px;
}
.memory_congr{
color:  #ff6961;
  padding-top: 20px;
}
.answers-box{
  width: 100% ;
  border: 1px solid black;
  font-size: 20px;
  padding: 5px;
}
.input-field-image{
  display:inline;
  float: left;
  height: 300px;
  width: 250px;
  margin-left: 50px;

}
.image_quiz2_selection_instruction{
  height: 340px;
  width: 560px;
}
.image_quiz2_selection2_instruction{
  height: 280px;
  width: 350px;
}
.drag-drop {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
button{
  width: 500px;
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
  padding: 60px 40px;
  text-align: center;
}
.text_question_instruction{
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
.fa-arrow-left{
  padding-left: 20px;
  color: #0B3A19;
  font-size: 40px;
  text-align: left;
  padding-bottom: 10px;

}
.fa-arrow-right{
  display: inline-block;
  padding-right: 40px;
  color: #0B3A19;
  font-size: 40px;
  text-align: right;
  padding-left: 10px;
  padding-bottom: 10px;
}
.progress-bar-field{

  position: absolute;
  bottom: 10px;

}
/*.answer-list{
  padding:10px;
}*/
.answer-list-memory{
  margin: 0 auto;
  padding-top: 50px;
 display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
}
.answer-list-selection{
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70%;
}
.answer-list-selection-2{
  margin: 0 auto;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70%;
}
.flip-container{
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -o-perspective: 1000;
  perspective: 1000;
  cursor: pointer;
}
.flip-container .img_selection{
  *height: 180px;
}
.answer_selection{
  width: 168px;
  height: 128px;
  padding-top: 11px;
  font-weight: bold;
}
.img_selection {
  width: 138px;
  height: 180px;
}
.memory-img{
  width: 128px;
  height: 128px;
}

.flip-container .answer_selection{
  height: 70px;
  border: 3px solid darkgray;
  margin: 10px;
  border-radius:10px;

}

.custom_front {
  margin: 30px;
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

.flip-container.selected .img_selection{
  border: 5px solid #ff6961;
}
.flip-container.selected .img_selection_2{
  border: 5px solid #ff6961;
}
.flip-container.selected .answer_selection{
  width: 210px;
  height: 100px;
  padding-top: 30px;
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
/*img{
  border: 1px solid white;
  padding: 5px;
  background-color : white;
}*/
.image_quiz2{
  height: 320px;
  width: 300px;
}
.image_quiz2_inputfield_instruction{
  height: 320px;
  width: 300px;
}
.image_quiz2_timer{
  height: 300px;
  width: 250px;
}
.timer-counter{
  padding-bottom: 30px;
}

.ins{
  padding-top: 70px;
  padding-left: 20px;
}
 .custom_img {
  width: 250px;
  height: 250px;
}
.custom_img_2 {
  width: 250px;
  height: 250px;
}
@media screen and (max-width: 930px) {
  .fa-arrow-left{
    font-size:26px;
    padding-left: 0px;

  }
  .fa-arrow-right{
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
  .text_question_instruction{
    font-size: 22px;
    padding: 50px 10px;
  }
  .ins{
    padding-top: 50px;
    padding-left: 10px;
  }
  .Answer{
    font-size: 22px;
    padding-left: 15px;
    padding-bottom: 30px;
  }
  .Answer__correct{
    font-size: 22px;
    padding-left: 15px;
    padding-bottom: 30px;
  }
  .Answer__wrong{
    font-size: 22px;
    padding-left: 20px;
    padding-bottom: 30px;
  }
  #quiz_menu{
    padding-right: 200px;
  }
  .feedback-field{
    width: 90%;
  }
  .answer-list-memory{
    width: 80%;
    padding-top: 20px;
  }
  .answer-list-selection{
    padding-top: 20px;
    width: 100%;
  }
  .answer-list-selection-2{
    padding-top: 20px;
    width: 100%;
  }
  .flip-container .answer_selection{
    height: 65px;
    width: 150px;
    height: 70px;
    padding-top: 10px;
  }

  .flip-container .img_selection{
    height: 150px;
  }
  .menu-header{
    text-align: left !important;
    padding-left: 25px;
    padding-top:30px;
  }

}
@media screen and (max-width: 820px) {
  .text_question_instruction{
    padding-top: 50px;
    padding-left: 10px;
    padding-bottom:80px;
  }
  .feedback-field{
    height: 430px;
  }
  .answer-list-selection{
    padding-left:40px;
  }
  .flip-container .answer_selection{
    height: 95px;
    padding-top: 13px;
  }
  .flip-container.selected .answer_selection{
    height: 110px;
    padding-top: 13px;
    width: 150px;
  }
}
@media screen and (max-width: 820px) {
  .answer-list-selection{
    padding-left:100px;
  }
  .answer-list-selection{
    padding-top: 0px;
  }
  .image_quiz2_selection2_instruction {
    padding-top: 50px;
    height: 330px;
    width: 370px;
  }
  .selectionDesktop{
    margin-left: 180px;
  }
}
@media screen and (max-width: 667px) {
  .menu_text{
    font-weight: 900;
  }
  .text{
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 25px;
  }
  .text_selection {
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 25px;
  }

  .text_question_instruction{
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 25px;
  }
  p{
    font-size: 16px;
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
 .memory-img{
   width: 118px;
   height: 110px;
 }
  icon-field{
    top: -17px;
  }
  .feedback-field{
    width: 100%;
    height: 300px;

  }
  .q_counter{
    padding-left: 10px;
  }
  #quiz_menu{
    padding-right: 24px;
    margin-top: 17px;
    font-size: 25px;
    padding-top: 0px;
  }
  .progress-bar{
    width: 90%;
  }

    .image_quiz2{
      height: 250px;
      width: 280px;
    }
  .answer-list-memory{
    margin: 0 auto;
    padding-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .answer-list-memory{
    padding-top: 20px;
  }
  .flip-container .img_selection{
    height: 90px;
  }
  .img_selection {
    width: 150px;
    height: 100px;
  }
  .input-field-image{
    height: 150px;
    width: 110px;
    float: none;
    margin-left: 0px;
    padding-bottom: 20px;
  }
  .menu-header{
    padding-top: 10px;
  }
}
@media only screen and (max-width: 500px) {
  .answer-list-selection-2{
    display: block;
    padding-left: 0px;
    padding-top: 60px;
    margin: 0 auto;
    height: 254px;
  }
  .img_selection_2 {
    width: 250px;
    height: 375px;
  }
  .drag_drop_controls {
    display: flex;
  }
  .flip-container .answer_selection{
   height: 90px;
    width: 140px;
    height: 90px;
    padding-top: 15px;

  }

  .flip-container .img_selection{
    height: 110px;
  }
  .flip-container.selected .answer_selection{
    width: 140px;
    height: 130px;
    padding-top: 30px;
    border: 3px solid black;
  }
  .selectionDesktop{
    margin-left: 0px;
  }
  .ins {
    font-size: 16px;
  }
  .text {
    font-size: 16px;
    padding: 37px 10px;
  }
  .text_selection {
    font-size: 16px;
    padding-top: 37px;
    padding-left: 10px;
  }
  .text_question_instruction{
    font-size: 16px;
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 55px;
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
  .text_selection {
    padding-top: 0px;
  }
  .flip-container .answer_selection{
    font-size: 14px;
    padding-top:6px;
    height: 60px;
    padding-top: 10px;
  }
  .answer-list-selection{
    padding-left: 20px;
    padding-top: 20px;
  }
  .flip-container.selected .answer_selection{
    border: 3px solid #ff6961;
    width: 140px;
    height: 65px;
    padding-top: 14px;
    margin:10px;
  }
  .image_quiz2_selection2_instruction{
    height: 260px;
    width: 330px;
    padding-top: 0px;
  }
  .custom_img_2 {
    width: 295px;
    height: 375px;
  }
}
@media screen and (max-width: 414px) {
  .ins {
    font-size: 13px;
  }
  .image_quiz2_timer{
    height: 350px;
    width: 300px;
  }
  .feedback-field{
    height: 350px;
  }
  .answer-list-memory{
    padding-top: 70px;
  }
  .memory-img{
    width: 88px;
    height: 85px;
  }
  .image_quiz2_selection_instruction{
    height: 233px;
    width: 372px;
  }
  .image_quiz2_inputfield_instruction{
    height: 247px;
    width: 220px;
  }
}
@media screen and (max-width: 393px) {
  .answer-list-memory{
    padding-top: 50px;
  }
  .memory-img{
    width: 82px;
    height: 73px;
  }
  .answer-list-selection{
    padding-left: 10px;
    padding-top: 0px;
  }
 .selectionDesktop{
   margin-left: 0px;
 }
 .custom_img_2{
   width: 273px;
   height: 360px;
 }
}
@media screen and (max-width: 375px) {
  .text{
    font-size: 13px;
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 10px;
  }
   .text_selection {
     padding-top: 0px;
   }
  .text_question_instruction{
    font-size: 13px;
    padding-left: 16px;
    padding-top: 40px;
    padding-bottom: 25px;
  }
  .image_quiz2_input_instruction{
    height: 345px;
    width: 550px;
  }
  .feedback-field{
    width: 100%;
    height: 250px;

  }
  .custom_img_2 {
    width: 200px;
    height: 245px;
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
  .answer-list-memory{
    padding-top: 15px;
  }
  .answer-list-selection-2{
    padding-top: 15px;
  }
  .selectionDesktop{
    margin-left: 15px;
  }
  .memory-img{
    width: 78px;
    height: 73px;
  }
  .answer-list-selection{
    padding-left: 15px;
    padding-top:0px;
  }
  .flip-container .answer_selection{
    font-size: 12px;
    height: 50px;
    margin: 3px;
    padding-top: 8px;
  }
  .flip-container.selected .answer_selection{
    border: 3px solid #ff6961;
    font-size: 12px;
    height: 50px;
    margin: 3px;
    padding-top: 8px;
  }
  .text_selection{
    padding-top: 0px;
  }
  .image_quiz2_selection_instruction{
    height: 206px;
    width: 345px;
  }
  .image_quiz2_inputfield_instruction{
    height: 209px;
    width: 190px;
  }
  .image_quiz2_selection2_instruction{
    height: 195px;
    width: 255px;
  }
  .input-field-image {
    height: 74px;
    width: 75px;
    padding-bottom: 5px;
  }
  .img_selection_2{
    width: 222px;
    height: 320px;
  }
}
@media screen and (max-width: 360px) {
  .answer-list-selection{
    padding-left: 10px;
    padding-top: 20px;
  }
  .image_quiz2_inputfield_instruction{
    height: 225px;
    width: 190px;
    padding-top: 20px;
  }
  .selectionDesktop{
    margin-left: 10px;
  }
}
</style>