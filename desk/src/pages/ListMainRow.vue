<template>
    <div class="list-row py-2 px-3">
        <div class="row">
            <div class="col-3">
                {{ doc[titleField] | stripHTML }}
            </div>
            <div class="col" v-for="fieldname in otherFields" :key="fieldname">
                {{ doc[fieldname] | stripHTML }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListMainRow',
    props: ['doc', 'doctype', 'meta'],
    computed: {
        titleField() {
            return this.meta.title_field || 'name';
        },
        otherFields() {
            return this.meta.fields.filter(df => df.in_list_view).map(df => df.fieldname);
        }
    },
    filters: {
        stripHTML(value) {
            if (!value) return '';
            return value.replace(/(<([^>]+)>)/ig, '');
        }
    }
}
</script>
<style scoped>
.list-row {
    cursor: pointer;
}
.list-row:hover {
    background-color: var(--light);
}
</style>
