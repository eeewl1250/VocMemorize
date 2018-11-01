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
  mounted () {
    this.$http.post('/login')
      .then(res => {
        res = res.data
        if (res.code) {
          this.$store.dispatch('login', res.data.name)
            .then(() => {
              this.$notify({
                title: 'success',
                message: 'Welcome, ' + res.data.name + '!',
                type: 'success'
              })
              console.log(res.msg)
              this.$router.replace('./')
            })
        } else {
          this.$notify.error({
            title: 'Fail.',
            message: res.msg
          })
        }
      })
      .catch(err => {
        console.log(err)
        this.$notify.error({
          title: 'Network fail.',
          message: 'Please check your network.'
        })
      })
  },
  methods: {
    login () {
      this.$router.replace('/login')
    },
    logout () {
      if (!this.user) {
        console.error('Not login yet.')
      }
      this.$http.post('/login/logout', {
        name: this.user
      })
        .then(res => {
          res = res.data
          if (!res.code) {
            console.error(res.msg)
          } else {
            this.$store.dispatch('logout')
              .then(() => {
                if (this.$cookies.has(this.$configs.cookieName)) {
                  this.$cookies.remove(this.$configs.cookieName)
                }
                this.$router.replace('/login')
              })
          }
        })
        .catch(err => {
          console.error(err)
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
@import url(http://fonts.font.im/css?family=Junge|Open+Sans:400,300);
@import url(./assets/css/default.css);
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  color: ivory;
  margin: 0 auto;
}
h1, h2, h3, h4, h5, h6 {
  font-family: Junge, Helvetica, Arial, sans-serif;
  font-weight: 300;
}
button {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 400;
}
body {
  background-color: #22264b;
}
</style>
