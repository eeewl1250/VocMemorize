<template>
  <div>
    <h2>Main Page</h2>
    <span v-if="user">
      User: {{ user }}
      <el-button type="warning" v-on:click="logout">Logout</el-button>
    </span>
    <el-button v-else type="success" v-on:click="login">Login</el-button>
    <p>
      <el-button type="primary" plain v-on:click="wordsImport">Words Import</el-button>
    </p>
    <p>
      <el-button type="primary" plain v-on:click="test">Cookie test</el-button>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Main',
  methods: {
    login () {
      this.$router.replace('/login')
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$cookies.remove(this.$store.state.cookieName)
          this.$router.replace('/login')
        })
    },
    wordsImport () {
      this.$router.push('/import')
    },
    test () {
      this.$cookie.set('username', 'bucky')

      console.log(this.$cookie.get())
      console.log(document.cookie)
      document.cookie = encodeURIComponent('name') + '=' + encodeURIComponent('username')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
