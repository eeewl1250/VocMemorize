<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form ref="newExample" v-bind:model="example" v-bind:rules="rules" status-icon label-width="100px">
        <el-form-item label="Example Name" prop="sentence" required>
          <el-input v-model="example.sentence"></el-input>
        </el-form-item>
        <el-form-item label="From" prop="source" required>
          <el-select v-model="example.source.id" filterable remote clearable placeholder="Where is it from?" :remote-method="getBooks" :loading="loading" loading-text="on loading..." no-match-text="no match book">
            <el-option v-for="item in bookNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" plain v-on:click="submitForm">Register</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddExample',
  data () {
    return {
      bookNames: [],
      example: {
        sentence: '',
        source: {
          name: '',
          id: ''
        }
      },
      loading: false,
      rules: {
        sentence: [
          {required: true, message: '请输入课本名称', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在100个字符以内', trigger: 'blur'}
        ],
        source: [
          {required: true, message: '请选择语言', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'example.source.name': function () {
      return true
    }
  },
  methods: {
    getBooks (name) {
      console.log('send req')
      console.log(name)
      if (!name) {
        console.log('no query data.')
        return false
      }
      this.loading = true
      this.$http.post('/word/book/find', {
        name: name
      })
        .then((res) => {
          res = res.data
          if (res.code === 0) {
            console.error('Get book error.')
            this.bookNames = []
          } else {
            console.log(res.msg)
            this.bookNames = res.data.books.map(item => {
              return {value: item._id, label: item.name}
            })
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm () {
      this.$refs.newExample.validate((valid) => {
        if (!valid) {
          console.log('Submit Error.')
          this.$notify.error({
            title: 'Uncompleted',
            message: 'Please fill your form correctly.'
          })
          return false
        } else {
          this.$http.post('/word/book', {
            name: this.book.name,
            code: this.book.code
          })
            .then(res => {
              res = res.data
              if (!res.code) {
                console.error('Create new book error.')
              } else {
                console.log('Create new book successfully. Book Id: ' + res.data.id)
                this.$notify({
                  title: 'Success!',
                  message: 'Create new book successfully.',
                  type: 'success'
                })
                this.$router.replace('./')
              }
            })
            .catch(err => {
              console.log('Err: ' + err)
              this.$notify.error({
                title: 'Fail',
                message: 'Sorry, book creating has failed.'
              })
            })
        }
      })
    }
  }
}
</script>

<style>
.el-form-item__label {
  color: #fffff0;
}
.el-input.is-disabled .el-input__inner {
  background-color: #22264b;
  border-color: rgba(255, 255, 240, 0.8);
  color: rgba(255, 255, 240, 0.8);
}
</style>
