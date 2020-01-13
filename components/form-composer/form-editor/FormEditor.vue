<template>
  <div class="form-editor">
    Form Editor
  </div>
</template>

<script>
export default {
  props: {
    fx: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.form-editor {
  padding: 2rem;
}
</style>
