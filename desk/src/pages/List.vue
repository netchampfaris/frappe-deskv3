<template>
    <div class="list">
        <PageHeader :title="doctype" />
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
    }
}
</script>
