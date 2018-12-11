<template>
    <div class="form">
        <div class="container">
            <div class="flex" v-if="doc">
                <div class="w-1/6 border-r">
                    <FormSidebar />
                </div>
                <div class="w-5/6 border-r">
                    <FormMain :doc="doc" />
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
            title: this.formTitle,
            primaryActionLabel: 'Save',
            primaryAction: () => {
                this.$store.dispatch('Form/saveDoc', {
                    doctype: this.doctype,
                    name: this.name
                })
            },
            menuItems: [
                'Test'
            ]
        })

        this.$store.dispatch('Form/fetchDoc', { doctype: this.doctype, name: this.name })
    },
    watch: {
        isDocDirty(newValue, oldValue) {
            if (newValue) {
                this.$store.commit('CurrentPage/setIndicator', { color: 'orange', text: 'Not Saved' })
            } else {
                this.$store.commit('CurrentPage/setIndicator', { color: '', text: '' })
            }
        }
    },
    computed: {
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        },
        doc() {
            return this.$store.getters['Form/getDoc'](this.doctype, this.name)
        },
        isDocDirty() {
            return this.doc && this.doc.__dirty
        },
        formTitle() {
            if (!this.doc) return ''

            const title_field = this.meta.title_field || 'name'
            return this.doc[title_field]
        }
    }
}
</script>
