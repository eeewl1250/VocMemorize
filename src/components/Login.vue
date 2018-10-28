<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form v-bind:model="user" v-bind:rules="rules" ref="formUser" status-icon label-width="80px">
        <el-form-item label="Username" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain v-on:click="login">Login</el-button>
          <el-button type="primary" plain v-on:click="register">register</el-button>
          <el-button v-on:click="home" plain>Home</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: 'bucky',
        password: '123456'
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter your username',
            trigger: 'blur'
          }, {
            min: 3,
            max: 12,
            message: 'Length between 3 and 12 please',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    home () {
      this.$router.replace('/')
    },
    login () {
      // $refs 是 vue 的方法，el-form里指定了ref=‘formUser’
      // formUser是在前面el-form里定义的ref
      this.$refs.formUser.validate((valid) => {
        if (valid) {
          this.$http.post('/login', {
            name: this.user.name,
            password: this.user.password
          })
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
        } else {
          console.log('Form invalid.')
          this.$notify.error({
            title: 'Form invalid.',
            message: 'Please check your form.'
          })
          return false
        }
      })
    },
    register () {
      this.$router.replace('/register')
    }
  }
}
</script>

<style scoped>
h1 {
  color: lightblue;
}
</style>
