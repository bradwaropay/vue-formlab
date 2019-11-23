<template>
  <div class="fl-alphanumeric">
    <input
      :autocomplete="config.autocomplete"
      :autofocus="config.autofocus"
      :disabled="config.disabled"
      :id="fieldId"
      :inputmode="config.inputmode"
      :list="listName"
      :name="name"
      :maxlength="config.maxlength"
      :minlength="config.minlength"
      :pattern="config.pattern"
      :placeholder="config.placeholder"
      :readonly="config.readonly"
      :required="config.required"
      :spellcheck="config.spellcheck"
      :tabindex="config.tabindex"
      :title="config.title"
      :value="value"
      type="text"
      class="fl-alphanumeric__input"
      @input="updateField($event.target.value)"
    />
    <datalist v-if="listName" :id="listName">
      <option
        v-for="(listItem, listItemIndex) in list"
        :key="listItemIndex"
        :value="listItem"
      />
    </datalist>
  </div>
</template>

<script>
import Field from '../Field.vue'

export default {
  extends: Field,
  computed: {
    list() {
      if (typeof this.config.list === 'string')
        return this.lib[this.config.list]
      return this.config.list
    },
    listName() {
      if (this.config.list) return `list-${this.fieldId}`
      return false
    }
  }
}
</script>

<style scoped>
.fl-alphanumeric__input {
  font-size: 100%;
  width: 100%;
}
</style>
