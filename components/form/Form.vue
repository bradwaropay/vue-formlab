<template>
  <form class="fl-form">
    <header v-if="fx.heading || fx.descripton" class="fl-form__header">
      <h1 v-if="fx.heading" class="fl-form__header-heading">
        {{ fx.heading }}
      </h1>
      <p v-if="fx.description" class="fl-form__header-description">
        {{ fx.description }}
      </p>
      <slot name="header" />
    </header>
    <div
      v-for="(section, sectionIndex) in fx.sections"
      :key="getFormKey(sectionIndex)"
      :style="getColumns(section.columns || fx.sectionColumns, 1)"
      :class="'fl-form__section--' + getFormKey(sectionIndex)"
      class="fl-form__section"
    >
      <h2 v-if="section.heading" class="fl-form__section-heading">
        {{ section.heading }}
      </h2>
      <p v-if="section.description" class="fl-form__section-description">
        {{ section.description }}
      </p>
      <slot :name="getFormKey(sectionIndex)" />
      <fieldset
        v-for="(fieldset, fieldsetIndex) in section.fieldsets"
        :key="getFormKey(sectionIndex, fieldsetIndex)"
        :name="getFormKey(sectionIndex, fieldsetIndex)"
        :class="'fl-form__fieldset--' + getFormKey(sectionIndex, fieldsetIndex)"
        class="fl-form__fieldset"
      >
        <legend v-if="fieldset.heading" class="fl-form__fieldset-legend">
          {{ fieldset.heading }}
        </legend>
        <p v-if="fieldset.description" class="fl-form__fieldset-description">
          {{ fieldset.description }}
        </p>
        <slot :name="getFormKey(sectionIndex, fieldsetIndex)" />
        <div
          :style="getColumns(fieldset.columns || fx.fieldsetColumns, 2)"
          class="fl-form__fields"
        >
          <div
            v-for="(field, fieldIndex) in fieldset.fields"
            :key="getFormKey(sectionIndex, fieldsetIndex, fieldIndex)"
            :style="getColumnSpan(field.columnSpan)"
            :class="
              'fl-form__field--' +
                getFormKey(sectionIndex, fieldsetIndex, fieldIndex)
            "
            class="fl-form__field"
          >
            <label
              v-if="field.label"
              :for="getFormKey(sectionIndex, fieldsetIndex, fieldIndex)"
              class="fl-form__field-label"
            >
              {{ field.label }}
            </label>
            <FormField
              :field="field"
              :field-id="getFormKey(sectionIndex, fieldsetIndex, fieldIndex)"
              :lib="combinedLib"
              :value="getFieldValue(field)"
              @updateForm="updateForm(field.key, $event)"
            />
            <p v-if="field.description" class="fl-form__field-description">
              {{ field.description }}
            </p>
          </div>
        </div>
      </fieldset>
    </div>
    <footer class="fl-form__footer">
      <div class="fl-form__actions">
        <input
          type="submit"
          value="Submit"
          class="fl-form__action fl-form__action--submit"
          @click="$emit('submit')"
        />
      </div>
    </footer>
  </form>
</template>

<script>
import _ from 'lodash'

import FormField from './FormField'

export default {
  components: {
    FormField
  },
  props: {
    fx: {
      type: Object,
      default() {
        return {}
      }
    },
    lib: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    combinedLib() {
      const nativeLib = {}
      return { ...nativeLib, ...this.lib }
    }
  },
  created() {
    const themeDir = this.fx.themeDir || './style/theme'
    const theme = this.fx.theme || 'default'
    import(`${themeDir}/${theme}.css`)
  },
  methods: {
    getColumns(columns, defaultColumns) {
      return {
        gridTemplateColumns: `repeat(${columns || defaultColumns}, 1fr)`
      }
    },
    getColumnSpan(columnSpan) {
      return {
        gridColumn: `span ${columnSpan || 'auto'}`
      }
    },
    getFieldValue(field) {
      const value = _.get(this.value, field.key, null)
      if (field.value && value === null) this.updateForm(field.key, field.value)
      return value
    },
    getFormKey(...index) {
      return [...index]
        .map((arg) => {
          return arg + 1
        })
        .join('-')
    },
    updateForm(key, value) {
      _.set(this.value, key, value)
      this.$emit('input', { ...this.value })
    }
  }
}
</script>

<style scoped>
@import './style/reset.css';

.fl-form__section,
.fl-form__fields {
  display: grid;
}
</style>
