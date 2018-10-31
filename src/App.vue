<template>
  <div id="app">
    <el-button type="primary" plain v-on:click="$router.push('/')">Home</el-button>
    <span v-if="user">
      User: {{ user }}
      <el-button type="warning" v-on:click="logout">Logout</el-button>
    </span>
    <el-button v-else type="success" v-on:click="login">Login</el-button>
    <hr />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
