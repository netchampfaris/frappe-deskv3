<template>
  <div class="h-screen bg-indigo-dark w-full flex justify-center items-center">
    <div class="bg-white w-1/4 rounded shadow-lg -mt-32">
      <h3 class="p-5 border-b">
        <Indicator :color="indicatorColor"/>
        {{ loginText }}
      </h3>
      <div class="p-5" @keydown.enter="login">
        <Control
          :docfield="{
            label: __('Email'),
            fieldtype: 'Data',
          }"
          @change="value => email = value"
          :value="email"
          :autofocus="true"
          class="mb-3"
        />
        <Control
          :docfield="{
            label: __('Password'),
            fieldtype: 'Password',
          }"
          :value="password"
          @change="value => password = value"
        />
        <Button
          type="primary"
          class="w-full justify-center mt-5"
          :isLoading="isLoading"
          @click="login"
        >{{ __('Login') }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      indicatorColor: 'blue',
      loginText: this.__('Login'),
      isLoading: false,
    }
  },
  methods: {
    async login() {
      if (!(this.email && this.password)) return
      this.isLoading = true
      this.indicatorColor = 'orange'
      this.loginText = this.__('Verifying...')
      await this.fr.session.login(this.email, this.password)
      if (this.fr.session.user) {
        this.indicatorColor = 'green'
        this.loginText = this.__('Success')
      } else {
        this.indicatorColor = 'red'
        this.loginText = this.__('Invalid login credentials')
      }
      this.isLoading = false
    },
  },
}
</script>
