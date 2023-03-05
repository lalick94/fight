<template>
<!--  <div class="modal-backdrop">-->
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
             <b> Hi, <br> <br>
              Du hast eine neue Aufgabe zu erledigen. </b>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="button-alert" @click="close">
              <b>OK</b>
              </button>
            </slot>
          </div>
        </div>
<!--      </div>-->
    </div>


  </div>
</template>

<script>
export default {
  name: 'Alert',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: transparent;
  /*background-color: rgba(0, 0, 0, 0.2);*/
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 340px;
  /*margin: 0px auto;*/
  margin-right: 60px;
  margin-left: auto;
  padding: 20px 30px;
  background-color:white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.button-alert{
  background-color: #0B3A19;
  border-radius:5px;
  border:solid #0B3A19;
  color: white;
}
.modal-body{
  color: #0B3A19;
}
</style>

