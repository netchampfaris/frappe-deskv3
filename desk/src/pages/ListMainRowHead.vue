<template>
    <div class="p-4 border-b bg-grey-lighter">
        <div class="flex text-grey-darker">
            <div class="w-2/5">
                {{ titleColumn }}
            </div>
            <div class="w-1/5" v-for="col in columns" :key="col">
                {{ col }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListMainRowHead',
    props: ['doctype', 'meta'],
    computed: {
        titleColumn() {
            if (this.meta.title_field) {
                const titleFieldLabel = this.meta.fields
                    .find(df => df.fieldname === this.meta.title_field)
                    .label;
                return titleFieldLabel;
            }

            return 'Name';
        },
        columns() {
            let cols = [];

            let fieldsInListView = this.meta.fields.filter(df => df.in_list_view);
            cols.push(...fieldsInListView.map(df => df.label));

            return cols;
        }
    }
}
</script>
