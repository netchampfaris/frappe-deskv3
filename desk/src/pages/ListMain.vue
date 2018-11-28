<template>
    <div class="list-main">
        <div class="list-row" v-for="d in data" :key="d.name">
            {{ d.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListMain',
    props: ['doctype'],
    data() {
        return {
            data: []
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.data = await this.call('frappe.desk.reportview.get', {
                doctype: this.doctype,
                fields: ['name'],
                filters: {}
            });
        }
    }
}
</script>
