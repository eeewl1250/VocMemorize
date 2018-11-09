<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form ref="newBook" v-bind:model="book" v-bind:rules="rules" status-icon label-width="100px">
        <el-form-item label="Book Name" prop="name" required>
          <el-input v-model="book.name"></el-input>
        </el-form-item>
        <el-form-item label="Language" prop="lang" required>
          <el-select v-model="book.lang" filterable default-first-option placeholder="Language">
            <el-option v-for="item in langs" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Code">
          <el-input v-model="book.code" :disabled="true" placeholder="Auto-created"></el-input>
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
  name: 'AddBook',
  data () {
    return {
      langs: [{
        value: 'ENG',
        label: 'English'
      }, {
        value: 'DEU',
        label: 'German/Deutsch'
      }],
      book: {
        name: '',
        lang: '',
        code: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入课本名称', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在100个字符以内', trigger: 'blur'}
        ],
        lang: [
          {required: true, message: '请选择语言', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'book.lang': function () {
      this.$http.post('/word/book/code', {
        lang: this.book.lang
      })
        .then((res) => {
          res = res.data
          if (!res.code) {
            console.error('Get code error.')
          } else {
            this.book.code = res.data.code
            console.log(res.data.code)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    submitForm () {
      this.$refs.newBook.validate((valid) => {
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
