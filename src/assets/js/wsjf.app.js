Vue.config.devtools = true;

const planningFormTemplate = `
  <form @submit.prevent="submit">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Name" v-model="name" />
      </div>
    </div>
    <input :disabled="!name" class="button is-primary" type="submit"/>
  </form>
`;
Vue.component('wsjf-form', {
  template: planningFormTemplate,
  data: () => ({
    name: ''
  }),
  methods: {
    submit() {
      fetch('/wsjf/planning', { 
        method: 'POST', 
        body: JSON.stringify({ name: this.name }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(() => {
          location.reload();
        });
    }
  }
});


const appTemplate = `
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planning in plannings">
          <td>{{planning.name}}</td>
        </tr>
      </tbody>
    </table>
    <button class="button is-primary" @click="modalOpen = true">Add</button> 
    <div class="modal animated fadeIn" style="animation-duration: .3s" :class="{'is-active': modalOpen, 'fadeOut': modalFadeOut}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="content">
            <wsjf-form></wsjf-form>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
`;

Vue.component('wsjf-app', {
  data: () => ({
    plannings: plannings,
    modalOpen: false,
    modalFadeOut: false
  }),
  template: appTemplate,
  methods: {
    closeModal() {
      this.modalFadeOut = true;
      setTimeout(() => {
        this.modalFadeOut = false; 
        this.modalOpen = false;
      }, 300)
    }
  }
});

new Vue({
  el: '#wsjf'
})