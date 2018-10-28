<template>
  <div>
    <div class="item">
      <el-button>批量导入</el-button>
    </div>
    <div class="item">
      <h2>单词导入</h2>
      <el-row type="flex" justyfy="center">
        <el-form ref="importForm" v-bind:model="importForm" label-width="80px">
          <el-form-item label="Word" prop="word" required>
            <el-input v-model="importForm.word"></el-input>
          </el-form-item>
          <el-form-item label="Class" prop="wclass">
            <el-select v-model="importForm.wclass" placeholder="class">
              <el-option
                v-for="item in wClasses"
                v-bind:key="item"
                v-bind:label="item"
                v-bind:value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordsImport',
  data () {
    return {
      wClasses: ['noun', 'verb', 'adjective'],
      importForm: {
        word: '',
        wclass: ''
      }
    }
  }
}
</script>

<style scoped>
.item {

  margin: 1em auto;
  padding: 1em;
  border: 1px solid lightskyblue;
  width: 80%;
}
</style>
