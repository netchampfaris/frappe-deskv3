<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="bg-white border shadow-md p-4 rounded-1">
      <div>
        <Button>Click</Button>
      </div>
      <div>
        <Control
          :docfield="{
            fieldtype: 'Check',
            label: 'Disabled',
            description: 'Disable the button'
          }"
          :value="1"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Playground',
}
</script>
