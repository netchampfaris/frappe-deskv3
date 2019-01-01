<template>
    <div v-if="meta">
        <ListMainRowHead
            :doctype="doctype"
            :fieldsToShow="getFieldsToShow()"
        />
        <ListMainRow
            v-for="doc in listData.data"
            :key="doc.name"
            :doc="doc"
            :doctype="doctype"
            :fieldsToShow="getFieldsToShow()"
            @click.native="routeToForm(doc.name)"
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
    computed: {
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        },
        listData() {
            return this.$store.getters['List/getListData'](this.doctype)
        }
    },
    created() {
        this.setListData();
        this.fetchData();
    },
    methods: {
        setListData() {
            this.$store.commit('List/setListData', { doctype: this.doctype });
        },
        async fetchData() {
            this.$store.dispatch('List/fetchData', {
                doctype: this.doctype,
                fields: this.getFieldsToFetch(),
                filters: {},
                start: 0,
                pageLength: 20,
                orderBy: 'modified desc'
            })
        },
        routeToForm(name) {
            this.$router.push(`/Form/${this.doctype}/${name}`)
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
        }
    }
}
</script>
