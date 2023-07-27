import { defineStore } from 'pinia'
import { ListItem, UserListItem, ListStoreState } from '../storeTypes';
import {jwtintercepter} from '../setAuthHeader';


export const useListStore = defineStore('lists', {
    state: ():ListStoreState => ({
        
            isAuthenticated: false,
            sortOrder: "asec",
            selectedList: 0,
            userList: [],
            completedList: [],
            activeCompletedList: [],
            allListItems: [],
            activeList: [],
            addListPopup: false,
    }),

    actions: {

        
        //retriving the listItems of the selected list
        retriveListItems(id:number) {
            jwtintercepter
                .get(`/List/` + id)
                .then((response) => {
                    for (var i:number = 0; i <= response.data.list_items.length - 1; i++) {

                        if (this.sortOrder == "asec") {
                            this.allListItems.push(response.data.list_items[i]);
                        } else {
                            this.allListItems.unshift(response.data.list_items[i]);
                        }
                    }


                })
        },


        //retriving all the lists 
        retriveLists() {
            jwtintercepter
                .get(`/List`)
                .then((response) => {

                    this.userList = response.data;

                    this.userList.forEach((list:UserListItem) => this.retriveListItems(list.id));

                })

        },

        //deleting a list
        deleteList(id:number) {
            jwtintercepter
                .delete(`/List/` + id)
                .then(() => {

                    this.userList = this.userList.filter((obj:UserListItem) => obj.id !== id);
                    if (!this.userList.length) {
                        this.activeCompletedList = []
                    }
                    this.activeList = this.activeList.filter(
                        (obj:ListItem) => obj.listId !== id);
                    this.allListItems = this.allListItems.filter(
                        (obj:ListItem) => obj.listId !== id);



                });



        },

        //adding a item to the current list
        addItem(item:string) {
            jwtintercepter
                .post(`/List/` + this.selectedList + "/list-item", {
                    name: item,
                })
                .then((response) => {

                    response.data.list_items.forEach((obj2:ListItem) => {
                        if (!this.allListItems.some((obj1:ListItem) => obj1.id === obj2.id)) {
                            this.allListItems.push(obj2);

                            if (!this.completedList.some((obj1:ListItem) => obj1.id === obj2.id)) {

                                if (this.sortOrder == "asec") {

                                    this.activeList.push(obj2);
                                } else {

                                    this.activeList.unshift(obj2);
                                }

                            }
                            console.log(obj2);
                        }
                    });
                })
        },

        //creating a new list along with its initial list item 
        addList(list:string, item:string) {
            jwtintercepter
                .post(`/List/`, {
                    "name": list,
                    "list_items": [
                        { "name": item }
                    ]
                })
                .then((response) => {

                    response.data.list_items.forEach((obj2:ListItem) => {
                        if (!this.allListItems.some((obj1:ListItem) => obj1.id === obj2.id)) {
                            this.allListItems.push(obj2);
                        }
                    });
                    if (this.sortOrder == "asec") {
                        this.userList.push({ "name": response.data.name, "userId": response.data.userId, "id": response.data.id })
                    } else {
                        this.userList.unshift({ "name": response.data.name, "userId": response.data.userId, "id": response.data.id })
                    }
                })
        },

        //deleting a listItem from the active list
        deleteListItem(itemId:number) {
            jwtintercepter
                .delete(`/List/` + this.selectedList + "/list-item/" + itemId)
                .then(() => {
                    this.activeList = this.activeList.filter(
                        (obj:ListItem) => obj.id !== itemId)
                    this.allListItems = this.allListItems.filter(
                        (obj:ListItem) => obj.id !== itemId)
                })
        },


  

    },
})
