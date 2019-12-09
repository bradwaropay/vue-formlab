<template>
  <div class="form-composer">
    <div class="form-composer__sidebar">
      <ElementLibrary />
    </div>
    <div class="form-composer__workspace">
      <button
        class="form-composer__button form-composer__button--edit"
        @click="toggleEdit()"
      >
        <fa :icon="['fas', edit ? 'stream' : 'pen']" />
      </button>
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
  computed: {
    ...mapState(['formValue'])
  },
  data() {
    return {
      edit: true,
      value: {}
    }
  },
  methods: {
    setFormValue(value) {
      this.$store.commit('SET_FORM_VALUE', value)
    },
    toggleEdit() {
      this.edit = !this.edit
    }
  }
}
</script>

<style scoped>
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.075' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  position: relative;
}

.form-composer__workspace:hover .form-composer__button--edit {
  opacity: 1;
  pointer-events: all;
}

.form-composer__button {
  background-color: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
}

.form-composer__button--edit {
  background-color: whitesmoke;
  box-shadow: -0.05rem 0.05rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  color: darkgray;
  font-size: 1rem;
  height: 2rem;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  transform-origin: right top;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: 2rem;
}

.form-composer__button--edit:hover {
  transform: scale(1.075);
}
</style>
