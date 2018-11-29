<template>
    <div class="list-main f1" v-if="meta">
        <ListMainRowHead
            :doctype="doctype"
            :meta="meta"
        />
        <ListMainRow
            v-for="doc in data"
            :key="doc.name"
            :doc="doc"
            :doctype="doctype"
            :meta="meta"
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
                filters: {}
            });

            this.data = this.convertToKeyValue(data.keys, data.values);
        },
        async fetchMeta() {
            this.meta = await this.call('frappe.client.get', {
                doctype: 'DocType',
                name: this.doctype
            });
        },
        getFieldsToFetch() {
            let fields = ['name'];
            fields.push(this.meta.title_field);

            let fieldsInListView = this.meta.fields.filter(df => df.in_list_view);
            fields.push(...fieldsInListView.map(df => df.fieldname));

            return fields.filter(Boolean);
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
