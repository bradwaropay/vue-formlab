<template>
  <component
    :is="fieldType"
    :config="field.config"
    :field-id="fieldId"
    :lib="lib"
    :value="value"
    @updateField="$emit('updateForm', $event)"
  />
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {}
      }
    },
    fieldId: {
      type: String,
      default: null
    },
    lib: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: [String, Number, Array, Object, Boolean],
      default: null
    }
  },
  computed: {
    fieldType() {
      const dir = this.field.type || 'alphanumeric'
      const file = dir
        .match(/[a-z]+/gi)
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        })
        .join('')

      return () => import(`./fields/${dir}/${file}`)
    }
  }
}
</script>
