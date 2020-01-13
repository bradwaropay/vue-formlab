<template>
  <div class="form-lab">
    <header class="form-lab__header">
      <h1 class="form-lab__logo">formlab</h1>
    </header>
    <div class="form-lab__toolbar">
      <div class="form-lab__toolbar-group">
        <label
          class="form-lab__toolbar-button form-lab__toolbar-button--import"
        >
          Import
          <input type="file" class="hidden" />
        </label>
        <button
          class="form-lab__toolbar-button form-lab__toolbar-button--import"
        >
          Export
        </button>
      </div>
      <div class="form-lab__toolbar-group">
        <div class="form-lab__toolbar-toggle">
          <span class="form-lab__toolbar-toggle-label">View</span>
          <div
            :class="'form-lab__toolbar-toggle-switch--is-' + formMode"
            class="form-lab__toolbar-toggle-switch"
            @click="toggleFormMode()"
          ></div>
          <span class="form-lab__toolbar-toggle-label">Edit</span>
        </div>
      </div>
    </div>
    <main class="form-lab__main">
      <nuxt />
    </main>
    <footer class="form-lab__footer">
      Footer
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formMode: 'edit'
    }
  },
  methods: {
    toggleFormMode() {
      this.$bus.$emit('toggleFormMode')
    }
  },
  created() {
    this.$bus.$on('toggleFormMode', () => {
      this.formMode = this.formMode === 'view' ? 'edit' : 'view'
    })
  }
}
</script>

<style scoped>
@import '@/assets/style/svg/topography';

.hidden {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
}

.form-lab {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;

  &__header,
  &__footer {
    padding: 1rem 2rem;
  }

  &__header {
    background-color: #ffffff;
    background-image: $topography;
  }

  &__logo {
    font-family: 'Fredoka One';
    font-size: 3rem;
  }

  &__toolbar {
    background-color: whitesmoke;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
  }

  &__toolbar-button {
    background-color: transparent;
    border: 0.032rem solid gray;
    border-radius: 0.25rem;
    color: gray;
    cursor: pointer;
    display: inline-block;
    font-size: 0.75rem;
    line-height: 1;
    outline: none;
    padding: 0.25rem 0.5rem;
    text-align: center;
  }

  &__toolbar-toggle {
    align-items: center;
    display: inline-flex;
    color: gray;
    font-size: 0.75rem;

    > * + * {
      margin-left: 0.25rem;
    }
  }

  &__toolbar-toggle-switch {
    border: 0.032rem solid gray;
    border-radius: 0.25rem;
    cursor: pointer;
    height: 1.5rem;
    padding: 0.25rem;
    position: relative;
    width: 2.5rem;

    &::before {
      background-color: gray;
      border-radius: 0.2rem;
      content: '';
      display: block;
      height: 1rem;
      left: 0.25rem;
      position: absolute;
      transition: left 0.2s ease-in-out;
      width: 1rem;
    }

    &--is-edit {
      &::before {
        left: 1.25rem;
      }
    }
  }

  &__footer {
    border-top: 0.016rem solid whitesmoke;
  }
}
</style>
