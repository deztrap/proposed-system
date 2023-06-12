<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import ProgressSpinner from "primevue/progressspinner";

import { useConfirm } from "primevue/useconfirm";

import {
  onMounted,
  computed
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const confirm = useConfirm();
const router = useRouter();

const githubRepos = computed(
  () => store.getters['getRepos'],
);
const isReposLoading = computed(
  () => store.getters['getReposLoading'],
);

onMounted(async () => {
  await store.dispatch('fetchUserRepos');
});

function confirmDeploy(repo) {
  confirm.require({
    message: `Are you sure you want to deploy ${repo.name}?`,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      store.dispatch('deployRepo', repo).then(
        () => {
          router.push('/deployments');
        }
      )
    }
  });
}
</script>

<template>
  <!-- <h2 class="text-5xl font-semibold mb-3 bg-transparent">Deploy Repos</h2> -->
  <p class="text-5xl font-semibold mb-3 text-primary">Deploy Repos</p>
  <template v-if="isReposLoading">
    <div class="h-screen w-screen flex justify-center align-items-center">
      <ProgressSpinner
        class="flex"
        style="width: 250px; height: 250px"
        strokeWidth="4"
        fill="var(--surface-ground)"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </template>
  <template v-else>
    <ConfirmDialog/>
    <div class="flex justify-content-center flex-wrap" >
      <div class="m-3" v-for="repo in githubRepos" :key="repo.id">
        <Card
          style="
            min-height: 255px;
            min-width: 200px;
            max-width: 200px;
          "
        >
          <template #title>
            <h4 class="text-lg" style="overflow: hidden; text-overflow: ellipsis">{{ repo.name }}</h4>
          </template>
          <template #subtitle>
            <p class="text-sm" style="overflow: hidden; text-overflow: ellipsis">
              {{ repo.clone_url }}
            </p>
          </template>
          <template #content>
            <Button class="" label="Deploy" @click="function () { confirmDeploy(repo) }" />
          </template>
        </Card>
      </div>
    </div>
  </template> 
</template>

<style scoped></style>
