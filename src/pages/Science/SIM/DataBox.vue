<template>
  <div class="data-table-cell data-box">
    <p v-for="(content, i) in text" :key="i">
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
@import url('../../../assets/Science/science-table.css');
.data-box {
  position: absolute;
  width: 400px;
  padding: 5px;
  border-radius: 1rem;
  box-shadow: 1px 1px 40px -3px var(--box-shadow-color);
  --box-shadow-color: rgba(0,0,0,0.85);
  background: #842ecce6;
  background: linear-gradient(135deg,rgba(2,0,36,.9),rgba(120,9,121,.9) 35%,rgba(255,85,0,.9));
  transition: all linear 0.5s;
}
.data-box p {
  margin-bottom: 0;
}
</style>