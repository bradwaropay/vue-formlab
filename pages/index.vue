<template>
  <Form v-model="value" :fx="$options.formula" @input="setFormValue($event)" />
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
      value: {}
    }
  },
  methods: {
    setFormValue(value) {
      this.$store.commit('SET_FORM_VALUE', value)
    }
  }
}
</script>
