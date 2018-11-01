<template>
  <div>
    <h2>Main Page</h2>
    <p>
      <el-button type="primary" plain v-on:click="$router.push('/import')">Words Import</el-button>
    </p>
    <p>
      <el-button type="primary" plain v-on:click="$router.push('/word')">Words Recite</el-button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Main'
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
