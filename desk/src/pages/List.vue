<template>
    <div class="list">
        <PageHeader :title="doctype" />
        <div class="container">
            <div class="row no-gutters">
                <div class="col-2 border-right">
                    <ListSidebar :doctype="doctype" />
                </div>
                <div class="col-10">
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
