<template>
  <FormComposer :edit="edit" />
</template>

<script>
import FormComposer from '~/components/form-composer/FormComposer.vue'

export default {
  components: {
    FormComposer
  },
  data() {
    return {
      edit: {
        type: Boolean,
        default: false
      }
    }
  },
  created() {
    this.$bus.$on('toggleFormMode', () => {
      this.edit = !this.edit
    })
  }
}
</script>
