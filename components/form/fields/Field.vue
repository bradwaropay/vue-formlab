<script>
export default {
  props: {
    config: {
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
    name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  methods: {
    updateField(newValue) {
      this.$emit('updateField', newValue)
    }
  }
}
</script>
