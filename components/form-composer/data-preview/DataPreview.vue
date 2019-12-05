<template>
  <ul class="data-preview">
    <li v-if="!hasData">No Data</li>
    <li
      v-for="(fieldValue, fieldKey) in value"
      :key="fieldKey"
      class="data-preview__item"
    >
      <span class="data-preview__key">{{ fieldKey }}:</span>
      <template v-if="isObject(fieldValue)">
        {
        <DataPreview :value="fieldValue" />
        }
      </template>
      <span v-else class="data-preview__value">{{ fieldValue || 'null' }}</span>
    </li>
  </ul>
</template>

<script>
import DataPreview from './DataPreview'

export default {
  name: 'DataPreview',
  components: {
    DataPreview
  },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    hasData() {
      return Object.keys(this.value).length > 0
    }
  },
  methods: {
    isObject(value) {
      return typeof value === 'object' && value !== null
    }
  }
}
</script>

<style scoped>
.data-preview__item {
  line-height: 1.5;
}

.data-preview__item .data-preview {
  margin-left: 1rem;
}

.data-preview__key {
  font-weight: 600;
}
</style>
