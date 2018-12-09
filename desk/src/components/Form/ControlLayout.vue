<template>
  <div>
    <div class="mb-2">
      <label class="text-muted">{{ docfield.label }}</label>
    </div>
    <div>
      <slot><!-- input --></slot>
    </div>
    <div class="mt-2" v-if="docfield.description">
      <p class="text-muted">
        {{ docfield.description }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ControlLayout",
  props: ["docfield"]
};
</script>
