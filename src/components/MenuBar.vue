<script setup>
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

const isUserAuthenticated = computed(() => {
  return store.getters["isUserLoggedIn"];
});

const items = [
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "Deployments",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "Deploy New Repo",
        icon: "pi pi-fw pi-plus",
        to: "/deploy",
      },
      {
        label: "List Deployments",
        icon: "pi pi-fw pi-list",
        to: "/deployments",
      },
    ],
  },
];

function handleLogout() {
  store.dispatch('logout')
  router.push('/')
}
</script>

<template>
  <menubar :model="items">
    <template #end>
      <template v-if="isUserAuthenticated">
        <Button
          type="button"
          label="Log Out"
          icon="pi pi-fw pi-power-off"
          @click="handleLogout"
        ></Button>
      </template>
      <template v-else>
        <RouterLink to="/login">
          <Button type="button" label="Log In" icon="pi pi-fw pi-user">
            <i class="pi pi-fw pi-user" /> <span>Login</span>
          </Button>
        </RouterLink>
      </template>
    </template>
  </menubar>
</template>

<style></style>
