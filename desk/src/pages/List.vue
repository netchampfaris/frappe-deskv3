<template>
    <div class="list" v-if="meta">
        <div class="container">
            <div class="flex">
                <div class="w-1/6 border-r">
                    <ListSidebar :doctype="doctype" />
                </div>
                <div class="w-5/6 border-r">
                    <ListMain :doctype="doctype" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ListSidebar from './ListSidebar'
import ListMain from './ListMain'

export default {
    name: 'List',
    props: ['doctype'],
    components: {
        ListSidebar,
        ListMain
    },
    created() {
        this.$store.dispatch('Meta/fetchMeta', { doctype: this.doctype })
        this.$store.commit('CurrentPage/setPageHeaderSettings', {
            title: this.doctype,
            primaryActionLabel: 'New',
            primaryAction: console.log,
            secondaryActionLabel: 'Refresh',
            secondaryAction: console.log,
            menuItems: [
                'Test'
            ]
        })
    },
    computed: {
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        }
    }
}
</script>
