import Vue from 'vue'

async function call(method, data) {
  const queryString = new URLSearchParams();
  for (let key in data) {
    queryString.append(key, data[key])
  }

  const res = await fetch(`/api/method/${method}?${queryString}`)

  if (res.ok) {
    const data = await res.json();
    return data.message;
  }
}

Vue.prototype.call = call

window.call = call;
