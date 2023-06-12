<script setup>
import Toast from "primevue/toast";
import Menubar from "./components/MenuBar.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(async () => {
  await store.commit("restoreFromLocalStorage");
});
</script>

<template>
  <Toast />
  <Menubar />
  <router-view />
</template>

<style>
/* :root {
  --primary-color: rgb(100, 122, 247);
}
:deep(.p-button) {
  color: var(--primary-color) !important;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary-color);
  height: 100vh;
}

html {
  max-width: 100%;
  background-color: var(--bg-color);
}

body {
  font-family: var(--font-family);
}
</style>
