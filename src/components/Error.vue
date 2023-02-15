<template>
  <div class="e-modal-backdrop">
    <div class="e-modal-mask">
      <div class="e-modal-wrapper">
        <div class="e-modal-container">
          <div class="e-modal-body">
            <slot name="e-body" style="color: darkgreen;">
             <b> Username oder Passwort ist falsch.
               <br>
               Bitte versuche es erneut. </b>
            </slot>
          </div>

          <div class="e-modal-footer" style="padding-top: 130px;">
            <slot name="e-footer">
              <button class="button-error" @click="close">
               <b style="color: black;"> OK </b>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.e-modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  /*background-color: rgba(0, 0, 0, 0.2);*/
  display: table;
  transition: opacity 0.3s ease;
}

.e-modal-wrapper {
  display: table-cell;
  padding-top: 200px;
  padding-left: 50px;
}

.e-modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 70px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  height: 350px;
}


.e-modal-body {
  margin: 20px 0;
}

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

.modal-backdrop {

}
.button-error{
  background-color: #ff6961;
  border-radius:5px;
  border:solid #ff6961;
  color: white;
  width: 80px;
  height: 40px;
}
</style>

