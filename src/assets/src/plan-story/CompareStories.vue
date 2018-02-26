<style>
  .dragArea {
    min-height: 300px;
  }
</style>
<template>
  <div class="columns container-fluid">

    <div class="column" v-for="list in lists" :key="list.id">
      <div class="content">
        <h2 class="has-text-centered">{{list.n}}</h2>
      </div>
      <draggable v-model="list.stories" class="dragArea":options="{group:'stories'}">
        <div class="card" v-for="story in list.stories" :key="story.id">
          <div class="card-content">
            {{story.name}}
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
  import { request } from '../helper';

  export default {
    data: () => ({
      planning: {},
      lists: [1,2,3,5,8,13,20].map(f => ({ n: f, stories: []}))
    }),
    async mounted() {
      this.planning = await request({ url: `/wsjf/planning/${this.$route.params.id}`, method: 'GET' }).then(res => res.json());
      this.lists[0].stories = this.planning.stories;
      console.log(this.lists);
    }
  }
</script>