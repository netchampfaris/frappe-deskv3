<template>
    <div class="font-semibold">
        <a class="no-underline text-grey-dark hover:text-grey-darker" href="#" role="button" v-if="!session"
            @click="login('faris@erpnext.com', 'qwe')">Login</a>
        <div class="flex items-center" v-else>
            <UserAvatar class="mr-2" :user="session.email" />
            <a class="no-underline text-grey-dark hover:text-grey-darker" href="#" role="button">
                {{ session.first_name }}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TheNavbarLogin',
    computed: {
        session() {
            return this.$store.state.session
        }
    },
    created() {
        this.$store.dispatch('fetchUserInfo')
    },
    methods: {
        async login(email='Administrator', password='qwe') {
            this.$store.dispatch('login', { email, password })
        }
    }
}
</script>
