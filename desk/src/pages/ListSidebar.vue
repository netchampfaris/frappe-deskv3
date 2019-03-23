<template>
  <nav class="nav flex-column f1 py-4">
    <div class="my-4" v-for="item in items" :key="item.label">
      <router-link
        :to="item.route"
        class="text-grey-darker hover:text-grey-darkest no-underline"
        >{{ item.label }}</router-link
      >
    </div>
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
          route: '/List/' + this.doctype,
        },
        {
          label: 'Report',
          route: '/Report/' + this.doctype,
        },
        {
          label: 'Calendar',
          route: '/Calendar/' + this.doctype,
        },
      ],
    }
  },
}
</script>
