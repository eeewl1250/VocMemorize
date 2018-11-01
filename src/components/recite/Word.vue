<template>
  <div>
    <div class="wordLine">
      <span class="gender">{{ word.gender }}</span>
      <span class="word">{{ word.word }}</span>
      <span class="plural">{{ word.plural }}</span>
    </div>
    <router-view />
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
.wordLine {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.wordLine>span {
  margin: 0.2rem;
}
.gender {}
.word {
  font-size: 2rem;
  font-weight: bold;
  font-family: Junge;
  color: #b56969;
}
</style>
