<template>
  <div>
    <div class="mb-2" v-if="!inputOnly && docfield.label">
      <label class="text-muted">{{ docfield.label }}</label>
    </div>
    <div>
      <slot>
        <!-- input -->
      </slot>
    </div>
    <div class="mt-2" v-if="docfield.description && !inputOnly">
      <p class="text-muted">{{ docfield.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ControlLayout',
  props: ['docfield', 'inputOnly'],
}
</script>
<style>
.form-control {
  @apply outline-none border rounded text-lg px-4 py-3 w-full text-grey bg-white;
}

.form-control:focus {
  @apply shadow-outline-grey;
}
</style>
