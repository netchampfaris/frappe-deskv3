<template>
    <div v-if="meta">
        <ListMainRowHead
            :doctype="doctype"
            :meta="meta"
            :fieldsToShow="getFieldsToShow()"
        />
        <ListMainRow
            v-for="doc in data"
            :key="doc.name"
            :doc="doc"
            :doctype="doctype"
            :meta="meta"
            :fieldsToShow="getFieldsToShow()"
        />
    </div>
</template>
<script>
import ListMainRowHead from './ListMainRowHead';
import ListMainRow from './ListMainRow';

export default {
    name: 'ListMain',
    props: ['doctype'],
    components: {
        ListMainRowHead,
        ListMainRow
    },
    data() {
        return {
            meta: null,
            data: []
        }
    },
    async created() {
        await this.fetchMeta();
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            const data = await this.call('frappe.desk.reportview.get', {
                doctype: this.doctype,
                fields: this.getFieldsToFetch(),
                filters: {},
                with_comment_count: true,
                page_length: 20,
                order_by: 'modified desc'
            });
            if (data.values && data.values.length > 0) {
                this.data = this.convertToKeyValue(data.keys, data.values);
            }
        },
        async fetchMeta() {
            this.meta = await this.call('frappe.client.get', {
                doctype: 'DocType',
                name: this.doctype
            });
        },
        getFieldsToFetch() {
            let fields = ['name', '_comments', '_assign', '_seen'];
            fields.push(this.meta.title_field);

            let fieldsInListView = this.meta.fields.filter(df => df.in_list_view);
            fields.push(...fieldsInListView.map(df => df.fieldname));

            return fields.filter(Boolean);
        },
        getFieldsToShow() {
            let fields = [];

            if (this.meta.title_field) {
                const titleField = this.meta.fields
                    .find(df => df.fieldname === this.meta.title_field);
                fields.push(titleField);
            } else {
                fields.push({
                    label: 'Name',
                    fieldname: 'name'
                });
            }

            let fieldsInListView = this.meta.fields.filter(df => df.in_list_view);
            fields.push(...fieldsInListView);

            return fields.slice(0, 4);
        },
        convertToKeyValue(keys, values) {
            return values.map((row) => {
                return row.reduce((acc, cell, i) => {
                    acc[keys[i]] = cell;
                    return acc;
                }, {});
            });
        }
    }
}
</script>
