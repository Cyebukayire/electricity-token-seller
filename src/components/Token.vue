<template>
  <div class="token">{{token}}</div>
</template>

<script>
export default {
  name: 'Token',
  props: {
    token: String
  }
}
</script>

<style scoped>
.token {
  color: #20b689;
  width: 100%;
  font-size: 20px;
}
</style>