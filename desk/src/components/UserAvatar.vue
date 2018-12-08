<template>
    <div class="inline-block w-8 h-8">
        <img v-if="userImageUrl" :src="userImageUrl" class="border border-grey-lighter rounded" />
        <div class="h-full w-full rounded border border-grey-light dotted" v-else></div>
    </div>
</template>
<script>
export default {
    name: 'UserAvatar',
    props: ['user'],
    data() {
        return {
            userImageUrl: null
        }
    },
    created() {
        this.fetchUserImage();
    },
    methods: {
        async fetchUserImage() {
            if (!this.user) return;

            const data = await this.$call('frappe.client.get_value', {
                doctype: 'User',
                filters: this.user,
                fieldname: 'user_image'
            });

            this.userImageUrl = data.user_image;
        }
    }
}
</script>
<style scoped>
.dotted {
    border-style: dashed;
}
</style>
