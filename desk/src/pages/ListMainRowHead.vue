<template>
    <div class="list-row-head bg-light py-2 px-3 border-bottom">
        <div class="row text-muted">
            <div class="col-3">
                {{ titleColumn }}
            </div>
            <div class="col" v-for="col in columns" :key="col">
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
