<script setup>
defineProps({
  deployment: {
    type: Object,
    required: true,
  },
});

function getDeploymentColor(status) {
  switch (status && status.toLowerCase()) {
    case "queued":
      return ["bg-blue-500", "text-white"];
    case "building":
      return ["bg-gray-500", "text-white"];
    case "built":
      return ["bg-purple-500", "text-white"];
    case "distributed":
      return ["bg-yellow-500", "text-black"];
    case "success":
      return ["bg-green-500", "text-white"];
    case "buildfailed":
      return ["bg-red-500", "text-white"];
    case "distributionfailed":
      return ["bg-red-500", "text-white"];
    default:
      return [];
  }
}
</script>

<template>
  <div class="row">
    <div class="col">
      {{ deployment.id }}
    </div>
    <div class="col">
      {{ deployment?.repo_info?.name }}
    </div>
    <div class="col">
      {{ deployment.repo_url }}
    </div>
    <div :class="['col', ...getDeploymentColor(deployment.status)]">
      {{ deployment.status }}
    </div>
    <div>
      <template v-if="deployment.live_url">
        <div class="col">
          <!-- <a :href="deployment.live_url">View Live URL</a> -->
          <a :href="`localhost:8111/${deployment.live_url}`" target="_blank">View Live URL</a>
        </div>
      </template>
      <template v-else>
        <div class="col">No live url</div>
      </template>
    </div>
    <div class="col">
      <router-link :to="'/deployment/' + deployment.id">View</router-link>
    </div>
  </div>
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
