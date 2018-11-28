import Vue from 'vue'
import PageHeader from './components/PageHeader'

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
  }
}

Vue.component('PageHeader', PageHeader)
