<template>
    <div class="filter-area p-4">
        <Button class="mr-2" size="small" v-for="filter in appliedFilters" :key="filter.field.fieldname">
            {{ filter.field.label }} = {{ filter.value }}
        </Button>
        <Popover>
            <Button
                slot-scope="{ togglePopover, closePopover }"
                size="small"
                class="text-muted"
                @click="togglePopover"
            >
                Add filter
            </Button>
            <div slot="popover-content" class="w-64">
                <FilterSelector :doctype="doctype" @addFilter="filter => appliedFilters.push(filter)"/>
            </div>
        </Popover>
    </div>
</template>
<script>
import FilterSelector from './FilterSelector'

export default {
    name: 'FilterArea',
    props: ['doctype'],
    components: {
        FilterSelector
    },
    data() {
        return {
            appliedFilters: []
        }
    },
    computed: {
        meta() {
            return this.$store.getters['Meta/getMeta'](this.doctype)
        }
    }
}
</script>
