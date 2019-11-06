<template>
  <Form v-model="value" :fx="$options.formula" />
</template>

<script>
import Form from '~/components/form/Form.vue'

export default {
  formula: {
    heading: 'Form Heading',
    description: 'This is a form description.',
    sections: [
      {
        heading: 'Section Heading',
        description: 'This is a section description.',
        fieldsets: [
          {
            heading: 'Fieldset Heading',
            description: 'This is a fieldset description.',
            fields: [
              {
                type: 'alphanumeric',
                label: 'Label',
                description: 'This is a description',
                key: 'one',
                value: 'test',
                config: {
                  list: ['test', 'apples', 'bannanas', 'cucumber']
                },
                validation: {}
              },
              {
                label: 'Label',
                key: 'two.test',
                value: 'test1',
                config: {},
                validation: {}
              }
            ]
          }
        ]
      }
    ]
  },
  components: {
    Form
  },
  data() {
    return {
      value: {
        one: 'test'
      }
    }
  }
}
</script>
