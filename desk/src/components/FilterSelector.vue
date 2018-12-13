<template>
    <div>
        <div class="step-1" v-show="!selectedField">
            <div class="uppercase text-muted p-4">Select field</div>
            <ul class="list-reset h-64 overflow-auto">
                <li
                    class="p-4 hover:bg-grey-lighter"
                    v-for="field of filterableFields"
                    :key="field.fieldname"
                    :fieldname="field.fieldname"
                    @click="selectedField = field"
                >
                    {{ field.label }}
                </li>
            </ul>
        </div>
        <div class="step-2 p-4" v-if="selectedField">
            <!-- <div class="pb-4 font-bold">{{ selectedField.label }}</div> -->
            <Control
                :docfield="selectedField"
                :value="filterValue"
                @change="value => filterValue = value"
            />
            <Button class="mt-4 mr-2 pin-r" size="small" @click="goBack">Cancel</Button>
            <Button class="mt-4 pin-r" size="small" type="primary" @click="applyFilter">Apply Filter</Button>
        </div>
    </div>
</template>
<script>
import Control from './Form/Control'

export default {
    name: 'FilterSelector',
    props: ['doctype'],
    data() {
        return {
            selectedField: null,
            filterValue: null
        }
    },
    components: {
        Control
    },
    computed: {
        filterableFields() {
            const layoutFields = ['Section Break', 'Column Break'];
            return this.meta.fields.filter(df => {
                return !layoutFields.includes(df.fieldtype);
            })
        },
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        }
    },
    methods: {
        goBack() {
            this.selectedField = null
            this.filterValue = null
        },
        applyFilter() {
            this.$emit('addFilter', {
                field: this.selectedField,
                value: this.filterValue
            })
            this.goBack()
        }
    }
}
</script>
