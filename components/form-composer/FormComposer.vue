<template>
  <div class="form-composer">
    <div class="form-composer__sidebar">
      <ElementLibrary />
    </div>
    <div class="form-composer__workspace">
      <FormEditor v-if="edit" />
      <FormPreview
        v-else
        v-model="value"
        :fx="$options.formula"
        @input="setFormValue($event)"
      />
    </div>
    <div class="form-composer__sidebar">
      <DataPreview :value="formValue" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import DataPreview from './data-preview/DataPreview'
import ElementLibrary from './element-library/ElementLibrary'
import FormEditor from './form-editor/FormEditor'
import FormPreview from '@/components/form/Form.vue'

import Formula from '~/assets/forumla/demo-sectioned.json'

export default {
  formula: Formula,
  components: {
    DataPreview,
    ElementLibrary,
    FormEditor,
    FormPreview
  },
  props: {
    edit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['formValue'])
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

<style scoped>
@import '@/assets/style/svg/texture';

.form-composer {
  display: grid;
  font-family: 'Open Sans', sans-serif;
  grid-template-columns: 20rem 1fr 20rem;
  height: 100%;
}

.form-composer__sidebar {
  padding: 2rem;
}

.form-composer__workspace {
  background-color: #ffffff;
  background-image: $texture;
  position: relative;
}

.form-composer__workspace:hover .form-composer__button--edit {
  opacity: 1;
  pointer-events: all;
}

.form-composer__button--edit:hover {
  transform: scale(1.075);
}
</style>
