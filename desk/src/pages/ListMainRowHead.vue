<template>
    <div class="p-4 border-b bg-grey-lighter text-grey-darker">
        <div class="flex">
            <div class="w-4/5 flex">
                <div class="w-2/5">
                    {{ titleColumn }}
                </div>
                <div class="w-1/5" v-for="col in columns" :key="col">
                    {{ col }}
                </div>
            </div>
            <div class="w-1/5 text-right">
                3 of 3
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListMainRowHead',
    props: ['doctype', 'meta', 'fieldsToShow'],
    computed: {
        titleColumn() {
            return this.fieldsToShow[0].label;
        },
        columns() {
            return this.fieldsToShow.slice(1).map(df => df.label);
        }
    }
}
</script>
