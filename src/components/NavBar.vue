<template>
  <nav>
    <div class="nav-left-sec">
      <p>Lists</p>
      <button
        @click="
          ListDataStore.addListPopup = ListDataStore.addListPopup
            ? ListDataStore.addListPopup
            : !ListDataStore.addListPopup
        "
      >
        + New List
      </button>
      <button @click="signOut()">sign out</button>
    </div>
    <div class="nav-right-sec">
      <p>Sorting</p>
      <select
        v-model="sortOrder"
        v-on:change="handleChange"
        class="date-select"
        aria-label="Default select example"
      >
        <option value="asec" selected>Date asec</option>
        <option value="desc">Date Desc</option>
      </select>
    </div>
  </nav>
  <DashBoardAddListPopUp />
</template>

<script setup lang="ts">
import DashBoardAddListPopUp from "../components/DashBoardAddListPopUp.vue";
import { useListStore } from "../stores/listStore";
import { ListItem, UserListItem } from '../storeTypes';

import { ref } from "vue";
import { useRouter } from "vue-router";
  
    const ListDataStore = useListStore();
    const sortOrder = ref<string>("asec");
    const router = useRouter();

    //sign out function
    function signOut() {
      ListDataStore.isAuthenticated = false;
      ListDataStore.$reset()
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    }

    //sorting the list names and also the list items in asec or desc order
    function handleChange() {
      ListDataStore.sortOrder = sortOrder.value;
      if (sortOrder.value == "asec") {
        ListDataStore.userList.sort((a:UserListItem, b:UserListItem) => a.id - b.id);
        ListDataStore.activeList.sort((a:ListItem, b:ListItem) => a.id - b.id);
      } else {
        ListDataStore.userList.sort((a:UserListItem, b:UserListItem) => b.id - a.id);
        ListDataStore.activeList.sort((a:ListItem, b:ListItem) => b.id - a.id);
      }
    }
  
      
    

</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-top: 20px;
  background-color: #e6ffe6;
  border-bottom: 1px solid #6bb36b;
  p {
    color: black;
    font-size: 20px;
    margin-bottom: 0px;
    margin-right: 20px;
    @media (max-width: 980px) {
      margin-right: 5px;
    }
  }
  button {
    border: none;
    border-radius: 20px;
    background-color: #6bb36b;
    color: white;
    padding: 5px 20px;
    margin-right: 10px;
    @media (max-width: 980px) {
      padding: 0px 5px;
      margin-right: 5px;
      border-radius: 5px;
      font-size: 12px;
    }
  }
  .nav-left-sec,
  .nav-right-sec {
    display: flex;
  }
}
</style>
