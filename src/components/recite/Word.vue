<template>
  <div>
    <div class="word-line">
      <span class="gender">{{ word[nowIndex].gender }}</span>
      <span class="word">{{ word[nowIndex].word }}</span>
      <span class="plural">{{ word[nowIndex].plural }}</span>
    </div>
    <div class="Word-mean">
      <p>{{ word[nowIndex].mean }}</p>
      <p>{{ word[nowIndex].examples[0] }}</p>
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
      ],
      frequency: [0, 1, 2, 4, 7, 15, 30, 60, 110, 180, 360, 1080],
      nowIndex: 0,
      progress: []
    }
  },
  computed: {
    list: function () {
      let list = []
      for (let index in this.word) {
        let item = this.word[index]
        list[index] = {
          word: item.word,
          mean: item.mean,
          example: item.examples[0],
          other: {
            example: item.examples[1]
          },
          remember: [],
          numForget: 0
        }
      }
      return list
    }
  },
  mounted () {
    for (let i in this.list) {
      this.progress[i] = {
        reciteDate: 0,
        remember: [],
        forgot: 0
      }
    }
    if (!localStorage.list) {
      localStorage.setItem('list', JSON.stringify(this.list))
    }
    if (!localStorage.progress) {
      localStorage.setItem('progress', JSON.stringify(this.progress))
    }
  },
  methods: {
    setStorage (name, obj) {
      localStorage.setItem(name, JSON.stringify(obj))
    },
    getStorage (name) {
      return JSON.parse(localStorage.getItem(name))
    },
    nextWord (reciteDay, remember, forget) {
      let progress = this.progress[this.nowIndex]
      console.log(this.nowIndex)
      console.log(progress)
      this.progress[this.nowIndex] = {
        reciteDate: progress.reciteDate + 1 - reciteDay,
        remember: remember,
        forgot: progress.forgot + forget
      }
      console.log(this.progress)
      this.setStorage('progress', this.progress)
      this.nowIndex += this.nowIndex < this.list.length - 1 ? 1 : 0
      return true
    },
    forgot () {
      this.nextWord(1, ['word', 'mean', 'example'], 1)
      return true
    },
    partOf () {
      this.nextWord(0.5, [], 0)
      return true
    },
    remember () {
      this.nextWord(0, [], 0)
      return true
    }
  }
}
</script>

<style scoped>
div {
  font-size: 1.1rem;
}
.word-line {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.word-line>span {
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
