<template>
  <div>
    <div class="homeDiv"><span>Home</span></div>
    <p class="homeText" style="--delay: 5s">There's nothing in the Home page dood</p>
    <p class="homeText" style="--delay: 10s">Navigate using the navbar or something, there's nothing here</p>
    <p class="homeText" style="--delay: 25s">what are you doing</p>
    <p class="homeText" style="--delay: 50s">go away</p>
    <p class="homeText" style="--delay: 91s">You've been in here for: {{ time | timeFilter }}</p>
  </div>
</template>

<script>

export default {
  data: ()=>({
    time: 0
  }),
  mounted() {
    window.setInterval(this.tickTimer, 1000);
  },
  methods: {
    tickTimer() {
      this.time += 1;
    }
  },
  filters: {
    timeFilter: function(value) {
      var seconds = value % 60;
      var minutes = (value - seconds) / 60;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      return minutes + ":" + seconds;
    }
  }
}
</script>

<style>
.homeDiv {
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  height: 10rem;
  font-size: 4rem;
  text-align: center;
  -webkit-animation: home 1s forwards; /* Chrome, Safari, Opera */
  animation: home 1s forwards;
}
.homeDiv span {
  margin-left: -40%;
  color: transparent;
  -webkit-animation: homeSpan 1.5s 1s forwards; /* Chrome, Safari, Opera */
  animation: homeSpan 1.5s 1s forwards;
}
.homeText {
  color:transparent;
  --delay: 0s;
  margin-left: -40%;
  -webkit-animation: homeSpan 1.5s var(--delay) forwards; /* Chrome, Safari, Opera */
  animation: homeSpan 1.5s var(--delay) forwards;
}

@keyframes home {
  from {
    background-color: transparent;
    padding-left: -20%;
  }
  to {
    background-color: blueviolet;
    padding-left: 0;
  }
}
@keyframes homeSpan {
  from {
    margin-left: 40%;
    color: transparent;
  }
  to {
    margin-left: 0;
    color: whitesmoke;
  }
}
</style>
