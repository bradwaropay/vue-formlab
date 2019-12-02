<template>
  <div class="form-lab">
    <div class="form-lab__sidebar">
      <FieldLibrary />
    </div>
    <main class="form-lab__main">
      <nuxt />
    </main>
    <div class="form-lab__sidebar">
      <DataPreview :value="formValue" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import FieldLibrary from '@/components/field-library/FieldLibrary'
import DataPreview from '@/components/data-preview/DataPreview'

export default {
  components: {
    FieldLibrary,
    DataPreview
  },
  computed: {
    ...mapState(['formValue'])
  }
}
</script>

<style scoped>
.form-lab {
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  height: 100vh;
}

.form-lab__sidebar,
.form-lab__main {
  padding: 2rem;
}
</style>
