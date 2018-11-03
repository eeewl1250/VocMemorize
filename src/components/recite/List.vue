<template>
  <div class="content">
    <div class="list" v-for="list in lists" v-bind:key="list.name">
      <div class="info">
        <h2>{{ list.name }}</h2>
        <p>{{ list.description }}</p>
      </div>
      <div class="btn">
        <button v-if="list.chosen"><img src="../../assets/img/true.png" /></button>
        <button v-else><img src="../../assets/img/add.png" /></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      lists: [
        {
          name: 'Lektion 1',
          description: 'The first lesson of Passwort Deutsch.',
          chosen: true
        }, {
          name: 'Lektion 2',
          description: 'The second lesson of Passwort Deutsch.',
          chosen: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.content {
  margin: 2rem 0;
}
.list {
  padding: 1rem 3rem;
  border-bottom: 1px solid rgba(255, 200, 200, 0.5);
  text-align: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.list:first-child {
  border-top: 1px solid rgba(255, 200, 200, 0.5);
}
.info {
  flex-grow: 2;
}
.btn, .btn button, .btn img {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
