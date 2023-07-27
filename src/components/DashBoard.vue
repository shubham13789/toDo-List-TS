<template>
  <NavBar />
  <div class="dashboard-wrap">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <DashBoardListName />
        </div>
        <div class="col-md-9">
          <DashBoardListItems />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import NavBar from "../components/NavBar.vue";
import DashBoardListName from "../components/DashBoardListNames.vue";
import DashBoardListItems from "../components/DashBoardListItems.vue";
import { useListStore } from "../stores/listStore";


// retrieving all the lists of the current user 
onBeforeMount(async () => {
  const ListDataStore = useListStore();
  ListDataStore.retriveLists();
});



</script>

<style lang="scss">
.dashboard-wrap {
  padding: 30px;
  background-color: #f6fdf6;
  height: 100vh;
}
h3 {
  color: aqua;
}
</style>
