<template>
  <form class="fl-form">
    <!-- Header -->
    <header v-if="fx.heading || fx.descripton" class="fl-form__header">
      <h1 v-if="fx.heading" class="fl-form__header-heading">
        {{ fx.heading }}
      </h1>
      <p v-if="fx.description" class="fl-form__header-description">
        {{ fx.description }}
      </p>
      <slot name="header" />
    </header>
    <!-- Section -->
    <div
      v-for="(section, sectionIndex) in fx.sections"
      :key="getKey(sectionIndex)"
      :class="'fl-form__section--' + getKey(sectionIndex)"
      class="fl-form__section"
    >
      <h2 v-if="section.heading" class="fl-form__section-heading">
        {{ section.heading }}
      </h2>
      <p v-if="section.description" class="fl-form__section-description">
        {{ section.description }}
      </p>
      <slot :name="getKey(sectionIndex)" />
      <!-- Fieldset -->
      <fieldset
        v-for="(fieldset, fieldsetIndex) in section.fieldsets"
        :key="getKey(sectionIndex, fieldsetIndex)"
        :name="fieldset.name || getKey(sectionIndex, fieldsetIndex)"
        :class="'fl-form__fieldset--' + getKey(sectionIndex, fieldsetIndex)"
        class="fl-form__fieldset"
      >
        <legend v-if="fieldset.heading" class="fl-form__fieldset-legend">
          {{ fieldset.heading }}
        </legend>
        <p v-if="fieldset.description" class="fl-form__fieldset-description">
          {{ fieldset.description }}
        </p>
        <slot :name="getKey(sectionIndex, fieldsetIndex)" />
        <!-- Field -->
        <div
          v-for="(field, fieldIndex) in fieldset.fields"
          :key="getKey(sectionIndex, fieldsetIndex, fieldIndex)"
          :class="
            'fl-form__field--' + getKey(sectionIndex, fieldsetIndex, fieldIndex)
          "
          class="fl-form__field"
        >
          <label
            v-if="field.label"
            :for="field.name"
            class="fl-form__field-label"
          >
            {{ field.label }}
          </label>
          <abbr title="Required">*</abbr>
          <component :is="'input'" :id="field.name" type="text" />
        </div>
      </fieldset>
    </div>
    <footer class="fl-form__footer">
      <!-- Footer Definitions -->
      <dl class="fl-form__definitions">
        <dt>*</dt>
        <dl>Required Fields</dl>
      </dl>
      <!-- Form Actions -->
      <div class="fl-form__actions">
        <!-- Submit -->
        <input
          type="submit"
          value="Submit"
          class="fl-form__action fl-form__action--submit"
        />
      </div>
    </footer>
  </form>
</template>

<script>
export default {
  props: {
    fx: {
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
  data() {
    return {
      formInput: this.value
    }
  },
  methods: {
    getKey(sectionIndex, fieldsetIndex, fieldIndex) {
      const args = [...arguments].map((arg) => {
        return arg + 1
      })

      let key
      args.forEach((arg, index) => {
        index === 0 ? (key = arg) : (key = `${key}-${arg}`)
      })
      return key
    }
  }
}
</script>
