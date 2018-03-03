import Vue from 'vue';

export function request({ url, method, body }) {
  return fetch(url, { 
    method, 
    body,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).catch(err => {
    Vue.prototype.$snackbar.open({
      message: 'Something went wrong',
      position: 'is-bottom',
      type: 'is-danger'
    });
    throw err;
  });
}