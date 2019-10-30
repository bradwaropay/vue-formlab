<template>
  <div>
    <Form :fx="$options.formula" />
  </div>
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
                field: 'text',
                label: 'Label',
                name: 'test',
                value: 'test',
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
  }
}
</script>
