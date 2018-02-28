<style lang="scss">
  .dragArea {
    min-height: 300px;
  }

  .numbers {
    width: 100vw;
    position: absolute;
    padding: 0 1rem;
    left: 0;
    .columns {
      overflow-x: auto;
      max-width: 100vw;
      margin: 0;
      .column {
        min-width: 200px;
        background-color: rgba(0,0,0,.1);
        border-right: 1rem solid #FFF;
        padding: 1rem 0;
      }
    }
    .task {
      border: 1px solid #ccc;
      box-shadow: none;
      margin-top: -1px;
      cursor: move;
      &.sortable-chosen {
        opacity: 0.7;
      }
    }
  }
</style>
<template>
  <div class="numbers">
    <div class="columns">
      <div class="column" v-for="list in lists" :key="list.id">
        <div class="content">
          <h2 class="has-text-centered">{{list.n}}</h2>
        </div>
        <draggable v-model="list.stories" class="dragArea":options="{group:'stories'}" @change="onMove($event, list)">
          <div class="card task" v-for="story in list.stories" :key="story.id">
            <div class="card-content">
              {{story.name}}
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
  import { request } from '../helper';

  export default {
    props: ['type'],
    data: () => ({
      planning: {},
      lists: ['Not specified', 1,2,3,5,8,13,20].map(f => ({ n: f, stories: []}))
    }),
    async mounted() {
      this.planning = await request({ url: `/wsjf/planning/${this.$route.params.id}`, method: 'GET' }).then(res => res.json());
      for (let list of this.lists) {
        list.stories = this.planning.stories.filter(s => s[this.type] === list.n);
      }
      this.lists[0].stories = this.planning.stories.filter(s => s[this.type] === 0);
    },
    methods: {
      async onMove(event, list) {
        if (event.added) {
          const element = event.added.element;
          if (isNaN(list.n)) {
            element[this.type] = 0;
          } else {
            element[this.type] = list.n;
          }
          await request({url: `/wsjf/story`, method: 'POST', body: JSON.stringify(element)});
        }
      }
    }
  }
</script>