import _ from 'lodash'

export const state = {
  formula: {},
  formValue: {}
}

export const mutations = {
  SET_FORMULA(state, formula) {
    state.formula = { ...formula }
  },
  SET_FORM_VALUE(state, value) {
    state.formValue = _.cloneDeep(value)
  }
}
