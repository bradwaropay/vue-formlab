<template>
  <div>
    <input
      :id="fieldId"
      :list="listName"
      :maxlength="config.maxlength"
      :minlength="config.minlength"
      :pattern="config.pattern"
      :placeholder="config.placeholder"
      :readonly="config.readonly"
      :required="config.required"
      :size="config.size"
      :spellcheck="config.spellcheck"
      :value="value"
      type="text"
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
