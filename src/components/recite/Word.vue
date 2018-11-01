<template>
  <div>
    <div class="wordLine">
      <div class="gender">{{ word.gender }}</div>
      <div class="word">{{ word.word }}</div>
      <div class="plural">{{ word.plural }}</div>
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
h1 {}
</style>
