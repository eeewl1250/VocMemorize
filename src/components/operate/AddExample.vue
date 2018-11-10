<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form ref="newExample" v-bind:model="example" v-bind:rules="rules" status-icon label-width="160px">
        <el-form-item label="From" prop="source.id" required>
          <el-select v-model="example.source.id" filterable remote clearable placeholder="Where is it from?" :remote-method="getBooks" :loading="loading" loading-text="on loading..." no-match-text="no match book">
            <el-option v-for="item in bookNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Example Name" prop="sentence" required>
          <el-input v-model="example.sentence"></el-input>
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
    var sentCheck = (rule, value, callback) => {
      if (!this.example.source.id || !value) {
        callback()
      } else {
        this.$http.post('/word/exp/find', {
          sentence: value,
          source: this.example.source.id
        })
          .then(res => {
            res = res.data
            switch (res.code) {
              case 1: callback(new Error('Example existed.'))
                break
              case 0: callback()
                break
              case -1: callback(new Error('Server Error.'))
                break
            }
          })
          .catch(err => {
            console.log(err)
            callback(new Error('Page Error.'))
            return false
          })
      }
    }
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
          {required: true, message: '请输入句子', trigger: 'blur'},
          {min: 1, max: 100, message: '长度在100个字符以内', trigger: 'blur'},
          {validator: sentCheck, trigger: 'blur'}
        ],
        'source.id': [
          {required: true, message: '请选择句子来源', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    'example.source.id': function () {
      let _this = this
      this.example.source.name = this.bookNames.filter(book => {
        return book.value === _this.example.source.id
      }, _this)[0].label
      return true
    }
  },
  methods: {
    getBooks (name) {
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
          this.$http.post('/word/example', {
            sentence: this.example.sentence,
            source: this.example.source.id
          })
            .then(res => {
              res = res.data
              if (res.code === 0) {
                console.error('Create new example error.')
              } else {
                console.log('Create new example successfully. Example Id: ' + res.data.id)
                this.$notify({
                  title: 'Success!',
                  message: 'Create new example successfully.',
                  type: 'success'
                })
                this.$router.replace('./')
              }
            })
            .catch(err => {
              console.log('Err: ' + err)
              this.$notify.error({
                title: 'Fail',
                message: 'Sorry, example creating has failed.'
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
