<template>
  <div>
    <div class="word-line">
      <span class="gender">{{ word.gender }}</span>
      <span class="word">{{ word.word }}</span>
      <span class="plural">{{ word.plural }}</span>
    </div>
    <div class="Word-mean">
      <p>{{ word.mean }}</p>
      <p>{{ word.examples }}</p>
    </div>
    <div class="recite-buttons">
      <button v-on:click="forgot">忘记</button>
      <button v-on:click="partOf">部分记得</button>
      <button v-on:click="remember">记得</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Word',
  data () {
    return {
      word: [
        {
          gender: 'der',
          word: 'Morgen',
          plural: '-',
          mean: '早晨',
          examples: [
            'Guten Morgen!',
            'Morgen!'
          ]
        },
        {
          gender: 'der',
          word: 'Tag',
          plural: '-e',
          mean: '白天',
          examples: [
            'Guten Tag!'
          ]
        },
        {
          gender: 'der',
          word: 'Abend',
          plural: '-e',
          mean: '晚上',
          examples: [
            'Guten Abend!'
          ]
        }
      ]
    }
  },
  method: {
    forgot () {},
    remember () {},
    partOf () {}
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

.recite-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0.5rem 0;
  position: fixed;
  left: 0;
  bottom: 1px;
  border-top: 1px solid rgba(255,200,200,0.5);
  border-bottom: 1px solid rgba(255,200,200,0.5);
}
.recite-buttons button {
  flex-grow: 1;
  padding: 0.75rem 0;
  margin: 0;
  background: none;
  border: none;
  color: #e8edf3;
  font-family: 'Microsoft YaHei UI Light', sans-serif;
  font-size: 0.9rem;
}
.recite-buttons button:nth-child(2) {
  flex-grow: 1.25;
}
.recite-buttons button:not(:last-child) {
  border-right: 1px solid rgba(255,200,200,0.5);
  border-radius: 0;
}
</style>
