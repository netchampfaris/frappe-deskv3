<template>
    <div class="form">
        <PageHeader :title="doctype" />
        <div class="container">
            <div class="flex">
                <div class="w-1/6 border-r">
                    <FormSidebar />
                </div>
                <div class="w-5/6 border-r">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormSidebar from './FormSidebar'
// import FormMain from './FormMain'

export default {
    name: 'List',
    props: ['doctype'],
    components: {
        FormSidebar,
        // FormMain
    }
}
</script>
