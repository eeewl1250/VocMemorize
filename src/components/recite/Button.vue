<template>
  <div class="recite-buttons">
      <button>忘记</button>
      <button>部分记得</button>
      <button>记得</button>
  </div>
</template>

<style scoped>
.recite-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0.5rem 0;
  position: fixed;
  left: 0;
  bottom: 1px;
  border-top: 1px solid rgba(255,200,200,0.5);
  border-bottom: 1px solid rgba(255,200,200,0.5);
}
.recite-buttons button {
  flex-grow: 1;
  padding: 0.75rem 0;
  margin: 0;
  background: none;
  border: none;
  color: #e8edf3;
  font-family: 'Microsoft YaHei UI Light', sans-serif;
  font-size: 0.9rem;
}
.recite-buttons button:nth-child(2) {
  flex-grow: 1.25;
}
.recite-buttons button:not(:last-child) {
  border-right: 1px solid rgba(255,200,200,0.5);
  border-radius: 0;
}
</style>
