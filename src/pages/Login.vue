<script setup>
import Button from "primevue/button";
import { useRouter } from "vue-router";

import { GITHUB_CLIENT_ID } from "../config";

const router = useRouter();

function signIn() {
  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,repo`;
  window.location.href = githubOAuthUrl;
}
</script>

<template>
  <div class="flex flex-column h-full align-items-center justify-content-center">
    <div class="">
      <div class="font-bold text-5xl line-height-3">
        Great you decided to join...
      </div>
      <div class="font-light text-sm line-height-4">
        But you need to be signed in to continue...
      </div>
      <Button
        type="button"
        label="Sign in with GitHub"
        class="p-button-sm p-mr-2"
        @click="signIn"
      ></Button>
    </div>
  </div>
</template>

<style scoped>
.line-height-4 {
  line-height: 4;
}
</style>
