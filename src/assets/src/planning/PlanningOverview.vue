<template>
  <div>
    <b-table
        :data="plannings"
        detailed
        detail-key="id">
        <template slot-scope="props">
            <b-table-column label="Name">
                {{ props.row.name }}
            </b-table-column>
            <b-table-column width="120">
              <button class="button is-text" @click="edit(props.row)">
                <i class="mdi mdi-pencil"></i>
              </button>
              <button class="button is-text" @click="remove(props.row)">
                <i class="mdi mdi-close"></i>
              </button>
            </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <ul>
            <li v-for="story in props.row.stories" :key="story.id">{{story.name}}</li>
          </ul>
        </template>
    </b-table>
    <button class="button is-primary" @click="edit({})">Add</button>
    <b-modal :active.sync="planningModalOpen" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
        </header>
        <section class="modal-card-body">
          <wsjf-planning-form :planning="planningToEdit"></wsjf-planning-form>
        </section>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { request  } from '../helper';
import PlanningForm from './PlanningForm.vue';

export default {
  data: () => ({
    plannings: [],
    planningToEdit: {},
    planningModalOpen: false,
    planningToDelete: false
  }),
  mounted() {
    this.getPlannings();
  },
  methods: {
    edit(planning) {
      this.planningToEdit = planning;
      this.planningModalOpen = true;
    },
    remove(planning) {
      this.$dialog.confirm({
        title: 'Deleting planning',
        message: 'Are you sure you want to <b>delete</b> this planning? This action cannot be undone.',
        confirmText: 'Delete planning',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await request({ url: `/wsjf/planning/${planning.id}`, method: 'DELETE' });
          location.reload();
        }
      });
    },
    async getPlannings() {
      this.plannings = await request({ url: `/wsjf/planning` }).then(res => res.json());
    }
  },
  components: {
    'wsjf-planning-form': PlanningForm
  }
}
</script>
