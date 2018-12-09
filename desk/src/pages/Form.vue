<template>
    <div class="form">
        <div class="container">
            <div class="flex">
                <div class="w-1/6 border-r">
                    <FormSidebar />
                </div>
                <div class="w-5/6 border-r">
                    <FormMain :doctype="doctype" :name="name"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormSidebar from './FormSidebar'
import FormMain from './FormMain'

export default {
    name: 'Form',
    props: ['doctype', 'name'],
    components: {
        FormSidebar,
        FormMain
    },
    created() {
        this.$store.dispatch('Meta/fetchMeta', { doctype: this.doctype })
        this.$store.commit('CurrentPage/setPageHeaderSettings', {
            title: this.name,
            primaryActionLabel: 'Save',
            primaryAction: console.log,
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
