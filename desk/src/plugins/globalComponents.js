import Vue from 'vue'

// external components
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons'

// app components
import Button from '../components/Button'
import UserAvatar from '../components/UserAvatar'
import FormLayout from '../components/Form/FormLayout'

Vue.component('octicon', Octicon)
Vue.component('Button', Button)
Vue.component('UserAvatar', UserAvatar)
Vue.component('FormLayout', FormLayout)
