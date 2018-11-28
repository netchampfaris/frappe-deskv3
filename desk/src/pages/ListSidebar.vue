<template>
    <nav class="nav flex-column f1">
        <li class="nav-item my-1" v-for="item in items" :key="item.label">
            <router-link :to="item.route">
                {{ item.label }}
            </router-link>
        </li>
    </nav>
</template>
<script>
export default {
    name: 'ListSidebar',
    props: ['doctype'],
    data() {
        return {
            items: [
                {
                    label: 'List',
                    route: '/List/' + this.doctype
                },
                {
                    label: 'Report',
                    route: '/Report/' + this.doctype
                },
                {
                    label: 'Calendar',
                    route: '/Calendar/' + this.doctype
                }
            ]
        }
    }
}
</script>
<style scoped>
.router-link-active {
    color: var(--dark);
    text-decoration: none;
}
</style>
