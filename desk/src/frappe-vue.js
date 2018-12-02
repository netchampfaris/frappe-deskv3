import Vue from 'vue'
import PageHeader from './components/PageHeader'
import Button from './components/Button'
import UserAvatar from './components/UserAvatar'

Vue.prototype.call = async function call(method, data) {
  if (!data) {
    data = {}
  }

  data.cmd = method;

  const res = await fetch('/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const data = await res.json();
    return data.message;
  } else {
    const data = await res.json();
    if (data.exc) {
      const error = JSON.parse(data.exc);
      console.error(error[0]); // eslint-disable-line
    }
  }
}

Vue.component('PageHeader', PageHeader)
Vue.component('Button', Button)
Vue.component('UserAvatar', UserAvatar)
