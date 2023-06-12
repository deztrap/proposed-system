<script setup>
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isUserAuthenticated = computed(() => {
  return store.getters["isUserLoggedIn"];
});
const user = computed(() => {
  return store.getters["getUser"];
});

const params = new URLSearchParams(window.location.search);
const code = params.get("code");
if (code) {
  store.dispatch("login", { token: code });
}
</script>

<template>
  <template v-if="user.loading">
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
    <h2>This is a proof of concept website</h2>
    <h1>Proposed System Uploader System</h1>
    <h2>Deployed frontend code from Github</h2>
    <template v-if="isUserAuthenticated">
      <h2>Logged in!</h2>
      <h3>Username: {{ user?.data?.name }}</h3>
      Bio: {{ user?.data?.bio }} <br /><br />
    </template>
    <template v-else>
      <RouterLink to="/login">
        <Button
          class="mr-2"
          label="Log In"
          icon="pi pi-fw pi-github"
          href="/login"
        >
          <i class="pi pi-fw pi-github" />
          <span>Login</span>
        </Button>
      </RouterLink>
    </template>
  </template>
</template>

<style scoped>
.tiny {
  font-size: 8px;
  font-weight: 100;
}
</style>
