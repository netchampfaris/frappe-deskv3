<template>
    <div class="font-semibold">
        <a class="no-underline text-grey-dark hover:text-grey-darker" href="#" role="button" v-if="!userInfo"
            @click="login('faris@erpnext.com', 'qwe')">Login</a>
        <div class="flex items-center" v-else>
            <UserAvatar class="mr-2" :user="userInfo.email" />
            <a class="no-underline text-grey-dark hover:text-grey-darker" href="#" role="button">
                {{ userInfo.first_name }}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TheNavbarLogin',
    data() {
        return {
            userInfo: null
        }
    },
    created() {
        this.fetchUserInfo()
    },
    methods: {
        async login(email='Administrator', password='qwe') {
            await this.call('login', { usr: email, pwd: password })
            this.fetchUserInfo()
        },
        async fetchUserInfo() {
            this.userInfo = await this.call('frappe.utils.user.get_user_info')
        }
    }
}
</script>
