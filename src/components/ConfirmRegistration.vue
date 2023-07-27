<template>
  <div class="dashboard-wrap">
    <div class="container">
      <div class="row">
        <p  class="registered">{{ registration }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount} from "vue";
import axios from "axios";
import {router} from '../routes'


const registration = ref<string>('');

onBeforeMount(async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
      name: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    });
    registration.value = 'Registered';
    router.push({ name: "Login" })

  } catch (error) {
    console.error("Registration failed:", error);
    registration.value = 'Registration failed!';
  }
});
</script>

<style lang="scss">
.dashboard-wrap {
  padding: 30px;
  background-color: #f6fdf6;
  text-align: center;
  .registered {
    color: green;
    font-size: 5vw;
  }
}
</style>
