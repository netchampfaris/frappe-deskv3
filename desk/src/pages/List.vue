<template>
    <div class="list">
        <PageHeader :title="doctype">
            <div slot="page-actions">
                <Button class="mr-1">Menu</Button>
                <Button class="mr-1">Refresh</Button>
                <Button type="primary">New</Button>
            </div>
        </PageHeader>
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
