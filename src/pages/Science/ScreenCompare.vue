<template>
  <div class="mainView">
    <div class="addDialogWrapper">
      <div class="addDialog">
        <button>Add Desk</button>
        <button>Add Monitor</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        screens: []
    }),
    mounted() {

    }
}
</script>

<style>
.mainView {
    margin: 5px;
    height: 80vh;
    background-color: black;
}
.addDialogWrapper {
  background: rgb(2,0,36);
  background: linear-gradient(135deg, rgba(2,0,36,0.8) 0%, rgba(120,9,121,0.8) 35%, rgba(255,85,0,0.8) 100%);
  padding: 10px;
  position: relative;
  border-radius: 10px;
  top: 10px;
  left: 10px;
  width: 300px;
  padding: 4px;
}
.addDialog {
  background: rgb(19, 18, 29);
  border-radius: 8px;
  padding: 4px;
}
</style>
