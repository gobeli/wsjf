<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="story in stories" :key="story.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-marginless">Prio: {{getPrio(story)}}</p>
            <a @click="remove(story)" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="mdi mdi-close" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <p class="title is-6 is-marginless">{{story.name}}</p>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">Job size: {{story.jobSize || 0}}</div>
            <div class="card-footer-item">CoD: {{(story.businessValue || 0) + (story.timeCriticallity || 0) + (story.riskOpportunity || 0)}}</div>
          </footer>
        </div>
      </div>
    </div>
    <button class="button is-primary" @click="edit({})">Add Story</button>
    <b-modal width="700" :active.sync="storyModalOpen" has-modal-card>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Story</p>
        </header>
        <section class="modal-card-body">
          <wsjf-story-form :planning-id="planning.id" :story="storyToEdit" @storyUpdated="updateStory($event)"></wsjf-story-form>
        </section>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { request  } from '../helper';
import StoryForm from './StoryForm.vue';

export default {
  data: () => ({
    storyToEdit: null,
    storyModalOpen: false,
  }),
  props: ['planning'],
  computed: {
    stories() {
      return this.planning.stories
        .map(s => ({...s, prio: this.getPrio(s)}))
        .sort((a,b) => b.prio-a.prio);
    }
  },
  methods: {
    edit(story) {
      this.storyToEdit = story;
      this.storyModalOpen = true;
    },
    remove(story) {
      this.$dialog.confirm({
        title: 'Deleting story',
        message: 'Are you sure you want to <b>delete</b> this story? This action cannot be undone.',
        confirmText: 'Delete story',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await request({ url: `/wsjf/story/${story.id}`, method: 'DELETE' });
          this.planning.stories = this.planning.stories.filter(s => s.id !== story.id);
        }
      });
    },
    updateStory(story) {
      const s = this.planning.stories.find(s => s.id === story.id);
      if (!s) {
        this.planning.stories = [...this.planning.stories, story];
      } else {
        const i = this.planning.stories.indexOf(s);
        this.planning.stories[i] = story;
      }
      this.storyModalOpen = false;
    },
    getPrio(story) {
      const prio = ((story.businessValue || 0) + (story.timeCriticallity || 0) + (story.riskOpportunity || 0)) / story.jobSize;
      return isNaN(prio) ? 'n/a' : prio.toFixed(3);
    }
  },
  components: {
    'wsjf-story-form': StoryForm
  }
}
</script>