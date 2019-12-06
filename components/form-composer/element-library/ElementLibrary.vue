<template>
  <div class="element-library">
    <h2 class="element-library__heading">Structure</h2>
    <ul class="structure-library">
      <li class="field-library__tile field-library__tile--structure">
        <span class="field-library__tile-title">
          Section
        </span>
      </li>
      <li class="field-library__tile field-library__tile--structure">
        <span class="field-library__tile-title">
          Fieldset
        </span>
      </li>
    </ul>
    <h2 class="element-library__heading">Fields</h2>
    <label class="element-library__search">
      <fa :icon="['fas', 'search']" />
      <input type="search" />
      <span>Search Fields</span>
    </label>
    <ul class="field-library">
      <li class="field-library__tile">
        <span class="field-library__tile-title">
          Alphanumeric
        </span>
        <span class="field-library__tile-version">
          1.0.0
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.element-library > * + * {
  margin-top: 1rem;
}

.element-library__heading {
  border-bottom: 0.016rem solid whitesmoke;
  font-weight: 800;
  padding-bottom: 0.25rem;
}

.element-library__search {
  display: block;
}

.structure-library {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
}

.field-library__tile {
  background-color: white;
  border-top: 0.5rem solid whitesmoke;
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
  cursor: grab;
  padding: 0.5rem;
  transition: transform 0.3s ease-in-out;
}

.field-library__tile:active {
  cursor: grabbing;
}

.field-library__tile:hover {
  transform: scale(1.015);
}

.field-library__tile--structure {
  border-top-color: palevioletred;
}

.field-library__tile-title,
.field-library__tile-version {
  display: block;
}

.field-library__tile-version {
  font-size: 0.875rem;
}
</style>
