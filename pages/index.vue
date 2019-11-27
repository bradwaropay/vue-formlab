<template>
  <Form v-model="value" :fx="$options.formula" />
</template>

<script>
import Form from '~/components/form/Form.vue'
import Formula from '~/assets/forumla/demo-sectioned.json'

export default {
  formula: Formula,
  components: {
    Form
  },
  data() {
    return {
      value: {
        one: 'test'
      }
    }
  }
}
</script>
