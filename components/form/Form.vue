<template>
  <form>
    <header v-if="fx.heading || fx.descripton" class="fl-form__header">
      <h1 v-if="fx.heading" class="fl-form__header-heading">
        {{ fx.heading }}
      </h1>
      <p v-if="fx.description" class="fl-form__header-description">
        {{ fx.description }}
      </p>
      <slot name="header" />
    </header>
    <div class="fl-form__main">
      <div
        :key="getFormKey(sectionIndex)"
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
        <div
          v-if="section.fieldsets"
          :style="getColumns(section.columns || fx.sectionColumns, 1)"
          class="fl-form__fieldsets"
        >
          <fieldset
            v-for="(fieldset, fieldsetIndex) in section.fieldsets"
            :key="getFormKey(sectionIndex, fieldsetIndex)"
            :name="getFormKey(sectionIndex, fieldsetIndex)"
            :class="
              'fl-form__fieldset--' + getFormKey(sectionIndex, fieldsetIndex)
            "
            class="fl-form__fieldset"
          >
            <legend v-if="fieldset.heading" class="fl-form__fieldset-legend">
              {{ fieldset.heading }}
            </legend>
            <p
              v-if="fieldset.description"
              class="fl-form__fieldset-description"
            >
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
                  :field-id="
                    getFormKey(sectionIndex, fieldsetIndex, fieldIndex)
                  "
                  :lib="compiledLib"
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
      </div>
    </div>
    <footer class="fl-form__footer">
      <div class="fl-form__actions">
        <template v-if="hasSections">
          <button
            v-if="!firstSection"
            class="fl-form__action fl-form__action--section-prev"
            @click.prevent="sectionPrev()"
          >
            {{ fx.sectionPrev || 'Back' }}
          </button>
          <button
            v-if="!lastSection"
            class="fl-form__action fl-form__action--section-next"
            @click.prevent="sectionNext()"
          >
            {{ fx.sectionNext || 'Next' }}
          </button>
        </template>
        <input
          v-if="!hasSections || lastSection"
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
    },
    defaultSection: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      activeSection: this.defaultSection
    }
  },
  computed: {
    compiledLib() {
      const libs = {}
      return { ...libs, ...this.lib }
    },
    hasSections() {
      return this.sectionLength > 1
    },
    section() {
      switch (this.hasSections) {
        case true:
          return _.get(this.fx, `sections[${this.activeSection - 1}]`)
        default:
          const section = _.get(this.fx, 'sections[0]', {})
          if (!section.fieldsets)
            section.fieldsets = _.get(this.fx, 'fieldsets', false)
          return section
      }
    },
    sectionIndex() {
      return this.hasSections ? this.activeSection - 1 : 0
    },
    sectionLength() {
      return _.get(this.fx, 'sections', []).length
    },
    firstSection() {
      return this.hasSections && this.activeSection === 1
    },
    lastSection() {
      return this.hasSections && this.activeSection === this.sectionLength
    }
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
    },
    sectionPrev() {
      this.activeSection--
    },
    sectionNext() {
      this.activeSection++
    }
  }
}
</script>

<style scoped>
.fl-form {
  box-sizing: border-box;
}

.fl-form *,
.fl-form *::before,
.fl-form *::after {
  box-sizing: inherit;
}

.fl-form__fieldsets,
.fl-form__fields {
  display: grid;
}

.fl-form__header-heading,
.fl-form__header-description,
.fl-form__section-heading,
.fl-form__section-description,
.fl-form__fieldset,
.fl-form__fieldset-heading,
.fl-form__fieldset-description,
.fl-form__field-description {
  margin: 0;
  padding: 0;
}

.fl-form__fieldset {
  border: 0;
}

.fl-form__header-heading,
.fl-form__section-heading,
.fl-form__fieldset-heading,
.fl-form__action {
  font-size: 100%;
  font-weight: normal;
}

.fl-form__action {
  margin: 0;
}
</style>
