<template>
    <div class="p-4 hover:bg-grey-lightest cursor-pointer">
        <div class="flex">
            <div class="w-2/5">
                {{ doc[titleField] | stripHTML }}
            </div>
            <div class="w-1/5" v-for="fieldname in otherFields" :key="fieldname">
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
