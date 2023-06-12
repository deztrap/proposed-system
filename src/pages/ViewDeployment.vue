<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

onMounted(async () => {
  store.dispatch("fetchDeployment", { deploymentId: route.params.id });
});

const refreshDeployment = () => {
  store.dispatch("fetchDeployment", { deploymentId: route.params.id });
};

const isDeploymentLoaded = computed(() => store.state.deployment.loaded);
const isDeploymentLoading = computed(() => store.state.deployment.loading);
const deployment = computed(() => store.state.deployment.data);

function getDeploymentColor(status){
  switch(status && status.toLowerCase()) {
    case 'queued':
      return ['bg-blue-500', 'text-white'];
    case 'building':
      return ['bg-gray-500', 'text-white'];
    case 'built':
      return ['bg-purple-500', 'text-white'];
    case 'distributed':
      return ['bg-yellow-500', 'text-black'];
    case 'success':
      return ['bg-green-500', 'text-white'];
    case 'buildfailed':
      return ['bg-red-500', 'text-white'];
    case 'distributionfailed':
      return ['bg-red-500', 'text-white'];
    default:
      return [];
  }
}
</script>

<template>
  <router-link to="/deployments">
    <button>Back to deployments</button>
  </router-link> | 
  <button @click="refreshDeployment">Refresh Deployment</button>
  <div class="row" v-if="isDeploymentLoaded">
    <div class="col">
      {{ deployment.id }}
    </div>
    <div class="col">
      {{ deployment.name }}
    </div>
    <div class="col">
      {{ deployment.repo }}
    </div>
    <div
      :class="[
        'col',
        ...getDeploymentColor(deployment.status)
      ]"
    >
      {{ deployment.status }}
    </div>
    <div class="col">
      <router-link :to="'/deployment/' + deployment.id">View</router-link>
    </div>
  </div>
  <div v-else-if="isDeploymentLoading">Loading...</div>
  <div v-else>Error fetching deployment {{ isDeploymentLoaded }}</div>
</template>

<style scoped>
.row {
  background-color: lightgray;
  margin: 2px;
  display: flex;
}

.col {
  flex: 1;
  border: 1px solid gray;
  text-align: center;
  padding: 5px;
}

.bg-success {
  background-color: green;
  color: white;
}

.bg-danger {
  background-color: red;
  color: white;
}

.bg-warning {
  background-color: yellow;
}

@media screen and (max-width: 768px) {
  .row {
    display: grid;
  }
  .col {
    border: 0px;
  }
}
</style>
