<template>
    <li class="nav-item" >
        <a class="nav-link" href="#" role="button" v-if="!userInfo" @click="login()">Login</a>
        <a class="nav-link" href="#" role="button" v-else>
            {{ userInfo.first_name }}
        </a>
    </li>
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
