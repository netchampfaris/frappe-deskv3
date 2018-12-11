<template>
    <span
        class="inline-block w-3 h-3 rounded-circle mr-2"
        :class="[color ? 'bg-' + color : 'bg-blue']">
    </span>
</template>
<script>
export default {
    name: 'Indicator',
    props: ['color']
}
</script>
