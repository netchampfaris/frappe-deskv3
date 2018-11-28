<template>
    <div class="list">
        <PageHeader :title="doctype" />
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <ListSidebar :doctype="doctype" />
                </div>
                <div class="col-8">
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
