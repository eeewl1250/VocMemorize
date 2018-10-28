<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form ref="regForm" v-bind:model="user" v-bind:rules="rules" label-width="160px" status-icon>
        <el-form-item label="Username" prop="name" required>
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="Password Confirm" prop="confirm" required>
          <el-input type="password" v-model="user.confirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain v-on:click="submitForm">Register</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    var checkName = (rule, value, callback) => {
      this.$http.post('/register/name', {
        name: value
      })
        .then(res => {
          if (res.data) {
            callback(new Error('Username exists.'))
          } else {
            callback()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    var checkPass = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error('Please enter the password correctly.'))
      } else {
        callback()
      }
    }
    return {
      user: {
        name: 'test00',
        password: '123456',
        confirm: '123456'
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please enter your name.',
            trigger: 'blur'
          }, {
            min: 5,
            max: 20,
            message: 'Length between 5 and 20 please.',
            trigger: 'blur'
          }, {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password.',
            trigger: 'blur'
          }, {
            min: 6,
            max: 12,
            message: 'Length between 6 and 12 please.',
            trigger: 'blur'
          }
        ],
        confirm: [
          {
            required: true,
            message: 'Please enter your password one more time.',
            trigger: 'blur'
          }, {
            min: 6,
            max: 12,
            message: 'Length between 6 and 12 please.',
            trigger: 'blur'
          }, {
            validator: checkPass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.$http.post('/register', {
            name: this.user.name,
            password: this.user.password
          })
            .then(res => {
              var username = res.data
              if (username) {
                console.log(username)
                console.log('Register success!')
                this.$store.dispatch('login', username)
                  .then(() => {
                    this.$notify({
                      title: 'Success!',
                      message: 'Welcome, ' + username,
                      type: 'success'
                    })
                    this.$router.replace('./')
                  })
              }
            })
            .catch(err => {
              console.log('Err: ' + err)
              this.$notify.error({
                title: 'Fail',
                message: 'Sorry, your register has failed.'
              })
            })
        } else {
          console.log('Submit Error.')
          this.$notify.error({
            title: 'Uncompleted',
            message: 'Please fill your form correctly.'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 250px;
}
</style>
