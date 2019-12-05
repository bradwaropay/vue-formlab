<template>
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
</template>

<style scoped>
.field-library::before {
  background-color: gray;
  content: '';
  display: block;
  height: 0.5rem;
  position: relative;
}

.field-library__tile {
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
}

.field-library__tile-title,
.field-library__tile-version {
  display: block;
}

.field-library__tile-version {
  font-size: 0.875rem;
}
</style>
