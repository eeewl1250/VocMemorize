<template>
  <div>
    <div class="wordLine">
      <span class="gender">{{ word.gender }}</span>
      <span class="word">{{ word.word }}</span>
      <span class="plural">{{ word.plural }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Word',
  data () {
    return {
      word: {
        gender: 'der',
        word: 'Morgen',
        plural: '-'
      }
    }
  }
}
</script>

<style scoped>
.wordLine div {
  display: flex;
  justify-content: center;
  line-height: 2rem;
}
.gender {}
.word {
  font-size: 2rem;
  font-weight: bold;
  /*font-family: "Frutiger Neue W02 Thin", Arial, Helvetica, sans-serif;*/
  font-family: 'Open Sans';
  color: #b56969;
}
</style>
