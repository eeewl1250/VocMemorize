<template>
  <div>
    <div v-for="list in lists">
      <p>{{ list.name }}</p>
      <p>{{ list.description }}</p>
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
          description: 'The first lesson of Passwort Deutsch.'
        }, {
          name: 'Lektion 2',
          description: 'The second lesson of Passwort Deutsch.'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
