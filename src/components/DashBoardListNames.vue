<template>
  <div class="List-names">
    <div v-if="!ListDataStore.userList.length">please add Lists</div>
    <TransitionGroup name="list" tag="div">
      <div
        class="List-name"
        :class="{ active: ListDataStore.selectedList == list.id }"
        v-for="list in ListDataStore.userList"
        :key="list.id"
        @click="activeList(list.id)"
      >
        <p>{{ list.name }}</p>

        <button class="delete-List" @click.stop="deleteList(list.id)">X</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from "../stores/listStore";


    const ListDataStore = useListStore();


    function deleteList(id:number) {
      ListDataStore.deleteList(id);
    }

    function activeList(id:number) {
      ListDataStore.selectedList = id;
      ListDataStore.activeList = ListDataStore.allListItems.filter(
        (obj:any) => obj.listId == id
      );
      ListDataStore.activeCompletedList = ListDataStore.completedList.filter(
        (obj:any) => obj.listId == id
      );
    }


  

</script>

<style lang="scss" scoped>
.List-names {
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  .List-name {
    position: relative;
    border-radius: 20px;
    margin-bottom: 10px;
    background-color: white;
    color: #6bb36b;
    border: 1px solid #6bb36b;
    padding: 10px;
    text-align: center;
    word-wrap: break-word;
    transition: all 0.2s;
    cursor: pointer;

    &.active {
      background-color: #9acd32;
      color: white;
    }
    p {
      margin-bottom: 0px;
      font-weight: 600;
      font-style: italic;
    }
    .delete-List {
      display: none;
      position: absolute;
      right: 10px;
      top: 17%;
      height: 30px;
      width: 30px;
      transition: all 0.2s;
      background-color: #fc5f5f;
      color: white;
      border: none;
      border-radius: 5px;
      &:hover {
        background-color: red;
      }
    }
    &:hover {
      .delete-List {
        display: block;
      }
      padding-right: 60px;
    }
  }
}
</style>
