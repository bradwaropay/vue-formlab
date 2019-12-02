<template>
  <ul class="data-preview">
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
      <template v-else>
        <span class="data-preview__value">{{ fieldValue }}</span>
      </template>
    </li>
  </ul>
</template>

<script>
import DataPreview from '@/components/data-preview/DataPreview'

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
  methods: {
    isObject(value) {
      return typeof value === 'object' && value !== null
    }
  }
}
</script>

<style scoped>
.data-preview__item .data-preview {
  margin-left: 1rem;
}
</style>
