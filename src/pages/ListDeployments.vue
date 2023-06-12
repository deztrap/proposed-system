<script setup>
import DataView from "primevue/dataview";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

import DeploymentRow from "../components/DeploymentRow.vue";
import { SERVER_DOMAIN } from "../config";

const store = useStore();

const deployments = computed(() => store.state.deployments.data);

const fetchDeployments = async () => {
  await store.dispatch("fetchDeployments");
};

onMounted(async () => {
  fetchDeployments();
});
</script>

<template>
  <h1 class="mt-5 gap-3 text-primary">List Deployments</h1>

  <div class="flex justify-content-center">
    <div class="col-6">
      <DataView :value="deployments">
        <template #list="slotProps">
          <div class="col-12">
            <div
              class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
            >
              <img
                class="w-6rem shadow-2 block xl:block mx-auto border-round"
                :src="`https://picsum.photos/200/200?grayscale&blur=2&random=${Math.floor(Math.random() * 100000)}`"
                alt="Some thing"
              />
              <div
                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
              >
                <div
                  class="flex flex-column align-items-center justify-content-between sm:align-items-start gap-3"
                >
                  <div class="text-2xl font-bold text-900">
                    {{ slotProps.data.repo_info?.name }} #{{ slotProps.data.id }}
                  </div>
                  <div class="flex align-items-center gap-3">
                    <span class="flex align-items-center gap-2">
                      <i class="pi pi-external-link"></i>
                      <span class="font-semibold"
                        ><a
                          :href="slotProps.data.repo_url"
                          style="color: inherit"
                          class="hover-underline"
                          target="_blank"
                        >
                          {{ slotProps.data.repo_info?.html_url }}
                        </a>
                      </span>
                    </span>

                    <div class="text-md font-semibold text-200"></div>
                    <Rating readonly :cancel="false"></Rating>
                  </div>
                  <Tag :value="slotProps.data.status"></Tag>
                </div>
                <div
                  class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
                >
                  <a :href="`http://${SERVER_DOMAIN}:8112/${slotProps.data.live_url}`" target="_blank">
                    <Button :disabled="!slotProps.data.live_url">
                      {{  slotProps.data.live_url ? 'View live site' : 'Not Deployed' }}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<style scoped>
.hover-underline:hover {
  text-decoration: underline;
}
.hover-underline {
  text-decoration: none;
}
</style>
