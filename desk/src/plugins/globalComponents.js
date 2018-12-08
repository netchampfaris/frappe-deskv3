import Vue from 'vue'

// external components
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons'

// app components
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'

Vue.component('octicon', Octicon)
Vue.component('PageHeader', PageHeader)
Vue.component('Button', Button)
Vue.component('UserAvatar', UserAvatar)
